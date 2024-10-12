import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { Category } from "../model/model";

export interface IQueryRepository {
  get(id: string): Promise<Category | null>;
  list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[] | null>;
}

export interface ICommandRepository {
  insert(data: Category): Promise<boolean>;
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IRepository extends IQueryRepository, ICommandRepository {}

export interface ICategoryUseCase {
  create(data: CategoryCreateDTO): Promise<string>,
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>,
  get(id: string): Promise<Category | null>;
  list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}
