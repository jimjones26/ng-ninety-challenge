import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ninety.io Coding Challenge';

  todo: any;

  todos = [];

  createTodo(todo: any) {
console.log("TODO", todo);

  }
}
