import axios from '../utils/axios';

const getUsersService = (option) => {
    return axios.post(`/api/get-users`, option);
}

const getUserDetailService = (id) => {
    return axios.get(`/api/get-user-detail?id=${id}`);
}
const editUserService = (data) => {
    return axios.put(`/api/edit-user`, data);
}
const followUserService = (data) => {
    return axios.post(`/api/follow-user`, data);
}
const getFollowsService = () => {
    return axios.get(`/api/get-follows`);
}
export {
    getUsersService,
    getUserDetailService,
    editUserService,
    followUserService,
    getFollowsService
}