import { IdController } from './id.controller';
import { Module } from '@nestjs/common';
import { IdService } from './id.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectedWord } from '../word/selected-word.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SelectedWord])],
    providers:[IdService],
    controllers: [IdController],
})
export class IdModule {}