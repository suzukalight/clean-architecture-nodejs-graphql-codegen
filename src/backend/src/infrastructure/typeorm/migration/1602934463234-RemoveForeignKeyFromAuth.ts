import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth1602934463234 implements MigrationInterface {
    name = 'Auth1602934463234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `authEmailPasswords` DROP FOREIGN KEY `FK_22bdab086670818a4d01d82a55e`");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL");
        await queryRunner.query("ALTER TABLE `authEmailPasswords` ADD CONSTRAINT `FK_22bdab086670818a4d01d82a55e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
