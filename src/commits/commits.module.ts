import { Module } from '@nestjs/common';
import { CommitsController } from './controllers/commits.controller';

@Module({
  controllers: [CommitsController]
})
export class CommitsModule {}
