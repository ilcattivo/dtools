import axios from 'axios';
import {
  FETCH_TOOLTYPES_REQUEST,
  FETCH_OPERATION_TYPES_REQUEST,
  FETCH_TOOLTYPE_REQUEST,
  FETCH_OPERATION_TYPE_REQUEST,
  FETCH_TOOLTYPE_OPERATIONS_REQUEST,
  FETCH_TOOLS_REQUEST,
  FETCH_TOOL_REQUEST,
  CLEAR_TOOL,
  ADD_PRODUCT,
  RESET_PRODUCT,
} from './types';

const PRODUCT_SERVER = '/api/product';

export const getToolTypes = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/tool-types`)
    .then((response) => response.data);

  return {
    type: FETCH_TOOLTYPES_REQUEST,
    payload: request,
  };
};

export const getOperationTypes = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/operation-types`)
    .then((response) => response.data);

  return {
    type: FETCH_OPERATION_TYPES_REQUEST,
    payload: request,
  };
};

export const getToolTypeByShortname = (shortname) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/tool-types?shortname=${shortname}`)
    .then((response) => response.data);

  return {
    type: FETCH_TOOLTYPE_REQUEST,
    payload: request,
  };
};

export const getOperationTypeByShortname = (shortname) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/operation-types?shortname=${shortname}`)
    .then((response) => response.data[0]);

  return {
    type: FETCH_OPERATION_TYPE_REQUEST,
    payload: request,
  };
};

export const getTooltypeOperations = (id) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/operation-types?tooltype=${id}`)
    .then((response) => response.data);

  return {
    type: FETCH_TOOLTYPE_OPERATIONS_REQUEST,
    payload: request,
  };
};

export const getOperationTypeById = (id) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/operation-types?id=${id}`)
    .then((response) => response.data);

  return {
    type: FETCH_OPERATION_TYPE_REQUEST,
    payload: request,
  };
};

export const getToolsByOperationType = (opType) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/tools?operation=${opType}`)
    .then((response) => response.data);

  return {
    type: FETCH_TOOLS_REQUEST,
    payload: request,
  };
};

export const getToolById = (id) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/tools?id=${id}`)
    .then((response) => response.data);

  return {
    type: FETCH_TOOL_REQUEST,
    payload: request,
  };
};

export const clearTool = () => {
  return {
    type: CLEAR_TOOL,
  };
};

export const addProduct = (data) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/tools`, data)
    .then((response) => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
};

export const resetProduct = () => {
  return {
    type: RESET_PRODUCT,
    payload: {},
  };
};
