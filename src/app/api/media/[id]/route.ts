import { NextResponse, NextRequest } from 'next/server';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';

import { exceptions } from '@/libs/exception';
import { responseMessages } from '@/libs/messages';
import { onSuccess, onError } from '@/libs/responseWrapper';
import { deleteImage, getImageById } from '@/services/imagesServices';

export const DELETE = async (req: NextRequest) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/media/')[1];

	const getImage = await getImageById(id);

	if (!getImage) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.IMAGE_DOES_NOT_EXIT,
			}),
		);
	}

	const filePath = path.join(
		process.cwd(),
		'./public/storage/' + getImage.name,
	);

	if (existsSync(filePath)) {
		await unlinkSync(filePath);
	}

	try {
		await deleteImage(id);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.IMAGE_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: responseMessages.IMAGE_HAS_BEEN_DELETED,
		}),
	);
};
