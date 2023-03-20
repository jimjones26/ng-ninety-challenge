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

  todos: Todo[] = [];

  createTodo(todo: string) {
    console.log("TODO", todo);
    const newId = uuid.v4();
    let newTodo = {
      id: newId,
      name: todo,
      isComplete: false,
    }
    console.log("NEW TODO:", newTodo);

    this.todos.push(newTodo);
    this.todo = '';
  }
}
