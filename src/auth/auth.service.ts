import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity'; // Đảm bảo đường dẫn đúng
import { RegisterDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const newUser = this.userRepository.create(registerDto);
    await this.userRepository.save(newUser);
    return { message: 'User registered successfully', user: newUser };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user || user.password !== loginDto.password) {
      return { message: 'Invalid credentials' };
    }

    const token = 'JWT_TOKEN'; // Placeholder cho JWT
    return { message: 'Login successful', token };
  }

  async logout(userId: string) {
    // Logic xử lý đăng xuất (ví dụ: vô hiệu hóa token hoặc xóa session)
    return { message: `User with ID ${userId} logged out successfully` };
  }
}