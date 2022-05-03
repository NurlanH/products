import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { IInvoice, ILoan, IOrder, IProduct } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_category' })
  async createCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createCategory(data);
  }

  @MessagePattern({ cmd: 'create_product' })
  public async createProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createProduct(data);
  }

  @MessagePattern({ cmd: 'create_order' })
  public async createOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.createOrder(data);
  }

 
  @MessagePattern({ cmd: 'get_product_by_id' })
  public async getProductById(@Payload() data: any, @Ctx() context: RmqContext) {
    return await this.appService.getProductById(data);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  public async getAllProducts(@Payload() data: any, @Ctx() context: RmqContext): Promise<IProduct[]> {
    return await this.appService.getAllProducts(data);
  }

  @MessagePattern({ cmd: 'get_all_orders' })
  public async getAllOrders(): Promise<IOrder[]> {
    return await this.appService.getAllOrders();
  }
 

  @MessagePattern({ cmd: 'get_all_loans' })
  public async getAllLoans(): Promise<ILoan[]> {
    return await this.appService.getAllLoans();
  }
 
 
  @MessagePattern({ cmd: 'get_all_invoices' })
  public async getAllInvoices(): Promise<IInvoice[]> {
    return await this.appService.getAllInvoices();
  }
 

}
