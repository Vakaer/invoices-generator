-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metaTitle" VARCHAR(60) NOT NULL,
    "metaDescription" VARCHAR(160) NOT NULL,
    "slug" TEXT NOT NULL,
    "ogTags" TEXT,
    "tcTags" TEXT,
    "schemaTags" TEXT,
    "isIndex" BOOLEAN DEFAULT false,
    "isPublished" BOOLEAN DEFAULT false,
    "isItHome" BOOLEAN DEFAULT false,
    "content" TEXT NOT NULL,
    "parentId" TEXT,
    "langaugeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_langaugeId_fkey" FOREIGN KEY ("langaugeId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
