import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';
import { AuthController } from './core/admin/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => {
        return {
          dialect: ConfigService.get('database.type'),
          host: ConfigService.get('database.host'),
          port: ConfigService.get('database.port'),
          username: ConfigService.get('database.user'),
          password: ConfigService.get('database.password'),
          database: ConfigService.get('database.database'),
          autoLoadModels: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
