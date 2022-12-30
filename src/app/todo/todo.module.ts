import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoComponent } from './todo.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { AuthGuard } from '../guard/auth.guard';
import { PipeModule } from '../pipe/shared.module';

const todoRoutes: Route[] = [
  // { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] }
  {
    path: 'todos', component: TodoComponent, canActivate: [AuthGuard], children: [
      { path: '', component: TodoStartComponent, pathMatch: 'full' },
      // { path: ':type', component: TodoListComponent, outlet: 'list' },
      { path: ':id', component: TodoEditComponent, },
    ]
  }
]

@NgModule({
  declarations: [
    TodoComponent,
    TodoStartComponent,
    TodoEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(todoRoutes),
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ]
})
export class TodoModule { }
