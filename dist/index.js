"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./styles.css");
/**
 * 模拟 position: sticky;
 * 支持两种滚动：1、window滚动，2、容器滚动
 * @param scrollContainer {*} 滚动的容器，默认 window，
 *        如果传入元素，最好唯一，防止多个元素搞混；例：".container-1"
 * @param wrapperSelector {*} 容器的 CSS 选择器，最好唯一，防止多个元素搞混；例：".wrapper-1"
 * @param stickySelector {*} 需要 sticky 的元素的 CSS 选择器；例：".title"
 * @param hideBottom {*} 距离底部的距离去除 sticky，默认 wrapperSelector 不在视野内去除
 */
var PositionSticky = /** @class */ (function (_super) {
    __extends(PositionSticky, _super);
    function PositionSticky(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            scrollContainerEl: null,
            wrapperEl: react_1.default.createRef(),
            stickyEl: null
        };
        _this.bindScroll = function () {
            var scrollContainer = _this.props.scrollContainer;
            var container = document.querySelector("" + scrollContainer);
            if (scrollContainer && container) {
                _this.setState({ scrollContainerEl: container });
                container.addEventListener('scroll', _this.onContainerScroll, false);
            }
            else {
                console.warn("\u8BF7\u68C0\u67E5 " + scrollContainer + " \u662F\u5426\u662F\u6709\u6548\u5143\u7D20\uFF01");
            }
            if (scrollContainer === undefined) {
                window.addEventListener('scroll', _this.onWindowScroll, false);
            }
        };
        _this.onContainerScroll = function (e) {
            var hideBottom = _this.props.hideBottom;
            var _a = _this.state, wrapperEl = _a.wrapperEl, stickyEl = _a.stickyEl;
            var scrollTop = e.target.scrollTop;
            var parentNode = wrapperEl.current.parentElement;
            var _b = wrapperEl.current, offsetTop = _b.offsetTop, offsetHeight = _b.offsetHeight;
            // top: 元素顶部距离“父元素”顶部的距离，bottom: 元素底部距离“父元素”顶部的距离
            var top = offsetTop - parentNode.offsetTop;
            var bottom = top + offsetHeight;
            var stickyElHeight = stickyEl.clientHeight;
            var hideBottomDistance = hideBottom !== undefined ? hideBottom : stickyElHeight;
            // console.log(`\n${wrapperSelector} scrollTop: `, scrollTop);
            // console.log(`${wrapperSelector} top: `, top);
            // console.log(`${wrapperSelector} bottom: `, bottom);
            if (scrollTop > top && scrollTop < bottom) {
                // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
                stickyEl.style.top = scrollTop - top + "px";
                if (!stickyEl.classList.contains('position-sticky')) {
                    wrapperEl.current.style.paddingTop = stickyElHeight + "px";
                    stickyEl.classList.add('position-sticky');
                }
            }
            if (scrollTop <= top || scrollTop > bottom - hideBottomDistance) {
                // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
                if (stickyEl.classList.contains('position-sticky')) {
                    stickyEl.classList.remove('position-sticky');
                    stickyEl.style.top = 0 + "px";
                    wrapperEl.current.style.paddingTop = 0 + "px";
                }
            }
        };
        _this.onWindowScroll = function () {
            // top: 元素顶部距离html顶部的距离，bottom: 元素底部距离html顶部的距离
            var _a = _this.state, wrapperEl = _a.wrapperEl, stickyEl = _a.stickyEl;
            var _b = wrapperEl.current.getBoundingClientRect(), top = _b.top, bottom = _b.bottom;
            var stickyElHeight = stickyEl.clientHeight;
            if (top <= 0 && bottom >= 0) {
                // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
                wrapperEl.current.style.paddingTop = stickyElHeight + "px";
                stickyEl.classList.add('position-sticky');
                stickyEl.style.top = -top + "px";
            }
            if (bottom < stickyElHeight || top > 0) {
                // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
                if (stickyEl.classList.contains('position-sticky')) {
                    stickyEl.classList.remove('position-sticky');
                    stickyEl.style.top = 0 + "px";
                    wrapperEl.current.style.paddingTop = 0 + "px";
                }
            }
        };
        _this.onWindowScroll = _this.onWindowScroll.bind(_this);
        _this.onContainerScroll = _this.onContainerScroll.bind(_this);
        return _this;
    }
    PositionSticky.prototype.componentDidMount = function () {
        var _a = this.props, wrapperSelector = _a.wrapperSelector, stickySelector = _a.stickySelector;
        var stickyEl = document.querySelector(wrapperSelector + " " + stickySelector);
        if (stickyEl) {
            if (CSS.supports('position: sticky')) {
                stickyEl.style.position = 'sticky';
            }
            else {
                this.setState({ stickyEl: stickyEl });
                this.bindScroll();
            }
        }
        else {
            console.warn("\u8BF7\u68C0\u67E5 " + wrapperSelector + " " + stickySelector + " \u662F\u5426\u662F\u6709\u6548\u5143\u7D20\uFF01");
        }
    };
    PositionSticky.prototype.componentWillUnmount = function () {
        var _a;
        if (this.state.scrollContainerEl) {
            (_a = this.state.scrollContainerEl) === null || _a === void 0 ? void 0 : _a.removeEventListener('scroll', this.onContainerScroll, false);
        }
        else {
            window.removeEventListener('scroll', this.onWindowScroll, false);
        }
    };
    PositionSticky.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
        return (react_1.default.createElement("div", __assign({ ref: this.state.wrapperEl, className: "position-sticky-wrapper " + (className || '') }, props), children));
    };
    return PositionSticky;
}(react_1.default.Component));
exports.default = PositionSticky;
//# sourceMappingURL=index.js.map