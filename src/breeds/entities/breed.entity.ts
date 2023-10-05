import { IsOptional } from "class-validator";
import { Dog } from "src/dogs/entities/dog.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity()
export class Breed {
    
    @Column({primary: true, generated: true})
    id: number;
    @Column()
    name: string;
    @OneToMany(()=>Dog,(dog)=>dog.breed)
    dogs: Dog[];

}
