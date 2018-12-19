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

class GOrgMap extends Component {
  dragging = false;
  mousePos = {x: 0, y: 0};
  treePos = {x: 0, y: 0};
  transform = {
    scale: 1,
    x: 0,
    y: 0,
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
    const pos = container.getBoundingClientRect();
    this.dragging = true;
    this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    }

    this.treePos = {
      x: pos.x,
      y: pos.y,
    };
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
          <TreeItem item={map.root} root ref="tree" />
        </div>
      </div>
    )
  }
}

export default GOrgMap;
