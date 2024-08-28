import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../components/Modal';

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node: React.ReactNode) => node
}));

describe('Modal Component', () => {
    const mockAcceptAction = jest.fn();
    const mockCloseAction = jest.fn();
    
    const defaultProps = {
        isOpen: true,
        title: 'Test Modal',
        acceptValue: 'Accept',
        rejectValue: 'Reject',
        acceptAction: mockAcceptAction,
        closeAction: mockCloseAction,
        children: <p>Modal Content</p>,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers(); // Clear any active timers
        jest.restoreAllMocks(); // Restore all mocked functions to their original state
    });

    test('renders the modal when isOpen is true', () => {
        render(<Modal {...defaultProps} />);
        
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
        expect(screen.getByText('Accept')).toBeInTheDocument();
        expect(screen.getByText('Reject')).toBeInTheDocument();
    });

    test('does not render the modal when isOpen is false', () => {
        render(<Modal {...defaultProps} isOpen={false} />);
        
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('calls closeAction when clicking the close button', () => {
        render(<Modal {...defaultProps} />);
        
        fireEvent.click(screen.getByText('Reject'));
        expect(mockCloseAction).toHaveBeenCalledTimes(1);
    });

    test('calls acceptAction when clicking the accept button', () => {
        render(<Modal {...defaultProps} />);
        
        fireEvent.click(screen.getByText('Accept'));
        expect(mockAcceptAction).toHaveBeenCalledTimes(1);
    });

    test('does not propagate click event when clicking inside the modal content', () => {
        render(<Modal {...defaultProps} />);
        
        const modalContent = screen.getByRole('dialog');
        fireEvent.click(modalContent);

        expect(mockCloseAction).not.toHaveBeenCalled();
    });
});
