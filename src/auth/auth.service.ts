import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/create-auth.dto';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from 'src/auth/utils/token.util';
import { UserRole } from 'src/user/enums/user-role.enum';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';



 @Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if this is the first user (make them admin)
    const userCount = await this.userRepository.count();
    const role = userCount === 0 ? UserRole.ADMIN : UserRole.USER;

    const newUser = this.userRepository.create({
      ...registerDto,
      role, // Set the role explicitly
    });

    await this.userRepository.save(newUser);
    return {
      message: 'User registered successfully',
      user: { ...newUser, password: undefined },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      userId: user.id,
      username: user.username,
      role: user.role // Include role in JWT payload
    };

    return {
      message: 'Login successful',
      accessToken: this.jwtService.sign(payload),
      role: user.role // Return role to client
    };
  }


  async refreshToken(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const newAccessToken = generateAccessToken(payload.userId);
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    return { message: `User with ID ${userId} logged out successfully` };
  }
}
