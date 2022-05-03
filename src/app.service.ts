import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { ICategory, IInvoice, ILoan, IOrder, IProduct } from './interfaces';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  public async createCategory(category: ICategory): Promise<ICategory | any> {
    const hasCategoryWithSameName = await this.appRepository.findCategoryByName(
      category.name,
    );

    if (hasCategoryWithSameName)
      return { status: false, message: 'Category already exists' };

    return await this.appRepository.createCategory(category);
  }

  public async createProduct(product:IProduct): Promise<IProduct> {
    return await this.appRepository.createProduct(product);
  }

  public async createOrder(): Promise<IOrder> {
    return;
  }

  public async createLoan(): Promise<ILoan> {
    return;
  }

  public async createInvoice(): Promise<IInvoice> {
    return;
  }
}
