-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "tcTags" TEXT,
ALTER COLUMN "ogTags" SET DATA TYPE TEXT,
ALTER COLUMN "schemaTags" SET DATA TYPE TEXT;
