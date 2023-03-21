import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo, TodoStore } from 'src/stores/TodoStore';
import { Observable } from 'rxjs';

import * as uuid from "uuid";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;

  constructor(private todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todos$ = this.todoStore.select((state) => state.todos);
  }
  title = 'Ninety.io Coding Challenge';

  newTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);
  editTodo = new FormControl('', [Validators.required, Validators.minLength(2)]);

  //todo: string = '';
  isEditMode: boolean = false;
  itemToEdit:string = '';

  todos: Todo[] = [

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
