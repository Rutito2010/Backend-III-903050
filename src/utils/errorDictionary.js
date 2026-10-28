export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR : "INTERNAL_SERVER_ERROR",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",

  USER_NOT_FOUND: "USER_NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_USER_ROLE: "INVALID_USER_ROLE",
  ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
  STORE_NOT_FOUND: "STORE_NOT_FOUND",
  INVALID_ORDER_STATUS: "INVALID_ORDER_STATUS",
  INVALID_MOCK_AMOUNT: "INVALID_MOCK_AMOUNT"
}

export const ERROR_DICTIONARY = {
  "ORDER_NOT_FOUND": {
    statusCode: 404,
    message: "Pedido no encontrado"
  },

  "STORE_NOT_FOUND": {
    statusCode: 404,
    message: "Comercio no encontrado"
  },

  "INVALID_ORDER_STATUS": {
    statusCode: 400,
    message: "Estado de pedido invalido"
  },

  "INVALID_MOCK_AMOUNT": {
    statusCode: 400,
    message: "Cantidad de mocks invalida"
  },


  "INTERNAL_SERVER_ERROR": {
    statusCode: 500,
    message: "Error interno en el servidor"
  },

  "ROUTE_NOT_FOUND": {
    statusCode: 404,
    message: "Ruta no encontrada"
  },

  "USER_NOT_FOUND": {
    statusCode: 404,
    message: "Usuario no encontrado"
  },

  "VALIDATION_ERROR": {
    statusCode: 400,
    message: "Faltan datos obligatorios"
  },

  "INVALID_USER_ROLE": {
    statusCode: 400,
    message: "Rol invalido"
  }
}
