import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/auth/guards/auth.roleGuards';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đăng ký User entity
  controllers: [UserController],
  providers: [UserService, RolesGuard],
})
export class UserModule {}