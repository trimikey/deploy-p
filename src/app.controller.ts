import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirectToSwagger(@Res() res: Response) {
    // Chuyển hướng đến Swagger UI
    return res.redirect('/api'); // Đảm bảo đường dẫn đúng với cấu hình Swagger
  }
}
