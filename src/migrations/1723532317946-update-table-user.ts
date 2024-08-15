import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUser1723532317946 implements MigrationInterface {
    name = 'UpdateTableUser1723532317946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "full_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "full_name" TO "name"`);
    }

}
