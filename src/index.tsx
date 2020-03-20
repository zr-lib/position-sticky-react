import React, { HTMLAttributes } from 'react';
import './styles.css';

export interface PositionStickyClass extends HTMLAttributes<HTMLElement> {
  scrollContainer?: string;
  wrapperSelector: string;
  stickySelector: string;
  hideBottom?: number;
}

export interface PositionStickyState {
  scrollContainerEl: HTMLElement | null;
  wrapperEl: React.RefObject<HTMLDivElement> | null;
  stickyEl: HTMLElement | null;
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
class PositionSticky extends React.Component<
  PositionStickyClass,
  PositionStickyState
> {
  readonly state: PositionStickyState = {
    scrollContainerEl: null,
    wrapperEl: React.createRef<HTMLDivElement>(),
    stickyEl: null
  };

  constructor(props: PositionStickyClass) {
    super(props);

    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onContainerScroll = this.onContainerScroll.bind(this);
  }

  public componentDidMount() {
    const { wrapperSelector, stickySelector } = this.props;
    const stickyEl = document.querySelector(
      `${wrapperSelector} ${stickySelector}`
    ) as HTMLElement;

    if (stickyEl) {
      if (CSS.supports('position: sticky')) {
        stickyEl.style.position = 'sticky';
      } else {
        this.setState({ stickyEl });
        this.bindScroll();
      }
    } else {
      console.warn(
        `请检查 ${wrapperSelector} ${stickySelector} 是否是有效元素！`
      );
    }
  }

  public componentWillUnmount() {
    if (this.state.scrollContainerEl) {
      this.state.scrollContainerEl?.removeEventListener(
        'scroll',
        this.onContainerScroll,
        false
      );
    } else {
      window.removeEventListener('scroll', this.onWindowScroll, false);
    }
  }

  public bindScroll = () => {
    const { scrollContainer } = this.props;
    const container = document.querySelector(
      `${scrollContainer}`
    ) as HTMLElement;
    if (scrollContainer && container) {
      this.setState({ scrollContainerEl: container });
      container.addEventListener('scroll', this.onContainerScroll, false);
    } else {
      console.warn(`请检查 ${scrollContainer} 是否是有效元素！`);
    }
    if (scrollContainer === undefined) {
      window.addEventListener('scroll', this.onWindowScroll, false);
    }
  };

  public onContainerScroll = (e: any) => {
    const { hideBottom } = this.props;
    const { wrapperEl, stickyEl } = this.state;

    const scrollTop = e.target.scrollTop!;
    const parentNode = wrapperEl!.current!.parentElement;
    const { offsetTop, offsetHeight } = wrapperEl!.current!;
    // top: 元素顶部距离“父元素”顶部的距离，bottom: 元素底部距离“父元素”顶部的距离
    const top = offsetTop - parentNode!.offsetTop;
    const bottom = top + offsetHeight;
    const stickyElHeight = stickyEl!.clientHeight;
    const hideBottomDistance =
      hideBottom !== undefined ? hideBottom : stickyElHeight;

    // console.log(`\n${wrapperSelector} scrollTop: `, scrollTop);
    // console.log(`${wrapperSelector} top: `, top);
    // console.log(`${wrapperSelector} bottom: `, bottom);

    if (scrollTop > top && scrollTop < bottom) {
      // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
      stickyEl!.style.top = `${scrollTop - top}px`;
      if (!stickyEl!.classList.contains('position-sticky')) {
        wrapperEl!.current!.style.paddingTop = `${stickyElHeight}px`;
        stickyEl!.classList.add('position-sticky');
      }
    }

    if (scrollTop <= top || scrollTop > bottom - hideBottomDistance) {
      // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
      if (stickyEl!.classList.contains('position-sticky')) {
        stickyEl!.classList.remove('position-sticky');
        stickyEl!.style.top = `${0}px`;
        wrapperEl!.current!.style.paddingTop = `${0}px`;
      }
    }
  };

  private onWindowScroll = () => {
    // top: 元素顶部距离html顶部的距离，bottom: 元素底部距离html顶部的距离
    const { wrapperEl, stickyEl } = this.state;
    const { top, bottom } = wrapperEl!.current!.getBoundingClientRect();
    const stickyElHeight = stickyEl!.clientHeight;

    if (top <= 0 && bottom >= 0) {
      // console.log(`固定 ${wrapperSelector} ${stickySelector}`);
      wrapperEl!.current!.style.paddingTop = `${stickyElHeight}px`;
      stickyEl!.classList.add('position-sticky');
      stickyEl!.style.top = `${-top}px`;
    }

    if (bottom < stickyElHeight || top > 0) {
      // console.log(`不固定 ${wrapperSelector} ${stickySelector}`);
      if (stickyEl!.classList.contains('position-sticky')) {
        stickyEl!.classList.remove('position-sticky');
        stickyEl!.style.top = `${0}px`;
        wrapperEl!.current!.style.paddingTop = `${0}px`;
      }
    }
  };

  public render() {
    const { className, children, ...props } = this.props;
    return (
      <div
        ref={this.state.wrapperEl}
        className={`position-sticky-wrapper ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default PositionSticky;
