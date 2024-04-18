import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllImages = async () => {
	return await prisma.image.findMany({
		where: { isTrashed: false },
	});
};

export const getAllTrashedImages = async () => {
	return await prisma.image.findMany({
		where: { isTrashed: true },
	});
};

export const getImageByFileName = async (name: string) => {
	const image = await prisma.image.findFirst({ where: { name: name } });

	return image ? image : null;
};

export const deleteImage = async (id: string) => {
	const deletedImage = await prisma.image.delete({ where: { id: id } });

	return deletedImage ? deletedImage : null;
};

export const getImageById = async (id: string) => {
	const image = await prisma.image.findFirst({ where: { id: id } });

	return image ? image : null;
};

export const saveNewImage = async (fileName: string, url: string) => {
	const createBlog = await prisma.image.create({
		data: {
			name: fileName,
			url: url,
		},
	});

	return createBlog ? createBlog : null;
};

export const imageTrashedHandler = async (id: string, isTrashed: boolean) => {
	const updatedImage = await prisma.image.update({
		where: { id: id },
		data: {
			isTrashed: isTrashed,
			updatedAt: new Date(),
		},
	});

	return updatedImage ? updatedImage : null;
};
