"use client";

import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { CV__factory } from "@/typechain";
import SEPOLIA_CONTRACTS from "@/configs/sepolia";

const InformationValidation = () => {
  const router = useRouter();

  const [progress, setProgress] = useState(30);
  const [likeCount, setLikeCount] = useState(855);
  const [dislikeCount, setDislikeCount] = useState(811);
  const [totalVotes, setTotalVotes] = useState(likeCount + dislikeCount);
  const [isVoted, setIsVoted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { primaryWallet } = useDynamicContext();

  const handleVote = async (islike: boolean) => {
    try {
      const signer = await getSigner(primaryWallet!);

      const cv = CV__factory.connect(SEPOLIA_CONTRACTS.CV, signer);
      const tx = await cv.addVote("DOGE", islike);
      await tx.wait();

      const newTotalVotes = totalVotes + 1;
      if (islike) {
        setLikeCount(likeCount + 1);
      } else {
        setDislikeCount(dislikeCount + 1);
      }
      setTotalVotes(newTotalVotes);
      setIsVoted(true);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Voting failed:", error);
    }
  };

  const likePercentage = (likeCount / totalVotes) * 100;
  const dislikePercentage = (dislikeCount / totalVotes) * 100;

  return (
    <Container>
      <ContentBox>
        <Heading>Information Validation</Heading>

        <InfoGroup>
          <Label>Cause</Label>
          <Info>
            Bitwise registered a Dogecoin trust in Delaware, clarified as not an
            official ETF filing.
          </Info>
          <Label>Effect</Label>
          <Info>
            Generated interest but minimal market impact due to the lack of
            formal ETF approval.
          </Info>
        </InfoGroup>

        <InfoGroup>
          <Label>Remaining Time...</Label>
          <ProgressBar>
            <Progress style={{ width: `${progress}%` }} />
          </ProgressBar>
        </InfoGroup>

        <InfoGroup>
          <Info>
            Bitwise registered a Dogecoin trust in Delaware, clarified by
            Bloomberg analysts as a legal but unofficial ETF registration. While
            it indicates potential institutional interest, the lack of formal
            ETF approval limits its market impact.
          </Info>
          <Info>Source: News, https://coinness.com/news/1118414</Info>
        </InfoGroup>

        <ButtonGroup>
          <VoteButton
            onClick={() => handleVote(true)}
            islike="true"
            disabled={isVoted}
          >
            👍 {Math.round(likePercentage)}% ({likeCount})
          </VoteButton>
          <VoteButton
            onClick={() => handleVote(false)}
            islike="false"
            disabled={isVoted}
          >
            👎 {Math.round(dislikePercentage)}% ({dislikeCount})
          </VoteButton>
        </ButtonGroup>

        <ActionGroup>
          <ActionButton onClick={() => router.back()}>Close</ActionButton>
        </ActionGroup>
      </ContentBox>

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>Validation Completed</ModalHeader>
            <ModalBody>
              Thank you for your vote! Your validation has been recorded.
            </ModalBody>
            <ModalFooter>
              <ModalButton onClick={() => setIsModalOpen(false)}>Close</ModalButton>
            </ModalFooter>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default InformationValidation;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  color: #f5f5f5;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 90%;
  padding: 40px;
  background-color: #1c1c1c;
  color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const Info = styled.p`
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #e0e0e0;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333333;
  border-radius: 5px;
  margin-top: 1rem;
`;

const Progress = styled.div`
  height: 10px;
  background-color: #007bff;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const VoteButton = styled.button<{ islike: string }>`
  background-color: ${(props) =>
    props.islike === "true" ? "#333333" : "#333333"};
  color: #ffffff;
  padding: 14px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.islike === "true" ? "#404040" : "#404040"};
  }

  & + & {
    margin-left: 16px;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const ActionButton = styled.button<{ isprimary?: string }>`
  background-color: ${(props) =>
    props.isprimary === "true" ? "#007bff" : "#333333"};
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isprimary === "true" ? "#0056b3" : "#444444"};
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 400px;
  background: #1c1c1c;
  color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ModalBody = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
