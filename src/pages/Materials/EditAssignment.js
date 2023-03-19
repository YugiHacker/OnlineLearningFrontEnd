import React, { useEffect, useState } from 'react';
import Question from './Question';
import { Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import * as request from '~/utils/request';

function EditAssignment() {
    const [assignmentName, setAssignmentName] = useState('');
    const [chapterId, setChapterId] = useState(0);
    const {id} = useParams();
    const handleChangeAssignmentName = (event) => {
        setAssignmentName(event.currentTarget.value);
    };
    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Assignment/' + id);
            setAssignmentName(loadData.title);
            setChapterId(loadData.chapterId);
        };
        res();
    }, []);

    const onSubmit = () => {
        var options = {
            assignmentId : id,
            title : assignmentName,
            chapterId : chapterId,
        }
        const res = async () => {
            const putData = await request.put('Assignment/' + id, options);
        }
        res();
    };

    return (
        <div style={{padding: 30}}>
            <label>Assignment name</label>
            <Input onChange={handleChangeAssignmentName} value={assignmentName} />
            <Question assignmentId = {id}/>
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default EditAssignment;
