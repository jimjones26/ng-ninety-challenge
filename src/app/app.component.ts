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

  isEditMode: boolean = false;
  itemToEdit:string = '';

  createTodo() {
    const newId = uuid.v4();

    let newTodo: any = {
      id: newId,
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
    return this.isEditMode = !this.isEditMode;
  }

  toggleEditMode(id: string) {
    this.isEditMode = !this.isEditMode;
    this.itemToEdit = id;

    if(this.isEditMode) {
      let todo = this.todoService.state.todos.find(item => item.id === id);

      if(todo !== undefined) {
        this.editTodo.setValue(todo.name)
      } else {
        this.editTodo.setValue('')
      }
    }
  }
}
