import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, distinctUntilChanged } from 'rxjs';

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
}
