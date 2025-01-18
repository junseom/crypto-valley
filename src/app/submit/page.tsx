'use client';

import styled from "styled-components";
import React, { useState } from "react";

interface FormData {
    sourceType: string;
    title: string;
    content: string;
    link: string;
    originalContentLink: string;
    file: File | null;
}

const SubmitForm = () => {
    const [formData, setFormData] = useState<FormData>({
        sourceType: "",
        title: "",
        content: "",
        link: "",
        originalContentLink: "",
        file: null,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFormData((prevData) => ({
            ...prevData,
            file: file,
        }));
    };

    const handleSourceButtonClick = (type: string) => {
        setFormData((prevData) => ({
            ...prevData,
            sourceType: prevData.sourceType === type ? "" : type, // 다시 클릭 시 취소
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Heading>Submit</Heading>

                <InputGroup>
                    <Label>Source Type</Label>
                    <ButtonGroup>
                        {["News", "Tweet", "Article", "Video", "Podcast", "Other"].map((type) => (
                            <SourceButton
                                key={type}
                                active={formData.sourceType === type} // 'active' 속성은 styled-components에서만 사용됨
                                onClick={() => handleSourceButtonClick(type)}
                            >
                                {type}
                            </SourceButton>
                        ))}
                    </ButtonGroup>
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter title"
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

                <InputGroup>
                    <Label htmlFor="file">Upload File</Label>
                    <Input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="originalContentLink">Source Verification</Label>
                    <Input
                        type="url"
                        id="originalContentLink"
                        name="originalContentLink"
                        value={formData.originalContentLink}
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
    width: 100vw;
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
    background-color: ${(props) => (props.active ? "#0056b3" : "#000000")};
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
    background-color: #007bff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
