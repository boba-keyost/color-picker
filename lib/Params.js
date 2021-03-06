'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color = require('./helpers/color');

var _color2 = _interopRequireDefault(_color);

var _percentage = require('./helpers/percentage');

var _percentage2 = _interopRequireDefault(_percentage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var modesMap = ['RGB', 'HSB'];

var Params = function (_React$Component) {
  _inherits(Params, _React$Component);

  function Params(props) {
    _classCallCheck(this, Params);

    // 管理 input 的状态
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getChannelInRange = function (value, index) {
      var channelMap = {
        RGB: [[0, 255], [0, 255], [0, 255]],
        HSB: [[0, 359], [0, 100], [0, 100]]
      };
      var mode = _this.state.mode;
      var range = channelMap[mode][index];
      var result = parseInt(value, 10);
      if (isNaN(result)) {
        result = 0;
      }
      result = Math.max(range[0], result);
      result = Math.min(result, range[1]);
      return result;
    };

    _this.getPrefixCls = function () {
      return _this.props.rootPrefixCls + '-params';
    };

    _this.handleHexHandler = function (event) {
      var hex = event.target.value;
      var color = null;

      if (_color2["default"].isValidHex(hex)) {
        color = new _color2["default"](hex);
      }

      if (color !== null) {
        _this.setState({
          color: color,
          hex: hex
        });
        _this.props.onChange(color, false);
      } else {
        _this.setState({
          hex: hex
        });
      }
    };

    _this.handleModeChange = function () {
      var mode = _this.state.mode;

      var modeIndex = (modesMap.indexOf(mode) + 1) % modesMap.length;

      mode = modesMap[modeIndex];

      _this.setState({
        mode: mode
      });
    };

    _this.handleAlphaHandler = function (event) {
      var alpha = parseInt(event.target.value, 10);
      if (isNaN(alpha)) {
        alpha = 0;
      }
      alpha = Math.max(0, alpha);
      alpha = Math.min(alpha, 100);

      _this.props.onAlphaChange(alpha / 100);
    };

    _this.updateColorByChanel = function (channel, value) {
      var color = _this.props.color;
      var mode = _this.state.mode;


      if (mode === 'HSB') {
        if (channel === 'H') {
          color.hue = parseInt(value, 10);
        } else if (channel === 'S') {
          color.saturation = parseInt(value, 10) / 100;
        } else if (channel === 'B') {
          color.lightness = parseInt(value, 10) / 100;
        }
      } else {
        if (channel === 'R') {
          color.red = parseInt(value, 10);
        } else if (channel === 'G') {
          color.green = parseInt(value, 10);
        } else if (channel === 'B') {
          color.blue = parseInt(value, 10);
        }
      }

      return color;
    };

    _this.handleColorChannelChange = function (index, event) {
      var value = _this.getChannelInRange(event.target.value, index);
      var mode = _this.state.mode;

      var channel = mode[index];

      var color = _this.updateColorByChanel(channel, value);

      _this.setState({
        hex: color.hex,
        color: color
      }, function () {
        _this.props.onChange(color, false);
      });
    };

    _this.state = {
      mode: props.mode,
      hex: props.color.hex,
      color: props.color // instanceof tinycolor
    };
    return _this;
  }

  Params.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextColor = nextProps.color;


    this.setState({
      color: nextColor,
      hex: nextColor.hex
    });
  };

  Params.prototype.render = function render() {
    var _cx;

    var prefixCls = this.getPrefixCls();

    var enableAlpha = this.props.enableAlpha;
    var _state = this.state,
        mode = _state.mode,
        color = _state.color;

    var colorChannel = color[mode];

    if (mode === 'HSB') {
      colorChannel[0] = parseInt(colorChannel[0], 10);
      colorChannel[1] = (0, _percentage2["default"])(colorChannel[1]);
      colorChannel[2] = (0, _percentage2["default"])(colorChannel[2]);
    }

    var paramsClasses = (0, _classnames2["default"])((_cx = {}, _defineProperty(_cx, prefixCls, true), _defineProperty(_cx, prefixCls + '-has-alpha', enableAlpha), _cx));

    return _react2["default"].createElement(
      'div',
      { className: paramsClasses },
      _react2["default"].createElement(
        'div',
        { className: prefixCls + '-input' },
        _react2["default"].createElement('input', {
          className: prefixCls + '-hex',
          type: 'text',
          maxLength: '6',
          onChange: this.handleHexHandler,
          value: this.state.hex.toUpperCase()
        }),
        _react2["default"].createElement('input', {
          type: 'number',
          ref: 'channel_0',
          value: colorChannel[0],
          onChange: this.handleColorChannelChange.bind(null, 0)
        }),
        _react2["default"].createElement('input', {
          type: 'number',
          ref: 'channel_1',
          value: colorChannel[1],
          onChange: this.handleColorChannelChange.bind(null, 1)
        }),
        _react2["default"].createElement('input', {
          type: 'number',
          ref: 'channel_2',
          value: colorChannel[2],
          onChange: this.handleColorChannelChange.bind(null, 2)
        }),
        enableAlpha && _react2["default"].createElement('input', {
          type: 'number',
          value: Math.round(this.props.alpha),
          onChange: this.handleAlphaHandler
        })
      ),
      _react2["default"].createElement(
        'div',
        { className: prefixCls + '-lable' },
        _react2["default"].createElement(
          'label',
          { className: prefixCls + '-lable-hex' },
          'Hex'
        ),
        _react2["default"].createElement(
          'label',
          { className: prefixCls + '-lable-number', onClick: this.handleModeChange },
          mode[0]
        ),
        _react2["default"].createElement(
          'label',
          { className: prefixCls + '-lable-number', onClick: this.handleModeChange },
          mode[1]
        ),
        _react2["default"].createElement(
          'label',
          { className: prefixCls + '-lable-number', onClick: this.handleModeChange },
          mode[2]
        ),
        enableAlpha && _react2["default"].createElement(
          'label',
          { className: prefixCls + '-lable-alpha' },
          'A'
        )
      )
    );
  };

  return Params;
}(_react2["default"].Component);

exports["default"] = Params;


Params.propTypes = {
  alpha: _propTypes2["default"].number,
  enableAlpha: _propTypes2["default"].bool,
  color: _propTypes2["default"].object.isRequired,
  mode: _propTypes2["default"].oneOf(modesMap),
  onAlphaChange: _propTypes2["default"].func,
  onChange: _propTypes2["default"].func,
  rootPrefixCls: _propTypes2["default"].string
};

Params.defaultProps = {
  mode: modesMap[0],
  enableAlpha: true
};
module.exports = exports['default'];