import CartsManager from "../dao/dbManagers/carts.js";
import { userService } from "../repository/index.js";
import CustomError from "../customError/customError.js";
import enumErrors from "../customError/enum.js";
import { generateUserErrorInfo } from "../customError/info.js";

const insCart = new CartsManager();

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    if (!users) {
      req.logger.error("la base de datos no pudo traer los usuarios");
      CustomError.createError({
        name: "Error al encontrar los usuarios",
        message: "Error en la base de datos, no se pudo traer los usuarios",
        cause: "la base de datos no pudo traer los usuarios",
        code: enumErrors.DATABASE_ERROR,
      });
    }

    res.json({ status: "success", payload: users });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;

    if (!first_name || !last_name || !email || !password || !age) {
      req.logger.warning(
        generateUserErrorInfo({ first_name, last_name, email, password, age })
      );
      CustomError.createError({
        name: "Error al guardar el usuario",
        message: "Ingrese todos los campos",
        cause: generateUserErrorInfo({
          first_name,
          last_name,
          email,
          password,
          age,
        }),
        code: enumErrors.INVALID_TYPES_ERROR,
      });
    }

    let result = await userService.createUser({
      first_name,
      last_name,
      email,
      password,
      age,
    });

    if (!result) {
      req.logger.error("Fallo en la base de datos en la creacion");
      CustomError.createError({
        name: "Error en la creacion del usuario",
        message: "Error en la creacion del usuario",
        cause: "Fallo en la base de datos en la creacion",
        code: enumErrors.DATABASE_ERROR,
      });
    }

    res.json({ status: "success", payload: result });
  } catch (err) {
    next(err);
  }
};

const updates = async (req, res, next) => {
  try {
    const { uid, cid } = req.params;
    const cart = await insCart.getCartById(cid);

    if (!cart) {
      req.logger.warning(`no se encontro el carrito con el id ${cid}`);
      CustomError.createError({
        name: "Error, no se encontro el carrito",
        cause: "No existe ese carrito en la base de datos",
        message: `no se encontro el carrito con el id ${cid}`,
        code: enumErrors.INVALID_TYPES_ERROR,
      });
    }

    const user = await userService.getOne(uid, null);

    if (!user) {
      req.logger.warning(`no se encontro el usuario con el id ${cid}`);
      CustomError.createError({
        name: "Error, no se encontro el usuario",
        cause: "No existe ese usuario en la base de datos",
        message: `no se encontro el usuario con el id ${cid}`,
        code: enumErrors.INVALID_TYPES_ERROR,
      });
    }

    let cartExists = user.cart.find((el) => el._id == cid);
    if (cartExists) {
      req.logger.warning(`Ya existe el carrito con el id ${cid}`);
      CustomError.createError({
        name: "Error, carrito existente",
        cause: "Ya existe ese carrito en la base de datos",
        message: `Ya existe el carrito con el id ${cid}`,
        code: enumErrors.INVALID_TYPES_ERROR,
      });
    }

    user.cart.push(cart._id);
    cart.users.push(user._id);

    await insCart.updateCart(cid, cart);
    await userService.updateUserById(uid, user);

    res.json({ status: "Success", message: "user add to cart" });
  } catch (err) {
    next(err);
  }
};

const changeRole = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await userService.getOne(uid, null);

    if (user.role === "usuario")
      await userService.updateUserById(uid, { role: "premium" });
    else await userService.updateUserById(uid, { role: "usuario" });

    res.json({ status: "Success", message: "Rol cambiado exitosamente" });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await userService.deleteUser(uid, null);

    if (!user) return res.json({ status: "Error", error: "Usuario no existe" });

    res.json({ status: "Success", message: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  createUser,
  updates,
  changeRole,
  deleteUser,
};
