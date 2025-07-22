import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Category {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    name: string;

    // Store references to Product ObjectId values
    @Column()
    productIds: ObjectId[];
}
