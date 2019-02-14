import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import PostList from "./components/PostList"

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/posts")
      .then(response => {
        console.log(response.data)
        this.setState({posts: response.data})
      })
      .catch(err => console.log(err))
  }
  render() {
    console.log("rendering", this.state.posts)
    return (
      <div className="App">
        <PostList
        posts={this.state.posts}
        />
      </div>
    );
  }
}

export default App;
