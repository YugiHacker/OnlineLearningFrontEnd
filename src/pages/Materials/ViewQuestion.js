import React, { useState } from 'react';
import { Radio, Space } from 'antd';
import * as request from '~/utils/request';
import { useEffect } from 'react';

function ViewQuestion(props) {
    const [value, setValue] = useState('');
    const [studentAnswerSource, setStudentAnswerSource] = useState({});
    const [num, setNum] = useState(0)

    const CreateStudentAnswer = (val) => {
        var options = {
            userId: 10,
            questionId: props.question.questionId,
            choiceValue: val,
        };
        const res = async () => {
            const loadData = await request.post('StudentAnswer', options);
        };
        res();
    };
    
    useEffect(() => {
        const res = async() =>{
            const loadData = await request.get('StudentAnswer/'+ 10 + ";" + props.question.questionId);
            setStudentAnswerSource(loadData);
        } 
        res();
    },[num])

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (Object.keys(studentAnswerSource).length === 0) {
            CreateStudentAnswer(e.target.value)
            setNum(num + 1);
            console.log('Create');
        } else {
            console.log('Update');
            UpdateStudentAnswer(e.target.value);
        }
    };

    const UpdateStudentAnswer = (val)=>{
        const id = studentAnswerSource.studentAnswerId;
        var options = {
            studentAnswerId: id,
            userId: 10,
            questionId: props.question.questionId,
            choiceValue: val,
        }
        const res = async () => {
            const putData = await request.put('StudentAnswer/' + id, options);
        }
        res();
    }

    return (
        <>
            <p>{props.question.content}</p>
            <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                    <Radio value={props.question.answerA}>{props.question.answerA}</Radio>
                    <Radio value={props.question.answerB}>{props.question.answerB}</Radio>
                    <Radio value={props.question.answerC}>{props.question.answerC}</Radio>
                    <Radio value={props.question.answerD}>{props.question.answerD}</Radio>
                </Space>
            </Radio.Group>
        </>
    );
}

export default ViewQuestion;
