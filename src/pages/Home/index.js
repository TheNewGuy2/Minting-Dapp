import React, { useState, useEffect } from 'react';
import * as s from "../../styles/globalStyles";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

function Index() {

    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        calcViewportSize();
        window.addEventListener('resize', calcViewportSize);
        if (window && document) {
            const body = document.getElementsByTagName('body')[0];
            const scriptAudio = document.createElement('script')
            scriptAudio.src = 'js/eyetracker.js';
            body.appendChild(scriptAudio);
        }
    }, []);

    const calcViewportSize = () => {
        setIsMobile(window.innerWidth <= 767);
    }

    return (
        <s.Screen style={{ height: '100%' }}>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ padding: isMobile ? 16 : 50, height: '100%', backgroundColor: "var(--primary)", ...isMobile && { backgroundSize: 'contain', backgroundRepeat: 'no-repeat' } }}
                image={isMobile ? "/config/images/homebg.png":"/config/images/bg.png"}
            >
                <div style={{ display: 'flex', ...isMobile && { flexDirection: 'column' }, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div 
                        style={{ 
                            height: 100, width: 100, borderRadius: '50%', 
                            border: "2px dashed var(--secondary)",
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/release1');
                        }}
                    >
                        SS_22
                    </div>
                    { !isMobile && <>
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-Z.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-E.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-V.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-A.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
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
                        <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                    </>
                    }
                    <div 
                        style={{ 
                            height: 100, width: 100, borderRadius: '50%', 
                            border: "2px dashed var(--secondary)",
                            boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/release2');
                        }}
                    >
                        SS_11 
                    </div>
                </div>
                
                {/* <s.SpacerMedium /> */}
                
            </s.Container>
        </s.Screen>
    );
}

export default Index;