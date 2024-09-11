import React from "react";
import Accordion from "./Accordian";

const AccordionPage = () => {
  const items = [
    {
      id: "l2kj5",
      label: "What is Motis?",
      content: `Motis is a safe space designed for introverted individuals and anyone who wishes to ask questions anonymously. It's a platform where you can connect with others, seek advice, and express yourself freely without revealing your identity.`,
    },
    {
      id: "lk2j35lkj",
      label: "Who can use Motis?",
      content:
        "Motis is open to everyone, especially those who feel introverted or wish to maintain their privacy while seeking advice or connecting with a supportive community.",
    },
    {
      id: "l1kj2i0g",
      label: "Is Motis free to use?",
      content:
        "Yes, Motis is completely free for users to join and participate in the community.",
    },
    {
      id: "l1kj2i78",
      label: "How is my identity protected?",
      content:
        "We prioritize your privacy and anonymity. When you ask questions or participate in discussions, your identity remains hidden, ensuring a safe and confidential experience for all users.",
    },
    {
      id: "l1hi2i78",
      label: "How can I ask a question?",
      content:
        'You can ask a question by clicking on the "Get Started" button on the homepage or signing up to join the community. Once signed in, you can post your question anonymously.',
    },
  ];
  return <Accordion id="faq" items={items} />;
};

export default AccordionPage;
