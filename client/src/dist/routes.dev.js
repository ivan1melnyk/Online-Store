"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRoutes = exports.authRoutes = void 0;

var _Admin = _interopRequireDefault(require("./pages/Admin"));

var _Basket = _interopRequireDefault(require("./pages/Basket"));

var _Shop = _interopRequireDefault(require("./pages/Shop"));

var _Auth = _interopRequireDefault(require("./pages/Auth"));

var _DevicePage = _interopRequireDefault(require("./pages/DevicePage"));

var _consts = require("./utils/consts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRoutes = [{
  path: _consts.ADMIN_ROUTE,
  Component: _Admin["default"]
}, {
  path: _consts.BASKET_ROUTE,
  Component: _Basket["default"]
}];
exports.authRoutes = authRoutes;
var publicRoutes = [{
  path: _consts.SHOP_ROUTE,
  Component: _Shop["default"]
}, {
  path: _consts.LOGIN_ROUTE,
  Component: _Auth["default"]
}, {
  path: _consts.REGISTRATION_ROUTE,
  Component: _Auth["default"]
}, {
  path: _consts.DEVICE_ROUTE + "/:id",
  Component: _DevicePage["default"]
}];
exports.publicRoutes = publicRoutes;