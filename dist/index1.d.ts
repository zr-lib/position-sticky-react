import { HTMLAttributes } from 'react';
import './styles.css';
export interface PositionStickyFunc extends HTMLAttributes<HTMLElement> {
    scrollContainer?: string;
    wrapperSelector: string;
    stickySelector: string;
    hideBottom?: number;
}
/**
 * 模拟 position: sticky;
 * 支持两种滚动：1、window滚动，2、容器滚动
 * @param scrollContainer {*} 滚动的容器，默认 window，
 *        如果传入元素，最好唯一，防止多个元素搞混；例：".container-1"
 * @param wrapperSelector {*} 容器的 CSS 选择器，最好唯一，防止多个元素搞混；例：".wrapper-1"
 * @param stickySelector {*} 需要 sticky 的元素的 CSS 选择器；例：".title"
 * @param hideBottom {*} 距离底部的距离去除 sticky，默认 wrapperSelector 不在视野内去除
 */
declare function PositionSticky({ scrollContainer, wrapperSelector, stickySelector, hideBottom, className, children, ...props }: PositionStickyFunc): JSX.Element;
export default PositionSticky;
