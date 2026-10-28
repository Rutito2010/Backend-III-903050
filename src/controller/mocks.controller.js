import * as mocksService from '../service/mocks.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getMockUsers = async (req, res, next) => {
  try {
    const quantity = req.query.qty ?? 10;
    const users = await mocksService.generateUsers(quantity);

    successResponse(res, { message: 'Usuarios mock generados', payload: users });
  } catch (error) {
    next(error);
  }
};

export const getMockOrders = async (req, res, next) => {
  try {
    const quantity = req.query.qty ?? 10;
    const orders = await mocksService.generateOrders(quantity);

    successResponse(res, { message: 'Pedidos mock generados', payload: orders });
  } catch (error) {
    next(error);
  }
};

export const generateData = async (req, res, next) => {
  try {
    const {
      users = 10,
      stores = 5,
      orders = 10,
    } = req.body || {};
    const result = await mocksService.generateData({ users, stores, orders });

    successResponse(res, { statusCode: 201, message: 'Datos mock generados', payload: result });
  } catch (error) {
    next(error);
  }
};