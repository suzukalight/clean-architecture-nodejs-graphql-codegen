import {MigrationInterface, QueryRunner} from "typeorm";

export class First1597243958744 implements MigrationInterface {
    name = 'First1597243958744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `todos` (`id` int NOT NULL AUTO_INCREMENT, `ownerId` int NOT NULL, `title` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `dueDate` datetime NULL DEFAULT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todos` ADD CONSTRAINT `FK_035a0825545d08b34ad2b766d3a` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todos` DROP FOREIGN KEY `FK_035a0825545d08b34ad2b766d3a`");
        await queryRunner.query("DROP TABLE `todos`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
