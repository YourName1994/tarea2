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
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES__PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    ssl: process.env.POSTGRES_SSL === 'true',
    extra: {
      ssl: 
        process.env.POSTGRES_SSL === 'true'?{rejectUnauthorized: false,}: null
    }
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
