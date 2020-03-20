"use strict";
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
function PositionSticky(_a) {
    var scrollContainer = _a.scrollContainer, wrapperSelector = _a.wrapperSelector, stickySelector = _a.stickySelector, hideBottom = _a.hideBottom, className = _a.className, children = _a.children, props = __rest(_a, ["scrollContainer", "wrapperSelector", "stickySelector", "hideBottom", "className", "children"]);
    var scrollContainerRef = react_1.useRef(null);
    var wrapperRef = react_1.useRef(null);
    var stickyRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        var stickyEl = document.querySelector(wrapperSelector + " " + stickySelector);
        if (stickyEl) {
            if ((_a = window.CSS) === null || _a === void 0 ? void 0 : _a.supports('position: sticky')) {
                stickyEl.classList.add('sticky');
            }
            else {
                stickyRef.current = stickyEl;
                bindScroll();
            }
        }
        else {
            console.warn("\u8BF7\u68C0\u67E5 " + wrapperSelector + " " + stickySelector + " \u662F\u5426\u662F\u6709\u6548\u5143\u7D20\uFF01");
        }
        return function () {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener('scroll', onContainerScroll, false);
            }
            else {
                window.removeEventListener('scroll', onWindowScroll, false);
            }
        };
    }, []);
    var bindScroll = function () {
        var container = document.querySelector("" + scrollContainer);
        if (scrollContainer && container) {
            scrollContainerRef.current = container;
            scrollContainerRef.current.addEventListener('scroll', onContainerScroll, false);
        }
        else {
            console.warn("\u8BF7\u68C0\u67E5 " + scrollContainer + " \u662F\u5426\u662F\u6709\u6548\u5143\u7D20\uFF01");
        }
        if (scrollContainer === undefined) {
            window.addEventListener('scroll', onWindowScroll, false);
        }
    };
    var onContainerScroll = function (e) {
        var scrollTop = e.target.scrollTop;
        var parentNode = wrapperRef.current.parentElement;
        var _a = wrapperRef.current, offsetTop = _a.offsetTop, offsetHeight = _a.offsetHeight;
        // top: 元素顶部距离“父元素”顶部的距离，bottom: 元素底部距离“父元素”顶部的距离
        var top = offsetTop - parentNode.offsetTop;
        var bottom = top + offsetHeight;
        var stickyElHeight = stickyRef.current.clientHeight;
        var hideBottomDistance = hideBottom !== undefined ? hideBottom : stickyElHeight;
        // console.log(`\n${wrapperSelector} scrollTop: `, scrollTop);
        // console.log(`${wrapperSelector} top: `, top);
        // console.log(`${wrapperSelector} bottom: `, bottom);
        if (scrollTop > top && scrollTop < bottom) {
            // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
            stickyRef.current.style.top = scrollTop - top + "px";
            if (!stickyRef.current.classList.contains('position-sticky')) {
                wrapperRef.current.style.paddingTop = stickyElHeight + "px";
                stickyRef.current.classList.add('position-sticky');
            }
        }
        if (scrollTop <= top || scrollTop > bottom - hideBottomDistance) {
            // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
            if (stickyRef.current.classList.contains('position-sticky')) {
                stickyRef.current.classList.remove('position-sticky');
                stickyRef.current.style.top = 0 + "px";
                wrapperRef.current.style.paddingTop = 0 + "px";
            }
        }
    };
    var onWindowScroll = function () {
        // top: 元素顶部距离html顶部的距离，bottom: 元素底部距离html顶部的距离
        var _a = wrapperRef.current.getBoundingClientRect(), top = _a.top, bottom = _a.bottom;
        var stickyElHeight = stickyRef.current.clientHeight;
        if (top <= 0 && bottom >= 0) {
            // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
            wrapperRef.current.style.paddingTop = stickyElHeight + "px";
            stickyRef.current.classList.add('position-sticky');
            stickyRef.current.style.top = -top + "px";
        }
        if (bottom < stickyElHeight || top > 0) {
            // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
            if (stickyRef.current.classList.contains('position-sticky')) {
                stickyRef.current.classList.remove('position-sticky');
                stickyRef.current.style.top = 0 + "px";
                wrapperRef.current.style.paddingTop = 0 + "px";
            }
        }
    };
    return (react_1.default.createElement("div", __assign({ ref: wrapperRef, className: "position-sticky-wrapper " + (className || '') }, props), children));
}
exports.default = PositionSticky;
//# sourceMappingURL=index1.js.map