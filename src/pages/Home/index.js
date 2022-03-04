import React, { useState, useEffect } from 'react';
import * as s from "../../styles/globalStyles";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import importScript from '../customHooks/importScript';

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
    height: 200px; 
    width: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
`;


function Index() {
    
    importScript("js/eyetracker.js");

    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

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

    return (

        <s.Screen style={{ height: '100%' }}>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ padding: '0px 200px', height: '100%', backgroundColor: "var(--primary)", ...isMobile && { padding: 0 } }}
                image={isMobile ? "/config/images/smallbg.jpg":"/config/images/smallbg.jpg"}
            >
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: isMobile ? 'center' : 'space-between' }}>
                    { !isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                    }
                    { !isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-Z.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                    }
                    { !isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-E.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                    }
                    { !isMobile && <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-V.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>
                    }
                    { !isMobile && <div
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
                    { !isMobile &&  <div
                            style={{ height: 155, flex: 1, backgroundImage: 'url(/config/images/logo-T.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        >
                        </div>}
                    </div>
                    <div style={{ width: '250px' }}>
                        <Slider {...settings}>
                                <div>
                                    <SunWrapper>
                                        <SunContainer 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/release1');
                                            }}
                                        >
                                            SS_22
                                        </SunContainer>
                                    </SunWrapper>
                                </div>
                                <div>
                                    <SunWrapper>
                                        <SunContainer 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/release2');
                                            }}
                                        >
                                            SS_11
                                        </SunContainer>
                                    </SunWrapper>
                                </div>
                                <div>
                                    <SunWrapper>
                                        <SunContainer 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/release3');
                                            }}
                                        >
                                            SS_33
                                        </SunContainer>
                                    </SunWrapper>
                                </div>
                        </Slider>
                    </div>
                </div>
            </s.Container>
        </s.Screen>
    );
}

export default Index;
