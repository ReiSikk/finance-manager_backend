import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDescription1709634028984 implements MigrationInterface {
    name = 'AddedDescription1709634028984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "category"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "description" character varying NOT NULL DEFAULT 'No description'`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
