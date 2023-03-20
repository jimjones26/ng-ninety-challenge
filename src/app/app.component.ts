import { Component } from '@angular/core';

import { Todo } from "./todo";

import * as uuid from "uuid";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninety.io Coding Challenge';

  todo: string = '';

  todos: Todo[] = [
    {
      id: '1',
      name: "Test Todo",
      isComplete: false,
    },
    {
      id: '2',
      name: "Test Todo 2",
      isComplete: true,
    }
  ];

  createTodo(todo: string) {
    const newId = uuid.v4();
    let newTodo = {
      id: newId,
      name: todo,
      isComplete: false,
    }

    this.todos.push(newTodo);
    this.todo = '';
  }

  deleteTodo(id: string) {
    let newArray = this.todos.filter((todo: Todo) => todo.id !== id);

    return this.todos = newArray;
  }
}
