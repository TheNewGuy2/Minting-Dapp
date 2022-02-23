import React, { useEffect, useState } from "react";
import * as s from "../../styles/globalStyles";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import setUserData from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions2";
import { toast } from 'react-toastify';


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

const InputField = styled.input`
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    width: 100%;
`;

const InputTextArea = styled.textarea`
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    width: 100%;
    resize: none;
`;

const StoreFrontContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

const ImageContainer = styled.div`
    flex: 1; 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ContainerImg = styled.img`
  height: 20em;
  width: 20em;
`

function Index() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain2);
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [isValid, setIsValid] = useState({ name: '', msg: '', value: '' });

    const [isMobile, setIsMobile] = useState(false);
    const [isMobileSm, setIsMobileSm] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        
        if (!customerName && customerName.length <= 0) {
            setIsValid({ value: true, msg: 'Please enter valid name', name: 'name' });
            return;
        }
        
        if (!shippingAddress && shippingAddress.length <= 0) {
            setIsValid({ value: true, msg: 'Please enter valid shipping address', name: 'shippingAddress' });
            return;
        }

        try {
            const result = await setUserData({
                name: customerName,
                shippingAddress: shippingAddress,
                walletAddress: blockchain.account,
                tokenNumber: blockchain.isOwnSmartContract[blockchain.isOwnSmartContract.length - 1]
            });
            toast.success('Your request submitted successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate('/release2');
        } catch (error) {
            console.log(error); 
            toast.error('Error while submitting data', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });  
        }
    };
    
    useEffect(() => {
        dispatch(connect());
    }, []);
    
    useEffect(() => {
        calcViewportSize();
        window.addEventListener('resize', calcViewportSize);
    }, [blockchain.account]);

    const calcViewportSize = () => {
        setIsMobileSm(window.innerWidth <= 320);
        setIsMobile(window.innerWidth <= 768);
    }

    return (
        <s.Screen>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ padding: isMobile ? '100px 16px' : '100px', backgroundColor: "var(--primary)" }}
                image={"/config/images/bg.png"}
            >
                <StyledLogo alt={"logo"} src={"/config/images/logo.png"} style={{ marginBottom: '30px' }} />
                <s.SpacerMedium />
                { blockchain && blockchain.isOwnSmartContract && blockchain.isOwnSmartContract.length > 0 && 
                    <StoreFrontContainer
                        style={{ flexDirection: isMobile ? 'column' : 'row' }}
                    >
                        <ImageContainer>
                            <ContainerImg src={`https://gateway.pinata.cloud/ipfs/QmW9SXDm6GmGg9CMYUNJbLsn2h9p3nfc9AtDEz5av1tiqy/${blockchain.isOwnSmartContract[blockchain.isOwnSmartContract.length - 1]}.png`} />
                        </ImageContainer>
                        <div className="App__form" style={{ flex: 1 }}>
                            <s.TextDescription
                                style={{
                                    color: "var(--primary-text)",
                                }}
                            >
                                Wallet Address
                            </s.TextDescription>
                            <InputField
                                type="text"
                                placeholder="User Wallet Address"
                                readOnly
                                value={blockchain.account}
                                
                            />
                            <s.TextDescription
                                style={{
                                    color: "var(--primary-text)",
                                }}
                            >
                                Token Number
                            </s.TextDescription>
                            <InputField
                                type="text"
                                placeholder="Latest own token Number"
                                readOnly
                                value={blockchain.isOwnSmartContract[blockchain.isOwnSmartContract.length - 1]}
                            />
                            <s.TextDescription
                                style={{
                                    color: "var(--primary-text)",
                                }}
                            >
                                Name
                            </s.TextDescription>
                            <InputField
                                type="text"
                                name="name"
                                className={isValid.value && isValid.name === 'name' ? 'in-valid-input' : ''}
                                onFocus={() => setIsValid({ value: false, text: '', name: '' })}
                                placeholder="Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            {isValid.value && isValid.name == 'name' && <s.TextDescription
                                style={{
                                    color: "red",   
                                }}
                            >
                                {isValid.msg}
                            </s.TextDescription>}
                            <s.TextDescription
                                style={{
                                    color: "var(--primary-text)",   
                                }}
                            >
                                Shipping Address 
                            </s.TextDescription>
                            <InputTextArea
                                type="text"
                                rows={4}
                                placeholder="Shipping Address"
                                className={isValid.value && isValid.name === 'shippingAddress' ? 'in-valid-input' : ''}
                                onFocus={() => setIsValid({ value: false, text: '', name: '' })}
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                            {isValid.value && isValid.name == 'shippingAddress' && <s.TextDescription
                                style={{
                                    color: "red",   
                                }}
                            >
                                {isValid.msg}
                            </s.TextDescription>}
                        </div>
                        <ImageContainer>
                            <ContainerImg 
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => window.open("https://opensea.io/collection/ss-11", '_blank') } 
                                src="/config/images/printexample.jpg" />
                        </ImageContainer>
                    </StoreFrontContainer>
                }
                { blockchain && blockchain.isOwnSmartContract && blockchain.isOwnSmartContract.length > 0 ? 
                    <StyledButton
                        onClick={(e) => {
                            submit(e);
                        }}
                        style={{ width: 300 }}
                    >
                        Submit
                    </StyledButton>
                    :
                    !blockchain.loading && <StyledButton
                        onClick={(e) => {
                            navigate('/relase2')
                        }}
                        style={{ width: 300 }}
                    >
                        Go Back
                    </StyledButton>
                }
            </s.Container>
        </s.Screen>
    );
}

export default Index;