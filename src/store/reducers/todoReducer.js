export const initState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const todoActionTypes = {
  ADD: "ADD_TODO",
  FAILURE: "FAILURE",
  LOADING: "LOADING",
  DELETE: "DELETE",
};

export const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case todoActionTypes.LOADING:
      return { ...state, isLoading: true };

    case todoActionTypes.FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case todoActionTypes.ADD:
      return { ...state, isLoading: false, error: null, todos: action.payload };

    case todoActionTypes.DELETE:
      return {
        ...state,
        isLoading: false,
        error: null,
        todos: action.payload,
      };

    default:
      return state;
  }
};
