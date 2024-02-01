CREATE TABLE `shotos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`ref` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shotos_name_unique` ON `shotos` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `shotos_ref_unique` ON `shotos` (`ref`);
