import React, { Component } from 'react';
import { Comments } from '../presentation';

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
      return <Comments />;

    return (
        <div onClick={this.toggleComments.bind(this)} style={ style.container }>
        This is the Widget!
         </div>
      );
  }

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
}

export default Widget;