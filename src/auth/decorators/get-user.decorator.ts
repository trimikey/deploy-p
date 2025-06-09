import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (requiredRole: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Check if role is required and user has correct role
    if (requiredRole && user.role !== requiredRole) {
      throw new ForbiddenException(`This action requires ${requiredRole} role`);
    }

    return user;
  },
);
