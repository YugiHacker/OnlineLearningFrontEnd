import classNames from 'classnames/bind';
import styles from './HeaderLearnPage.module.scss';
import { ChevronLeft } from '~/components/Icons';
import images from '~/assets/images';
import * as loadService from '~/apiServices/loadServices';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const { courseId } = useParams();
    const location1 = useLocation();
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourseDetail(courseId);
            //     console.log(result);
            if (result) setCourse(result);
        };
        fetchApi();
    }, []);
    const handleClick = () => {
        const path = '/Course/' + courseId;
        if (location1.state) navigate(-2);
        else navigate(-1);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('icon-left')} onClick={handleClick}>
                    <ChevronLeft width="2.2rem" height="2.2rem" />
                </div>

                <a className={cx('logo')} href="/">
                    <img src={images.logo} alt="Okk"></img>
                </a>

                <div className={cx('title')}>{course.courseName}</div>
            </div>
        </header>
    );
}

export default Header;
