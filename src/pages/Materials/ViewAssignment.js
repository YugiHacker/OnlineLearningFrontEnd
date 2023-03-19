import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaterialBar from './MaterialBar';
import * as request from '~/utils/request';
import ViewQuestion from './ViewQuestion';


function ViewAssignment() {
    const [dataSource, setDataSource] = useState({});
    const [questions, setQuestions] = useState([]);
    const [courseId, setCourseId] = useState(1);
    const [haveDone, setHaveDone] = useState(false);
    const [studentAnswerSource, setStudentAnswerSource] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const res = async () => {
             const loadData = await request.get('Assignment/' + id);
             const chapterId = loadData.chapterId;
             const loadQuestions = await request.get('Assignment/GetQuestions/' + id);
             const loadChapter = await request.get('Chapter/' + chapterId);
             setDataSource(loadData);
             setCourseId(loadChapter.courseId);
             setQuestions(loadQuestions);
        };
        res();
    }, []);

    const getStuAnswerByUserIdAndQuesId = async(questionId) =>{
        const loadData = await request.get('StudentAnswer/'+ 10 + ";" + questionId);
        setStudentAnswerSource(loadData);
    }

    const questionShow = questions.map((question) => {
        if (haveDone === false){
            getStuAnswerByUserIdAndQuesId(question.questionId);
            if (Object.keys(studentAnswerSource).length === 0){
                return(
                    <div key={question.questionId}>
                        <ViewQuestion question = {question}></ViewQuestion>
                    </div>
                )
            }else{
                setHaveDone(true);
            }
        }
        return null;
    });

    return (
        <div style={{ display: 'flex' }}>
            <MaterialBar courseId={courseId}></MaterialBar>
            <div>
                <h2>{dataSource.title}</h2>
                {questionShow}
            </div>
        </div>
    );
}

export default ViewAssignment;
