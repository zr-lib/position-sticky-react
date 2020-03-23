import React from 'react';
import PositionSticky from 'position-sticky-react';
import './styles.css';

const App = () => {
  const list = [{ content: 'content-0' }, { content: 'content-1' }];

  return (
    <div className="App">
      <h1>模拟 position: sticky;</h1>

      <h3>container</h3>
      <section className="container">
        <div className="half" />

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
        <div className="half" />
      </section>

      <h3>window</h3>
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

      <div className="block" />
      <div className="block" />
    </div>
  );
};

export default App;
