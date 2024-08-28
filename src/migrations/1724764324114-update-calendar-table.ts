import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCalendarTable1724764324114 implements MigrationInterface {
    name = 'UpdateCalendarTable1724764324114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD CONSTRAINT "FK_7f9a3d7f6217b99b6b2431887df" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP CONSTRAINT "FK_7f9a3d7f6217b99b6b2431887df"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying(255) NOT NULL`);
    }

}
