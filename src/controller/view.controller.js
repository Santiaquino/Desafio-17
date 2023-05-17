import { productsModel } from "../dao/models/products.model.js";
import CartsManager from "../dao/dbManagers/carts.js";
import UsersManager from "../dao/dbManagers/users.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const insCarts = new CartsManager();
const insUsers = new UsersManager();

const getChat = async (req, res) => {
  if (req.user.role === "admin")
    return res.send("Solo los usuarios pueden ingresar al chat");
  res.render("chat");
};

const getProducts = async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.name.split(" ")[0],
      role: req.user.role,
      cart: req.user.cart,
    };

    let query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const reqQuery = req.query.query;

    if (reqQuery === undefined) {
      query = {};
    } else {
      query = JSON.parse(reqQuery);
    }

    const sort = req.query.sort || "";
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await productsModel.paginate(query, {
        page,
        limit,
        sort: { price: sort },
        lean: true,
      });
    const products = docs;
    query = JSON.stringify(query);

    res.render("products", {
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      limit,
      query,
      sort,
      user: user,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await insCarts.getCartById(cid);
    const cartPid = cart.products.map((el) => el.pid);

    let products = [];

    cartPid.forEach((el) => {
      let obj = {
        title: el.title,
        description: el.description,
        code: el.code,
        price: el.price,
        status: el.status,
        stock: el.stock,
        category: el.category,
        thumbnail: el.thumbnail,
      };

      products.push(obj);
    });

    res.render("carts", { products });
  } catch (err) {
    throw new Error(err);
  }
};

const getLogin = async (req, res) => {
  res.render("login");
};

const getRegister = async (req, res) => {
  res.render("register");
};

const getUsers = async (req, res) => {
  try {
    const usersDB = await insUsers.getAll();
    let users = [];

    usersDB.forEach((user) => {
      if (user.last_name == "not last name") {
        const obj = {
          first_name: user.first_name,
          age: user.age,
          role: user.role,
        };

        users.push(obj);
      } else {
        const obj = {
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          role: user.role,
        };

        users.push(obj);
      }
    });

    res.render("users", { users });
  } catch (err) {
    throw new Error(err);
  }
};

const getRestore = async (req, res) => {
  res.render("restore");
};

const getChangePassword = async (req, res) => {
  const token = req.params.token;
  let expired;

  jwt.verify(token, config.tokenRestore, function (err, user) {
    if (err) {
      expired = true;
    } else {
      expired = false;
    }
  });

  res.render("changePassword", { token, expired });
};

export default {
  getChat,
  getProducts,
  getCart,
  getRegister,
  getLogin,
  getUsers,
  getRestore,
  getChangePassword,
};
