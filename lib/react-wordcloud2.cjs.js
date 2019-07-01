'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var WordCloudJS = _interopDefault(require('wordcloud'));

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

var WordCloud =
  /*#__PURE__*/
  (function(_PureComponent) {
    _inherits(WordCloud, _PureComponent);

    function WordCloud() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WordCloud);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(WordCloud)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(_assertThisInitialized(_this), 'state', {
        responsiveHeight: null,
        responsiveWidth: null,
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'canvas',
        React.createRef()
      );

      _defineProperty(_assertThisInitialized(_this), '_unbind', []);

      return _this;
    }

    _createClass(WordCloud, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var dimensions = this.props.dimensions;

          if (dimensions === 'responsive') {
            var height = this.divElement.clientHeight;
            var width = this.divElement.clientWidth;
            this.setState({
              responsiveHeight: height,
              responsiveWidth: width,
            });
          } // first bind listeners

          this.bindEventListeners(); // only then draw

          this.renderWordCloud();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          // rebind listeners
          this.unbindEventListeners();
          this.bindEventListeners(); // redraw

          this.renderWordCloud();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.unbindEventListeners();
        },
      },
      {
        key: 'getOptions',
        value: function getOptions() {
          var _this$props = this.props,
            FallbackUI = _this$props.FallbackUI,
            onStart = _this$props.onStart,
            onWordDrawn = _this$props.onWordDrawn,
            onStop = _this$props.onStop,
            dimensions = _this$props.dimensions,
            options = _objectWithoutProperties(_this$props, [
              'FallbackUI',
              'onStart',
              'onWordDrawn',
              'onStop',
              'dimensions',
            ]);

          return options;
        },
      },
      {
        key: 'bindEventListeners',
        value: function bindEventListeners() {
          var _this2 = this;

          var _this$props2 = this.props,
            onWordDrawn = _this$props2.onWordDrawn,
            onStart = _this$props2.onStart,
            onStop = _this$props2.onStop;
          var canvas = this.canvas.current; // too early

          if (!canvas) return; // bind all handlers

          [
            ['wordcloudstart', onStart],
            ['wordclouddrawn', onWordDrawn],
            ['wordcloudstop', onStop],
          ].forEach(function(_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              event = _ref2[0],
              handler = _ref2[1];

            if (!handler) return;
            canvas.addEventListener(event, handler);

            _this2._unbind.push(function() {
              canvas.removeEventListener(event, handler);
            });
          });
        },
      },
      {
        key: 'unbindEventListeners',
        value: function unbindEventListeners() {
          var current = this.canvas.current;

          if (current) {
            this._unbind.forEach(function(handler) {
              return handler();
            });
          }

          this._unbind = [];
        },
      },
      {
        key: 'renderWordCloud',
        value: function renderWordCloud() {
          var dimensions = this.props.dimensions;
          var responsiveHeight = this.state.responsiveHeight;

          if (
            WordCloudJS.isSupported &&
            (_typeof(dimensions) === 'object' || responsiveHeight !== null)
          ) {
            var options = this.getOptions();
            WordCloudJS(this.canvas.current, options);
          }
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this3 = this;

          if (WordCloudJS.isSupported) {
            var _this$props3 = this.props,
              dimensions = _this$props3.dimensions,
              Cmp = _this$props3.component;
            var _this$state = this.state,
              responsiveHeight = _this$state.responsiveHeight,
              responsiveWidth = _this$state.responsiveWidth;
            var cmpStyle = {};
            var wordcloud;

            if (_typeof(dimensions) === 'object') {
              cmpStyle = dimensions;
            } else if (responsiveHeight !== null) {
              cmpStyle = {
                width: responsiveWidth,
                height: responsiveHeight,
              };
            }

            if (_typeof(dimensions) === 'object' || responsiveHeight !== null) {
              wordcloud = React__default.createElement(Cmp, {
                ref: this.canvas,
                style: cmpStyle,
                width: cmpStyle.width,
                height: cmpStyle.height,
              });
            }

            return React__default.createElement(
              'div',
              {
                ref: function ref(divElement) {
                  _this3.divElement = divElement;
                },
                style: {
                  height: '100%',
                  width: '100%',
                },
              },
              wordcloud
            );
          }

          return this.props.FallbackUI;
        },
      },
    ]);

    return WordCloud;
  })(React.PureComponent);

_defineProperty(WordCloud, 'propTypes', {
  FallbackUI: PropTypes.element,
  dimensions: PropTypes.oneOfType([
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    PropTypes.oneOf(['responsive']).isRequired,
  ]).isRequired,
  component: PropTypes.string,
  // WordCloudJS options
  list: PropTypes.arrayOf(function(
    props,
    key,
    componentName,
    location,
    propFullName
  ) {
    var value = props[key];

    if (!value || !Array.isArray(value)) {
      return new Error(
        'Invalid property '
          .concat(propFullName, ' supplied to ')
          .concat(
            componentName,
            '. Expecting it to be an array of [string, number]. Got '
          )
          .concat(value, ' instead.')
      );
    }

    if (value.length !== 2) {
      return new Error(
        'Invalid property '
          .concat(propFullName, ' supplied to ')
          .concat(
            componentName,
            '. Expecting it to be an array of [string, number]. Got '
          )
          .concat(value, ' instead.')
      );
    }

    if (typeof value[0] !== 'string' || typeof value[1] !== 'number') {
      return new Error(
        'Invalid property '
          .concat(propFullName, ' supplied to ')
          .concat(
            componentName,
            '. Expecting it to be an array of [string, number]. Got ['
          )
          .concat(_typeof(value[0]), ', ')
          .concat(_typeof(value[1]), '] instead.')
      );
    }
  }),
  color: PropTypes.oneOfType([
    PropTypes.string, // CSS color
    PropTypes.object, // null to dissable color inlininig
    PropTypes.func,
  ]),
  shape: PropTypes.oneOfType([
    PropTypes.oneOf([
      'circle',
      'cardioid',
      'diamond',
      'square',
      'triangle',
      'triangle-forward',
      'triangle-upright',
      'pentagon',
      'star',
    ]),
    PropTypes.func,
  ]),
  ellipticity: PropTypes.number,
  minSize: PropTypes.number,
  // calculates initial font size
  weightFactor: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  // Dimension
  gridSize: PropTypes.number,
  origin: PropTypes.arrayOf(PropTypes.number),
  drawOutOfBound: PropTypes.bool,
  // callbacks
  onStart: PropTypes.func,
  onWordDrawn: PropTypes.func,
  onStop: PropTypes.func,
});

_defineProperty(WordCloud, 'defaultProps', {
  FallbackUI: React__default.createElement(
    'div',
    null,
    'Browser is not supported'
  ),
  component: 'canvas',
});

module.exports = WordCloud;
