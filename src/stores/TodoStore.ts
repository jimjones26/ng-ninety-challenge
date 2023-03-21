import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, distinctUntilChanged } from 'rxjs';

export interface Todo {
  id: string;
  name: string | null;
  isComplete: boolean;
}

export interface TodoState {
  todos: Todo[]
}

export const initialState: TodoState = {
  todos: [
    {
      id: '1',
      name: " Buy the milk",
      isComplete: false,
    },
    {
      id: '2',
      name: "Buy the bread",
      isComplete: false,
    },
    {
      id: '3',
      name: "Buy the lunchmeat",
      isComplete: false,
    },
    {
      id: '4',
      name: "Make lunch",
      isComplete: false,
    }
  ]
}

@Injectable({providedIn: 'root'})
export class TodoStore {
  private _state: BehaviorSubject<TodoState>;

  constructor() {
    this._state = new BehaviorSubject<TodoState>(initialState)
  }

  get state$(): Observable<TodoState> {
    return this._state.asObservable();
  }

  get state(): TodoState {
    return this._state.getValue();
  }

  setState<K extends keyof TodoState, E extends Partial<Pick<TodoState, K>>>(
    fn: (state: TodoState) => E
  ): TodoState {
    const state = fn(this.state);
    this._state.next({ ...this.state, ...state });
    return this.state;
  }

  select<K>(selector: (state: TodoState) => K): Observable<K> {
    return this.state$.pipe(map(selector), distinctUntilChanged());
  }
}
