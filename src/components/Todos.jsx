import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import styled from "styled-components";
import { addTodo, deleteTodo, getTodos } from "../store/reducers/actions";

const Todos = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = formData.get("task");

    if (task) {
      dispatch(addTodo(task));
      e.target.reset();
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Container>
      <FormTitle>Todo-List</FormTitle>

      <FormContainer onSubmit={onSubmitHandler}>
        <FormGroup>
          <Input type="text" name="task" id="task" placeholder="Enter a task" required />
        </FormGroup>
        <SubmitButton type="submit">Add</SubmitButton>
      </FormContainer>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <TodoList>
        {todos?.length ? (
          todos.map((todo) => <Todo key={todo.id} onDelete={handleDelete} {...todo} />)
        ) : (
          !isLoading && <NoTodosMessage>No todos available</NoTodosMessage>
        )}
      </TodoList>
    </Container>
  );
};

export default Todos;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 2rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #103256;
`;

const FormContainer = styled.form`
  width: 450px;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #561710;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #4c1e10;
  }
`;

const TodoList = styled.div`
  width: 500px;
`;

const NoTodosMessage = styled.p`
  text-align: center;
  color: #666;
`;
