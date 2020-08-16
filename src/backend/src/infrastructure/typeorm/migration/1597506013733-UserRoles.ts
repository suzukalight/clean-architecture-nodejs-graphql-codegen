import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRoles1597506013733 implements MigrationInterface {
    name = 'UserRoles1597506013733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `roles` text NOT NULL");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `roles`");
    }

}
