CREATE TABLE `emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ref` text NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS `users_username_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `users_ref_unique`;--> statement-breakpoint
ALTER TABLE users ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `objectRef` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_objectRef_unique` ON `users` (`objectRef`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `salt`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `ref`;