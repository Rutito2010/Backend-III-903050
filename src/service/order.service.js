import { orderRepository } from '../repository/order.repository.js';
import { userRepository } from '../repository/user.repository.js';
import { storeRepository } from '../repository/store.repository.js';

import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';
import { ORDER_STATUS, USER_ROLES } from '../utils/constants.js';

export const orderService = {
  getOrders: async () => {
    return orderRepository.findAll();
  },

  getOrderById: async (id) => {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  },

  createOrder: async (orderData) => {
    const { customer, store, items, deliveryAddress, priority } = orderData;

    if (!customer || !store || !deliveryAddress ||
        !Array.isArray(items) || items.length === 0) {
      throw createError(ERROR_CODES.VALIDATION_ERROR);
    }

    for (const item of items) {
      if (!item || !Number.isFinite(item.quantity) || item.quantity <= 0 ||
          !Number.isFinite(item.price) || item.price < 0) {
        throw createError(ERROR_CODES.VALIDATION_ERROR,
          'Cada item debe tener cantidad mayor que cero y precio no negativo');
      }
    }

    const userFound = await userRepository.findById(customer);
    if (!userFound) {
      throw createError(ERROR_CODES.USER_NOT_FOUND);
    }

    if (userFound.role !== USER_ROLES.CUSTOMER) {
      throw createError(ERROR_CODES.INVALID_USER_ROLE,
        'El cliente debe tener rol customer');
    }

    const storeFound = await storeRepository.findById(store);
    if (!storeFound) {
      throw createError(ERROR_CODES.STORE_NOT_FOUND);
    }

    const total = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    const newOrder = {
      ...orderData,
      total,
      status: 'created',
      priority: priority ? priority : 'normal',
    };

    return orderRepository.create(newOrder);
  },

  updateOrderStatus: async (id, status) => {
    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw createError(ERROR_CODES.INVALID_ORDER_STATUS);
    }

    const order = await orderRepository.updateStatus(id, status);
    if (!order) {
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  },

  deleteOrder: async (id) => {
    const order = await orderRepository.delete(id);
    if (!order) {
      throw createError(ERROR_CODES.ORDER_NOT_FOUND);
    }

    return order;
  },
};
