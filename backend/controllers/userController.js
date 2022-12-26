const User = require("../models/user");
const { createToken } = require("../services/token");
// crear usuario
const createUser = (req, res) => {
  const { name, rol, rut, numcasa, email, desc, telefono } = req.body;
  User.findOne({ rut: rut }, (err, user) => {
    if (err) {
      return res.status(400).send("No se ha podido crear el usuario");
    }
    if (user) {
      return res.status(400).send("El usuario ya existe");
    }

    const newUser = new User({
      name,
      rol,
      rut,
      numcasa,
      email,
      desc,
      telefono,
    });
    newUser.save((err, user) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "No se ha podido crear el usuario" });
      }
      return res.status(201).send(user);
    });
  });
};

//actualizar un usuario por id
const updateUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, (err, user) => {
    if (err) {
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

// eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) {
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

// obtener usuario por id
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
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

//obtener todos los usuarios
const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (users.length === 0) {
      return res.status(200).send([]);
    }
    return res.status(200).send(users);
  });
};

//obtene usuario por rut
const getUserRUT = (req, res) => {
  let rut = req.params.rut;
  User.findOne({ rut: rut }, (err, user) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se pudo realizar la busqueda" });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "No se ha encontrado el usuario" });
    }
    return res.status(200).send(user);
  });
};

const login = (req, res) => {
  let rut = req.body.rut;
  User.findOne({ rut: rut }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "Error al buscar el usuario" });
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "No se ha podido encontrar el usuario" });
    }
    res.cookie("token", createToken(user), { httpOnly: true });
    return res.status(200).send({
      message: "Inicio de sesión realizada",
      token: createToken(user),
      user: user.name,
    });
  });
};

const checkToken = (req, res) => {
  return res.status(200).send({ message: "Token válido" });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .send({ message: "Se ha cerrado la sesión correctamente" });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserRUT,
  login,
  logout,
  checkToken,
};
