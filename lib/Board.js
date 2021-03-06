'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _color = require('./helpers/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var WIDTH = 200;
var HEIGHT = 150;

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onBoardMouseDown = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      _this.pointMoveTo({
        x: x,
        y: y
      });
      _this.dragListener = (0, _addEventListener2["default"])(window, 'mousemove', _this.onBoardDrag);
      _this.dragUpListener = (0, _addEventListener2["default"])(window, 'mouseup', _this.onBoardDragEnd);
    };

    _this.onBoardTouchStart = function (e) {
      if (e.touches.length !== 1) {
        return;
      }

      var x = e.targetTouches[0].clientX;
      var y = e.targetTouches[0].clientY;
      _this.pointMoveTo({
        x: x,
        y: y
      });
      _this.touchMoveListener = (0, _addEventListener2["default"])(window, 'touchmove', _this.onBoardTouchMove);
      _this.touchEndListener = (0, _addEventListener2["default"])(window, 'touchend', _this.onBoardTouchEnd);
    };

    _this.onBoardTouchMove = function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      var x = e.targetTouches[0].clientX;
      var y = e.targetTouches[0].clientY;
      _this.pointMoveTo({
        x: x,
        y: y
      });
    };

    _this.onBoardTouchEnd = function () {
      _this.removeTouchListeners();
    };

    _this.onBoardDrag = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      _this.pointMoveTo({
        x: x,
        y: y
      });
    };

    _this.onBoardDragEnd = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      _this.pointMoveTo({
        x: x,
        y: y
      });
      _this.removeListeners();
    };

    _this.getPrefixCls = function () {
      return _this.props.rootPrefixCls + '-board';
    };

    _this.removeTouchListeners = function () {
      if (_this.touchMoveListener) {
        _this.touchMoveListener.remove();
        _this.touchMoveListener = null;
      }
      if (_this.touchEndListener) {
        _this.touchEndListener.remove();
        _this.touchEndListener = null;
      }
    };

    _this.removeListeners = function () {
      if (_this.dragListener) {
        _this.dragListener.remove();
        _this.dragListener = null;
      }
      if (_this.dragUpListener) {
        _this.dragUpListener.remove();
        _this.dragUpListener = null;
      }
    };

    _this.pointMoveTo = function (pos) {
      var rect = _reactDom2["default"].findDOMNode(_this).getBoundingClientRect();
      var left = pos.x - rect.left;
      var top = pos.y - rect.top;

      var rWidth = rect.width || WIDTH;
      var rHeight = rect.height || HEIGHT;

      left = Math.max(0, left);
      left = Math.min(left, rWidth);
      top = Math.max(0, top);
      top = Math.min(top, rHeight);

      var color = _this.props.color;


      color.saturation = left / rWidth;
      color.lightness = 1 - top / rHeight;

      _this.props.onChange(color);
    };

    return _this;
  }

  Board.prototype.componentWillUnmount = function componentWillUnmount() {
    this.removeListeners();
    this.removeTouchListeners();
  };

  /**
   * 移动光标位置到
   * @param  {object} pos X Y 全局坐标点
   */


  Board.prototype.render = function render() {
    var prefixCls = this.getPrefixCls();
    var color = this.props.color;

    var hueHsv = {
      h: color.hue,
      s: 1,
      v: 1
    };

    var hueColor = new _color2["default"](hueHsv).toHexString();

    var xRel = color.saturation * 100;
    var yRel = (1 - color.lightness) * 100;

    return _react2["default"].createElement(
      'div',
      { className: prefixCls },
      _react2["default"].createElement(
        'div',
        { className: prefixCls + '-hsv', style: { backgroundColor: hueColor } },
        _react2["default"].createElement('div', { className: prefixCls + '-value' }),
        _react2["default"].createElement('div', { className: prefixCls + '-saturation' })
      ),
      _react2["default"].createElement('span', { style: { left: xRel + '%', top: yRel + '%' } }),
      _react2["default"].createElement('div', {
        className: prefixCls + '-handler',
        onMouseDown: this.onBoardMouseDown,
        onTouchStart: this.onBoardTouchStart
      })
    );
  };

  return Board;
}(_react2["default"].Component);

/**
 * hsv
 * h: range(0, 359)
 * s: range(0, 1)
 * v: range(0, 1)
 */

exports["default"] = Board;
Board.propTypes = {
  color: _propTypes2["default"].object,
  onChange: _propTypes2["default"].func,
  rootPrefixCls: _propTypes2["default"].string
};
module.exports = exports['default'];