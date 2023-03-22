import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../stores/Store';

export interface Todo {
  _id: string;
  name: string | null;
  isComplete: boolean;
}

export interface TodoState {
  todos: Todo[],
  isEditMode: boolean,
}

export const initialState: TodoState = {
  todos: [],
  isEditMode: false,
}

@Injectable({ providedIn: 'root' })
export class TodoService extends Store<TodoState> {
  apiURL: string = 'http://localhost:3000/todo';

  constructor(private httpClient: HttpClient) {
    super(initialState);
  }

  getTodos() {
    this.httpClient.get<Todo[]>(`${this.apiURL}/todos`).subscribe((result: any) => {
      this.setState(() => ({
        todos: result
      }))
    });
  }

  addTodo(todo: Todo) {
    this.httpClient.post(`${this.apiURL}/todo`, todo).subscribe({
      next: (data:any) => {
        let newTodo: Todo = {
          _id: data.todo._id,
          name: data.todo.name,
          isComplete: data.todo.isComplete
        }
        this.setState((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      error: error => {
        console.log("THERE WAS AN ERROR: ", error)
      }
    })
  }

  updateTodo(id: string, value: string | null) {
    const currentTodo = this.state.todos.find((todo) => {
      return todo._id === id;
    });
    const updatedTodo: any = {
      _id: id,
      name: value,
      isComplete: currentTodo?.isComplete,
    };
    this.httpClient.put(`${this.apiURL}/edit?todoID=${id}`, updatedTodo).subscribe({
      next: (data:any) => {
        this.setState(() => ({
          todos: this.state.todos.map((todo) => (todo._id === data.todo._id ? data.todo : todo))
        }))
      },
      error: error => {
        console.log('ERROR: ', error);
      }
    })
  }

  deleteTodo(id: string) {
    this.httpClient.delete(`${this.apiURL}/delete?todoID=${id}`).subscribe({
      next: (data: any) => {
        this.setState((state) => ({
          todos: this.state.todos.filter((item) => item._id !== data.todo._id),
        }));
      },
      error: error => {
        console.log('ERROR: ', error);
      }
    })
  }

  toggleEditMode() {
    this.setState(() => ({
      isEditMode: !this.state.isEditMode

    }))
  }

  toggleComplete(id: string) {
    const currentTodo = this.state.todos.find((todo) => {
      return todo._id === id;
    });
    const updatedTodo: any = {
      _id: id,
      name: currentTodo?.name,
      isComplete: currentTodo?.isComplete,
    };
    this.httpClient.put(`${this.apiURL}/edit?todoID=${id}`, updatedTodo).subscribe({
      next: (data:any) => {
        this.setState(() => ({
          todos: this.state.todos.map((todo) => (todo._id === data.todo._id ? data.todo : todo))
        }))
      },
      error: error => {
        console.log('ERROR: ', error);
      }
    })
  }
}
