(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash'), require('mobx-state-tree')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash', 'mobx-state-tree'], factory) :
	(factory((global['trampss-mst-onaction'] = {}),global.lodash,global.mobxStateTree));
}(this, (function (exports,lodash,mobxStateTree) { 'use strict';

var take = function take(match, callback) {
  return function (action, tree) {
    var isMatching = false || lodash.isString(match) && match === action.fullpath || lodash.isFunction(match) && match(action, tree) || lodash.isRegExp(match) && action.fullpath.match(match);

    if (isMatching) return callback(action, tree);
    return false;
  };
};

var ended = function ended(match, callback) {
  return function (action, tree) {
    if (action.ended) return take(match, callback)(action, tree);
    return false;
  };
};

take.ended = ended;

// eslint-disable-next-line import/prefer-default-export

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var getAction = function getAction(call) {
  var name = call.name,
      type = call.type,
      context = call.context,
      args = call.args;


  var path = mobxStateTree.getPath(context);
  var fullpath = path + '/' + name;

  var action = {
    fullpath: fullpath,
    path: path,
    name: name,
    args: args
  };

  switch (type) {
    case 'process_return':
      return _extends({}, action, { ended: true });
    case 'action':
      return action;
    default:
      return undefined;
  }
};

var middleware = (function (dispatch) {
  return function (call, next) {
    var action = getAction(call);

    if (action) {
      var runner = dispatch();
      var step = { done: false };

      while (!step.done) {
        step = runner.next();
        if (!step.done) step.value(action, call.tree);
      }
    }

    return next(call);
  };
});

exports['default'] = middleware;
exports.take = take;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
