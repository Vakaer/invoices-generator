import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

import { onSuccess, onError } from '@/libs/responseWrapper';
import { exceptions } from '@/libs/exception';
import { responseMessages } from '@/libs/messages';
import {
	getImageByFileName,
	saveNewImage,
	getAllImages,
	getImageById,
} from '@/services/imagesServices';

export const GET = async () => {
	const images = await getAllImages();

	return NextResponse.json(
		onSuccess(exceptions.OK, { images: images, totalImage: images.length }),
	);
};

export const POST = async (req: any) => {
	const formData = await req.formData();

	const file = formData.get('file');
	if (!file) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.CAN_NOT_FIND_IMAGE,
			}),
		);
	}

	const allowedFormats = ['.png', '.jpg', '.webp'];
	const fileFormat = path.extname(file.name).toLowerCase();
	if (!allowedFormats.includes(fileFormat)) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.IMAGES_ALLOWED,
			}),
		);
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const filename = file.name.replaceAll(' ', '_').toLowerCase();

	const getImageByName = await getImageByFileName(filename);
	if (getImageByName) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.ALREADY_SAVED_IMAGE_WITH_THIS_NAME,
			}),
		);
	}

	try {
		await writeFile(
			path.join(process.cwd(), './public/storage/' + filename),
			buffer,
		);
	} catch (error) {
		return NextResponse.json(
			onError(exceptions.FATAL_ERROR_EXCEPTION, {
				error: responseMessages.IMAGE_SAVING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	const url = path.join('./storage/' + filename);

	try {
		await saveNewImage(filename, url);

		return NextResponse.json(
			onSuccess(exceptions.OK, {
				message: responseMessages.FILE_UPLOAD_SUCCESSFULLY,
			}),
		);
	} catch (error) {
		return NextResponse.json(
			onError(exceptions.FATAL_ERROR_EXCEPTION, {
				error: responseMessages.IMAGE_SAVING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}
};
