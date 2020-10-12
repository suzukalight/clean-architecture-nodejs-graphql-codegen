import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeleleDateColumnToUser1602513505685 implements MigrationInterface {
    name = 'AddDeleleDateColumnToUser1602513505685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `deletedAt`");
    }

}
