import { Component } from '@angular/core';

import { Todo } from "./todo";

import * as uuid from "uuid";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninety.io Coding Challenge';

  // declare a var to hold a new todo

  newTodo = new FormControl('', [Validators.required, Validators.minLength(4)]);

  //todo: string = '';
  isEditMode: boolean = false;
  itemToEdit:string = '';

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

  createTodo() {
    const newId = uuid.v4();

    let todo = {
      id: newId,
      name: this.newTodo.value?.toString(),
      isComplete: false,
    }

    this.todos.push(todo);
    this.newTodo.reset();
  }

  deleteTodo(id: string) {
    let newArray = this.todos.filter((todo: Todo) => todo.id !== id);

    return this.todos = newArray;
  }

  toggleEditMode(id:string) {
    this.isEditMode = !this.isEditMode;
    this.itemToEdit = id;
  }
}
