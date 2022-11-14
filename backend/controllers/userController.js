const User = require("../models/user");

// crear usuario
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
  newUser.save((err, user) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "No se ha podido crear el usuario" });
    }
    return res.status(201).send(user);
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

// // obtener un usuario por nombre
// const getUserbyName = (req, res) => {
//   const { nombre } = req.params;
//   User.findOne({ name: nombre }, (err, user) => {
//     if (err) {
//       return res
//         .status(400)
//         .send({ message: "No se pudo realizar la busqueda" });
//     }
//     if (!user) {
//       return res
//         .status(400)
//         .send({ message: "No se pudo encontrar el usuario" });
//     }
//     return res.status(200).send(user);
//   });
// };

// //obtener un usuario por rut
// const getUserbyRut = (req, res) => {
//   const { rut } = req.params;
//   User.findOne({ rut: rut }, (err, user) => {
//     if (err) {
//       return res
//         .status(400)
//         .send({ message: "No se pudo realizar la busqueda" });
//     }
//     if (!user) {
//       return res
//         .status(400)
//         .send({ message: "No se pudo encontrar el usuario" });
//     }
//     return res.status(200).send(user);
//   });
// }

//obtener todos los usuarios
const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
