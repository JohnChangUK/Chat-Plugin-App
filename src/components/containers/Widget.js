import React, { Component } from 'react';
import { Comment, ToggleBar } from '../presentation';
import firebase from 'firebase';
import { Base64 } from 'js-base64';

class Widget extends Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      commentsArray: [],
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

  // Connecting to the Database
  // We are referencing the comments key which doesn't exist yet
  // It's going to be populated from the comments on the website
  // Everytime the 'value' changes, it going to get a callback
  // with a 'results payload'

    const path = Base64.encode(window.location.href) + '/comments';

    fbApp.database().ref(path).on('value', (chatapp) => {
      if (chatapp == null)
        return;

      const data = chatapp.val();
      this.setState({
        commentsArray: data.reverse()
      });
    });
  }

  toggleComments() {
    console.log(`Toggling the Boolean: ${this.state.showComments}`);
    this.setState({
// This toggles the Boolean, from false to true, and then to false etc.
      showComments: !this.state.showComments
    });
  }

  // Everytime the user types
  submitComment(event) {
    if (event.keyCode != 13)
      return;

    console.log(`submitComment: ${event.target.value} `);

    const comment = {
      text: event.target.value,
      timestamp: Date.now()
    }

    console.log('submitComment: ' + JSON.stringify(comment));
    let comments = Object.assign([], this.state.commentsArray);
    // Here we are grabbing the firebase DB reference, grabbing the comments key '/comments/'
// And then appending the length value of the comment.
//And then we are SETTING the key value to the comment itself.
// That should reach the firebase backend and update

    const path = Base64.encode(window.location.href) + '/comments/' + comments.length;

    this.state.firebase.database().ref(path).set(comment);


    // console.log('ENCODED: ' + Base64.encode(window.location.href));
    // console.log('DECODED: ' + Base64.decode(encoded));

    // comments.unshift(comment);
// The problem is the text is referencing THIS LOCAL STATE.
// We want it to reference to the FIREBASE DB, not the local state
// So on the firebase Callback function
   // fbApp.database().ref('/comments').on('value', (results) => {
   //    const data = results.val();
   //    console.log('Comments Updated from the DB: ' + JSON.stringify(data));
   //    this.setState({
   //      commentsArray: data
   //    });
//Previously we did this below, which is wrong 
    // this.setState({
    //   commentsArray: comments
    // }); 

    event.target.value = ''; //Clears out the input box

  }

  render() {
// If the showComments Boolean is set to true, we want to 
// return the Comments Component
    if (this.state.showComments == true)
      return (
          <div style={style.comments}>
          <div>
            <input onKeyDown={this.submitComment.bind(this)} style={ style.input } 
            type="text" placeholder="Enter Comment" />
          </div>
    
          { this.state.commentsArray.map( (comment, index) => {
                                      // Before the comments themselves were not
                                      // rendering the text, therefore the comment is being passed in
                                      // through the spread operator, so we grab it from Comment.js
             return <Comment key={comment.timestamp} {...comment} />
          })
        }

            <ToggleBar label="Hide Comments" onToggle={this.toggleComments.bind(this)} />
          </div>
        );

    return (
      // onToggle is the props that the Togglebar.js can access
      // by props.onToggle, which equals to the function
        <ToggleBar label="Show Comments" onToggle={this.toggleComments.bind(this)} />
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
    background: '#f1f9f5',
    borderLeft: '1px solid #ddd',
    overflowY: 'scroll',
    paddingBottom: 96
  },
  input: {
    width: 100 + '%', 
    height: 40, 
    border: 'none', 
    padding: 9,
    borderBottom: '1px solid #ddd'
  }
}


export default Widget;