import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { editTodo } from "../store/reducers/actions";

const Todo = ({ task, id, onDelete, isCompleted }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task);

  const handleToggleComplete = () => {
    dispatch(editTodo(id, { isCompleted: !isCompleted }));
  };

  const startEditing = () => {
    setIsEditing(true);
    setValue(task); 
  };

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    dispatch(editTodo(id, { task: trimmed }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(task);
    setIsEditing(false);
  };

  return (
    <StyledTodoItem>
      <Checkbox
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggleComplete}
      />

      {isEditing ? (
        <EditInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <TaskText
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {task}
        </TaskText>
      )}

      <StyledButtonsContainer>
        {isEditing ? (
          <>
            <StyledButton onClick={handleSave}>save</StyledButton>
            <StyledButton onClick={handleCancel}>cancel</StyledButton>
          </>
        ) : (
          <>
            <StyledButton onClick={() => onDelete(id)}>delete</StyledButton>
            <StyledButton onClick={startEditing}>edit</StyledButton>
          </>
        )}
      </StyledButtonsContainer>
    </StyledTodoItem>
  );
};

export default Todo;


const StyledTodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TaskText = styled.span`
  flex-grow: 1;
  margin-right: 1rem;
  font-size: 1.1rem;
  color: #103256;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const EditInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-right: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #561610;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #b32d00;
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;
