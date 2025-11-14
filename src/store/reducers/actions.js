import { todoActionTypes } from "./todoReducer";

const URL = "https://6af8aede42622af5.mokky.dev/todos";

const getTodosFailure = (error) => ({
  type: todoActionTypes.FAILURE,
  payload: error,
});

const getTodosSuccess = (todos) => ({
  type: todoActionTypes.ADD,
  payload: todos,
});

const getTodosPending = () => ({
  type: todoActionTypes.LOADING,
});

export const getTodos = () => {
  return async (dispatch) => {
    try {
      dispatch(getTodosPending());

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      dispatch(getTodosSuccess(data));
    } catch (error) {
      dispatch(getTodosFailure(error.toString()));
    }
  };
};

export const addTodo = (task) => {
  return async (dispatch) => {
    try {
      dispatch(getTodosPending());

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, isCompleted: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      dispatch(getTodos());
    } catch (error) {
      dispatch(getTodosFailure(error.toString()));
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getTodosPending());

      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      dispatch(getTodos());
    } catch (error) {
      dispatch(getTodosFailure(error.toString()));
    }
  };
};

export const editTodo = (id, updates) => {
  return async (dispatch) => {
    try {
      dispatch(getTodosPending());

      const response = await fetch(`${URL}/${id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      dispatch(getTodos());
    } catch (error) {
      dispatch(getTodosFailure(error.toString()));
    }
  };
};
