import express from "express";
import userController from '../controllers/userController.js';
import postController from '../controllers/postController.js';
import appController from '../controllers/appController.js';
let router = express.Router();
let initWebRoutes = (app) => {
    //Login
    router.post('/api/login', appController.handleLogin);
    router.post('/api/send-email', appController.handleSendEmail);
    router.post('/api/check-exists-email', appController.checkExistsEmail);
    router.post('/api/login-social', appController.handleLoginSocial);
    //api all code
    router.post('/api/get-allcode', appController.getAllCode);
    //api user
    router.post('/api/get-users', userController.getUsers);
    router.post('/api/create-user', userController.createUser);
    router.delete('/api/delete-user', userController.deleteUser);
    router.get('/api/get-user-detail', userController.getUserDetail);
    router.put('/api/edit-user', userController.editUser);

    //api posts
    router.post('/api/create-post', postController.createPost);
    router.post('/api/get-posts', postController.getPosts);
    router.delete('/api/delete-post', postController.deletePost);
    router.get('/api/get-post-detail', postController.getPostDetail);
    router.put('/api/edit-post', postController.editPost);
    //comment and like
    router.post('/api/comment-post', postController.commentPost);
    router.post('/api/get-comments', postController.getComments);
    router.post('/api/like-post', postController.likePost);

    //follow
    router.post('/api/follow-user', userController.followUser);
    router.get('/api/get-follows', userController.getFollows);

    //search
    router.post('/api/search', appController.searchData);
    return app.use("/", router)
}

module.exports = initWebRoutes;
