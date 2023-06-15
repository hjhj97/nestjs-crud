import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hello(): string {
    return 'hello';
  }
}
