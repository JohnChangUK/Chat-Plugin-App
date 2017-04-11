import React, { Component } from 'react';

// stateless Functional Component

export default (props) => {
  
  return (        
    // Calling from the Widget.js, <ToggleBar onToggle />, which is the props
    <div onClick={props.onToggle.bind(this)} style={ style.container }>
        {props.label}
      </div>

    );

}

const style = {
  container: {
    color: '#fff',
    width: 320, 
    // Won't take up any div space
    position: 'fixed', 
    // Pin it to the bottom
    bottom: 0, 
    // Pin it to the right
    right: 0, 
    background: '#000',
    padding: 6
  }
}