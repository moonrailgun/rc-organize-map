import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TreeItem.scss';
import TreeBaseNode from './TreeBaseNode';

class TreeItem extends Component {
  state = {
    collapse: false,
  }
  childrenWidth: 0;

  get itemIndex() {
    const {
      parent,
      item,
    } = this.props;

    if(!parent || !parent.children) {
      return -1;
    }

    return parent.children.indexOf(item);
  }

  componentDidMount() {
    if(this.refs.children) {
      this.childrenWidth = this.refs.children.getBoundingClientRect().width;
    }
  }

  onClick = (e) => {
    const {
      item,
      onItemCollapse,
    } = this.props;
    if(item.children && item.children.length > 0) {
      onItemCollapse && onItemCollapse(e.currentTarget, this.childrenWidth, this.state.collapse);
    }

    this.setState({collapse: !this.state.collapse});
  }

  isLastSiblings() {
    const {
      parent
    } = this.props;

    return parent && parent.children ? parent.children.length - 1 === this.itemIndex : false;
  }

  isFirstSiblings() {
    const {
      parent
    } = this.props;

    return parent && parent.children ? 0 === this.itemIndex : false;
  }

  renderHorLine() {
    const {
      parent
    } = this.props;

    let horLine = null;
    if(parent) {
      if(this.isFirstSiblings()) {
        horLine = <div className="tree-line__hor-top-right"></div>
      } else if(this.isLastSiblings()) {
        horLine = <div className="tree-line__hor-top-left"></div>
      } else {
        horLine = <div className="tree-line__hor-top-all"></div>
      }
    }

    return horLine;
  }

  renderVerLine() {
    const {
      item,
    } = this.props;

    return (
      <div>
        {
          !this.props.root && (
            <div className="tree-line__top"></div>
          )
        }
        {
          item.children && item.children.length > 0 && !this.state.collapse && (
            <div className="tree-line__bottom"></div>
          )
        }
      </div>
    )
  }

  renderItem() {
    const {
      item
    } = this.props;



    return (
      <div
        className="tree-info"
        style={{cursor: item.children && item.children.length > 0 ? 'pointer' : 'default'}}
        onClick={this.onClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TreeBaseNode item={item} isCollapse={this.state.collapse} />
        { this.renderVerLine() }
      </div>
    )
  }

  render () {
    const {
      item,
      onItemCollapse,
    } = this.props;
    const collapse = this.state.collapse;

    return (
      <div className="tree-item">
        {this.renderItem()}
        {this.renderHorLine()}
        <div
          ref="children"
          className="tree-children"
          style={{overflow: 'hidden', width: collapse ? 0 : '100%', opacity: collapse ? 0 : 1 }}
        >
          {
            item.children && item.children.map((subitem, _i) => {
              return (
                <TreeItem key={`#${_i}`} item={subitem} parent={item} onItemCollapse={onItemCollapse} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

TreeItem.propTypes = {
  item: PropTypes.object,
  parent: PropTypes.object,
  root: PropTypes.bool,
  onItemCollapse: PropTypes.func,
}

export default TreeItem;
