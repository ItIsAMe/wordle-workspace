import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Word } from "./word.entity";

@Entity()
export class SelectedWord extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
    })
    wordId: number;

    @OneToOne(() => Word)
    @JoinColumn()
    word: Word;
}