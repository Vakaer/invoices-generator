import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import {
	getAllTrashedBlog,
	getBlogById,
	blogTrashedHandler,
} from '../../../../services/blogServices';

export const GET = async () => {
	const blogs = await getAllTrashedBlog();

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			trashedBlogs: blogs,
			totalTrashedBlogs: blogs.length,
		}),
	);
};

export const PATCH = async (req: NextRequest) => {
	const url = new URL(req.url);
	const id: string = String(url.searchParams.get('id'));
	const isPublishString: string = String(url.searchParams.get('isPublish'));
	const isPublish: boolean =
		isPublishString.toLowerCase() === 'true' ? true : false;

	const getBlog = await getBlogById(id);
	if (!getBlog) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.BLOG_DOES_NOT_EXIT,
			}),
		);
	}

	const trashedBlog = await blogTrashedHandler(id, isPublish);
	if (!trashedBlog) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.BLOG_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	const message = trashedBlog.isPublished
		? responseMessages.BLOG_HAS_BEEN_REVERTED
		: responseMessages.THE_BLOG_HAS_BEEN_MOVED_TO_THE_TRASHED_LIST;

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: message,
		}),
	);
};
