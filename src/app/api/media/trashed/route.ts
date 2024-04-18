import { NextResponse, NextRequest } from 'next/server';

import { onSuccess, onError } from '@/libs/responseWrapper';
import { exceptions } from '@/libs/exception';
import { responseMessages } from '@/libs/messages';
import {
	getAllTrashedImages,
	getImageById,
	imageTrashedHandler,
} from '@/services/imagesServices';

export const GET = async () => {
	const images = await getAllTrashedImages();

	return NextResponse.json(
		onSuccess(exceptions.OK, { images: images, totalImage: images.length }),
	);
};

export const PATCH = async (req: NextRequest) => {
	const url = new URL(req.url);
	const id: string = String(url.searchParams.get('id'));
	const isTrashedString: string = String(url.searchParams.get('isTrash'));
	const isTrashed: boolean =
		isTrashedString.toLowerCase() === 'true' ? true : false;

	const getImage = await getImageById(id);
	if (!getImage) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.IMAGE_DOES_NOT_EXIT,
			}),
		);
	}

	const trashedImage = await imageTrashedHandler(id, isTrashed);
	if (!trashedImage) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.BLOG_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	const message = trashedImage.isTrashed
		? responseMessages.IMAGE_HAS_BEEN_TRASHED
		: responseMessages.IMAGE_HAS_BEEN_REVERTED;

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: message,
		}),
	);
};
