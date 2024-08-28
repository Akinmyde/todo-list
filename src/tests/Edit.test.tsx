import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { editTodo } from '../redux/reducers';
import { Todo } from '../types';
import EditTodo from '../components/Edit';

// Mocking ReactDOM.createPortal for Modal
jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (node: React.ReactNode) => node
}));

const mockStore = configureStore([]);
const mockTodo: Todo = { id: 1, name: 'Test Todo' };

describe('EditTodo Component', () => {
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


    test('renders the edit icon', () => {
        render(
            <Provider store={store}>
                <EditTodo todo={mockTodo} />
            </Provider>
        );

        expect(screen.getByLabelText('edit')).toBeInTheDocument(); // Assuming the icon renders as an img element
    });

    test('opens the modal when the edit icon is clicked', () => {
        render(
            <Provider store={store}>
                <EditTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('edit'));
        expect(screen.getByText('Update your todo')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    });

    test('allows the user to edit the todo text', () => {
        render(
            <Provider store={store}>
                <EditTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('edit'));
        const input = screen.getByPlaceholderText('Enter your task');

        fireEvent.change(input, { target: { value: 'Updated Todo' } });
        expect(input).toHaveValue('Updated Todo');
    });

    test('dispatches editTodo action and closes the modal when "Save" is clicked', () => {
        render(
            <Provider store={store}>
                <EditTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('edit'));
        const input = screen.getByPlaceholderText('Enter your task');
        fireEvent.change(input, { target: { value: 'Updated Todo' } });

        fireEvent.click(screen.getByText('Save'));

        expect(store.dispatch).toHaveBeenCalledWith(editTodo({ id: 1, name: 'Updated Todo' }));
        expect(screen.queryByText('Update your todo')).not.toBeInTheDocument();
    });

    test('closes the modal without saving when "Cancel" is clicked', () => {
        render(
            <Provider store={store}>
                <EditTodo todo={mockTodo} />
            </Provider>
        );

        fireEvent.click(screen.getByLabelText('edit'));
        const input = screen.getByPlaceholderText('Enter your task');
        fireEvent.change(input, { target: { value: 'Updated Todo' } });

        fireEvent.click(screen.getByText('Cancel'));

        expect(store.dispatch).not.toHaveBeenCalled();
        expect(screen.queryByText('Update your todo')).not.toBeInTheDocument();
    });
}); 
