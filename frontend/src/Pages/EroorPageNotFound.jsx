import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Transition in={true} appear={true} timeout={1000}>
        {(state) => (
          <div
            className={`${
              state === "entered" ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          >
            <div className="flex flex-col items-center">
              <h1 className="text-6xl text-red-600 font-bold mb-4">404</h1>
              <p className="text-lg text-gray-700 mb-8">
                Oops! Page not found.
              </p>
              <Link
                to="/landing"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Go Home
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default ErrorPage;
