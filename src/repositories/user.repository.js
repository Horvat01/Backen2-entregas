import { findUserByIdDAO, findUserByEmailDAO, createUserDAO, findAllUsersDAO } from "../dao/user.dao.js";
import { UserDTO } from "../dto/users.dto.js";

export const findUserByIdRepository = async (id) => {
    return findUserByIdDAO(id);
};

export const findUserByEmailRepository = async (email) => {
    return findUserByEmailDAO(email);
};

export const createUserRepository = async (data) => {
    return createUserDAO(data);
};

export const findAllUsersRepository = async () => {
    const users = await findAllUsersDAO();
    return users.map(user => new UserDTO(user));
};
