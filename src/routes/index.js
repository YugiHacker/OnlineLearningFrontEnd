// Layouts
import { HeaderOnly } from '~/components/Layout';
// Pages
import Home from '~/pages/Home';
import Courses from '~/pages/Courses';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Chapters from '~/pages/Materials/Chapters';
import EditLession from '~/pages/Materials/EditLession';
import InsertLession from '~/pages/Materials/InsertLession';
import EditQuestion from '~/pages/Materials/EditQuestion';
import EditChapter from '~/pages/Materials/EditChapter';
import EditAssignment from '~/pages/Materials/EditAssignment';
import ViewAssignment from '~/pages/Materials/ViewAssignment';
import ViewLession from '~/pages/Materials/ViewLession';
import WriteBlog from '~/pages/WriteBlog';
import CourseDetail from '~/pages/CourseDetail';
import Learn from '~/pages/Learn';
import MyCourses from '~/pages/MyCourses';
import Transaction from '~/pages/Transaction';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/courses', component: Courses },
    { path: '@/:parameter', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/live', component: Live },
    { path: '/chapters', component: Chapters },
    { path: '/chapters/:id', component: EditChapter },
    { path: '/chapters/Lession/:id', component: EditLession },
    { path: '/chapters/ViewLession/:id', component: ViewLession },
    { path: '/chapters/Assignment/:id', component: EditAssignment },
    { path: '/chapters/ViewAssignment/:id', component: ViewAssignment },
    { path: '/chapters/Assignment/Question/:id', component: EditQuestion },
    { path: '/new-post', component: WriteBlog },
    { path: '/course/:courseId', component: CourseDetail },
    { path: '/learn/:courseId', component: Learn, layout: HeaderOnly },
    { path: '/my-courses', component: MyCourses },
    { path: '/transaction', component: Transaction },
    { path: '/insertLession/:chapterId', component: InsertLession },
    { path: '/login', component: Login},
    { path: '/signup', component: Signup}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
