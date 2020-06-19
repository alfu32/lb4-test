import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, TodoList} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TodoListRepository} from './todo-list.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly todoLists: HasManyRepositoryFactory<TodoList, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(User, dataSource);
    this.todoLists = this.createHasManyRepositoryFactoryFor('todoLists', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoLists', this.todoLists.inclusionResolver);
  }
}
