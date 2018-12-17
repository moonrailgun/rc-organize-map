import React, { Component } from 'react';
import TreeItem from './components/TreeItem';
import testMap from './testMap';

class GOrgMap extends Component {
  onZoom = () => {
    console.log('aaaa');
  }

  render () {
    let map = testMap;

    return (
      <div onMouseWheel={this.onZoom} style={{position: 'absolute'}}>
        <TreeItem item={map.root} root />
      </div>
    )
  }
}

export default GOrgMap;
