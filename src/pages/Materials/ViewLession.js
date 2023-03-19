import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaterialBar from './MaterialBar';
import * as request from '~/utils/request';
import MaterialDetails from '~/components/MaterialDetails';
function ViewLession() {
    const [dataSource, setDataSource] = useState({});
    const [courseId, setCourseId] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        const res = async () => {
            const loadData = await request.get('Material/' + id);
            const chapterId = loadData.chapterId;
            const loadChapter = await request.get('Chapter/' + chapterId);
            setDataSource(loadData);
            setCourseId(loadChapter.courseId);
        };
        res();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <MaterialBar courseId={courseId}></MaterialBar>
            <MaterialDetails materialId={id}></MaterialDetails>
        </div>
    );
}

export default ViewLession;
