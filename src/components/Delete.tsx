import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Todo } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { deleteTodo } from "../redux/reducers";
import Modal from "./Modal";

type Props = {
    todo: Todo;
}

const DeleteTodo = ({ todo }: Props) => {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Modal
                isOpen={showModal} title="Are you sure you want to delete?"
                acceptAction={() => {
                    dispatch(deleteTodo(todo))
                    setShowModal(false)
                }}
                closeAction={() => setShowModal(false)}
                acceptValue='Yes'
                rejectValue='No'
            />
            <div aria-label='delete' onClick={() => setShowModal(true)} className='icon-wrapper'>
                <FaRegTrashAlt size={15} />
            </div>
        </>
    )
}

export default DeleteTodo;
