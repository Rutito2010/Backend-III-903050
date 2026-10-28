import { generateMockOrders } from '../mocks/orders.mock.js';
import { generateMockStores } from '../mocks/stores.mock.js';
import {
  generateMockStoreUsers,
  generateMockUsers,
} from '../mocks/users.mock.js';
import { orderRepository } from '../repository/order.repository.js';
import { storeRepository } from '../repository/store.repository.js';
import { userRepository } from '../repository/user.repository.js';

import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';

const validateQuantity = (quantity, name) => {
  const parsed = Number(quantity);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 400) {
    throw createError(ERROR_CODES.INVALID_MOCK_AMOUNT,
      name + ' debe ser un entero entre 0 y 400');
  }
  return parsed;
};

export const generateUsers = async (quantity) => {
  return generateMockUsers(validateQuantity(quantity, 'qty'));
};

export const generateOrders = async (quantity) => {
  quantity = validateQuantity(quantity, 'qty');
  const users = generateMockUsers(quantity);
  const storeUsers = generateMockStoreUsers(quantity);
  const stores = generateMockStores(storeUsers, quantity);

  return generateMockOrders(
    users.map((user) => user._id),
    stores.map((store) => store._id),
    quantity,
  );
};

export const generateData = async ({ users = 10, stores = 5, orders = 10 } = {}) => {
  users = validateQuantity(users, 'users');
  stores = validateQuantity(stores, 'stores');
  orders = validateQuantity(orders, 'orders');

  if (orders > 0 && (users === 0 || stores === 0)) {
    throw createError(ERROR_CODES.INVALID_MOCK_AMOUNT,
      'Para generar pedidos se necesita al menos un customer y un store');
  }

  const result = {
    users: 0,
    stores: 0,
    orders: 0,
  };

  let createdCustomerUsers = [];
  let createdStoreUsers = [];
  let createdStores = [];

  if (users > 0) {
    createdCustomerUsers = await userRepository.insertMany(
      generateMockUsers(users),
    );
  }

  if (stores > 0) {
    createdStoreUsers = await userRepository.insertMany(
      generateMockStoreUsers(stores),
    );
  }

  result.users = createdCustomerUsers.length + createdStoreUsers.length;

  if (createdStoreUsers.length > 0) {
    createdStores = await storeRepository.insertMany(
      generateMockStores(createdStoreUsers, stores),
    );
    result.stores = createdStores.length;
  }

  if (orders > 0 && createdCustomerUsers.length > 0 && createdStores.length > 0) {
    const createdOrders = await orderRepository.insertMany(
      generateMockOrders(
        createdCustomerUsers.map((user) => user._id),
        createdStores.map((store) => store._id),
        orders,
      ),
    );
    result.orders = createdOrders.length;
  }

  return result;
};