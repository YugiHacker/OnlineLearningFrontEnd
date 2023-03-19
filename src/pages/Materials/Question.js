import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as request from '~/utils/request';
import { useNavigate } from 'react-router-dom';
import routesConfig from '~/config/routes';

function Question(props) {
    const navigate = useNavigate();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'questionId',
            key: 'questionId',
            className: 'hide',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Answer A',
            dataIndex: 'answerA',
            key: 'answerA',
        },
        {
            title: 'Answer B',
            dataIndex: 'answerB',
            key: 'answerB',
        },
        {
            title: 'Answer C',
            dataIndex: 'answerC',
            key: 'answerC',
        },
        {
            title: 'Answer D',
            dataIndex: 'answerD',
            key: 'answerD',
        },
        {
            title: 'True answer',
            dataIndex: 'trueAnswer',
            key: 'trueAnswer',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editQuestion(record)} />
                        <DeleteOutlined style={{ color: 'red', marginLeft: 25 }} onClick = {() => deleteQuestion(record)}/>
                    </>
                );
            },
            key: 'action',
        },
    ];
    const [dataSource, setDataSource] = useState();
    const [num, setNum] = useState(0);

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Assignment/GetQuestions/' + props.assignmentId);
            setDataSource(loadData);
        };
        res();
    }, [num]);

    const editQuestion = (record) => {
        navigate(routesConfig.question + "/" + record.questionId);
    }

    const deleteQuestion = (record) => {
        const res = async () => {
            const delData = await request.del('Question/' + record.questionId);
            setNum(num + 1);
        }
        res();
    }

    const addNewQuestion = () =>{
        var options = {
            content : 'string',
            answerA: 'string',
            answerB: 'string',
            answerC: 'string',
            answerD: 'string',
            trueAnswer : 'string',
            assignmentId: props.assignmentId,
        }
        const res = async () => {
            const postData = await request.post('Question', options);
            setNum(num + 1);
        }
        res();
    };

    return (
        <div>
            <h2>Questions</h2>
            <Button onClick={addNewQuestion}>Add new Question</Button>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 3 }} rowKey = {"questionId"}></Table>
        </div>
    );
}

export default Question;
