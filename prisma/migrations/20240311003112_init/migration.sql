-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
