import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { deleteAll } from '../redux/reducers';
import { Todo } from '../types';
import TodoList from '../components/Todos';

// Mocking DeleteTodo and EditTodo components
jest.mock('../components/Delete', () => ({ todo, ...props }: { todo: Todo }) => (
    <button {...props} aria-label={`Delete ${todo.name}`}>Delete</button>
));

jest.mock('../components/Edit', () => ({ todo, ...props }: { todo: Todo }) => (
    <button {...props} aria-label={`Edit ${todo.name}`}>Edit</button>
));

const mockStore = configureStore([]);

describe('TodoList Component', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            todos: [] as Todo[],
        });

        store.dispatch = jest.fn();
    });

    test('does not render anything if todos array is empty', () => {
        render(
            <Provider store={store}>
                <TodoList todos={[]} />
            </Provider>
        );

        expect(screen.queryByRole('button', { name: /Delete All/i })).not.toBeInTheDocument();
    });

    test('renders todo items and delete/edit buttons', () => {
        const todos: Todo[] = [{ id: 1, name: 'Test Todo' }];

        render(
            <Provider store={store}>
                <TodoList todos={todos} />
            </Provider>
        );

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Delete Test Todo/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Edit Test Todo/i })).toBeInTheDocument();
    });

    test('toggles completion of a todo item', () => {
        const todos: Todo[] = [{ id: 1, name: 'Test Todo' }];

        render(
            <Provider store={store}>
                <TodoList todos={todos} />
            </Provider>
        );

        const todoParagraph = screen.getByText('Test Todo');
        expect(todoParagraph).not.toHaveClass('completed');

        fireEvent.click(todoParagraph);
        expect(todoParagraph).toHaveClass('completed');
    });

    test('dispatches deleteAll action when "Delete All" button is clicked', () => {
        const todos: Todo[] = [{ id: 1, name: 'Test Todo' }];

        render(
            <Provider store={store}>
                <TodoList todos={todos} />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /Delete All/i }));
        expect(store.dispatch).toHaveBeenCalledWith(deleteAll());
    });
});
