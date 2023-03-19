import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, Input, Select } from 'antd';
import { useParams } from 'react-router-dom';
import * as request from '~/utils/request';

const { Title } = Typography;
const { TextArea } = Input;

function Quiz() {
    const [content, setContent] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [trueAnswer, setTrueAnswer] = useState(0);
    const {id} = useParams();
    const [assignmentId, setAssignmentID] = useState(0);

    const handleChangeContent = (event) => {
        setContent(event.currentTarget.value);
    };

    const handleChangeAnswerA = (event) => {
        setAnswerA(event.currentTarget.value);
    };

    const handleChangeAnswerB = (event) => {
        setAnswerB(event.currentTarget.value);
    };

    const handleChangeAnswerC = (event) => {
        setAnswerC(event.currentTarget.value);
    };

    const handleChangeAnswerD = (event) => {
        setAnswerD(event.currentTarget.value);
    };

    const handleChange = (value) => {
        if (value === 'answerA') {
            setTrueAnswer(answerA);
        } else if (value === 'answerB') {
            setTrueAnswer(answerB);
        } else if (value === 'answerC') {
            setTrueAnswer(answerC);
        } else {
            setTrueAnswer(answerD);
        }
    };

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Question/' + id);
            setContent(loadData.content);
            setAnswerA(loadData.answerA);
            setAnswerB(loadData.answerB);
            setAnswerC(loadData.answerC);
            setAnswerD(loadData.answerD);
            setTrueAnswer(loadData.trueAnswer);
            setAssignmentID(loadData.assignmentId);
        };
        res();
    }, []);

    const onSubmit = () => {
        var options = {
            questionId: id,
            assignmentId : assignmentId,
            content : content,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            trueAnswer: trueAnswer,
        }
        const res = async () => {
            const putData = await request.put('Question/' + id, options);
        }
        res();
    };
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}> Upload Question</Title>
                </div>
                <label>Content</label>
                <TextArea onChange={handleChangeContent} value={content} />
                <br />
                <br />
                <label>Answer A</label>
                <Input onChange={handleChangeAnswerA} value={answerA} />
                <br />
                <br />
                <label>Answer B</label>
                <Input onChange={handleChangeAnswerB} value={answerB} />
                <br />
                <br />
                <label>Answer C</label>
                <Input onChange={handleChangeAnswerC} value={answerC} />
                <br />
                <br />
                <label>Answer D</label>
                <Input onChange={handleChangeAnswerD} value={answerD} />
                <br />
                <br />
                <label>True answer</label>
                <br />
                <Select onChange={handleChange} name="True answer" placeholder="Please select true answer">
                    <Select.Option value="answerA">Answer A</Select.Option>
                    <Select.Option value="answerB">Answer B</Select.Option>
                    <Select.Option value="answerC">Answer C</Select.Option>
                    <Select.Option value="answerD">Answer D</Select.Option>
                </Select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Quiz;
