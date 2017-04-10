import React, { Component } from 'react';
import Moment from 'react-moment';

export default (props) => {

  const comment = props;
  const timestamp = new Date(comment.timestamp);

  return (
        <div style={ {padding: 12, borderBottom: '1px dotted #ddd'} }>

          <Moment style={ style.timestamp } 
          format="MMM D, YYYY" date={timestamp} /> <br />

          {comment.text}

        </div>
      )
}

const style = {
  timestamp: {
    color: '#777', 
    fontSize:12, 
    fontWeight: 100
  }

}