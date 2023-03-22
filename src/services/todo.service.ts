import { HttpClient } from '@angular/common/http';
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
  todos: []
}

@Injectable({ providedIn: 'root' })
export class TodoService extends Store<TodoState> {
  apiURL: string = 'http://localhost:3000/todo';

  constructor(private httpClient: HttpClient) {
    super(initialState);
  }

  getTodos() {
    this.httpClient.get<Todo[]>(`${this.apiURL}/todos`).subscribe((result: any) => {
      console.log("RESULT: ", result);
      this.setState(() => ({
        todos: result
      }))
    });
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
