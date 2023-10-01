import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
 /*   
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>(DB_HOST),
    port: +configService.get<number>(DB_PORT),
    username: configService.get<string>(DB_USER),
    password: configService.get<string>(DB_PASSWORD),
    database: configService.get<string>(DB_DATABASE),
    entities: [],
    synchronize: true,
  }),
  inject: [ConfigService],
})
  */  
TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'user_crud',
    password: 'root',
    database: 'db_crud',
    autoLoadEntities: true,
    synchronize: true,
  }),
}),
 UsersModule,
 DogsModule,
 AuthModule,
 BreedsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
