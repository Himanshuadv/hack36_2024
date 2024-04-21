import Nav from "../components/Nav";
import Chatbot from "../components/Chatbot";
function ChatbotPage() {
  return (
    <>
      <div className={`h-screen relative`}>
        <Nav />
        <div className={`flex flex-row justify-center item-center`}>
          <Chatbot />
        </div>
      </div>
    </>
  );
}

export default ChatbotPage;
