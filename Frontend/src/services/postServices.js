import axios from '../utils/axios';

const createPostService = (data) => {
    return axios.post(`/api/create-post`, data);
}
const getPostsService = (data) => {
    return axios.post(`/api/get-posts`, data);
}
const deletePostService = (id) => {
    return axios.delete(`/api/delete-post?id=${id}`);
}

const commentPostService = (data) => {
    return axios.post(`/api/comment-post`, data);
}
const getCommentsService = (data) => {
    return axios.post(`/api/get-comments`, data);
}
const likePostService = (data) => {
    return axios.post(`/api/like-post`, data);
}
const getPostDetailService = (id) => {
    return axios.get(`/api/get-post-detail?id=${id}`);
}
const editPostService = (data) => {
    return axios.put(`/api/edit-post`, data);
}
export {
    createPostService,
    getPostsService,
    deletePostService,
    commentPostService,
    getCommentsService,
    likePostService,
    getPostDetailService,
    editPostService
}