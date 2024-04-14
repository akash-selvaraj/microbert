# Uvicorn Server for Microbert Backend

This guide will help you start a Uvicorn server for your app on port 8000.

## Getting Started

To start the Uvicorn server, follow these steps:

1. Ensure you have Python installed on your system. If not, you can download and install it from [python.org](https://www.python.org/).

2. Install Uvicorn if you haven't already:
    ```bash
    pip install -r requirements.txt
    ```

3. Start the Uvicorn server for your app on port 8000:
    ```bash
    uvicorn app:app --host=0.0.0.0 --port=8000
    ```

Now your app should be running on port 8000. You can access it through your web browser or make API requests to it.

## Additional Options

### Number of Workers

You can specify the number of worker processes using the `--workers` option. For example:
```bash
uvicorn app:app --port 8000 --workers 4

