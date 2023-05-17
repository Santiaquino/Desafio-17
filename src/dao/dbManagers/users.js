import { usersModel } from '../models/users.model.js';

export default class UsersManager {
  constructor() {
    //console.log('Usermanager');
  }

  getAll = async () => {
    try {
      const users = await usersModel.find();
      return users;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  getOne = async (id, email) => {
    try {
      const userId = await usersModel.findOne({ _id: id });
      const userEmail = await usersModel.findOne({ email: email });
      return userId || userEmail;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  updateUser = async (email, value) => {
    try {
      const user = await usersModel.updateOne({ email: email }, { $set: value });
      return user;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  updateUserById = async (id, value) => {
    try {
      const user = await usersModel.updateOne({ _id: id }, { $set: value });
      return user;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  createUser = async (obj) => {
    try {
      const result = await usersModel.create(obj);
      return result;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  changePassword = async (email, newPass) => {
    try {
      const result = await this.updateUser(email, { password: newPass });
      return result
    }
    catch (err) {
      throw new Error(err);
    }
  };
}
