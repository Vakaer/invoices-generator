-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpts" TEXT,
    "metaTitle" VARCHAR(60) NOT NULL,
    "metaDescription" VARCHAR(160) NOT NULL,
    "slug" TEXT NOT NULL,
    "ogTags" JSONB,
    "schemaTags" JSONB,
    "isIndex" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "parentId" TEXT,
    "langaugeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_short_key" ON "Language"("short");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_langaugeId_fkey" FOREIGN KEY ("langaugeId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
