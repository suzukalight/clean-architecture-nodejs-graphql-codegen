import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthAuth01604329927608 implements MigrationInterface {
    name = 'AddAuthAuth01604329927608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_22bdab086670818a4d01d82a55e` ON `authEmailPasswords`");
        await queryRunner.query("CREATE TABLE `authAuth0s` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `auth0UserId` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("DROP TABLE `authAuth0s`");
        await queryRunner.query("CREATE INDEX `FK_22bdab086670818a4d01d82a55e` ON `authEmailPasswords` (`userId`)");
    }

}
