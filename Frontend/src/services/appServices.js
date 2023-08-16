import axios from '../utils/axios';

const loginService = (email, password) => {
    return axios.post('/api/login', { email, password })
}
const loginSocialService = (data) => {
    return axios.post('/api/login-social', data)
}
const userSignUpService = (data) => {
    return axios.post(`/api/create-user`, data);
}
const sendEmailService = (data) => {
    return axios.post(`/api/send-email`, data);
}
const checkExistsEmailService = (email) => {
    return axios.post(`/api/check-exists-email`, email);
}
const searchService = (searchText) => {
    return axios.post(`/api/search`, searchText);
}
export {
    loginService,
    userSignUpService,
    sendEmailService,
    checkExistsEmailService,
    loginSocialService,
    searchService
}