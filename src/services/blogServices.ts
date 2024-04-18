import { PrismaClient } from '@prisma/client';
import { ICreateBlogRequest } from '../types/blogTypes';

const prisma = new PrismaClient();

export const createNewBlog = async (data: ICreateBlogRequest) => {
	const {
		title,
		excerpts,
		metaTitle,
		metaDescription,
		slug,
		ogTags,
		tcTags,
		schemaTags,
		isIndex,
		content,
		featureImageUrl,
		readingTime,
		isPublished,
		parentId,
		langaugeId,
	} = data;
	const createBlog = await prisma.blog.create({
		data: {
			title: title,
			excerpts: excerpts,
			metaTitle: metaTitle,
			metaDescription: metaDescription,
			slug: slug,
			ogTags: JSON.stringify(ogTags),
			tcTags: JSON.stringify(tcTags),
			schemaTags: JSON.stringify(schemaTags),
			isIndex: isIndex,
			content: content,
			imageUrl: featureImageUrl,
			readingTime: readingTime,
			isPublished: isPublished,
			parentId: parentId,
			langaugeId: langaugeId,
		},
	});

	return createBlog ? createBlog : null;
};

export const getAllPublishedBlog = async () => {
	return await prisma.blog.findMany({
		where: { isPublished: true },
		include: { language: true },
	});
};

export const getAllTrashedBlog = async () => {
	return await prisma.blog.findMany({
		where: { isPublished: false },
		include: { language: true },
	});
};

export const blogTrashedHandler = async (id: string, isPublished: boolean) => {
	const updatedTool = await prisma.blog.update({
		where: { id: id },
		data: {
			isPublished: isPublished,
			updatedAt: new Date(),
		},
	});

	return updatedTool ? updatedTool : null;
};

export const updateBlog = async (data: ICreateBlogRequest, id: string) => {
	const {
		title,
		excerpts,
		metaTitle,
		metaDescription,
		slug,
		ogTags,
		tcTags,
		schemaTags,
		isIndex,
		content,
		featureImageUrl,
		readingTime,
		isPublished,
		parentId,
		langaugeId,
	} = data;
	const updateBlog = await prisma.blog.update({
		where: { id: id },
		data: {
			title: title,
			excerpts: excerpts,
			metaTitle: metaTitle,
			metaDescription: metaDescription,
			slug: slug,
			ogTags: JSON.stringify(ogTags),
			tcTags: JSON.stringify(tcTags),
			schemaTags: JSON.stringify(schemaTags),
			isIndex: isIndex,
			content: content,
			imageUrl: featureImageUrl,
			readingTime: readingTime,
			isPublished: isPublished,
			parentId: parentId,
			langaugeId: langaugeId,
			updatedAt: new Date(),
		},
	});

	return updateBlog ? updateBlog : null;
};

export const getBlogById = async (id: string) => {
	const blog = await prisma.blog.findFirst({ where: { id: id } });

	return blog ? blog : null;
};

export const deleteBlog = async (id: string) => {
	const deleteBlog = await prisma.blog.delete({ where: { id: id } });

	return deleteBlog ? deleteBlog : null;
};

export const getBlogBySlug = async (slug: string) => {
	const blog = await prisma.blog.findFirst({ where: { slug: slug } });

	return blog ? blog : null;
};
