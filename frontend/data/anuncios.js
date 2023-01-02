import axios from "axios";

const getPosts = async (token) => {
  const res = await axios.get(`${process.env.API_URL}/posts`, {
    headers: { cookie: token },
  });
  return res;
};

const getUserPosts = async (token, userId) => {
  const res = await axios.get(`${process.env.API_URL}/userposts/${userId}`, {
    headers: { cookie: token },
  });
  return res;
};

const deletePost = async (postId) => {
  const res = await axios.delete(`${process.env.API_URL}/post/delete`, {
    data: { postId },
  });
  return res;
};

const newPost = async (user, title, desc) => {
  const res = await axios.post(`${process.env.API_URL}/post`, {
    user,
    title,
    desc,
  });
  return res;
};

module.exports = {
  getPosts,
  getUserPosts,
  deletePost,
  newPost,
};
