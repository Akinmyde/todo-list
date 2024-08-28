import { useState } from 'react';
import './App.css';
import TodoList from './components/Todos';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addTodo } from './redux/reducers';

const App = () => {
  const [todoValue, setTodoValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const onAddToList = () => {
    // Ensure the user can't create an empty todo
    if (todoValue.length <= 0) {
      setError('Enter a name for your todo')
    } else {
      dispatch(addTodo({ name: todoValue }))
      setTodoValue('')
      setError('')
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h3 className='h3'>Procode Todo Lists</h3>
          <div>
            <input required value={todoValue} onChange={e => setTodoValue(e.target.value)} className='input' placeholder='Enter your task' />
            <button onClick={onAddToList} className='button'>Add</button>
          </div>
          <div>
            <p className='danger error'>{error}</p>
          </div>
          {!todos.length ? (
            <></>
          ) :
            <TodoList todos={todos} />
          }
        </header>
      </div>
    </>
  );
}

export default App;
