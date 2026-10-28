import { storeService } from '../service/store.service.js';
import { successResponse } from '../utils/apiResponse.js';

export const getStores = async (req, res, next) => {
  try {
    const stores = await storeService.getStores();
    successResponse(res, { message: 'Lista de comercios', payload: stores });
  } catch (error) {
    next(error);
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const store = await storeService.getStoreById(req.params.sid);
    successResponse(res, { message: 'Comercio obtenido', payload: store });
  } catch (error) {
    next(error);
  }
};

export const createStore = async (req, res, next) => {
  try {
    const store = await storeService.createStore(req.body);
    successResponse(res, { statusCode: 201, message: 'Comercio creado', payload: store });
  } catch (error) {
    next(error);
  }
};

export const updateStore = async (req, res, next) => {
  try {
    const store = await storeService.updateStore(req.params.sid, req.body);
    successResponse(res, { message: 'Comercio actualizado', payload: store });
  } catch (error) {
    next(error);
  }
};

export const deleteStore = async (req, res, next) => {
  try {
    const store = await storeService.deleteStore(req.params.sid);
    successResponse(res, { message: 'Comercio eliminado', payload: store });
  } catch (error) {
    next(error);
  }
};