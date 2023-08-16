"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController.js"));
var _postController = _interopRequireDefault(require("../controllers/postController.js"));
var _appController = _interopRequireDefault(require("../controllers/appController.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  //Login
  router.post('/api/login', _appController["default"].handleLogin);
  router.post('/api/send-email', _appController["default"].handleSendEmail);
  router.post('/api/check-exists-email', _appController["default"].checkExistsEmail);
  router.post('/api/login-social', _appController["default"].handleLoginSocial);
  //api all code
  router.post('/api/get-allcode', _appController["default"].getAllCode);
  //api user
  router.post('/api/get-users', _userController["default"].getUsers);
  router.post('/api/create-user', _userController["default"].createUser);
  router["delete"]('/api/delete-user', _userController["default"].deleteUser);
  router.get('/api/get-user-detail', _userController["default"].getUserDetail);
  router.put('/api/edit-user', _userController["default"].editUser);

  //api posts
  router.post('/api/create-post', _postController["default"].createPost);
  router.post('/api/get-posts', _postController["default"].getPosts);
  router["delete"]('/api/delete-post', _postController["default"].deletePost);
  router.get('/api/get-post-detail', _postController["default"].getPostDetail);
  router.put('/api/edit-post', _postController["default"].editPost);
  //comment and like
  router.post('/api/comment-post', _postController["default"].commentPost);
  router.post('/api/get-comments', _postController["default"].getComments);
  router.post('/api/like-post', _postController["default"].likePost);

  //follow
  router.post('/api/follow-user', _userController["default"].followUser);
  router.get('/api/get-follows', _userController["default"].getFollows);

  //search
  router.post('/api/search', _appController["default"].searchData);
  return app.use("/", router);
};
module.exports = initWebRoutes;