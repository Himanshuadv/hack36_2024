import back from "../assets/b.jpg";
import Button from "../components/Button";
import AccordionPage from "../components/AccordionPage";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Sticky Header */}
      <header className="sticky z-10 top-0 bg-nav shadow-md shadow-gray-500 bg-opacity-90 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Lite Lo</div>
        <nav className="space-x-4 flex flex-row">
          <div className="mt-2">FAQ</div>
          <d className="mt-2">
            <a href="#features" className="text-black">
              Features
            </a>
          </d>
          <div>
            <Link
              to="/"
              className={`inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded`}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Background Image */}
      <div
        className="bg-contain bg-center bg-fixed min-h-screen overflow-hidden"
        style={{ backgroundImage: `url(${back})` }}
      >
        {/* Centered Content */}
        <div className="mt-52 pb-64 mx-24 text-center text-white w-1/3 text-xl bg-opacity-50 p-4 rounded-lg">
          <p className="mb-4 text-4xl p-3 leading-normal text-[#EADBC8]">
            Lite Lo: Speak Up Anonymously, Connect Authentically.
          </p>
          <p className="mb-4 text-xl text-[#DAC0A3] ">
            Welcome to Lite Lo, a safe space for introverted individuals and
            those who want to ask questions anonymously.
          </p>

          <div className="flex flex-row justify-center mt-10">
            <div className="mx-4">
              <Link
                to="/"
                className={`inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Content Boxes */}
        <div
          className="mx-64 mt-64 h-80 flex flex-row  items-center justify-center text-white gap-10"
          id="features"
        >
          <div className="w-1/3 flex flex-col items-center justify-center p-2 border rounded-md hover:shadow-xl hover:shadow-nav transform duration-300 ease-in-out">
            <div className="h-10 p-3 text-xl text-[#DAC0A3]">
              Anonymous Questioning:
            </div>
            <div className="h-auto p-3 mb-2">
              Users can ask questions and seek advice without revealing their
              identity, providing a safe and confidential space for sharing
              thoughts and concerns.
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center border rounded-md hover:shadow-xl hover:shadow-nav transform duration-300 ease-in-out">
            <div className="h-10 p-3 text-xl text-[#DAC0A3]">
              Community Support:
            </div>
            <div className="h-auto p-3 mb-2">
              A supportive community where users can connect with like-minded
              individuals, share experiences, and offer support to one another,
              fostering a sense of belonging and understanding.{" "}
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center border rounded-md hover:shadow-xl hover:shadow-nav transform duration-300 ease-in-out">
            <div className="h-10 p-3 text-xl text-[#DAC0A3]">
              Resourceful Content:
            </div>
            <div className="h-auto p-3 mb-2">
              Access to valuable resources, articles, and tools designed to
              empower users with knowledge and insights on various topics
              related to introversion, self-expression, and personal growth.
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-64 px-64">
          <AccordionPage />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
