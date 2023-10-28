import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { connect } from "react-redux";
import { setPosts, setUsers } from "./redux/action";

function Home({ posts, users, setPosts, setUsers }) {
  const [post, setPost] = useState([]);
  const navigation = useNavigate();
  //posts
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //users
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleNavigation = (userId) => {
    // navigation(`/details/${userId}`);
    console.log(userId);
    navigation(`/details/${userId}`);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <b>S.No</b>
            </th>
            <th>
              <b>Title</b>
            </th>
            {/* <th>
            <b>Body</b>
          </th> */}
            <th>
              <b>Name</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {post.map((post) => {
            let user = users.find((u) => u.id === post.userId);
            return (
              <tr
                key={post.id}
                onClick={() => {
                  handleNavigation(post.userId);
                }}
              >
                <td>{post.id}</td>
                <td>{post.title}</td>
                {/* <td>{post.body}</td> */}
                <td>{user ? user.name : "Unknown User"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  users: state.users
});

const mapDispatchToProps = {
  setPosts,
  setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
