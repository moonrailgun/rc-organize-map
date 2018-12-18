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
  state = {
    scale: 1,
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

    let target =  this.state.scale - delta * 0.001 * 0.5;
    target = numberRestrict(target, 0.5, 1);
    this.setState({scale: target})
  }

  render () {
    let {
      scale,
    } = this.state;
    let containerStyle = {
      overflow: "auto",
      width: '100%',
    }
    let treeStyle = {
      position: 'absolute',
      transform: `scale(${scale})`,
    }
    let map = testMap;

    return (
      <div onWheel={this.onZoom} style={containerStyle}>
        <div style={treeStyle}>
          <TreeItem item={map.root} root />
        </div>
      </div>
    )
  }
}

export default GOrgMap;
