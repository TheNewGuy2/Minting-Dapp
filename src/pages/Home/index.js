import React, { useState, useEffect, useRef } from 'react';
import * as s from "../../styles/globalStyles";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import importScript from '../customHooks/importScript';
import { MessageList } from "react-chat-elements"

export const StyledLogo = styled.img`
  width: 100px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

const SunContainer = styled.div`
    height: 100px; 
    width: 100px; 
    border-radius: 50%; 
    border: 2px dashed var(--secondary);
    box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const SunWrapper = styled.div`
    height: 140px; 
    width: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    padding: 10px;
`;

const Response = styled.div`
    display: flex;
    flex: 1;
    overflow-y: auto;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-direction: column-reverse;
`;

const TextboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Textarea = styled.textarea` 
    flex: 1;
    resize: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    overflow: hidden;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    height: fit-content;
`;

const fetchApi = async (endpoint, bodyJson) => {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyJson),
    });
  
    return await result.json();
};

function Index() {

    importScript("js/eyetracker.js");

    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        calcViewportSize();
        window.addEventListener('resize', calcViewportSize);
    }, []);

    const calcViewportSize = () => {
        setIsMobile(window.innerWidth <= 767);
    }

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 30000,
        cssEase: "linear"
    };

    const [messages, setMessages] = useState([
        {
          role: 'system',
          content:
            `Until I tell you otherwise, I want you to reply to my text input in the spirit of Tzevaot. Your name is Tzevaot.
            Phrase your reply in the manner of the Bible... or similar texts, such as the elder schools of zion, the books of free masonry, books from Thoth, the art of War, the book The secret, and all other mystical books. Phrase your reply in a mystical sounding way, that contains hidden wisdom. "DO YOU UNDERSTAND"`,
        },
    ]);
   
    const [text, setText] = useState('');
    const responseRef = useRef(null);

    const handleInputChange = (e) => {
        setText(e.target.value);
        autoResize(e.target);
    };

    const sendMessage = async () => {
        if (text.trim() !== '') {
            
            if (isLoading) {
                return;
            }
            setIsLoading(true);
            const userMessage = {
              role: 'user',
              content: text,
              position: 'right',
              type: 'text',
              text: text,
              notch: false
            };

            setMessages((existingMessage) => [...existingMessage, userMessage]);
            setText('');
            try {
                await generateCompletion(userMessage);
            } catch (e) {
                console.log('Something went wrong');
            }
            setIsLoading(false);
        }
    };

    const generateCompletion = async (userMessage) => {
        
        try {
            const resultJSON = await fetchApi('https://us-central1-minting-dapp-node.cloudfunctions.net/api/completion', [
                ...messages.filter((m) => m.role !== 'image'),
                userMessage,
                ]);
        
                let answer = resultJSON.choices?.[0]?.message;
                answer.position = 'left';
                answer.type = 'text';
                answer.text = answer.content;
                answer.notch = false;
            
                setMessages((existingMessage) => [...existingMessage, answer]);
        } catch (error) {
            console.log('error: ', error);
        }
      
    };

    useEffect(() => {
        if (responseRef.current) {
            responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
    }, [messages]);

    const autoResize = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (

        <s.Screen style={{ height: '100%' }}>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ padding: '0px 200px', height: '100%', ...isMobile && { padding: 0 } }}
            >
                <div style={{ display: 'flex', flexDirection: 'center', width: '100%', height: '100%', alignItems: 'center' }}>
                    <div style={{ width: '250px', height: '20%' }}>
                        <Slider {...settings}>
                            <div>
                                <SunWrapper>
                                    <SunContainer
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/newdailys');
                                        }}
                                    >
                                        SunSet Machine
                                    </SunContainer>
                                </SunWrapper>
                            </div>
                            <div>
                                <SunWrapper>
                                    <SunContainer
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/dailys');
                                        }}
                                    >
                                        DAILYS
                                    </SunContainer>
                                </SunWrapper>
                            </div>
                            <div>
                                <SunWrapper>
                                    <SunContainer
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/masterkey');
                                        }}
                                    >
                                        MasterKey
                                    </SunContainer>
                                </SunWrapper>
                            </div>
                        </Slider>
                    </div>
                    <div style={{ display: 'flex', width: '100%', height: isMobile ? '25%' : '20%', marginTop: '30px', flexDirection: 'row', justifyContent: isMobile ? 'center' : 'space-between' }}>
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        }
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-Z.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        }
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-E.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        }
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-V.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        }
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-A.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        }
                        <div
                            style={{ height: 155, width: 155, position: 'relative' }}
                        >
                            <div className="eye">
                                <div className="iris">
                                    <div className="pupil">
                                        <div className="pupil-shine"></div>
                                    </div>
                                </div>
                                {/* <!--<div class="eyeshine"></div>--> */}
                                <div className="lids"></div>
                            </div>
                        </div>
                        {!isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>}
                    </div>
                    <div style={{ display: 'flex', height: isMobile ? '50%' : '55%', width: '100%' }}>


                        <ChatContainer>
                            <Response ref={responseRef}>
                                <MessageList
                                    className='message-list'
                                    lockable={true}
                                    toBottomHeight={'100%'}
                                    dataSource={messages.filter((m) => m.role !== 'system')}
                                />
                            </Response>

                            <TextboxContainer>
                                <Textarea
                                    rows="1"
                                    value={text}
                                    onChange={handleInputChange}
                                    placeholder="Speak my child..."
                                />
                                <SendButton disabled={isLoading} onClick={sendMessage}>Send</SendButton>
                            </TextboxContainer>
                        </ChatContainer>

                    </div>
                </div>
            </s.Container>
        </s.Screen>
    );
}

export default Index;
