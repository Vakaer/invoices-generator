-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "isPublished" BOOLEAN DEFAULT false,
ADD COLUMN     "readingTime" INTEGER DEFAULT 5,
ALTER COLUMN "isIndex" DROP NOT NULL;
