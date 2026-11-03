import { findUserByIdDAO, findUserByEmailDAO, createUserDAO, findAllUsersDAO } from "../dao/user.dao.js";
import { UserDTO } from "../dto/users.dto.js";

export const findUserByIdRepository = async (id) => {
    const user = await findUserByIdDAO(id);
    return user ? new UserDTO(user) : null;
};

export const findUserByEmailRepository = async (email) => {
    return findUserByEmailDAO(email);
};

export const createUserRepository = async (data) => {
    const user = await createUserDAO(data);
    return new UserDTO(user);
};

export const findAllUsersRepository = async () => {
    const users = await findAllUsersDAO();
    return users.map(user => new UserDTO(user));
};
