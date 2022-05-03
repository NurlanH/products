import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { Categories, CategorySchema, Invoices, InvoiceSchema, Loans, LoanSchema, Orders, OrderSchema, Products, ProductSchema, Users, UserSchema } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductSchema },
      { name: Loans.name, schema: LoanSchema },
      { name: Orders.name, schema: OrderSchema },
      { name: Invoices.name, schema: InvoiceSchema },
      { name: Categories.name, schema: CategorySchema },
      { name: Users.name, schema: UserSchema },
    ]),
    ClientsModule.register([
      {
        name: 'USERS_CONTROL',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'authentication',
          queueOptions: {
            durable: true
          },
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
  exports: [AppService, AppRepository],
})
export class AppModule {}
