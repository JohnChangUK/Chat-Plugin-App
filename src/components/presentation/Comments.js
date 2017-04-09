import React, { Component } from 'react';

export default (props) => {

  return (
      <div style={style.container}>
        Comments Component!
      </div>

    );
}

const style = {
  container: {
    height: 650,
    width:320, 
    position:'fixed', 
    bottom:0, 
    right:0, 
    background:'pink',
    padding:6
  }
}