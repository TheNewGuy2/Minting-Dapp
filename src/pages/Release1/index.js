import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

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

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
    flex-direction: row;
  }
  @media (min-width: 900px) {
    flex-direction: row;
    width: 100%;
  }
`;

export const StyledLogo = styled.img`
  width: 100px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 100px;
  @media (min-width: 900px) {
    width: 250px;
    hight: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
    hight: 250px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

const CircularContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  animation: rotation 130s linear infinite;
`;

const CircularContainerImg = styled.img`
  width: 100%;
  position: absolute;
  cursor: pointer;
`;

const SunContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
`;

const BottomRightCornerContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 10;
`;

const BottomRightCornerImg = styled.img`
  width: 100px;
  height: 100px;
`;

function Index() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSm, setIsMobileSm] = useState(false);

  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getConfig();
    dispatch(connect());
    getData();
  }, []);

  useEffect(() => {
    getData();
    calcViewportSize();
    window.addEventListener('resize', calcViewportSize);
  }, [blockchain.account]);

  const calcViewportSize = () => {
    setIsMobileSm(window.innerWidth <= 320);
    setIsMobile(window.innerWidth <= 768);
  }

//  useEffect(() => {
//    getData();
//    if (blockchain.account != "" && blockchain.NFT_NAME != null) {
//      dispatch(fetchData(blockchain.account));
//    }
//  }, [blockchain.NFT_NAME]);



  return (
    <s.Screen>
      { blockchain && blockchain.isOwnSmartContract && blockchain.isOwnSmartContract.length > 0 && <BottomRightCornerContainer>
          <a href="https://www.wearespecimen.com" target="_blank"><BottomRightCornerImg src='/config/images/specimen.png' /></a>
        </BottomRightCornerContainer>
      }
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 100, ...isMobile && { padding: '100px 0px' } }}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} style={{marginBottom:'30px'}}
                style={{ cursor: 'pointer' }}
                onClick={
                  
                  (e) => navigate('/home', '_top') } />
        <ResponsiveWrapper flex={1} style={{  position: 'relative', maxWidth: '500px', padding: 50, ...isMobile && { padding: '50px 10px', overflow:'hidden' } }} test>
          <CircularContainer style={isMobile ? { alignItems: 'center', top: '-35px' } : { top: 0 }}>
            { !blockchain.account && 
                <CircularContainerImg 
                    style={isMobile ? {} : { height: '100%', objectFit: 'contain' }} 
                    src={'/config/images/circle.png'}
                    onClick={(e) => window.open("https://docs.google.com/document/d/1S3fmB0Rhcr3-FSOhZ669YFFpKAofli43awwsBwNYIx4/edit", '_blank') } 
                />
            }
          </CircularContainer>
          <SunContainer 
            style={{ ...isMobile ? { borderRadius: '50%' } : { width:'100%' }}}
          >
            <s.Container
              flex={1}
              jc={"center"}
              ai={"center"}
              className="outer_body"
              style={{
                backgroundColor: "var(--accent)",
                padding: 10,
                borderRadius: '50%',
                border: "2px dashed var(--secondary)",
                boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                position: 'relative',
                padding: '30px',            
                ...isMobile && { maxWidth: '300px', height: '300px', margin:'0px auto' }
              }}
            >
              <s.TextTitle
                style={{
                  textAlign: "center",
                  fontSize: isMobile ? 40 : 50,
                  fontWeight: "bold",
                  color: "var(--accent-text)",
                }}
              >
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </s.TextTitle>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--primary-text)",
                }}
              >
                <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                  {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                </StyledLink>
              </s.TextDescription>
              <s.SpacerSmall />
              {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                <>
                  <s.TextTitle
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    The sale has ended.
                  </s.TextTitle>
                  <s.TextDescription
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    You can still find {CONFIG.NFT_NAME} on
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </StyledLink>
                </>
              ) : (
                <>
                  <s.TextTitle
                    style={{ textAlign: "center", color: "var(--accent-text)", ...isMobile && { fontSize: '16px' } }}
                  >
                    1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                    {CONFIG.NETWORK.SYMBOL}.
                  </s.TextTitle>
                  <s.SpacerXSmall />
                  <s.TextDescription
                    style={{ textAlign: "center", color: "var(--primary-text)" }}
                  >
                    Excluding gas fees.
                  </s.TextDescription>
                  <s.SpacerSmall />
                  {blockchain.account === "" ||
                    blockchain.smartContract === null ? (
                    <s.Container ai={"center"} jc={"center"}>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                          ...isMobile && { fontSize: '14px' }
                        }}
                      >
                        Connect to the {CONFIG.NETWORK.NAME} network
                      </s.TextDescription>
                      <s.SpacerSmall />
                      <StyledButton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      >
                        CONNECT
                      </StyledButton>
                      {blockchain.errorMsg !== "" ? (
                        <>
                          <s.SpacerSmall />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--primary-text)",
                            }}
                          >
                            {blockchain.errorMsg}
                          </s.TextDescription>
                        </>
                      ) : null}
                    </s.Container>
                  ) : (
                    <>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {feedback}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>
                        <StyledRoundButton
                          style={{ lineHeight: 0.4 }}
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            decrementMintAmount();
                          }}
                        >
                          -
                        </StyledRoundButton>
                        <s.SpacerMedium />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {mintAmount}
                        </s.TextDescription>
                        <s.SpacerMedium />
                        <StyledRoundButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            incrementMintAmount();
                          }}
                        >
                          +
                        </StyledRoundButton>
                      </s.Container>
                      <s.SpacerSmall />
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>
                        <StyledButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            claimNFTs();
                            getData();
                          }}
                        >
                          {claimingNft ? "BUSY" : "BUY"}
                        </StyledButton>
                      </s.Container>
                    </>
                  )}
                </>
              )}
              <s.SpacerMedium />
            </s.Container>
          </SunContainer>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container flex={0} jc={"center"} ai={"center"} style={{ width: "50%" }}>
          <s.TextDescription
//            style={{
//              textAlign: "center",
//              color: "var(--accent-text)",
//            }}
//          >
//            Please make sure you are connected to the right network (
//</s.Container>            {CONFIG.NETWORK.NAME} Mainnet) and the correct address.
//          </s.TextDescription>
//          <s.SpacerSmall />
//          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--accent-text)",
            }}
          >
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default Index;
