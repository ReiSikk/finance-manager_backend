import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCategory1709914029192 implements MigrationInterface {
    name = 'UpdatedCategory1709914029192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "description" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "description" SET DEFAULT 'no desc'`);
    }

}
