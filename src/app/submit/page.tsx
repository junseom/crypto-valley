"use client";

import styled from "styled-components";
import React, { useState } from "react";
import { addOpinion } from "@/states/opinions.state";
import { useRouter } from "next/navigation";
import { getSigner } from "@dynamic-labs/ethers-v6";
import SEPOLIA_CONTRACTS from "@/configs/sepolia";
import { CV__factory } from "@/typechain";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Opinion } from "@/states/opinions.state";

const SubmitForm = () => {
  const router = useRouter();
  const { primaryWallet } = useDynamicContext();
  const [formData, setFormData] = useState<Opinion>({
    id: 0,
    coin: "",
    cause: "",
    effect: "",
    content: "",
    sourceType: "",
    link: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSourceButtonClick = (type: string) => {
    console.log("SourceButton clicked:", type);
    setFormData((prevData) => ({
      ...prevData,
      sourceType: prevData.sourceType === type ? "" : type, // 다시 클릭 시 취소
    }));
    console.log("handleSourceButtonClick:", formData.sourceType);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Contract execution started");

    const signer = await getSigner(primaryWallet!);
    const cv = CV__factory.connect(SEPOLIA_CONTRACTS.CV, signer);
    const tx = await cv.submitOption("DOGE", formData.content);
    await tx.wait();

    addOpinion({
      ...formData,
    });

    router.back();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading>Submit your opinion</Heading>

        <InputGroup>
          <Label htmlFor="coin">Coin</Label>
          <Input
            type="text"
            id="coin"
            name="coin"
            value={formData.coin}
            onChange={handleInputChange}
            placeholder="Enter Coin name"
          />
        </InputGroup>

        <InputGroup>
          <Label>Source Type</Label>
          <ButtonGroup>
            {["News", "Tweet", "Article", "Video", "Podcast", "Other"].map(
              (type) => (
                <SourceButton
                  key={type}
                  active={formData.sourceType === type}
                  type="button"
                  onClick={() => handleSourceButtonClick(type)}
                >
                  {type}
                </SourceButton>
              )
            )}
          </ButtonGroup>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="cause">Cause</Label>
          <Input
            type="text"
            id="cause"
            name="cause"
            value={formData.cause}
            onChange={handleInputChange}
            placeholder="Enter cause"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="effect">Effect</Label>
          <Input
            type="text"
            id="effect"
            name="effect"
            value={formData.effect}
            onChange={handleInputChange}
            placeholder="Enter effect"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="content">Content</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter content"
          />
        </InputGroup>

        {/* 시작 시각 입력 필드 */}
        <InputGroup>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            type="datetime-local"
            id="startTime"
            name="startTime"
          />
        </InputGroup>

        {/* 종료 시각 입력 필드 */}
        <InputGroup>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            type="datetime-local"
            id="endTime"
            name="endTime"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="link">Link</Label>
          <Input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="https://"
          />
        </InputGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default SubmitForm;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
  color: #ffffff;
  overflow: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  background-color: #000000;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: bold;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #333333;
  color: #ffffff;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #333333;
  color: #ffffff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

interface SourceButtonProps {
  active: boolean;
}

const SourceButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active", // active 속성을 DOM으로 전달하지 않음
})<SourceButtonProps>`
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#646b71" : "#000000")};
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgb(191, 190, 190);
  }
`;
