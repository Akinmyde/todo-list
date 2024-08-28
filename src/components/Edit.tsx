import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Todo } from "../types";
import { editTodo } from "../redux/reducers";
import Modal from "./Modal";
import { useAppDispatch } from "../redux/hooks";

type Props = {
    todo: Todo;
}

const EditTodo = ({ todo }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(todo.name)

    return (
        <>
            <Modal
                isOpen={showModal} title="Update your todo"
                acceptAction={() => {
                    dispatch(editTodo({ id: todo.id, name: value }))
                    setShowModal(false)
                }}
                closeAction={() => setShowModal(false)}
                acceptValue='Save'
                rejectValue='Cancel'
            >
                <input value={value} onChange={e => setValue(e.target.value)} className='modal-input' placeholder='Enter your task' />
            </Modal>
            <div aria-label='edit' onClick={() => setShowModal(true)} className='icon-wrapper'>
                <FaEdit size={15} />
            </div>
        </>
    )
}

export default EditTodo;
