import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import routes from '~/config/routes';
import { UserGroupIcon } from '~/components/Icons';
import { PlusIcon1 } from '~/components/Icons';
import * as loadService from '~/apiServices/loadServices';
const cx = classNames.bind(styles);

function CourseItem({ course, addNew }) {
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);
    var userId = user?.userId;
    var role = user?.role;
    //  console.log(userId);
    const [enroll, setEnroll] = useState(null);
    const [countStudent, setCountStudent] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseEnroll(userId, course.courseId);
            //  console.log(result);
            setEnroll(result);
        };
        fetchApi();
    }, [course.courseId]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadStudentEnrollCourse(course.courseId);
            //  console.log(result);
            if (result) setCountStudent(result.length);
        };
        fetchApi();
    }, []);
    return (
        <section className={cx('wrapper')}>
            {!addNew ? (
                <>
                    <Link
                        className={cx('course-item')}
                        to={
                            course.userId == userId
                                ? `/editCourse/${course.courseId}`
                                : enroll
                                ? `${routes.learn}/${course.courseId}`
                                : `${routes.course}/${course.courseId}`
                        }
                        title={course.courseName}
                        target="_self"
                        style={{ backgroundImage: `url(${course.img})` }}
                    >
                        <button className={cx('btn')}>View course</button>
                    </Link>
                    <h4
                        style={{
                            marginTop: '10px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Link
                            to={
                                course.userId == userId
                                    ? `/editCourse/${course.courseId}`
                                    : enroll
                                    ? `${routes.learn}/${course.courseId}`
                                    : `${routes.course}/${course.courseId}`
                            }
                            target="_self"
                        >
                            {course.courseName}
                        </Link>
                    </h4>
                </>
            ) : (
                <Link
                    className={cx('course-item-add')}
                    to={role === 'teacher' ? '/addCourse' : routes.allCourses}
                    target="_self"
                >
                    <div className={cx('icon')}>{<PlusIcon1 width="5rem" height="5rem" />}</div>
                </Link>
            )}

            {!addNew && (
                <div className={cx('student-count')}>
                    <UserGroupIcon className={cx('icon-group')} width="1.8rem" height="1.8rem" />
                    <span>{countStudent}</span>
                </div>
            )}
        </section>
    );
}
export default CourseItem;
