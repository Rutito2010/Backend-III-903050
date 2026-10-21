import { userService } from '../service/user.service.js';
import { successResponse } from '../utils/apiResponse.js';
export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    //res.json({ status: 'success', payload: users });
    successResponse(res, { message: 'Lista de usuarios', payload: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.uid);
    successResponse(res, { message: 'usuario obtenido', payload: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    successResponse(res, { statusCode: 201, message: 'usuario creado', payload: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.uid, req.body);
    successResponse(res, { message: 'usuario actualizado', payload: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.uid);
    successResponse(res, { message: 'usuario eliminado', payload: user });
  } catch (error) {
    next(error);
  }
};
