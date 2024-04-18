import { PrismaClient } from '@prisma/client';
import { ICreateToolRequest } from '../types/toolTypes';

const prisma = new PrismaClient();

export const getAllPublishedTool = async () => {
	return await prisma.tool.findMany({ where: { isPublished: true } , include: {language: true}});
};

export const getAllTrashedTool = async () => {
	return await prisma.tool.findMany({ where: { isPublished: false }, include: {language: true} });
};

export const createNewTools = async (data: ICreateToolRequest) => {
	const {
		name,
		metaTitle,
		metaDescription,
		slug,
		ogTags,
		tcTags,
		schemaTags,
		isIndex,
		isPublished,
		isItHome,
		content,
		parentId,
		langaugeId,
	} = data;

	const createdTool = await prisma.tool.create({
		data: {
			name: name,
			metaTitle: metaTitle,
			metaDescription: metaDescription,
			slug: slug,
			ogTags: ogTags ? JSON.stringify(ogTags) : null,
			tcTags: tcTags ? JSON.stringify(tcTags) : null,
			schemaTags:schemaTags ? JSON.stringify(schemaTags) : null,
			isIndex: isIndex,
			isPublished: isPublished,
			isItHome: isItHome,
			content: content,
			parentId: parentId,
			langaugeId: langaugeId,
		},
	});

	

	return createdTool ? createdTool : null;
};

export const updateTool = async (data: ICreateToolRequest, id: string) => {
	const {
		name,
		metaTitle,
		metaDescription,
		slug,
		ogTags,
		tcTags,
		schemaTags,
		isIndex,
		isPublished,
		isItHome,
		content,
		parentId,
		langaugeId,
	} = data;



	const updatedTool = await prisma.tool.update({
		where: { id: id },
		data: {
			name: name,
			metaTitle: metaTitle,
			metaDescription: metaDescription,
			slug: slug,
			ogTags:  JSON.stringify(ogTags),
			tcTags:  JSON.stringify(tcTags),
			schemaTags: JSON.stringify(schemaTags),
			isIndex: isIndex,
			isPublished: isPublished,
			isItHome: isItHome,
			content: content,
			parentId: parentId,
			langaugeId: langaugeId,
			updatedAt: new Date(),
		},
	});


	return updatedTool ? updatedTool : null;
};

export const toolTrashedHandler = async (id: string, isPublished: boolean) => {
	const updatedTool = await prisma.tool.update({
		where: { id: id },
		data: {
			isPublished: isPublished,
			updatedAt: new Date(),
		},
	});

	return updatedTool ? updatedTool : null;
};

export const getToolById = async (id: string) => {
	const tool = await prisma.tool.findFirst({ where: { id: id } });

	return tool ? tool : null;
};

export const getToolBySlug = async (slug: string) => {
	const tool = await prisma.tool.findFirst({ where: { slug: slug } });

	return tool ? tool : null;
};

export const deleteTool = async (id: string) => {
	const deletedTool = await prisma.tool.delete({ where: { id: id } });

	return deletedTool ? deletedTool : null;
};
