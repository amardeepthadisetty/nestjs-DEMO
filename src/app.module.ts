import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [CatsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
