'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





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



































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
|--------------------------------------------------
|  CreateClassName
|--------------------------------------------------
*/

var getDefaultClassName = function getDefaultClassName(defaultClassName, componentProps) {
  var className = '';
  if (componentProps.className) {
    className = componentProps.className;
    delete componentProps.className;
  }

  return (defaultClassName.trim() + ' ' + className).trim();
};
// { className = '', props = [], keepComponentProps = false }

var createClassName = function createClassName() {
  var foo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var foo2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var foo3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var className = '',
      props = [],
      keepComponentProps = false;
  if (typeof foo === 'string') {
    className = foo;
    props = foo2;
    keepComponentProps = foo3;
  } else {
    className = foo.className;
    props = foo.props;
    keepComponentProps = foo.keepComponentProps;
  }

  return function () {
    var componentProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var immutableProps = Object.assign({}, componentProps);
    var overrideDefault = false;

    var getClassName = function getClassName(name, className) {
      if (!componentProps[name]) return '';
      if (!className) className = name;
      if (!keepComponentProps) delete componentProps[name];

      return typeof className === 'function' ? className(immutableProps) : className;
    };

    var destructingString = function destructingString(n) {
      var _n$split = n.split(':'),
          _n$split2 = slicedToArray(_n$split, 3),
          name = _n$split2[0],
          className = _n$split2[1],
          overrideDefault = _n$split2[2];

      if (!name) throw new Error('TypeError: format props invalid');
      console.log(overrideDefault == 'override');
      return { name: name, className: className ? className : name, overrideDefault: overrideDefault == 'override' };
    };

    if (typeof className != 'string' || (typeof componentProps === 'undefined' ? 'undefined' : _typeof(componentProps)) != 'object' || !Array.isArray(props)) throw new Error('TypeError: invalid arguments types');

    var classN = props.reduce(function (previous, current, index) {
      if (typeof current === 'string') current = destructingString(current);

      if (!overrideDefault) {
        console.log('if', current.overrideDefault);
        overrideDefault = current.overrideDefault === true;
        console.log('if 2', overrideDefault);
      }

      if (typeof current.name === 'string' && componentProps[current.name]) {
        return previous + ' ' + getClassName(current.name, current.className);
      } else if (typeof current.name === 'function' && current.name(immutableProps) === true) {
        return previous + ' ' + getClassName(current.name(immutableProps), current.className);
      }

      return previous;
    }, '');

    if (!overrideDefault) classN = className + ' ' + classN;

    return getDefaultClassName(classN, componentProps);
  };
};

exports.createClassName = createClassName;
