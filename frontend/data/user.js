import axios from "axios";

const login = async (rut) => {
  const res = await axios.post(`${process.env.API_URL}/user/login`, { rut });
  return res;
};

const logout = async () => {
  const res = await axios.get(`${process.env.API_URL}/user/logout`);
  return res;
};

const checkToken = async () => {
  const res = await axios.get(`${process.env.API_URL}/checkToken`, {
    headers: { cookie: token },
  });
  return res;
};

const getUser = async (rut) => {
  const res = await axios.get(`${process.env.API_URL}/user/rut/${rut}`);
  return res.data;
};

module.exports = {
  login,
  logout,
  checkToken,
  getUser,
};
