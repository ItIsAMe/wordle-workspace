import { SelectedWord } from './../word/selected-word.entity';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdService {

    constructor( @InjectRepository(SelectedWord)
    private selectedWordRepository: Repository<SelectedWord>) {}
    
    /**
     * Puts a new user id with a random real word.
     * 
     * @returns the user id.
     */
    async createUserId(): Promise<string> {
        const randId = Math.floor(Math.random() * 5757);
        const selectedWordInput = await this.selectedWordRepository.save({
            wordId: randId,
        });
        return selectedWordInput.userId;
    }
}