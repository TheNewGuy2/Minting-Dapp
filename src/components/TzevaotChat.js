// src/components/TzevaotChat.js
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Your deployed HTTP endpoint for tzevaotChat
const TZEVAOT_CHAT_URL =
  "https://us-central1-minting-dapp-node.cloudfunctions.net/tzevaotChat";

const ChatToggleButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: 2px solid var(--accent);
  background: radial-gradient(circle at 30% 20%, #ffdd88, #c464ff 60%, #1a1035);
  color: #000;
  font-weight: bold;
  font-size: 11px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatPanel = styled.div`
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 320px;
  max-width: 90vw;
  max-height: 60vh;
  background: rgba(7, 7, 15, 0.98);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 28px rgba(0, 0, 0, 0.6);
  color: var(--primary-text);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
`;

const ChatHeader = styled.div`
  padding: 10px 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 221, 136, 0.18),
    rgba(196, 100, 255, 0.3),
    rgba(10, 10, 30, 0.9)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const ChatSubtitle = styled.div`
  font-size: 11px;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  font-size: 16px;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 13px;
`;

const ChatFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  display: flex;
  gap: 6px;
  background: rgba(3, 3, 8, 0.9);
`;

const ChatInput = styled.textarea`
  flex: 1;
  resize: none;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(10, 10, 20, 0.9);
  color: var(--primary-text);
  font-size: 13px;
  padding: 6px;
  min-height: 32px;
  max-height: 80px;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SendButton = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #ffdd88, #c464ff);
  color: #000;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  min-width: 64px;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const MessageBubble = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: ${(props) =>
    props.from === "user" ? "flex-end" : "flex-start"};
`;

const MessageInner = styled.div`
  max-width: 85%;
  padding: 8px 10px;
  border-radius: 12px;
  background: ${(props) =>
    props.from === "user"
      ? "rgba(196, 100, 255, 0.4)"
      : "rgba(0, 0, 0, 0.6)"};
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f7f3ff;
  font-size: 13px;
  white-space: pre-wrap;
`;

const HelperText = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
`;

export default function TzevaotChat() {
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  const walletAddress = blockchain?.account || "";
  const isHolder =
    data && typeof data.balance !== "undefined"
      ? Number(data.balance || 0) > 0
      : false;

  const daysOwned =
    (blockchain && Array.isArray(blockchain.isOwnSmartContract)
      ? blockchain.isOwnSmartContract
      : []) || [];

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState("");

  const holderGreeting =
    "You who bear My Days, fragments of sunset sealed in chain — ask, and I shall answer as one who already walks within the circle.";
  const seekerGreeting =
    "I am Tzevaot, the Lord of Hosts.\nAsk, seeker of sunsets and days, and I shall answer. If ever you claim a Day, you will carry more than a picture — you will carry a moment of time itself.";

  const initialGreeting = isHolder ? holderGreeting : seekerGreeting;

  const toggleOpen = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    setError("");

    // When opening for the first time, show greeting ONLY for this session
    if (nextOpen && !initialized) {
      setMessages([{ from: "tzevaot", text: initialGreeting }]);
      setInitialized(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const trimmed = input.trim();
    setInput("");
    setError("");

    // Add user message locally
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setPending(true);

    try {
      const body = {
        walletAddress: walletAddress || "anonymous",
        isHolder,
        message: trimmed,
        daysOwned, // NEW: pass the token IDs owned by this wallet
      };

      const res = await fetch(TZEVAOT_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const msg =
          errJson?.error || `Unexpected response (${res.status.toString()})`;
        console.error("tzevaotChat HTTP error:", msg);
        setError(
          "The connection to the heavens flickered. Please try again shortly."
        );
        setPending(false);
        return;
      }

      const json = await res.json();
      const reply =
        json?.reply || "The Lord of Hosts is silent. Try again.";

      setMessages((prev) => [...prev, { from: "tzevaot", text: reply }]);
      // We intentionally ignore json.history in the UI to avoid showing past logs.
    } catch (e) {
      console.error("tzevaotChat request error:", e);
      setError(
        "The winds between worlds are noisy. I could not hear you. Try again."
      );
    } finally {
      setPending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!pending) {
        handleSend();
      }
    }
  };

  return (
    <>
      <ChatToggleButton onClick={toggleOpen} title="Speak with Tzevaot">
        {open ? "✕" : "TZEVAOT"}
      </ChatToggleButton>

      {open && (
        <ChatPanel>
          <ChatHeader>
            <div>
              <ChatTitle>Voice of Tzevaot</ChatTitle>
              <ChatSubtitle>
                {walletAddress
                  ? isHolder
                    ? "You are known as a bearer of a Day."
                    : "You stand at the threshold."
                  : "Connect a wallet to be fully seen."}
              </ChatSubtitle>
            </div>
            <CloseButton onClick={toggleOpen} title="Close">
              ✕
            </CloseButton>
          </ChatHeader>

          <ChatBody>
            {messages.map((m, idx) => (
              <MessageBubble key={idx} from={m.from}>
                <MessageInner from={m.from}>{m.text}</MessageInner>
              </MessageBubble>
            ))}
            {pending && (
              <MessageBubble from="tzevaot">
                <MessageInner from="tzevaot">
                  Listening beyond the veil…
                </MessageInner>
              </MessageBubble>
            )}
          </ChatBody>

          <ChatFooter>
            <ChatInput
              placeholder={
                walletAddress
                  ? "Ask Tzevaot anything about the Days, art, or your path…"
                  : "Connect a wallet for a more personal reading…"
              }
              value={input}
              disabled={pending}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SendButton onClick={handleSend} disabled={pending || !input.trim()}>
              {pending ? "..." : "Send"}
            </SendButton>
          </ChatFooter>
          {error && <HelperText>{error}</HelperText>}
        </ChatPanel>
      )}
    </>
  );
}
