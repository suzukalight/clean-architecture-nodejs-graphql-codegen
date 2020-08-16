import {MigrationInterface, QueryRunner} from "typeorm";

export class AuthEmailPassword1597564866239 implements MigrationInterface {
    name = 'AuthEmailPassword1597564866239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `authEmailPasswords` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `email` varchar(255) NOT NULL, `passwordEncrypted` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `authEmailPasswords` ADD CONSTRAINT `FK_22bdab086670818a4d01d82a55e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `authEmailPasswords` DROP FOREIGN KEY `FK_22bdab086670818a4d01d82a55e`");
        await queryRunner.query("ALTER TABLE `todos` CHANGE `dueDate` `dueDate` datetime NULL");
        await queryRunner.query("DROP TABLE `authEmailPasswords`");
    }

}
