import React, { Component } from 'react';
import { Comment, ToggleBar } from '../presentation';
import firebase from 'firebase';
import { Base64 } from 'js-base64';

class Widget extends Component {
  constructor() {
    super();
    this.state = {
        showComments: false,
        comments: [],
        firebase: null
    };
  }

  componentDidMount() {
    const fbApp = firebase.initializeApp({
      apiKey: "AIzaSyAVs1tote0KLaOt5CBLpGqGY3MGnrb8dqQ",
      authDomain: "chat-app-7fc5f.firebaseapp.com",
      databaseURL: "https://chat-app-7fc5f.firebaseio.com",
      projectId: "chat-app-7fc5f",
      storageBucket: "chat-app-7fc5f.appspot.com",
      messagingSenderId: "464213058821"
    });

    this.setState({
      firebase: fbApp
    });

    const path = Base64.encode(window.location.href) + '/comments';

    fbApp.database().ref(path).on('value', (chatapp) => {
      if (chatapp == null)
        return;

      const data = chatapp.val();
      console.log("Comments Updated: " + JSON.stringify(data));
      this.setState({
        comments: data.reverse()
    });
    });

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

    const encoded = Base64.encode(window.location.href);

    console.log("submitComment: " + encoded);
    console.log("DECODED: " + Base64.decode(encoded));

    let comments = Object.assign([], this.state.comments);

    const path = Base64.encode(window.location.href) + '/comments/' + comments.length;
    this.state.firebase.database().ref(path).set(comment);

    console.log("submitComment: " + JSON.stringify(comments));

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
    overflowY: 'scroll',
    paddingBottom: 96
  },
  input: {
    width: 100 + '%', 
    height: 32, 
    border: 'none', 
    padding: 6
  }
}

export default Widget;