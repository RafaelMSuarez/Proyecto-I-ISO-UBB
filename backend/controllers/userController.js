const User = require("../models/user");

const createUser = (req, res) => {
  const { name, rol, rut, numcasa, email, desc, numpost } = req.body;
  const newUser = new User({
    name,
    rol,
    rut,
    numcasa,
    email,
    desc,
    numpost,
  });
  newUser.save((error, user) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido crear el usuario" });
    }
    return res.status(201).send(user);
  });
};

const getUsers = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (users.length === 0) {
      return res.status(404).send({ message: "No se encontraron usuarios" });
    }
    return res.status(200).send(users);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, (error, user) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se pudo actualizar el usuario" });
    }
    if (!user) {
      return res.status(404).send({ message: "No se encontro el usuario" });
    }
    return res.status(200).send({ message: "Usuario modificado" });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (error, user) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido eliminar el usuario" });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar el usuario" });
    }
    return res
      .status(200)
      .send({ message: "Se ha eliminado el usuario de forma correcta" });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id, (error, user) => {
    if (error) {
      return res
        .status(400)
        .send({ message: "No se ha podido encontrar el usuario" });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar el usuario" });
    }
    return res.status(200).send(user);
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
