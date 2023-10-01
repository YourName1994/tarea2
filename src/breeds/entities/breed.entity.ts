import { Dog } from "src/dogs/entities/dog.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity()
export class Breed {
    
    @Column({primary: true, generated: true})
    id: number;
    @Column()
    name: String;
    @OneToMany(()=>Dog,(dog)=>dog.id)
    dogs: Dog[];

}
