import React, { HTMLAttributes, useEffect, useRef } from 'react';
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
function PositionSticky({
  scrollContainer,
  wrapperSelector,
  stickySelector,
  hideBottom,
  className,
  children,
  ...props
}: PositionStickyFunc) {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const stickyEl = document.querySelector(
      `${wrapperSelector} ${stickySelector}`
    ) as HTMLElement;

    if (stickyEl) {
      if (window.CSS?.supports('position: sticky')) {
        stickyEl.classList.add('sticky');
      } else {
        stickyRef.current = stickyEl;
        bindScroll();
      }
    } else {
      console.warn(
        `请检查 ${wrapperSelector} ${stickySelector} 是否是有效元素！`
      );
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          'scroll',
          onContainerScroll,
          false
        );
      } else {
        window.removeEventListener('scroll', onWindowScroll, false);
      }
    };
  }, []);

  const bindScroll = () => {
    const container = document.querySelector(
      `${scrollContainer}`
    ) as HTMLElement;
    if (scrollContainer && container) {
      scrollContainerRef.current = container;
      scrollContainerRef.current.addEventListener(
        'scroll',
        onContainerScroll,
        false
      );
    } else {
      console.warn(`请检查 ${scrollContainer} 是否是有效元素！`);
    }
    if (scrollContainer === undefined) {
      window.addEventListener('scroll', onWindowScroll, false);
    }
  };

  const onContainerScroll = (e: any) => {
    const scrollTop = e.target.scrollTop!;
    const parentNode = wrapperRef.current!.parentElement;
    const { offsetTop, offsetHeight } = wrapperRef.current!;
    // top: 元素顶部距离“父元素”顶部的距离，bottom: 元素底部距离“父元素”顶部的距离
    const top = offsetTop - parentNode!.offsetTop;
    const bottom = top + offsetHeight;
    const stickyElHeight = stickyRef.current!.clientHeight;
    const hideBottomDistance =
      hideBottom !== undefined ? hideBottom : stickyElHeight;

    // console.log(`\n${wrapperSelector} scrollTop: `, scrollTop);
    // console.log(`${wrapperSelector} top: `, top);
    // console.log(`${wrapperSelector} bottom: `, bottom);

    if (scrollTop > top && scrollTop < bottom) {
      // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
      stickyRef.current!.style.top = `${scrollTop - top}px`;
      if (!stickyRef.current!.classList.contains('position-sticky')) {
        wrapperRef.current!.style.paddingTop = `${stickyElHeight}px`;
        stickyRef.current!.classList.add('position-sticky');
      }
    }

    if (scrollTop <= top || scrollTop > bottom - hideBottomDistance) {
      // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
      if (stickyRef.current!.classList.contains('position-sticky')) {
        stickyRef.current!.classList.remove('position-sticky');
        stickyRef.current!.style.top = `${0}px`;
        wrapperRef.current!.style.paddingTop = `${0}px`;
      }
    }
  };

  const onWindowScroll = () => {
    // top: 元素顶部距离html顶部的距离，bottom: 元素底部距离html顶部的距离
    const { top, bottom } = wrapperRef.current!.getBoundingClientRect();
    const stickyElHeight = stickyRef.current!.clientHeight;
    if (top <= 0 && bottom >= 0) {
      // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
      wrapperRef.current!.style.paddingTop = `${stickyElHeight}px`;
      stickyRef.current!.classList.add('position-sticky');
      stickyRef.current!.style.top = `${-top}px`;
    }

    if (bottom < stickyElHeight || top > 0) {
      // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
      if (stickyRef.current!.classList.contains('position-sticky')) {
        stickyRef.current!.classList.remove('position-sticky');
        stickyRef.current!.style.top = `${0}px`;
        wrapperRef.current!.style.paddingTop = `${0}px`;
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`position-sticky-wrapper ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default PositionSticky;
