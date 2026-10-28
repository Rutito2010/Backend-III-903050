import { storeRepository } from '../repository/store.repository.js';
import { userRepository } from '../repository/user.repository.js';

import { createError } from '../utils/apiResponse.js';
import { ERROR_CODES } from '../utils/errorDictionary.js';

export const storeService = {
  getStores: async () => {
    return storeRepository.findAll();
  },

  getStoreById: async (id) => {
    const store = await storeRepository.findById(id);

    if (!store) {
      throw createError(ERROR_CODES.STORE_NOT_FOUND);
    }

    return store;
  },

  createStore: async (storeData) => {
    const { name, address, owner } = storeData;

    if (!name || !address || !owner) {
      throw createError(ERROR_CODES.VALIDATION_ERROR);
    }

    const ownerFound = await userRepository.findById(owner);

    if (!ownerFound) {
      throw createError(ERROR_CODES.USER_NOT_FOUND, 'Usuario propietario no encontrado');
    }

    if (ownerFound.role !== 'store') {
      throw createError(ERROR_CODES.INVALID_USER_ROLE, 'El propietario debe tener rol store');
    }

    return storeRepository.create(storeData);
  },

  updateStore: async (id, storeData) => {
    const store = await storeRepository.update(id, storeData);

    if (!store) {
      throw createError(ERROR_CODES.STORE_NOT_FOUND);
    }

    return store;
  },

  deleteStore: async (id) => {
    const store = await storeRepository.delete(id);

    if (!store) {
      throw createError(ERROR_CODES.STORE_NOT_FOUND);
    }

    return store;
  },
};