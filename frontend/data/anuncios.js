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

module.exports = {
  getPosts,
  getUserPosts,
};
