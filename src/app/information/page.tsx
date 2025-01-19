'use client';

import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 라우팅

const InformationValidation = () => {
    const router = useRouter(); // useRouter 사용

    const [progress, setProgress] = useState(50);
    const [likeCount, setLikeCount] = useState(855); // 초기 좋아요 카운트 설정
    const [dislikeCount, setDislikeCount] = useState(811); // 초기 싫어요 카운트 설정
    const [totalVotes, setTotalVotes] = useState(likeCount + dislikeCount);

    const handleVote = (islike: boolean) => {
        const newTotalVotes = totalVotes + 1;
        if (islike) {
            setLikeCount(likeCount + 1); // 좋아요 카운트 증가
        } else {
            setDislikeCount(dislikeCount + 1); // 싫어요 카운트 증가
        }
        setTotalVotes(newTotalVotes); // 총 투표수 증가
    };

    const likePercentage = (likeCount / totalVotes) * 100; // 좋아요 비율 계산
    const dislikePercentage = (dislikeCount / totalVotes) * 100; // 싫어요 비율 계산

    return (
        <Container>
            <ContentBox>
                <Heading>Information Validation</Heading>

                <InfoGroup>
                    <Label>Users</Label>
                    <Info>0xfab...</Info>
                </InfoGroup>

                <InfoGroup>
                    <Label>Remaining Time...</Label>
                    <ProgressBar>
                        <Progress style={{ width: `${progress}%` }} />
                    </ProgressBar>
                </InfoGroup>

                <TextArea
                    rows={4}
                    placeholder="Rate and validate the following information"
                />

                <ButtonGroup>
                    <VoteButton onClick={() => handleVote(true)} islike="true">
                        👍 {Math.round(likePercentage)}% ({likeCount})
                    </VoteButton>
                    <VoteButton onClick={() => handleVote(false)} islike="false">
                        👎 {Math.round(dislikePercentage)}% ({dislikeCount})
                    </VoteButton>
                </ButtonGroup>

                <ActionGroup>
                    <ActionButton onClick={() => router.push("/home")}>
                        Cancel
                    </ActionButton>
                    <ActionButton isprimary="true">Vote</ActionButton>
                </ActionGroup>
            </ContentBox>
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
    background-color: #000000;
    color: #ffffff;
    overflow: hidden;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    height: 90%;
    padding: 40px;
    background-color: #000000;
    color: #ffffff;
    box-sizing: border-box;
`;

const Heading = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    margin: 0;
`;

const InfoGroup = styled.div`
    margin-bottom: 16px;
`;

const Label = styled.p`
    font-size: 0.875rem;
    color: #cccccc;
    margin-bottom: 0.5rem;
`;

const Info = styled.p`
    font-weight: 500;
    margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background-color: #333333;
    border-radius: 4px;
    margin-top: 1rem;
`;

const Progress = styled.div`
    height: 8px;
    background-color: #007bff;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px;
    background-color: #333333;
    color: #ffffff;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 16px;
    border: none;
    resize: none;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #007bff;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const VoteButton = styled.button<{ islike: string }>`
    background-color: ${(props) => (props.islike === "true" ? "#000000" : "#000000")};
    color: #ffffff;
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.islike === "true" ? "#404040" : "#404040")};
    }
`;

const ActionGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const ActionButton = styled.button<{ isprimary?: string }>`
    background-color: ${(props) => (props.isprimary === "true" ? "#007bff" : "#333333")};
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.isprimary === "true" ? "#0056b3" : "#444444")};
    }
`;
