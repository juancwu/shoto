CREATE TABLE `userShotos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`shotoId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`ref` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userShotos_userId_shotoId_unique` ON `userShotos` (`userId`,`shotoId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_ref_unique` ON `users` (`ref`);