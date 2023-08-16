"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var db = require('../models/index.js');
var bcrypt = require('bcryptjs');
var _require = require('sequelize'),
  Op = _require.Op;
var salt = bcrypt.genSaltSync(10);
var hashUserPassword = function hashUserPassword(password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resovle, reject) {
      var hashPassword;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return bcrypt.hashSync(password, salt);
          case 3:
            hashPassword = _context.sent;
            resovle(hashPassword);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var checkEmail = function checkEmail(userEmail) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.User.findOne({
              where: {
                email: userEmail
              }
            });
          case 3:
            user = _context2.sent;
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var createUserService = function createUserService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var check, hashPasswordFromBcrypt, response, resUser;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return checkEmail(data.email);
          case 3:
            check = _context3.sent;
            if (!check) {
              _context3.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              message: 'Your email is already exists. Please try another email!'
            });
            _context3.next = 18;
            break;
          case 8:
            _context3.next = 10;
            return hashUserPassword(data.password);
          case 10:
            hashPasswordFromBcrypt = _context3.sent;
            _context3.next = 13;
            return db.User.create({
              email: data.email,
              password: hashPasswordFromBcrypt,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              birth: data.birth,
              phoneNumber: data.phoneNumber,
              gender: data.gender,
              role: data.role,
              avatar: data.avatar,
              status: data.status
            });
          case 13:
            response = _context3.sent;
            _context3.next = 16;
            return db.User.findOne({
              where: {
                id: response.id
              },
              nest: true
            });
          case 16:
            resUser = _context3.sent;
            resolve({
              errCode: 0,
              message: 'OK',
              user: resUser
            });
          case 18:
            _context3.next = 23;
            break;
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 23:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 20]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getUsersSevice = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(option) {
    var limit;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          limit = option.limit;
          return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
              var users;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    users = null;
                    if (!(limit === 'All' || !limit || limit === 'all' || isNaN(limit))) {
                      _context4.next = 8;
                      break;
                    }
                    _context4.next = 5;
                    return db.User.findAll({
                      attributes: {
                        exclude: ['password']
                      },
                      order: [['createdAt', 'DESC']]
                    });
                  case 5:
                    users = _context4.sent;
                    _context4.next = 11;
                    break;
                  case 8:
                    _context4.next = 10;
                    return db.User.findAll({
                      offset: option.offset ? option.offset : 0,
                      limit: +limit,
                      where: option.userId ? {
                        id: _defineProperty({}, Op.ne, option.userId)
                      } : {},
                      attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'],
                      order: [['createdAt', 'DESC']]
                    });
                  case 10:
                    users = _context4.sent;
                  case 11:
                    resolve({
                      data: users,
                      errCode: 0,
                      message: 'OK'
                    });
                    _context4.next = 17;
                    break;
                  case 14:
                    _context4.prev = 14;
                    _context4.t0 = _context4["catch"](0);
                    reject(_context4.t0);
                  case 17:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[0, 14]]);
            }));
            return function (_x8, _x9) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUsersSevice(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteUserService = function deleteUserService(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return db.User.findOne({
              where: {
                id: userId
              },
              raw: false
            });
          case 3:
            user = _context6.sent;
            _context6.next = 6;
            return db.Comment.destroy({
              where: {
                userId: user.id
              }
            });
          case 6:
            _context6.next = 8;
            return db.Like.destroy({
              where: {
                userId: user.id
              }
            });
          case 8:
            _context6.next = 10;
            return db.Relationship.destroy({
              where: _defineProperty({}, Op.or, [{
                performerId: user.id
              }, {
                receiverId: user.id
              }])
            });
          case 10:
            if (user) {
              _context6.next = 14;
              break;
            }
            resolve({
              errCode: 2,
              message: "The user doesn't exists."
            });
            _context6.next = 17;
            break;
          case 14:
            _context6.next = 16;
            return user.destroy();
          case 16:
            resolve({
              errCode: 0,
              message: 'Delete user is succeed!',
              userId: userId
            });
          case 17:
            _context6.next = 22;
            break;
          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 22:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 19]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getUserDetailService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
              var user;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return db.User.findOne({
                      where: {
                        id: userId
                      },
                      include: [{
                        model: db.AllCode,
                        as: 'genderData',
                        attributes: ['valueEn', 'valueVi']
                      }],
                      raw: true,
                      nest: true
                    });
                  case 3:
                    user = _context7.sent;
                    resolve({
                      user: user ? user : {},
                      errCode: 0,
                      message: 'OK'
                    });
                    _context7.next = 10;
                    break;
                  case 7:
                    _context7.prev = 7;
                    _context7.t0 = _context7["catch"](0);
                    reject(_context7.t0);
                  case 10:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 7]]);
            }));
            return function (_x13, _x14) {
              return _ref8.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function getUserDetailService(_x12) {
    return _ref7.apply(this, arguments);
  };
}();
var editUserService = function editUserService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var user, resUser;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return db.User.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 3:
            user = _context9.sent;
            if (!user) {
              _context9.next = 23;
              break;
            }
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.phoneNumber = data.phoneNumber;
            user.address = data.address;
            user.gender = data.gender;
            user.facebook = data.facebook;
            user.youtube = data.youtube;
            user.twitter = data.twitter;
            data.birth ? user.birth = data.birth : '', user.profile = data.profile;
            if (data.avatar) {
              user.avatar = data.avatar;
            }
            _context9.next = 17;
            return user.save();
          case 17:
            _context9.next = 19;
            return db.User.findOne({
              where: {
                id: data.id
              }
            });
          case 19:
            resUser = _context9.sent;
            resolve({
              user: resUser,
              errCode: 0,
              message: 'Update user is success.'
            });
            _context9.next = 24;
            break;
          case 23:
            resolve({
              errCode: 1,
              message: 'User is not found'
            });
          case 24:
            _context9.next = 29;
            break;
          case 26:
            _context9.prev = 26;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 29:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 26]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var followExists = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
              var relate;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.prev = 0;
                    _context10.next = 3;
                    return db.Relationship.findOne({
                      where: {
                        performerId: data.performerId,
                        receiverId: data.receiverId
                      }
                    });
                  case 3:
                    relate = _context10.sent;
                    if (relate) {
                      resolve({
                        check: true,
                        idRelate: relate.id
                      });
                    } else {
                      resolve({
                        check: false
                      });
                    }
                    _context10.next = 10;
                    break;
                  case 7:
                    _context10.prev = 7;
                    _context10.t0 = _context10["catch"](0);
                    reject(_context10.t0);
                  case 10:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, null, [[0, 7]]);
            }));
            return function (_x18, _x19) {
              return _ref11.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function followExists(_x17) {
    return _ref10.apply(this, arguments);
  };
}();
var followUserService = function followUserService(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var res, response;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            if (!data.performerId || !data.receiverId) {
              resolve({
                errCode: 1,
                message: "Missing parameters"
              });
            }
            _context12.next = 4;
            return followExists(data);
          case 4:
            res = _context12.sent;
            response = {};
            if (!res.check) {
              _context12.next = 12;
              break;
            }
            _context12.next = 9;
            return db.Relationship.destroy({
              where: {
                performerId: data.performerId,
                receiverId: data.receiverId
              }
            });
          case 9:
            response = res.idRelate;
            _context12.next = 15;
            break;
          case 12:
            _context12.next = 14;
            return db.Relationship.create({
              performerId: data.performerId,
              receiverId: data.receiverId,
              action: 'follow'
            });
          case 14:
            response = _context12.sent;
          case 15:
            resolve({
              errCode: 0,
              message: 'OK',
              relate: response,
              check: res.check
            });
            _context12.next = 21;
            break;
          case 18:
            _context12.prev = 18;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 21:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 18]]);
    }));
    return function (_x20, _x21) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var getFollowsService = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
              var follows;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.prev = 0;
                    _context13.next = 3;
                    return db.Relationship.findAll();
                  case 3:
                    follows = _context13.sent;
                    resolve({
                      data: follows,
                      errCode: 0,
                      message: 'OK'
                    });
                    _context13.next = 10;
                    break;
                  case 7:
                    _context13.prev = 7;
                    _context13.t0 = _context13["catch"](0);
                    reject(_context13.t0);
                  case 10:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13, null, [[0, 7]]);
            }));
            return function (_x22, _x23) {
              return _ref14.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function getFollowsService() {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  createUserService: createUserService,
  getUsersSevice: getUsersSevice,
  deleteUserService: deleteUserService,
  getUserDetailService: getUserDetailService,
  editUserService: editUserService,
  followUserService: followUserService,
  getFollowsService: getFollowsService
};