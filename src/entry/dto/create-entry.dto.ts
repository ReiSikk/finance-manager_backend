//the object you receive from the frontend to create a new entry into the DB.
import { IsNotEmpty, IsNumber,IsString, IsDateString } from "class-validator"
import { Category } from "src/categories/entities/category.entity";
import { User } from "../../users/user.entity";

export class CreateEntryDto {
    @IsNotEmpty()
    @IsNumber()
     amount: number;

     @IsNotEmpty()
     @IsDateString()
     date: Date;

     @IsNotEmpty()
     @IsString()
     currency: string;

     @IsNotEmpty()
     @IsString()
     name: string;

     @IsNotEmpty()
     @IsString()
     comment: string;


     category: Category;

     photo: any;

     user: User;

     constructor(amount: number, date: Date, currency: string, name:string, comment:string, category: Category, user: User, photo?: any) {
        this.amount = amount,
        this.date = date,
        this.currency = currency,
        this.name = name,
        this.comment = comment
        this.category = category;
        this.photo = photo;
     }
}
