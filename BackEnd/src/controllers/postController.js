const postService = require('../services/postService.js');
let createPost = async (req, res) => {
    let data = req.body;
    if (!data.userId || !data.topic || !data.privacy) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing require parameters',
        })
    }
    try {
        let response = await postService.createPostService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let getPosts = async (req, res) => {
    let data = req.body;
    if (!data.limit) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing parameters'
        })
    }
    try {
        let response = await postService.getPostsService(data);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let deletePost = async (req, res) => {
    try {
        let response = await postService.deletePostService(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}

let commentPost = async (req, res) => {
    try {
        let response = await postService.commentPostService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let getComments = async (req, res) => {
    try {
        let response = await postService.getCommentsService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let likePost = async (req, res) => {
    try {
        let response = await postService.likePostService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let getPostDetail = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing parameters'
        })
    }
    try {
        let response = await postService.getPostDetailService(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let editPost = async (req, res) => {
    let data = req.body;
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing parameters'
        })
    }
    try {
        let response = await postService.editPostService(data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
module.exports = {
    createPost,
    getPosts,
    deletePost,
    commentPost,
    getComments,
    likePost,
    getPostDetail,
    editPost
}