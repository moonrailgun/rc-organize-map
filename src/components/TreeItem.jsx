import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TreeItem.css';

let index = 1000;

class TreeItem extends Component {
  state = {
    collapse: true,
  }

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

  onClick = () => {
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
          item.children && item.children.length > 0 && this.state.collapse && (
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
      <div className="tree-info" onClick={this.onClick}>
        {item.label}
        {this.renderVerLine()}
      </div>
    )
  }

  render () {
    const item = this.props.item;

    return (
      <div className="tree-item" style={{zIndex: index--}}>
        {this.renderItem()}
        {this.renderHorLine()}
        {
          this.state.collapse && (
            <div className="tree-children">
              {
                item.children && item.children.map((subitem, _i) => {
                  return (
                    <TreeItem key={`${index}#${_i}`} item={subitem} parent={item} />
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

TreeItem.propTypes = {
  item: PropTypes.object,
  parent: PropTypes.object,
  root: PropTypes.bool,
}

export default TreeItem;
