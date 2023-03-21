import { Injectable } from '@angular/core';

import { Store } from '../stores/Store';

export interface Todo {
  id: string;
  name: string | null;
  isComplete: boolean;
}

export interface TodoState {
  todos: Todo[]
}

export const initialState: TodoState = {
  todos: [
    {
      id: '1',
      name: " Buy the milk",
      isComplete: false,
    },
    {
      id: '2',
      name: "Buy the bread",
      isComplete: false,
    },
    {
      id: '3',
      name: "Buy the lunchmeat",
      isComplete: false,
    },
    {
      id: '4',
      name: "Make lunch",
      isComplete: false,
    }
  ]
}

@Injectable({ providedIn: 'root' })
export class TodoService extends Store<TodoState> {
  constructor() {
    super(initialState);
  }

  addTodo(todo: Todo) {
    this.setState((state) => ({
      todos: [...state.todos, todo],
    }));
  }

  updateTodo(id: string, value: string | null) {
    const currentTodo = this.state.todos.find((todo) => {
      return todo.id === id;
    });
    const updatedTodo: any = {
      id: id,
      name: value,
      isComplete: currentTodo?.isComplete,
    };

    this.setState(() => ({
      todos: this.state.todos.map((todo) => (todo.id === id ? updatedTodo : todo))
    }))
  }

  deleteTodo(id: string) {
    this.setState((state) => ({
      todos: this.state.todos.filter((item) => item.id !== id),
    }));
  }
}
