import axios from "axios";
import {
  IBrandQueryRepository,
  ICategoryQueryRepository,
} from "../../interface";
import {
  ProductBrand,
  ProductBrandSchema,
  ProductCategory,
} from "../../model/model";

export class RPCProductBrandRepository implements IBrandQueryRepository {
  constructor(private readonly baseURL: string) {}

  async get(id: string): Promise<ProductBrand | null> {
    try {
      const { data } = await axios.get(`${this.baseURL}/brands/${id}`);
      const brands = ProductBrandSchema.parse(data.data);

      return brands;
    } catch (error) {
      return null;
    }
  }
}

export class RPCProductCategoryRepository implements ICategoryQueryRepository {
  constructor(private readonly baseURL: string) {}

  async get(id: string): Promise<ProductCategory | null> {
    try {
      const { data } = await axios.get(`${this.baseURL}/categories/${id}`);
      const category = ProductBrandSchema.parse(data.data);

      return category;
    } catch (error) {
      return null;
    }
  }
}

export class ProxyProductBrandRepository implements IBrandQueryRepository {
  constructor(private readonly origin: IBrandQueryRepository) {}

  private cached: Record<string, ProductBrand> = {};

  get(id: string): Promise<ProductBrand | null> {
    try {
      if (this.cached[id]) {
        return this.cached[id] as any;
      }

      const brand = this.origin.get(id);

      if (brand) {
        this.cached[id] = brand as any;
      }

      return brand;
    } catch (error) {
      throw error;
    }
  }
}
