import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCalendarTable1723220604701 implements MigrationInterface {
    name = 'UpdateCalendarTable1723220604701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD "is_all_day" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP COLUMN "is_all_day"`);
    }

}
