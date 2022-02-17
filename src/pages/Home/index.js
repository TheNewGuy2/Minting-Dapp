import React from 'react';
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

    return (
        <s.Screen>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ padding: 100, backgroundColor: "var(--primary)" }}
                image={"/config/images/bg.png"}
            >
                <StyledLogo alt={"logo"} src={"/config/images/logo.png"} style={{ marginBottom: '30px' }} />
                <s.SpacerMedium />
                <StyledButton
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/release1');
                    }}
                >
                    Get Started
                </StyledButton>
            </s.Container>
        </s.Screen>
    );
}

export default Index;