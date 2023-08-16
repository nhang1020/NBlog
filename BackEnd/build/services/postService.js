"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getPostsService = function getPostsService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var posts, haveImages, images, likes;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].Post.findAll({
              order: [['createdAt', 'DESC']],
              offset: +data.offset,
              limit: +data.limit,
              where: data.userId ? {
                userId: data.userId
              } : {
                privacy: _defineProperty({}, _sequelize.Op.ne, 'P2')
              },
              include: [
              // { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
              {
                model: _index["default"].AllCode,
                as: 'privacyData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].User,
                as: 'userData',
                attributes: ['id', 'firstName', 'lastName', 'avatar', 'role']
              }],
              raw: true,
              nest: true
            });
          case 3:
            posts = _context.sent;
            haveImages = false;
            if (!(data.offset === 0)) {
              _context.next = 11;
              break;
            }
            _context.next = 8;
            return _index["default"].sequelize.query("SELECT PostFiles.*, Users.id as userId\n                FROM PostFiles\n                JOIN Posts ON PostFiles.postId = Posts.id\n                JOIN Users ON Users.id = Posts.userId\n                WHERE PostFiles.postId IN (SELECT Posts.id FROM Posts WHERE Users.id = Posts.userId)");
          case 8:
            _context.t0 = _context.sent;
            _context.next = 12;
            break;
          case 11:
            _context.t0 = [];
          case 12:
            images = _context.t0;
            images.length ? haveImages = true : false;
            _context.next = 16;
            return _index["default"].Like.findAll();
          case 16:
            likes = _context.sent;
            resolve({
              errCode: 0,
              data: posts,
              images: images[0],
              likes: likes,
              haveImages: haveImages
            });
            _context.next = 23;
            break;
          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](0);
            reject(_context.t1);
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 20]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var createPostService = function createPostService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var response, post, list, images, likes;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].Post.create({
              userId: data.userId,
              topic: data.topic,
              contents: data.contents,
              theme: data.theme,
              privacy: data.privacy
            });
          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return _index["default"].Post.findOne({
              where: {
                id: response.id
              },
              include: [{
                model: _index["default"].AllCode,
                as: 'privacyData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].User,
                as: 'userData',
                attributes: ['id', 'firstName', 'lastName', 'avatar', 'role']
              }],
              raw: true,
              nest: true
            });
          case 6:
            post = _context2.sent;
            if (!data.listImage) {
              _context2.next = 11;
              break;
            }
            list = data.listImage.map(function (item, index) {
              return {
                postId: post.id,
                image: item
              };
            });
            _context2.next = 11;
            return _index["default"].PostFile.bulkCreate(list);
          case 11:
            _context2.next = 13;
            return _index["default"].PostFile.findAll();
          case 13:
            images = _context2.sent;
            _context2.next = 16;
            return _index["default"].Like.findAll();
          case 16:
            likes = _context2.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              post: post ? post : {},
              images: images,
              likes: likes
            });
            _context2.next = 23;
            break;
          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 23:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 20]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var deletePostService = function deletePostService(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var post;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            if (!id) {
              resolve({
                errCode: 1,
                message: "Missing required parameter"
              });
            }
            _context3.next = 4;
            return _index["default"].Post.findOne({
              where: {
                id: id
              },
              raw: false
            });
          case 4:
            post = _context3.sent;
            if (post) {
              _context3.next = 9;
              break;
            }
            resolve({
              errCode: 2,
              message: "The post isn't exists."
            });
            _context3.next = 16;
            break;
          case 9:
            _context3.next = 11;
            return post.destroy();
          case 11:
            _context3.next = 13;
            return _index["default"].PostFile.destroy({
              where: {
                postId: id
              }
            });
          case 13:
            _context3.next = 15;
            return _index["default"].Comment.destroy({
              where: {
                postId: id
              }
            });
          case 15:
            resolve({
              id: post.id,
              errCode: 0,
              message: 'Delete post is success.'
            });
          case 16:
            _context3.next = 21;
            break;
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 21:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 18]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var commentPostService = function commentPostService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var response, comments;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _index["default"].Comment.create({
              postId: data.postId,
              userId: data.userId,
              content: data.content,
              parentComment: data.parentComment ? data.parentComment : null
            });
          case 3:
            response = _context4.sent;
            _context4.next = 6;
            return _index["default"].Comment.findOne({
              where: {
                id: response.id
              },
              order: [['createdAt', 'DESC']],
              include: [{
                model: _index["default"].User,
                as: 'userComment',
                attributes: ['id', 'firstName', 'lastName', 'avatar', 'role']
              }],
              raw: true,
              nest: true
            });
          case 6:
            comments = _context4.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              comment: comments
            });
            _context4.next = 13;
            break;
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 10]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getCommentsService = function getCommentsService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var comments;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            if (!data.postId) {
              resolve({
                errCode: 1,
                message: "Missing parameters"
              });
            }
            _context5.next = 4;
            return _index["default"].Comment.findAll({
              offset: 0,
              // limit: ,
              where: {
                postId: data.postId
              },
              order: [['createdAt', 'DESC']],
              include: [{
                model: _index["default"].User,
                as: 'userComment',
                attributes: ['id', 'firstName', 'lastName', 'avatar', 'role']
              }],
              raw: true,
              nest: true
            });
          case 4:
            comments = _context5.sent;
            resolve({
              errCode: 0,
              comments: comments
            });
            _context5.next = 11;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 8]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var likeExists = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
              var like;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.prev = 0;
                    _context6.next = 3;
                    return _index["default"].Like.findOne({
                      where: {
                        postId: data.postId,
                        userId: data.userId
                      }
                    });
                  case 3:
                    like = _context6.sent;
                    if (like) {
                      resolve({
                        check: true,
                        idComment: like.id
                      });
                    } else {
                      resolve({
                        check: false
                      });
                    }
                    _context6.next = 10;
                    break;
                  case 7:
                    _context6.prev = 7;
                    _context6.t0 = _context6["catch"](0);
                    reject(_context6.t0);
                  case 10:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[0, 7]]);
            }));
            return function (_x12, _x13) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function likeExists(_x11) {
    return _ref6.apply(this, arguments);
  };
}();
var likePostService = function likePostService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var res, response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (!data.postId || !data.userId) {
              resolve({
                errCode: 1,
                message: "Missing parameters"
              });
            }
            _context8.next = 4;
            return likeExists(data);
          case 4:
            res = _context8.sent;
            response = {};
            if (!res.check) {
              _context8.next = 12;
              break;
            }
            _context8.next = 9;
            return _index["default"].Like.destroy({
              where: {
                postId: data.postId,
                userId: data.userId
              }
            });
          case 9:
            response = res.idComment;
            _context8.next = 15;
            break;
          case 12:
            _context8.next = 14;
            return _index["default"].Like.create({
              postId: data.postId,
              userId: data.userId
            });
          case 14:
            response = _context8.sent;
          case 15:
            resolve({
              errCode: 0,
              message: 'OK',
              like: response,
              check: res.check
            });
            _context8.next = 21;
            break;
          case 18:
            _context8.prev = 18;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 21:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 18]]);
    }));
    return function (_x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getPostDetailService = function getPostDetailService(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var posts, images, likes;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _index["default"].Post.findOne({
              where: {
                id: id
              },
              include: [{
                model: _index["default"].AllCode,
                as: 'privacyData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].User,
                as: 'userData',
                attributes: ['id', 'firstName', 'lastName', 'avatar', 'role']
              }],
              raw: true,
              nest: true
            });
          case 3:
            posts = _context9.sent;
            if (!posts) {
              _context9.next = 14;
              break;
            }
            _context9.next = 7;
            return _index["default"].PostFile.findAll({
              where: {
                postId: posts.id
              }
            });
          case 7:
            images = _context9.sent;
            _context9.next = 10;
            return _index["default"].Like.findAll({
              where: {
                postId: posts.id
              }
            });
          case 10:
            likes = _context9.sent;
            resolve({
              errCode: 0,
              data: posts,
              images: images,
              likes: likes
            });
            _context9.next = 15;
            break;
          case 14:
            resolve({
              errCode: 0,
              data: {},
              images: [],
              likes: []
            });
          case 15:
            _context9.next = 20;
            break;
          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 20:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 17]]);
    }));
    return function (_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var editPostService = function editPostService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var post, resPost;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _index["default"].Post.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 3:
            post = _context10.sent;
            if (!post) {
              _context10.next = 15;
              break;
            }
            post.contents = data.contents;
            post.privacy = data.privacy;
            _context10.next = 9;
            return post.save();
          case 9:
            _context10.next = 11;
            return _index["default"].Post.findOne({
              where: {
                id: data.id
              }
            });
          case 11:
            resPost = _context10.sent;
            resolve({
              post: resPost,
              errCode: 0,
              message: 'Update post is success.'
            });
            _context10.next = 16;
            break;
          case 15:
            resolve({
              errCode: 1,
              message: 'Post is not found'
            });
          case 16:
            _context10.next = 21;
            break;
          case 18:
            _context10.prev = 18;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 21:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 18]]);
    }));
    return function (_x18, _x19) {
      return _ref10.apply(this, arguments);
    };
  }());
};
module.exports = {
  createPostService: createPostService,
  getPostsService: getPostsService,
  deletePostService: deletePostService,
  commentPostService: commentPostService,
  getCommentsService: getCommentsService,
  likePostService: likePostService,
  getPostDetailService: getPostDetailService,
  editPostService: editPostService
};