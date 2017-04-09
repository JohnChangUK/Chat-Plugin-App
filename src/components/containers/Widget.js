import React, { Component } from 'react';
import { Comment, ToggleBar } from '../presentation';

class Widget extends Component {
  constructor() {
    super();
    this.state = {
        showComments: false,
        comments: []
    };
  }

  toggleComments() {
    console.log('Toggle Comments: ' + this.state.showComments);
    this.setState({
      showComments: !this.state.showComments
    });
  }

  submitComment(event) {
    if (event.keyCode != 13)
      return;

    const comment = {
      text: event.target.value,
      timestamp: Math.round(Date.now()/1000)
    };

    let comments = Object.assign([], this.state.comments);
    comments.unshift(comment); // Puts the most recent comment on top
    this.setState({
      comments: comments
    });

    event.target.value = ''; // This is to clear the input box

  }

  render() {

    if(this.state.showComments == true)
      return (
        <div style={style.comments}>
        <div>
            <input onKeyDown={this.submitComment.bind(this)} 
            style={style.input} type="text" placeholder="Enter Comment" />
        </div>
  
        {
          this.state.comments.map( (comment, i) => {
            return <Comment key={comment.timestamp} {...comment} />
          })
        }

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
  },
  input: {
    width: 100 + '%', 
    height: 32, 
    border: 'none', 
    padding: 6
  }
}

export default Widget;