import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory, IInvoice, ILoan, IOrder, IProduct } from './interfaces';
import {
  Categories,
  CategoryDocument,
  InvoiceDocument,
  Invoices,
  LoanDocument,
  Loans,
  OrderDocument,
  Orders,
  ProductDocument,
  Products,
} from './schemas';

@Injectable()
export class AppRepository {
  constructor(
    @InjectModel(Products.name)
    public readonly productModel: Model<ProductDocument | any>,
    @InjectModel(Loans.name)
    public readonly loanModel: Model<LoanDocument | any>,
    @InjectModel(Orders.name)
    public readonly orderModel: Model<OrderDocument | any>,
    @InjectModel(Categories.name)
    public readonly categoryModel: Model<CategoryDocument | any>,
    @InjectModel(Invoices.name)
    public readonly invoiceModel: Model<InvoiceDocument | any>,
  ) {}

  public async createCategory(category: ICategory): Promise<ICategory> {
    try {
      return await this.categoryModel.create(category);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async createProduct(product: IProduct): Promise<IProduct> {
    try {
      return await this.productModel.create(product);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async updateProductInventory(id:string): Promise<IProduct> {
    try {
      return await this.productModel.findByIdAndUpdate({_id:id},{inventory:{$inc:-1}},{new:true});
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  
  public async createOrder(order: IOrder): Promise<IOrder> {
    try {
      return await this.orderModel.create(order);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async createLoan(loan: ILoan): Promise<ILoan> {
    try {
      return await this.loanModel.create(loan);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async createInvoice(invoice: IInvoice): Promise<IInvoice> {
    try {
      return await this.invoiceModel.create(invoice);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllCategories(): Promise<ICategory[]> {
    try {
      return await this.categoryModel.find().lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findCategoryById(id: string): Promise<ICategory> {
    try {
      return await this.categoryModel
        .findOne()
        .where({
          _id:id
        })
        .lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findCategoryByName(name: string): Promise<ICategory> {
    try {
      return await this.categoryModel
        .findOne()
        .where({
          $or: [{ name: { $regex: name, $options: 'i' } }],
        })
        .lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllProducts(): Promise<IProduct[]> {
    try {
      return await this.productModel
        .find()
        .where({
          inventory: { $gte: 5 },
        })
        .lean();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllOrderByUserId(id: string): Promise<IOrder[]> {
    try {
      return await this.orderModel
        .find()
        .where({
          buyer: id,
          isDeleted: false,
        })
        .lean()
        .sort({
          createdAt: -1,
        });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findProductById(id: string): Promise<IProduct> {
    try {
      return await this.productModel
        .findById({_id:id})
        .where({
          isDeleted: false,
        })
        .lean()
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  

  public async findAllLoans(id: string): Promise<ILoan[]> {
    try {
      return await this.loanModel
        .find()
        .where({
          user: id,
          isDeleted: false,
        })
        .lean()
        .sort({ createdAt: -1 });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async findAllInvoices(id: string): Promise<IInvoice[]> {
    try {
      return await this.productModel
        .find()
        .where({
          payer: id,
          isDeleted: false,
        })
        .lean()
        .sort({
          createdAt: -1,
        });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  //         $or: [
  //           { fullName: { $regex: search, $options: 'i' } },
  //           { phone: { $regex: search, $options: 'i' } },
  //           { email: { $regex: search, $options: 'i' } },
  //           { merchantType: { $regex: search, $options: 'i' } },
  //           { ownerName: { $regex: search, $options: 'i' } },
  //           { address: { $regex: search, $options: 'i' } },
  //         ],
}
