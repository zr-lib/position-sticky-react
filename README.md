# 模拟 position: sticky;

## 兼容
如果浏览器支持 position: sticky; 则直接使用

## 参数
  * scrollContainer：滚动的容器，默认 window；如果传入元素，最好唯一，防止多个元素搞混；例：".container-1"
  * wrapperSelector：容器的 CSS 选择器，最好唯一，防止多个元素搞混；例：".wrapper-1"
  * stickySelector：需要 sticky 的元素的 CSS 选择器；例：".title"
  * hideBottom：距离底部的距离去除 sticky，默认 wrapperSelector 不在视野内去除

## 支持两种滚动

### window滚动
```jsx
{list.map((item, index) => (
  <PositionSticky
    key={index}
    wrapperSelector={`.item-w-${index}`}
    stickySelector=".title"
    className={`item item-w-${index}`}
  >
    <div className="title">window-title-{index}</div>
    <div className="content">window-{item.content}</div>
  </PositionSticky>
))}
```

### HTML容器滚动
```jsx
<section className="container">
  {list.map((item, index) => (
    <PositionSticky
      key={index}
      scrollContainer=".container"
      wrapperSelector={`.item-${index}`}
      stickySelector=".title"
      className={`item item-${index}`}
    >
      <div className="title">container-title-{index}</div>
      <div className="content">container-{item.content}</div>
    </PositionSticky>
  ))}
</section>
```