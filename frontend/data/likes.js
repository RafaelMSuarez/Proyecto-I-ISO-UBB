import axios from "axios";

const likesData = async () => {
  const res = await axios.get(`${process.env.API_URL}/post/likes`);
  return res.data;
};

const tieneLike = async (postId, userId) => {
  const res = await axios.get(`${process.env.API_URL}/post/like`, {
    params: {
      postId,
      userId,
    },
  });
  return res;
};

const darLike = async (postId, userId) => {
  const res = await axios.put(`${process.env.API_URL}/post/darlike`, {
    postId,
    userId,
  });
  return res;
};

const quitarLike = async (postId, userId) => {
  const res = await axios.delete(`${process.env.API_URL}/post/quitarlike`, {
    data: { postId, userId },
  });
  return res;
};

module.exports = {
  likesData,
  tieneLike,
  darLike,
  quitarLike,
};
