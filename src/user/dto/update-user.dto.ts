import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'new_username', description: 'The new username of the user', required: false })
  username?: string;

  @ApiProperty({ example: 'new_email@example.com', description: 'The new email of the user', required: false })
  email?: string;

  @ApiProperty({ example: 'new_password123', description: 'The new password of the user', required: false })
  password?: string;
}