import { Todo } from './../types';
import { createSlice } from "@reduxjs/toolkit";

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.push({
        id: Date.now(),
        name: action.payload.name
      })
    },
    deleteTodo(state, action) {
      return state.filter(todo => todo.id !== action.payload.id)
    },
    deleteAll() {
      return []
    },
    editTodo(state, action) {
      const { id, name } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.name = name;
      }
    }
  },
});

export const { addTodo, deleteTodo, deleteAll, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
