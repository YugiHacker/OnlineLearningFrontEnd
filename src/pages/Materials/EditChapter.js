import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';

import Lessions from './Lessions';
import Assignment from './Assignment';
import { useParams } from 'react-router-dom';
import * as request from '~/utils/request';

function Chapters() {
    const [chapterName, setChapterName] = useState('');
    const handleChangeChapterName = (event) => {
        setChapterName(event.currentTarget.value);
    };
    const {id} = useParams();

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Chapter/' + id);
            setChapterName(loadData.title);
        };
        res();
    }, []);
    const onSubmit = () => {
        var options = {
            chapterId: id,
            title : chapterName,
            courseId: 10,
        }
        const res = async () => {
            const putData = await request.put('Chapter/' + id, options);
        }
        res();
    };

    return (
        <div style={{padding: 30}}>
            <label>Chapter name</label>
            <Input onChange={handleChangeChapterName} value={chapterName} />
            <Lessions chapterId = {id}/>
            <Assignment chapterId = {id}/>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default Chapters;