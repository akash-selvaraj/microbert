from fastapi import FastAPI, Request, Depends, HTTPException
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins="*", allow_methods=["POST"], allow_headers=["*"]
)

tokenizer = AutoTokenizer.from_pretrained("bert-large-uncased-whole-word-masking-finetuned-squad")
model = AutoModelForQuestionAnswering.from_pretrained("bert-large-uncased-whole-word-masking-finetuned-squad")

# Store the paragraph globally for later use
stored_paragraph = None
def answer_question_init(qn_init):

        # Reuse the stored paragraph
        inputs = tokenizer(qn_init, stored_paragraph, return_tensors="pt")
        outputs = model(**inputs)
        start_scores = outputs.start_logits
        end_scores = outputs.end_logits
        answer_start = torch.argmax(start_scores)
        answer_end = torch.argmax(end_scores) + 1
        answer_init = tokenizer.convert_tokens_to_string(
            tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))
        print("initialized")
@app.get("/get-paragraph")
async def get_paragraph():
    global stored_paragraph
    if stored_paragraph:
        return {"paragraph_present": True, "paragraph": stored_paragraph}
    else:
        return {"paragraph_present": False}
@app.post("/set-paragraph")
async def set_paragraph(request: Request):
    try:
        data = await request.json()
        print(data.get("para"))
        global stored_paragraph  # Access the global variable
        stored_paragraph = data.get("para")
        print(stored_paragraph)
        answer_question_init("qn_init")
        return {"message": "Paragraph stored successfully"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@app.post("/answer-question")
async def answer_question(request: Request):
    try:
        global stored_paragraph  # Access the global variable
        if not stored_paragraph:
            raise HTTPException(status_code=400, detail="Paragraph not yet set. Please set the paragraph using /set-paragraph endpoint first.")

        data = await request.json()
        question = data.get("qn")

        if not question:
            raise HTTPException(status_code=400, detail="Missing required field 'qn'")

        # Reuse the stored paragraph
        inputs = tokenizer(question, stored_paragraph, return_tensors="pt")
        outputs = model(**inputs)
        start_scores = outputs.start_logits
        end_scores = outputs.end_logits
        answer_start = torch.argmax(start_scores)
        answer_end = torch.argmax(end_scores) + 1
        answer = tokenizer.convert_tokens_to_string(
            tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))
        print(stored_paragraph)
        print(question)
        print(answer)
        return {"ans": answer}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
