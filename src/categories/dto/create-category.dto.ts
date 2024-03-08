import { IsNotEmpty, IsString } from "class-validator";
import { Entry } from "src/entry/entities/entry.entity";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    entries: Entry[]

    constructor(name: string, entries: Entry[] = []) {
        this.name = name;
        this.entries = entries;
    }
}