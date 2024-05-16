import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './modules/cards/card.module';
import { CategoryModule } from './modules/categories/category.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [CardModule, CategoryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
