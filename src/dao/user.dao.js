import UserModel from "../models/user.model.js";

export const findUserByIdDAO = (id) => {
    return UserModel.findById(id);
};

export const findUserByEmailDAO = (email) => {
    return UserModel.findOne({ email });
};

export const createUserDAO = (data) => {
    return UserModel.create(data);
};

export const findAllUsersDAO = () => {
    return UserModel.find({});
};
