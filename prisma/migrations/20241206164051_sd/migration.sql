-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "mainLink" TEXT,
ALTER COLUMN "link" DROP NOT NULL;
