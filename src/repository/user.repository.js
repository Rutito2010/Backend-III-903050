import User from "../models/user.model.js";

export const userRepository = {

  getAll: () => {
    return User.find();
  },

  getByid: (id) => {
    return User.findById(id);
  },

  getByEmail: (email) => {
    return User.findOne({ email });
  },
  
  create: (newUser) => {
    return User.create(newUser);
  },

  update: (id, updates) => {
    return User.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: (id) => {
    return User.findByIdAndDelete(id);
  }
}