import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';

type Props = {
    isOpen: boolean;
    title: string;
    acceptValue: string;
    rejectValue: string;
    acceptAction: () => void;
    closeAction: () => void;
    children?: React.ReactNode;
}

const Modal = ({ title, isOpen, acceptAction, closeAction, rejectValue, acceptValue, children }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeAction();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            if (modalRef.current) {
                modalRef.current.focus(); // Focus the modal for accessibility
            }
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeAction]);

    if (!isOpen) return null
    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={closeAction}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                ref={modalRef}
            >
                <div className="flex-container">
                    <h3>{title}</h3>
                    <span onClick={closeAction} className="close-modal">&times;</span>
                </div>
                {children}
             <div className="modal-button-wrapper">
                 <button onClick={closeAction} className='cancel button'>{rejectValue}</button>
                 <button onClick={acceptAction} className='button'>{acceptValue}</button>
             </div>
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    )
}

export default Modal;

