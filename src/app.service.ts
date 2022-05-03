import { Inject, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { OrderStatus } from './enums';
import {
  ICategory,
  IInvoice,
  ILoan,
  IMonthPeriod,
  IOrder,
  IProduct,
} from './interfaces';
import * as moment from 'moment';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly appRepository: AppRepository,
    @Inject('USERS_CONTROL') private readonly user: ClientProxy,
  ) {}

  public async createCategory(category: ICategory): Promise<ICategory | any> {
    const hasCategoryWithSameName = await this.appRepository.findCategoryByName(
      category.name,
    );

    if (hasCategoryWithSameName)
      return { status: false, message: 'Category already exists' };

    return await this.appRepository.createCategory(category);
  }

  public async createProduct(product: IProduct): Promise<IProduct> {
    return await this.appRepository.createProduct(product);
  }

  public async createOrder(body: any): Promise<IOrder | any> {
    let order: IOrder;
    let monthPeriod: IMonthPeriod;
    let monthPeriodsArr: IMonthPeriod[] = [];
    let loan: ILoan;
    let invoice: IInvoice;

    if (body.order.paymentMethod == 'credit') {
      if (body.order.paymentMonthPeriod && body.order.paymentMonthPeriod > 0) {
        order = {
          isCash: false,
          isCredit: true,
          deliveryMethod: body.order.deliveryMethod,
          address: body.order.address,
          product: body.product._id,
          buyer: body.user._id,
          name: new Date().getTime().toString(),
          status: OrderStatus.ORDER_RECEIVED,
          seller: body.product.merchant,
        };

        const createdOrder = await this.appRepository.createOrder(order);

        if (!createdOrder)
          return { success: false, message: 'Cant create order' };

        let productPrice = body.product.price;
        let monthlyPaymentPrice = Number(
          (body.product.price / body.order.paymentMonthPeriod).toFixed(2),
        );

        for (let i = 1; i <= body.order.paymentMonthPeriod; i++) {
          let graceDate: any;
          let date: any;
          if (moment().date() >= 20) {
            graceDate = moment()
              .add(i + 1, 'month')
              .add(10, 'day')
              .toISOString();
            date = moment()
              .add(i + 1, 'month')
              .toISOString();
          } else {
            graceDate = moment().add(i, 'month').add(10, 'day').toISOString();
            date = moment().add(i, 'month').toISOString();
          }

          if (i < body.order.paymentMonthPeriod) {
            productPrice = Number(
              (productPrice - monthlyPaymentPrice).toFixed(2),
            );
          }

          monthPeriod = {
            graceDate: graceDate,
            paid: 0,
            toBePayed:
              i < body.order.paymentMonthPeriod
                ? monthlyPaymentPrice
                : productPrice,
            paymentDate: date,
          };

          monthPeriodsArr.push(monthPeriod);
        }

        invoice = {
          order: { _id: createdOrder._id },
          payer: body.user._id,
          isPaid: false,
          paidDate: monthPeriodsArr[monthPeriodsArr.length - 1].graceDate,
          isCompleted: false,
        };

        let newInvoice = await this._createInvoice(invoice);

        loan = {
          invoice: {
            _id: newInvoice._id,
          },
          isCompleted: false,
          monthlyPeriod: monthPeriodsArr,
          user: body.user._id,
        };

        let newloan = await this._createLoan(loan);

        return newloan;
      }
    }else{

      const canPay = await this.user.send({cmd:'pay_order'},{userId:body.user._id, price:body.product.price}).toPromise().then(data => data); 
      if(!canPay){
        return {
          status:false,
          message:'You do not have enough funds in your balance'
        }
      }



      order = {
        isCash: true,
        isCredit: false,
        deliveryMethod: body.order.deliveryMethod,
        address: body.order.address,
        product: body.product._id,
        buyer: body.user._id,
        name: new Date().getTime().toString(),
        status: OrderStatus.ORDER_RECEIVED,
        seller: body.product.merchant,
      };

      const createdOrder = await this.appRepository.createOrder(order);

      let payDate = moment().toISOString()

      invoice = {
        order: { _id: createdOrder._id },
        payer: body.user._id,
        isPaid: true,
        paidDate: new Date(payDate),
        isCompleted: true,
      };

      let newInvoice = await this._createInvoice(invoice);

      console.log(invoice)

      return newInvoice;
    
    }
  }

  private async _createLoan(loan: ILoan): Promise<ILoan> {
    return await this.appRepository.createLoan(loan);
  }

  private async _createInvoice(invoice: IInvoice): Promise<IInvoice> {
    return await this.appRepository.createInvoice(invoice);
  }
  

  private async _updateProductInventoryCount(id:string): Promise<IInvoice> {
    return await this.appRepository.updateProductInventory(id);
  }

  public async getProductById(productId: string): Promise<IInvoice> {
    return await this.appRepository.findProductById(productId);
  }
}
