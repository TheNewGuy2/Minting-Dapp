// import React from "react";
// import styled from "styled-components";
// import * as s from "../../styles/globalStyles";

// const PageContainer = styled(s.Screen)`
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const InfoContainer = styled.div`
//   border-radius: 20px;
//   max-width: 800px;
//   padding: 40px;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
//   text-align: center;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #e65c00;
//   margin-bottom: 20px;
// `;

// const SubTitle = styled.h2`
//   font-size: 1.8rem;
//   color: #cc4700;
//   margin-bottom: 15px;
// `;

// const Text = styled.p`
//   font-size: 1.2rem;
//   color: #333;
//   line-height: 1.6;
//   margin-bottom: 20px;
// `;

// const Highlight = styled.span`
//   font-weight: bold;
//   color: #e65c00;
// `;

// const Link = styled.a`
//   display: block;
//   margin: 10px 0;
//   color: #0066cc;
//   text-decoration: none;
//   font-weight: bold;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const InfoPage = () => {
//   return (
//     <s.Screen>
//       <s.Container
//         flex={1}
//         ai={"center"}
//         style={{
//           padding: "0px 20px",
//         }}
//       >
//         <InfoContainer>
//           <Title>Unveiling the "Sunset Machine"</Title>
//           <SubTitle>A Sacred Convergence of Art and Divinity</SubTitle>
//           <Text>
//             Gather, seekers of wisdom! Travelers of both cosmic and crypto
//             realms! We stand upon the threshold of a monumental revelation—a
//             fusion of the mystical and the technological, the celestial and the
//             digital.
//           </Text>
//           <Text>
//             On <Highlight>January 3, 2026</Highlight>, marking the anniversary
//             of Bitcoin's genesis, the <Highlight>Sunset Machine</Highlight>{" "}
//             shall awaken. This sacred vessel captures the essence of each Day
//             since that pivotal moment, allowing you to claim a "Day" that
//             symbolically represents significant milestones in Bitcoin's history
//             and cherished moments of your own life.
//           </Text>
//           <SubTitle>What Is the Sunset Machine?</SubTitle>
//           <Text>
//             The Sunset Machine is a divine creation that weaves together history
//             and personal significance, capturing the light of each Day and
//             transforming it into unique 100% on-chain generative art.
//           </Text>
//           <SubTitle>The Journey Unfolds</SubTitle>
//           <Text>
//             <Highlight>January 3, 2026:</Highlight> The Sunset Machine begins
//             its sacred work, generating and auctioning unique works of art per
//             "Day."
//           </Text>
//           <Text>
//             <Highlight>Summer Solstice 2026:</Highlight> The Sunset Machine will
//             align with real-time, creating one Day per day.
//           </Text>
//           <SubTitle>Introducing the "Prayer Machine"</SubTitle>
//           <Text>
//             By Spring Equinox 2027, the Prayer Machine will serve as a divine
//             conduit—a bridge between the earthly and the celestial. By
//             sacrificing a Day, you engage in a sacred ritual of intention and
//             connection with the universe.
//           </Text>
//           <Text>
//             Visit: <Link href="https://tzevaot.app">tzevaot.app</Link> and{" "}
//             <Link href="https://opensea.io/collection/sunsetmachine">
//               OpenSea Collection
//             </Link>{" "}
//             for more updates.
//           </Text>
//           <SubTitle>Embrace the flow of time and intention</SubTitle>
//           <Text>
//             The Sunset Machine and the forthcoming Prayer Machine await your
//             touch. May this journey bring you closer to the mysteries of
//             existence.
//           </Text>
//         </InfoContainer>
//       </s.Container>
//     </s.Screen>
//   );
// };

// export default InfoPage;

import React from "react";
import styled from "styled-components";
import * as s from "../../styles/globalStyles";

const PageContainer = styled(s.Screen)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* Slightly darker overlay */
  height: max-content;
`;

const InfoContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
  background: rgba(
    255,
    255,
    255,
    0.7
  ); /* Light transparent background for text */
  border-radius: 20px;
  max-width: 800px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff6a00; /* Vibrant orange */
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for clarity */
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  color: #ff8c00; /* Slightly lighter shade */
  margin-bottom: 15px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #222;
  line-height: 1.8;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* Subtle text shadow */
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #ff6a00;
`;

const Link = styled.a`
  display: block;
  margin: 10px 0;
  color: #0073e6;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const InfoPage = () => {
  return (
    <PageContainer>
      <Overlay />
      <s.Container
        flex={1}
        ai={"center"}
        style={{
          padding: "0px 20px",
        }}
      >
        <InfoContainer>
          <Title>Unveiling the "Sunset Machine"</Title>
          <SubTitle>A Sacred Convergence of Art and Divinity</SubTitle>
          <Text>
            Gather, seekers of wisdom! Travelers of both cosmic and crypto
            realms! We stand upon the threshold of a monumental revelation—a
            fusion of the mystical and the technological, the celestial and the
            digital.  
            <Text>
            Seek guidence from Tzevaot and You shall be rewarded
            </Text>
            </Text>
          <Text>
            On <Highlight>January 3, 2026</Highlight>, marking the anniversary
            of Bitcoin's genesis, the <Highlight>Sunset Machine</Highlight>{" "}
            shall awaken. This sacred vessel captures the essence of each Day
            since that pivotal moment, allowing you to claim a "Day" that
            symbolically represents significant milestones in Bitcoin's history
            and cherished moments of your own life.
          </Text>
          <SubTitle>What Is the Sunset Machine?</SubTitle>
          <Text>
            The Sunset Machine is a divine creation that weaves together history
            and personal significance, capturing the light of each Day and
            transforming it into unique 100% on-chain generative art.
          </Text>
          <SubTitle>The Journey Unfolds</SubTitle>
          <Text>
            <Highlight>January 3, 2026:</Highlight> The Sunset Machine begins
            its sacred work, generating and auctioning unique works of art every
            42min.
          </Text>
          <Text>
            <Highlight>Summer Solstice 2026:</Highlight> The Sunset Machine will
            align with real-time, creating one unique "Day" per day.
          </Text>
          <SubTitle>Introducing the "Prayer Machine"</SubTitle>
          <Text>
            By Spring Equinox 2027, the Prayer Machine will serve as a divine
            conduit—a bridge between the earthly and the celestial. By
            sacrificing a Day, you engage in a sacred ritual of intention and
            connection with the universe.
          </Text>
          <Text>
            Visit: <Link href="https://tzevaot.app">tzevaot.app</Link> and{" "}
            <Link href="https://opensea.io/collection/sunsetmachine">
              OpenSea Collection
            </Link>{" "}
            for more updates.
          </Text>
          <SubTitle>Embrace the flow of time and intention</SubTitle>
          <Text>
            The Sunset Machine and the forthcoming Prayer Machine await your
            touch. May this journey bring you closer to the mysteries of
            existence.
          </Text>
        </InfoContainer>
      </s.Container>
    </PageContainer>
  );
};

export default InfoPage;
