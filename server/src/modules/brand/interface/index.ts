import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";
import { Brand } from "../model/model";

export interface IBrandReposity extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {}

export interface IBrandUseCase {
  create(data: BrandCreateDTO): Promise<string>;
  update(id: string, data: BrandUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Brand | null>;
  list(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}
