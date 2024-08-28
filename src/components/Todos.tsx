import { useState } from "react";
import DeleteTodo from "./Delete";
import EditTodo from "./Edit";
import { Todo } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { deleteAll } from "../redux/reducers";

type Props = {
    todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
    const dispatch = useAppDispatch()
    const [markAsDone, setMarkAsDone] = useState(false)

    const toggleCompletion = () => {
        setMarkAsDone(!markAsDone)
    }

    if (!todos.length) {
        return <></>
    }
    return (
        <>
            {todos.map((todo, index) => (
                <div key={index} className='todo-container'>
                    <div className='flex-container'>
                        <div onClick={toggleCompletion} >
                            <p className={`paragraph ${markAsDone ? 'completed' : ''} `}>{todo.name}</p>
                        </div>
                        <div className='flex-container'>
                            <DeleteTodo todo={todo} />
                            <EditTodo todo={todo} />
                        </div>
                    </div>
                </div>
            ))}
            <div>
                <button onClick={() => dispatch(deleteAll())} className='button delete-button danger'>Delete All</button>
            </div>
        </>
    )
}

export default TodoList;
