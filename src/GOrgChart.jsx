import React, { Component } from 'react';
import TreeItem from './components/TreeItem';
import testMap from './testMap';

const numberRestrict = function(num, min, max) {
  min = Math.min(min, max);
  max = Math.max(min, max);

  if(num < min) {
    return min;
  }

  if(num > max) {
    return max;
  }

  return num;
}

class GOrgChart extends Component {
  dragging = false;
  mousePos = {x: 0, y: 0};
  treePos = {x: 0, y: 0};
  transform = {
    scale: 1,
    x: 0,
    y: 0,
  }
  originPos = {x: 0, y: 0}

  componentDidMount() {
    const container = this.refs.container;
    if(this.props.center && container) {
      const width = container.getBoundingClientRect().width;
      const parentEl = container.parentElement;
      const parentWidth = parentEl.clientWidth;
      this.transform.x = -(width - parentWidth) / 2;
      this.updateContainerTransform();
    }
  }

  onZoom = (e) => {
    if(!e.ctrlKey) {
      return;
    }
    let delta = e.deltaY;
    if(delta < 0){
      console.log('下滚放大');
    }
    if(delta > 0){
      console.log('上滚缩小');
    }

    let target = this.transform.scale - delta * 0.001 * 0.5;
    target = numberRestrict(target, 0.5, 1);
    this.transform.scale = target;
    // this.setContainerTransformOrigin({x: e.clientX, y: e.clientY}); // TODO: 在鼠标指针处缩放特性还有问题
    this.updateContainerTransform();
  }

  onScroll = (e) => {
    if(this.dragging === false) {
      return;
    }

    console.log('onScroll');
    e.preventDefault();
    e.stopPropagation();
    if(e.ctrlKey) {
      return;
    }

    let targetX = e.clientX - this.mousePos.x + this.treePos.x;
    let targetY = e.clientY - this.mousePos.y + this.treePos.y;

    this.transform.x = targetX;
    this.transform.y = targetY;
    this.updateContainerTransform();
  }

  onMouseDown = (e) => {
    console.log('onMouseDown');
    const container = this.refs.container;
    const transform = this.transform;
    this.dragging = true;
    this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    }

    this.treePos = {
      x: transform.x,
      y: transform.y,
    };

    this.resetContainerTransformOrigin();
  }

  onMouseUp = (e) => {
    console.log('onMouseUp');
    this.dragging = false;
  }

  updateContainerTransform = () => {
    const container = this.refs.container;
    const {
      scale,
      x,
      y,
    } = this.transform;
    container.style.transform = `scale(${scale}) translate(${x / scale}px, ${y / scale}px)`
  }

  // 归零变换点
  resetContainerTransformOrigin = () => {
    this.transform.x += this.originPos.x * this.transform.scale;
    this.transform.y += this.originPos.y * this.transform.scale;
    this.originPos.x = 0;
    this.originPos.y = 0;

    this.updateContainerTransform();
    this.updateContainerTransformOrigin();
  }

  // 将变换中点设置到鼠标当前位置
  setContainerTransformOrigin = ({x = 0, y = 0} = {}) => {
    const container = this.refs.container;
    const containerPos = container.getBoundingClientRect();
    const {
      scale,
    } = this.transform;
    const targetX = (x - containerPos.x) / scale;
    const targetY = (y - containerPos.y) / scale;

    // debugger;
    this.transform.x -= (targetX - this.originPos.x) * scale;
    this.transform.y -= (targetY - this.originPos.y) * scale;
    this.updateContainerTransform();

    this.originPos.x = targetX;
    this.originPos.y = targetY;
    this.updateContainerTransformOrigin();
  }

  updateContainerTransformOrigin = () => {
    const container = this.refs.container;
    const {
      x,
      y,
    } = this.originPos;
    container.style.transformOrigin = `${x}px ${y}px 0px`;

    // this.refs.refPoint.style.transform = `translate(${x}px, ${y}px)`;
  }

  onItemCollapse = (el, childrenWidth, isCollapse) => {
    const elWidth = el.getBoundingClientRect().width;
    let diff = (childrenWidth - (elWidth + 16 * 2)) / 2; // 其中16 * 2 是容器外边距
    if(isCollapse) {
      this.transform.x -= diff;
    }else {
      this.transform.x += diff;
    }
    this.updateContainerTransform();
  }

  render () {
    let containerStyle = {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    }
    let treeStyle = {
      position: 'absolute',
      cursor: 'grab',
      transformOrigin: '0px 0px 0px',
      border: '1px solid red',
    }
    let map = testMap;

    return (
      <div onWheel={this.onZoom} style={containerStyle}>
        <div
          ref="container"
          style={treeStyle}
          onMouseMove={this.onScroll}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          {/* transformOrigin参考点
          <div
            ref="refPoint"
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
              borderRadius: '50%',
              backgroundColor: 'red',
            }}
          ></div>*/}
          <TreeItem item={map.root} root ref="tree" onItemCollapse={this.onItemCollapse} />
        </div>
      </div>
    )
  }
}

export default GOrgChart;
