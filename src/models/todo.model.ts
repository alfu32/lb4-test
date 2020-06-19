import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TodoList} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  status?: string;


  @property({type: 'date'}) created?: Date;
  @property({type: 'date'}) updated?: Date;
  @property({type: 'date'}) dueDate?: Date;

  @belongsTo(() => TodoList, {name: 'todos'})
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
