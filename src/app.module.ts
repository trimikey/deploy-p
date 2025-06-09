import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        console.log('DATABASE_URL được tải:', dbUrl);
        return {
          type: 'mysql',
          host: 'crossover.proxy.rlwy.net',
          port: 20498,
          username: 'root',
          password: 'LvnAeIAgeVGAMmCIWVahegsvCNXVdrtR',
          database: 'railway',
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
