import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {PaperPlane}
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import BotAvatar from "../../assets/bot_avatar.webp";
import UserAvatar from "../../assets/default_avatar.png";

const Home = () => {
  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([
    { user: "gpt", message: "Hello ! How can I help you ?" },
    // { user: "me", message: "Can I chat now ?" },
  ]);


  function clearChat() {
    setChatlog([])
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatlogNew = [...chatlog, { user: "me", message: `${input}` }];
     setInput("");
      setChatlog(chatlogNew)
      console.log(chatlogNew)
    const messages = chatlogNew.map((message) => message.message).join("\n")


    const response = await fetch("http://192.168.10.128:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages
      }),
    });
    const data = await response.json();
    setChatlog([...chatlogNew , { user: "gpt", message: `${data.message}` }]);
    console.log(data.message);
  }
  return (
    <>
      <HomeWrapper>
        <SideMenu>
          <h1>Chat</h1>
          <SideMenuBtn onClick={clearChat}>+ New chat</SideMenuBtn>
        </SideMenu>
        <ChatBox>
          <h1>Chat With Jarvis</h1>
          <ChatContainer>
            {chatlog.map((message, index) => (
              <Hello key={index} message={message} />
            ))}
          </ChatContainer>
          {/* <BotChatLog>
            <Avatar>
              <AvatarImage src="/JARVIS_Logo.webp" />
            </Avatar>
            <BotMessage>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              dicta minus hic commodi consequatur odio nobis. Vel debitis
              repellendus quasi reiciendis non, saepe sit? Eum quas voluptatibus
              assumenda ipsum, perspiciatis libero, saepe ipsam laudantium error
              ipsa omnis sint facere! Provident veniam autem in perspiciatis
              dolor iure cum dignissimos. Libero, aliquid?
            </BotMessage>
          </BotChatLog> */}
          <ChatInputHolder>
            <Form onSubmit={handleSubmit}>
              <ChatInput
                rows={1}
                placeholder="Type your chat here"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  console.log(input);
                }}
              />
            </Form>
            <SendButtonHolder>
              <SendButton onClick={handleSubmit}>
                <Icon icon={faPaperPlane} />
              </SendButton>
            </SendButtonHolder>
          </ChatInputHolder>
        </ChatBox>
      </HomeWrapper>
    </>
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(52, 53, 65, 1);
  display: flex;
`;

const SideMenu = styled.aside`
  width: 25vw;
  height: 100vh;
  padding: 30px;
  background-color: #202123;
  color: #fff;
`;

const SideMenuBtn = styled.div`
  padding: 12px;
  border: 1px solid white;
  border-radius: 5px;
  text-align: left;
  transition: all 0.25s ease;
  font-size: 1.25em;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`;

const ChatBox = styled.div`
  color: #fff;
  flex: 1;
  background-color: #343541;
  position: relative;
`;

const ChatInputHolder = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ChatInput = styled.input`
  background-color: #40414f;
  color: #fff;
  width: 90%;
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  resize: none;
  font-size: 1.25em;
  overflow-y: hidden;
  max-height: 200px;
  height: 50px;
  margin: 10px;
`;
const SendButtonHolder = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
`;
const SendButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #fff;
  &:hover {
    color: rgba(172, 172, 190, 1);
    background-color: rgba(32, 33, 35, 1);
    cursor: pointer;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  width: 25px;
  height: 25px;
`;

const ChatLog = styled.div`
  padding: 24px;
  display: flex;

  gap: 20px;
  width: 100%;
`;

const ChatMessage = styled.div`
  width: 90%;
  padding: 12px;
  border-radius: 5px;
`;

const Avatar = styled.div`
  width: 10%;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: auto;
`;

const BotChatLog = styled(ChatLog)`
  background-color: rgba(255, 255, 255, 0.1);
`;
const BotMessage = styled(ChatMessage)``;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 70vh;
  overflow-x: hidden;
`;

const Hello = ({ message }) => {
  return (
    <>
      <ChatLog>
        <Avatar>
          <AvatarImage src={message.user === "gpt" ? BotAvatar : UserAvatar} />
        </Avatar>
        <ChatMessage>{message.message}</ChatMessage>
      </ChatLog>
    </>
  );
};
export default Home;
