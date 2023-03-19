import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import styles from './Course.module.scss';
import Image from '~/components/Image';
import routes from '~/config/routes';
import * as loadService from '~/apiServices/loadServices';

const cx = classNames.bind(styles);

function Course() {
    const [showMyCourse, setShowMyCourse] = useState(false);
    const [courses, setCourses] = useState([]);
    var currentUser = localStorage.getItem('user');
    var user = JSON.parse(currentUser);

    var userId = user.userId;
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseByUser(userId);
            if (result) setCourses(result.slice(0, Math.min(result.length, 4)));
        };
        fetchApi();
    }, []);
    const infoBlockRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            //   console.log(typeof cx('action-course'));
            if (
                showMyCourse &&
                event.target.className !== cx('action-course') &&
                !event.target.closest('.' + cx('action-course-view'))
            )
                setShowMyCourse(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMyCourse]);

    // default
    return (
        <div className={cx('my-course')}>
            <button className={cx('action-course')} onClick={() => setShowMyCourse(!showMyCourse)}>
                My courses
            </button>
            {showMyCourse && courses.length > 0 && (
                <div className={cx('action-course-view')}>
                    <div className={cx('course-view-header')}>
                        <h6>My courses</h6>
                        <Link to={routes.myCourses} title="My courses" target="_self">
                            View all
                        </Link>
                    </div>
                    {courses.map((course, index) => {
                        return (
                            <Link
                                key={index}
                                to={`${routes.learn}/${course.courseId}`}
                                title={course.courseName}
                                target="_self"
                            >
                                <div className={cx('course-view-item')}>
                                    <div>
                                        <Image className={cx('course-view-item-img')} src={course.img}></Image>
                                    </div>

                                    <div className={cx('my-course-info')}>
                                        <h3 className={cx('my-course-title')}>
                                            <a href="#">{course.courseName}</a>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {showMyCourse && !courses.length > 0 && (
                <div className={cx('action-course-view')}>
                    <div className={cx('course-view-header')}>
                        <h6>You not enrolled any courses</h6>
                        <Link to={routes.allCourses} title="Ok" target="_self" onClick={() => setShowMyCourse(false)}>
                            Enroll now
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Course;
