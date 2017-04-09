import React, { Component } from 'react';

export default (props) => {

  return (
      <div onClick={props.onToggle.bind(this) } style={ style.container }>
          This is the Toggle Bar!
        </div>
        );
}

const style = {
  container: {
    color:'#fff', 
    width:320, 
    position:'fixed', 
    bottom:0, 
    right:0, 
    background:'#000',
    padding:6
  }
};