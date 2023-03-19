import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import CourseItem from '~/components/CourseItem';
import { useEffect, useState } from 'react';
import * as loadService from '~/apiServices/loadServices';
const cx = classNames.bind(styles);

//---------  Demo khong Api course   -----------

// // const courses = [
//     {
//         "courseId": 1,
//         "userId": 4,
//         "courseName": "Kiến thức nhập môn IT",
//         "price": 2000,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
//         "description": "Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé"
//       },
//       {
//         "courseId": 2,
//         "userId": 4,
//         "courseName": "Lập trình C++ cơ bản, nâng cao",
//         "price": 2000,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png",
//         "description": "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên"
//       },
//       {
//         "courseId": 3,
//         "userId": 4,
//         "courseName": "HTML CSS từ Zero đến Hero",
//         "price": 2000,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
//         "description": "Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee"
//       },
//       {
//         "courseId": 4,
//         "userId": 4,
//         "courseName": "Lập Trình JavaScript Cơ Bản",
//         "price": 2000,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
//         "description": "Học Javascript cơ bản phù hợp cho người chưa từng học lập trình"
//       },
//       {
//         "courseId": 5,
//         "userId": 4,
//         "courseName": "Lập Trình JavaScript Nâng Cao",
//         "price": 2000,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/12.png",
//         "description": "Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ..."
//       },
//       {
//         "courseId": 6,
//         "userId": 4,
//         "courseName": "Làm việc với Terminal & Ubuntu",
//         "price": 0,
//         "img": "https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png",
//         "description": "Sở hữu một Terminal hiện đại, mạnh mẽ trong tùy biến và học cách làm việc với Ubuntu là một bước quan trọng trên con đường trở thành một Web Developer"
//       }
//     ]

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadCourse();
            //     console.log(result);
            setCourses(result);
        };
        fetchApi();
    }, []);

    return (
        <div>
            <div className={cx('heading')}>
                <h2>All courses</h2>
            </div>
            <session className={cx('wrapper')}>
                {courses &&
                    courses.map((course, index) => {
                        return (
                            <>
                                <CourseItem key={index} course={course} />
                                {/* <h2>{course.title}</h2> */}
                            </>
                        );
                    })}
            </session>
        </div>
    );
}

export default Courses;
