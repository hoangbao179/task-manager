import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableUser1723725600429 implements MigrationInterface {
    name = 'UpdateTableUser1723725600429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "full_name" TO "name"`);
    }

}
