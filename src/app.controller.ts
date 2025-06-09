import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirectToSwagger(@Res() res: Response) {
    return res.redirect('/docs');
  }
}
