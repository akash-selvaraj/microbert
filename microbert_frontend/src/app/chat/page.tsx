import Chat from "../components/Chat";
import MascotBig from "../components/MascotBig";

export default function Page() {
  return (
    <div className="h-screen min-w-screen flex flex-col lg:flex-row">
      <Chat />
      <div className="hidden lg:block w-2/3">
        <div className="hidden lg:block">
          <div className="hero relative min-h-screen">
            <div className="hero-content chat-bg glass w-2/3 h-screen fixed text-center">
              <div className="max-w-2xl">
                <div className="card chat-bg">
                  <figure>
                    <MascotBig />
                  </figure>
                  <div className="card-body flex flex-col text-center h-full items-center p-5">
                    <h2 className="card-title font-bold justify-center my-auto items-center  text-3xl">Howdy!</h2>
                    <p className='justify-center flex text-xl'>Nice Text! What are you looking for?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
