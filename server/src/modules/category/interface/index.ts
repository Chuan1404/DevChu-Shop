import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { BrandCreateDTO, BrandUpdateDTO } from "../../brand/model/dto";
import {
  CategoryCondDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../model/dto";
import { Category } from "../model/model";

export interface ICategoryReposity
  extends IRepository<Category, CategoryCondDTO, CategoryUpdateDTO> {}

export interface ICategoryUseCase {
  create(data: CategoryCreateDTO): Promise<string>;
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Category | null>;
  list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}

export interface ListQuery {
  cond: CategoryCondDTO,
  paging: PagingDTO
}

export interface GetQuery {
  id: string
}

export interface CreateCommand {
  data: BrandCreateDTO;
}

export interface UpdateCommand {
  id: string,
  data: BrandUpdateDTO;
}

export interface DeleteCommand {
  id: string,
  isHard: boolean
}