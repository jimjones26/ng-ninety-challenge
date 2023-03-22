import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as uuid from "uuid";

import { TodoService, Todo } from '../services/todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;
  isEditMode$: Observable<Boolean> | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    this.todos$ = this.todoService.select((state) => state.todos);
    this.isEditMode$ = this.todoService.select((state) => state.isEditMode);
  }

  newTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);
  editTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);

  isEditMode: boolean = false;
  itemToEdit:string = '';

  createTodo() {
    let newTodo: any = {
      name: this.newTodo.value?.toString(),
      isComplete: false,
    }

    this.todoService.addTodo(newTodo);
    this.newTodo.reset();
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }

  updateTodo(id:string) {
    this.todoService.updateTodo(id, this.editTodo.value)
    this.todoService.toggleEditMode();
  }

  toggleEditMode(id: string) {
    this.todoService.toggleEditMode();
    this.itemToEdit = id;
    if(this.isEditMode$) {
      let todo = this.todoService.state.todos.find(item => item._id === id);
      if(todo !== undefined) {
        this.editTodo.setValue(todo.name)
      } else {
        this.editTodo.setValue('')
      }
    }
  }

  toggleComplete(id: string) {
    this.todoService.toggleComplete(id);
  }
}
