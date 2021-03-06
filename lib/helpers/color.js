'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
  function Color(input) {
    var _this = this;

    _classCallCheck(this, Color);

    this.initRgb = function () {
      var _color$toRgb = _this.color.toRgb(),
          r = _color$toRgb.r,
          g = _color$toRgb.g,
          b = _color$toRgb.b;

      _this.redValue = r;
      _this.greenValue = g;
      _this.blueValue = b;
    };

    this.initHsb = function () {
      var _color$toHsv = _this.color.toHsv(),
          h = _color$toHsv.h,
          s = _color$toHsv.s,
          v = _color$toHsv.v;

      _this.hueValue = h;
      _this.saturationValue = s;
      _this.lightnessValue = v;
    };

    this.toHexString = function () {
      return _this.color.toHexString();
    };

    this.toRgbString = function () {
      return _this.color.toRgbString();
    };

    this.color = (0, _tinycolor2["default"])(input);

    this.initRgb();
    this.initHsb();

    var initAlpha = input && input.alpha || this.color.toRgb().a;
    this.alphaValue = Math.min(1, initAlpha) * 100;
  }

  Color.isValidHex = function isValidHex(hex) {
    return (0, _tinycolor2["default"])(hex).isValid();
  };

  _createClass(Color, [{
    key: 'hex',
    get: function get() {
      return this.color.toHex();
    }

    // 色调

  }, {
    key: 'hue',
    set: function set(value) {
      this.color = (0, _tinycolor2["default"])({
        h: value,
        s: this.saturation,
        v: this.lightness
      });

      this.initRgb();
      this.hueValue = value;
    },
    get: function get() {
      return this.hueValue;
    }

    // 饱和度

  }, {
    key: 'saturation',
    set: function set(value) {
      this.color = (0, _tinycolor2["default"])({
        h: this.hue,
        s: value,
        v: this.lightness
      });

      this.initRgb();
      this.saturationValue = value;
    },
    get: function get() {
      return this.saturationValue;
    }

    // 亮度

  }, {
    key: 'lightness',
    set: function set(value) {
      this.color = (0, _tinycolor2["default"])({
        h: this.hue,
        s: this.saturation,
        v: value
      });

      this.initRgb();
      this.lightnessValue = value;
    },
    get: function get() {
      return this.lightnessValue;
    }

    // red

  }, {
    key: 'red',
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor2["default"])(_extends({}, rgb, {
        r: value
      }));

      this.initHsb();
      this.redValue = value;
    },
    get: function get() {
      return this.redValue;
    }

    // green

  }, {
    key: 'green',
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor2["default"])(_extends({}, rgb, {
        g: value
      }));

      this.initHsb();
      this.greenValue = value;
    },
    get: function get() {
      return this.greenValue;
    }

    // blue

  }, {
    key: 'blue',
    set: function set(value) {
      var rgb = this.color.toRgb();
      this.color = (0, _tinycolor2["default"])(_extends({}, rgb, {
        b: value
      }));

      this.initHsb();
      this.blueValue = value;
    },
    get: function get() {
      return this.blueValue;
    }

    // alpha

  }, {
    key: 'alpha',
    set: function set(value) {
      this.color.setAlpha(value / 100);
    },
    get: function get() {
      return this.color.getAlpha() * 100;
    }
  }, {
    key: 'RGB',
    get: function get() {
      return [this.red, this.green, this.blue];
    }
  }, {
    key: 'HSB',
    get: function get() {
      return [this.hue, this.saturation, this.lightness];
    }
  }]);

  return Color;
}();

exports["default"] = Color;
module.exports = exports['default'];