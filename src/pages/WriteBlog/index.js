import Button from '~/components/Button';
import * as postServices from '~/apiServices/postServices';
function WriteBlog() {
    let user = 5;
    let course = 4;

    const handleClick = () => {
        const date = new Date();
        const fetchApi = async () => {
            const result = await postServices.postEnrollment({
                userId: '6',
                courseId: '6',
                datetime: '2023-02-08',
                status: 'Is Learning',
            });
        };
        fetchApi();
    };
    return (
        <>
            <h2>Write Blog Page</h2>

            <Button primary onClick={handleClick}>
                Create Enrollment
            </Button>
        </>
    );
}
export default WriteBlog;
