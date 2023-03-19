import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as request from '~/utils/request';
import { useNavigate } from 'react-router-dom';
import routesConfig from '~/config/routes';

function Chapters() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'chapterId',
            key: 'chapterId',
            className: 'hide',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => editChapter(record)} />
                        <DeleteOutlined style={{ color: 'red', marginLeft: 25 }} onClick = {() => deleteChapter(record)}/>
                    </>
                );
            },
            key: 'action',
        },
    ];
    const [dataSource, setDataSource] = useState();
    const [num, setNum] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter');
            setDataSource(loadData);
        };
        res();
    }, [num]);

    const addNewChapter = () =>{
        var options = {
            title : 'string',
            courseId: 10,
        }
        const res = async () => {
            const postData = await request.post('Chapter', options);
            setNum(num + 1);
        }
        res();
    };

    const editChapter = (record) => {
        navigate(routesConfig.chapters + "/" + record.chapterId);
    }

    const deleteChapter = (record) => {
        const res = async () => {
            const delData = await request.del('Chapter/' + record.chapterId);
            setNum(num + 1);
        }
        res();
    }

    const onSubmit = () => {};
    return (
        <div style={{padding: 30}}>
            <h2>Chapters</h2>
            <Button onClick={addNewChapter}>Add new chapter</Button>
            <Table columns={columns} dataSource={dataSource} style = {{height: 500}} rowKey={"chapterId"}></Table>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default Chapters;
