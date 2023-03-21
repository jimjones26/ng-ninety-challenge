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

  newTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);
  editTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);

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

    let todo: any = {
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

  updateTodo(id:string) {
    const newArray = this.todos.map(todo => {
      if (todo.id === id) {
        return {...todo, name: this.editTodo.value}
      }

      return todo;
    })

    this.todos = newArray;
    return this.isEditMode = !this.isEditMode;
  }

  toggleEditMode(id: string) {
    this.isEditMode = !this.isEditMode;
    this.itemToEdit = id;

    if(this.isEditMode) {
      let todo = this.todos.find(item => item.id === id);

      if(todo !== undefined) {
        this.editTodo.setValue(todo.name)
      } else {
        this.editTodo.setValue('')
      }
    }
  }
}
