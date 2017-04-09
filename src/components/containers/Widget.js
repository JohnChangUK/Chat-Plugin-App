import React, { Component } from 'react';
import { Comments, ToggleBar } from '../presentation';

class Widget extends Component {
  constructor() {
    super();
    this.state = {
        showComments: false
    };
  }

  toggleComments() {
    console.log('Toggle Comments: ' + this.state.showComments);
    this.setState({
      showComments: !this.state.showComments
    });
  }

  render() {
    if(this.state.showComments == true)
      return (
        <div style={style.comments}>
          <ToggleBar onToggle={ this.toggleComments.bind(this) }/>
        </div>
        );

    return (
        <ToggleBar onToggle={ this.toggleComments.bind(this) }/>
      );
  }

}


const style = {
  comments: {
    zIndex: 100,
    height: 650,
    width: 320, 
    position: 'fixed', 
    bottom: 0, 
    right: 0, 
    background: 'skyblue',
  }
}

export default Widget;