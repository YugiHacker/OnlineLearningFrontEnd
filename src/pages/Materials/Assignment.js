import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as request from '~/utils/request';
import { useNavigate } from 'react-router-dom';
import routesConfig from '~/config/routes';
import './index.css'


function Assignment(props) {
    const navigate = useNavigate();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'assignmentId',
            key: 'assignmentId',
            className: 'hide',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key:'title',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editAssignment(record)}/>
                        <DeleteOutlined style={{ color: 'red', marginLeft: 25 }} onClick = {() => deleteAssignment(record)}/>
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
            const loadData = await request.get('Chapter/GetAssignments/' + props.chapterId);
            setDataSource(loadData);
        };
        res();
    }, [num]);

    const addNewAssignment = () =>{
        var options = {
            title : 'string',
            chapterId: props.chapterId,
        }
        const res = async () => {
            const postData = await request.post('Assignment', options);
            setNum(num + 1);
        }
        res();
    };

    const editAssignment = (record) => {
        navigate(routesConfig.assignment + "/" + record.assignmentId);
    }

    const deleteAssignment = (record) => {
        const res = async () => {
            const delData = await request.del('Assignment/' + record.assignmentId);
            setNum(num + 1);
        }
        res();
    }

    return (
        <div>
            <h2>Assignment</h2>
            <Button onClick={addNewAssignment}>Add new Assignment</Button>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 3 }} rowKey = {"assignmentId"}></Table>
        </div>
    );
}

export default Assignment;
