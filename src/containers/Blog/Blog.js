import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    errorMessage: false
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        console.log(updatePosts);

        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        this.setState({
          errorMessage: true
        });
      });
  }
  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p>Something went wrong!</p>;
    if (!this.state.errorMessage) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
