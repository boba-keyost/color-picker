'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _placements = require('./placements');

var _placements2 = _interopRequireDefault(_placements);

var _color = require('./helpers/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function refFn(field, component) {
  this[field] = component;
}

function prevent(e) {
  e.preventDefault();
}

var ColorPicker = function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var alpha = typeof props.alpha === 'undefined' ? props.defaultAlpha : Math.min(props.alpha, props.defaultAlpha);

    _this.state = {
      color: props.color || props.defaultColor,
      alpha: alpha,
      open: false
    };

    var events = ['onTriggerClick', 'onChange', 'onBlur', 'getPickerElement', 'getRootDOMNode', 'getTriggerDOMNode', 'onVisibleChange', 'onPanelMount', 'setOpen', 'open', 'close', 'focus'];

    events.forEach(function (e) {
      _this[e] = _this[e].bind(_this);
    });

    _this.saveTriggerRef = refFn.bind(_this, 'triggerInstance');
    return _this;
  }

  ColorPicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      this.setState({
        color: nextProps.color
      });
    }
    if (nextProps.alpha !== null && nextProps.alpha !== undefined) {
      this.setState({
        alpha: nextProps.alpha
      });
    }
  };

  ColorPicker.prototype.onTriggerClick = function onTriggerClick() {
    this.setState({
      open: !this.state.open
    });
  };

  ColorPicker.prototype.onChange = function onChange(colors) {
    var _this2 = this;

    this.setState(_extends({}, colors), function () {
      _this2.props.onChange(_this2.state);
    });
  };

  ColorPicker.prototype.onBlur = function onBlur() {
    this.setOpen(false);
  };

  ColorPicker.prototype.onVisibleChange = function onVisibleChange(open) {
    this.setOpen(open);
  };

  ColorPicker.prototype.onPanelMount = function onPanelMount(panelDOMRef) {
    if (this.state.open) {
      panelDOMRef.focus();
    }
  };

  ColorPicker.prototype.setOpen = function setOpen(open, callback) {
    var _this3 = this;

    if (this.state.open !== open) {
      this.setState({
        open: open
      }, function () {
        if (typeof callback === 'function') callback();
        var _props = _this3.props,
            onOpen = _props.onOpen,
            onClose = _props.onClose;

        if (_this3.state.open) {
          onOpen(_this3.state);
        } else {
          onClose(_this3.state);
        }
        _this3.props.onChange(_this3.state);
      });
    }
  };

  ColorPicker.prototype.getRootDOMNode = function getRootDOMNode() {
    return (0, _reactDom.findDOMNode)(this);
  };

  ColorPicker.prototype.getTriggerDOMNode = function getTriggerDOMNode() {
    return (0, _reactDom.findDOMNode)(this.triggerInstance);
  };

  ColorPicker.prototype.getPickerElement = function getPickerElement() {
    // const state = this.state;
    return _react2["default"].createElement(_Panel2["default"], {
      onMount: this.onPanelMount,
      defaultColor: this.state.color,
      alpha: this.state.alpha,
      enableAlpha: this.props.enableAlpha,
      prefixCls: this.props.prefixCls + '-panel',
      onChange: this.onChange,
      onBlur: this.onBlur,
      mode: this.props.mode,
      className: this.props.className
    });
  };

  ColorPicker.prototype.open = function open(callback) {
    this.setOpen(true, callback);
  };

  ColorPicker.prototype.close = function close(callback) {
    this.setOpen(false, callback);
  };

  ColorPicker.prototype.focus = function focus() {
    if (!this.state.open) {
      (0, _reactDom.findDOMNode)(this).focus();
    }
  };

  ColorPicker.prototype.render = function render() {
    var props = this.props;
    var state = this.state;
    var classes = [props.prefixCls + '-wrap', props.className];
    if (state.open) {
      classes.push(props.prefixCls + '-open');
    }

    var children = props.children;

    var _RGB = _slicedToArray(new _color2["default"](this.state.color).RGB, 3),
        r = _RGB[0],
        g = _RGB[1],
        b = _RGB[2];

    var RGBA = [r, g, b];

    RGBA.push(this.state.alpha / 100);

    if (children) {
      children = _react2["default"].cloneElement(children, {
        ref: this.saveTriggerRef,
        unselectable: 'unselectable',
        style: {
          backgroundColor: 'rgba(' + RGBA.join(',') + ')'
        },
        onClick: this.onTriggerClick,
        onMouseDown: prevent
      });
    }

    var prefixCls = props.prefixCls,
        placement = props.placement,
        style = props.style,
        getCalendarContainer = props.getCalendarContainer,
        align = props.align,
        animation = props.animation,
        disabled = props.disabled,
        transitionName = props.transitionName;


    return _react2["default"].createElement(
      'div',
      { className: classes.join(' ') },
      _react2["default"].createElement(
        _rcTrigger2["default"],
        {
          popup: this.getPickerElement(),
          popupAlign: align,
          builtinPlacements: _placements2["default"],
          popupPlacement: placement,
          action: disabled ? [] : ['click'],
          destroyPopupOnHide: true,
          getPopupContainer: getCalendarContainer,
          popupStyle: style,
          popupAnimation: animation,
          popupTransitionName: transitionName,
          popupVisible: state.open,
          onPopupVisibleChange: this.onVisibleChange,
          prefixCls: prefixCls
        },
        children
      )
    );
  };

  return ColorPicker;
}(_react2["default"].Component);

exports["default"] = ColorPicker;


ColorPicker.propTypes = {
  defaultColor: _propTypes2["default"].string,
  defaultAlpha: _propTypes2["default"].number,
  // can custom
  alpha: _propTypes2["default"].number,
  children: _propTypes2["default"].node.isRequired,
  className: _propTypes2["default"].string,
  color: _propTypes2["default"].string,
  enableAlpha: _propTypes2["default"].bool,
  mode: _propTypes2["default"].oneOf(['RGB', 'HSL', 'HSB']),
  onChange: _propTypes2["default"].func,
  onClose: _propTypes2["default"].func,
  onOpen: _propTypes2["default"].func,
  placement: _propTypes2["default"].oneOf(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  prefixCls: _propTypes2["default"].string.isRequired,
  style: _propTypes2["default"].object
};

ColorPicker.defaultProps = {
  defaultColor: '#F00',
  defaultAlpha: 100,
  onChange: function onChange() {},
  onOpen: function onOpen() {},
  onClose: function onClose() {},

  children: _react2["default"].createElement('span', { className: 'rc-color-picker-trigger' }),
  className: '',
  enableAlpha: true,
  placement: 'topLeft',
  prefixCls: 'rc-color-picker',
  style: {}
};
module.exports = exports['default'];