import React, { useState, useEffect } from "react";
import * as s from "../../styles/globalStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  background-image: url("../../path-to-uploaded-image/Release2bg.webp");
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const Time = styled.div`
  display: flex;
  gap: 30px;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 50px;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeValue = styled.span`
  font-size: 4rem;
  color: #ffd700; /* Gold for better visibility */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const Label = styled.span`
  font-size: 1.2rem;
  color: lightgray;
  text-transform: uppercase;
  margin-top: 10px;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavigateButton = styled.button`
  padding: 15px 40px;
  background-color: rgba(255, 140, 0, 0.9); /* Vibrant orange */
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 100, 0, 1); /* Darker orange */
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

function Index() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const targetDate = new Date("2025-01-03T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
            2,
            "0"
          ),
          hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
            2,
            "0"
          ),
          minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
            2,
            "0"
          ),
        });
        setLoading(false);
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const handleNavigate = () => {
    navigate("/information");
  };

  return (
    <s.Screen style={{ height: "100%" }}>
      <s.Container
        flex={1}
        ai={"center"}
        style={{
          padding: "0px 200px",
          height: "100%",
        }}
      >
        {loading === true ? (
          <></>
        ) : (
          <CountdownContainer>
            <Time>
              <TimeUnit>
                <TimeValue>{timeLeft.days}</TimeValue>
                <Label>Days</Label>
              </TimeUnit>
              <TimeUnit>
                <TimeValue>{timeLeft.hours}</TimeValue>
                <Label>Hours</Label>
              </TimeUnit>
              <TimeUnit>
                <TimeValue>{timeLeft.minutes}</TimeValue>
                <Label>Minutes</Label>
              </TimeUnit>
            </Time>
            <NavigateButton onClick={handleNavigate}>
              Discover More
            </NavigateButton>
          </CountdownContainer>
        )}
      </s.Container>
    </s.Screen>
  );
}

export default Index;
