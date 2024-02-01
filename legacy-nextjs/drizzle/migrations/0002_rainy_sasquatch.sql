CREATE TRIGGER deleteUserShotos 
AFTER DELETE ON "users"
FOR EACH ROW
BEGIN
    DELETE FROM "userShotos" WHERE "userId" = OLD."id";
    DELETE FROM "shotos" WHERE "id" NOT IN (
        SELECT "shotoId" FROM "userShotos"
    );
END;
