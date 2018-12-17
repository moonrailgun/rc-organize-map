import React, { Component } from 'react';
import TreeItem from './components/TreeItem';
import testMap from './testMap';

class GOrgMap extends Component {
  render () {
    let map = testMap;

    return (
      <div>
        <div>
          <TreeItem item={map.root} root />
        </div>
      </div>
    )
  }
}

export default GOrgMap;
