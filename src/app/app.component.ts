import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as uuid from "uuid";

import { TodoService, Todo } from 'src/services/Task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.select((state) => state.todos);
  }

  newTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);
  editTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);

  //todo: string = '';
  isEditMode: boolean = false;
  itemToEdit:string = '';

  /* createTodo() {
    const newId = uuid.v4();

    let todo: any = {
      id: newId,
      name: this.newTodo.value?.toString(),
      isComplete: false,
    }

    this.todos.push(todo);
    this.newTodo.reset();
  } */

  createTodo() {
    const newId = uuid.v4();

    let newTodo: any = {
      id: newId,
      name: this.newTodo.value?.toString(),
      isComplete: false,
    }

    this.todoService.addTodo(newTodo);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  updateTodo(id:string) {
    /* const newArray = this.todos.map(todo => {
      if (todo.id === id) {
        return {...todo, name: this.editTodo.value}
      }

      return todo;
    })

    this.todos = newArray;
    return this.isEditMode = !this.isEditMode; */
  }

  toggleEditMode(id: string) {
  /*   this.isEditMode = !this.isEditMode;
    this.itemToEdit = id;

    if(this.isEditMode) {
      let todo = this.todos.find(item => item.id === id);

      if(todo !== undefined) {
        this.editTodo.setValue(todo.name)
      } else {
        this.editTodo.setValue('')
      }
    } */
  }
}
