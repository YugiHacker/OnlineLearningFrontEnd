import * as request from '~/utils/request';

export const postEnrollment = async (options) => {
    try {
        const res = await request.post('Transaction/create', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const postLesson = async (options) => {
    try {
        const res = await request.post('Material', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};
