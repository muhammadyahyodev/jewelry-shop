import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopModule } from './shop/shop.module';
import { JewelryTypeModule } from './jewelry-type/jewelry-type.module';
import { BrandModule } from './brand/brand.module';
import { MaterialModule } from './material/material.module';
import { DetailModule } from './detail/detail.module';
import { JewelryModule } from './jewelry/jewelry.module';
import { StatusModule } from './status/status.module';
import { RegionModule } from './region/region.module';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { BookingModule } from './booking/booking.module';
import { DistrictModule } from './district/district.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UserModule } from './user/user.module';
import { UserAddressModule } from './user-address/user-address.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
      logging: false,
    }),
    ShopModule,
    JewelryTypeModule,
    BrandModule,
    MaterialModule,
    DetailModule,
    JewelryModule,
    StatusModule,
    UserModule,
    RegionModule,
    ReviewModule,
    CartModule,
    PaymentMethodModule,
    BookingModule,
    DistrictModule,
    RolesModule,
    UserRolesModule,
    UserModule,
    UserAddressModule,
    MailModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
