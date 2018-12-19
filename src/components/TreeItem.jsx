import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TreeItem.scss';

let index = 1000;

class TreeItem extends Component {
  state = {
    collapse: false,
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

  onClick = (e) => {
    e.stopPropagation();
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

    let arrow;
    if(item.children && item.children.length > 0) {
      arrow = this.state.collapse ? (
        <div className="tree-arrow__down"></div>
      ) : (
        <div className="tree-arrow__up"></div>
      )
    }

    return (
      <div
        className="tree-info"
        style={{cursor: item.children && item.children.length > 0 ? 'pointer' : 'default'}}
        onClick={this.onClick}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="tree-info__avatar">
          {item.avatar ? (
            <img src={item.avatar} />
          ): <span>无</span>}
        </div>
        <div className="tree-info__prop">
          <div className="tree-info__prop-name">{ item.name }</div>
          <div className="tree-info__prop-pic">{ item.pic || '暂无负责人' }</div>
          {
            item.tag && (
              <div className="tree-info__prop-tag">{ item.tag }</div>
            )
          }
          {
            item.number && (
              <div className="tree-info__prop-number">人数: { item.number }</div>
            )
          }
          { arrow }
        </div>
        { this.renderVerLine() }
      </div>
    )
  }

  render () {
    const item = this.props.item;

    return (
      <div className="tree-item" style={{zIndex: index--}}>
        {this.renderItem()}
        {this.renderHorLine()}
        <div className="tree-children" style={{overflow: 'hidden', width: this.state.collapse ? 0 : '100%'}}>
          {
            item.children && item.children.map((subitem, _i) => {
              return (
                <TreeItem key={`${index}#${_i}`} item={subitem} parent={item} />
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
}

export default TreeItem;
