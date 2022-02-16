-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "birthday" TEXT NOT NULL DEFAULT '2000-04-04',
    "regist_step" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("id", "name", "regist_step") SELECT "id", "name", "regist_step" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
