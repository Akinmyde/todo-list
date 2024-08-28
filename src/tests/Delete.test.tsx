import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { deleteTodo } from '../redux/reducers';
import { Todo } from '../types';
import DeleteTodo from '../components/Delete';

// Mocking ReactDOM.createPortal for Modal
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node: React.ReactNode) => node
}));

const mockStore = configureStore([]);
const mockTodo: Todo = { id: 1, name: 'Test Todo' };

describe('DeleteTodo Component', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            todos: [mockTodo],
        });

        store.dispatch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllTimers(); // Clear any active timers
        jest.restoreAllMocks(); // Restore all mocked functions to their original state
    });

    test('renders the delete icon', () => {
        render(
            <Provider store={store}>
                <DeleteTodo todo={mockTodo} />
            </Provider>
        );

        expect(screen.getByLabelText('delete')).toBeInTheDocument(); // Assuming the icon renders as an img element
    });

    test('opens the modal when the delete icon is clicked', () => {
        render(
            <Provider store={store}>
                <DeleteTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('delete'));
        expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    });

    test('dispatches deleteTodo action and closes the modal when "Yes" is clicked', () => {
        render(
            <Provider store={store}>
                <DeleteTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('delete'));
        fireEvent.click(screen.getByText('Yes'));

        expect(store.dispatch).toHaveBeenCalledWith(deleteTodo(mockTodo));
        expect(screen.queryByText('Are you sure you want to delete?')).not.toBeInTheDocument();
    });

    test('closes the modal when "No" is clicked', () => {
        render(
            <Provider store={store}>
                <DeleteTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('delete'));
        fireEvent.click(screen.getByText('No'));

        expect(store.dispatch).not.toHaveBeenCalled();
        expect(screen.queryByText('Are you sure you want to delete?')).not.toBeInTheDocument();
    });
});
