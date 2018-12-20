import React from 'react';
import PropTypes from 'prop-types';

class TreeBaseNode extends React.Component {
  render() {
    const {
      item,
      isCollapse,
    } = this.props;

    let arrow;
    if(item.children && item.children.length > 0) {
      arrow = isCollapse ? (
        <div className="tree-arrow__down"></div>
      ) : (
        <div className="tree-arrow__up"></div>
      )
    }

    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default TreeBaseNode;
