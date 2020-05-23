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
} from '../actions/types';

const initialState = {
  toolTypes: [],
  operationTypes: [],
  toolType: {},
  operationType: {},
  tooltypeOperations: [],
  tools: null,
  tool: null,
  productAdded: {},
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TOOLTYPES_REQUEST:
      return { ...state, toolTypes: payload };
    case FETCH_OPERATION_TYPES_REQUEST:
      return { ...state, operationTypes: payload };
    case FETCH_TOOLTYPE_REQUEST:
      return { ...state, toolType: payload };
    case FETCH_OPERATION_TYPE_REQUEST:
      return { ...state, operationType: payload };
    case FETCH_TOOLTYPE_OPERATIONS_REQUEST:
      return { ...state, tooltypeOperations: payload };
    case FETCH_TOOLS_REQUEST:
      return { ...state, tools: payload };
    case FETCH_TOOL_REQUEST:
      return { ...state, tool: payload };
    case CLEAR_TOOL:
      return { ...state, tool: null };
    case ADD_PRODUCT:
      return { ...state, productAdded: payload };
    case RESET_PRODUCT:
      return { ...state, productAdded: payload };
    default:
      return state;
  }
};

export default productsReducer;
