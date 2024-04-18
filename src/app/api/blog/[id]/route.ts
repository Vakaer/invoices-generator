import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import { ICreateBlogRequest } from '../../../../types/blogTypes';
import {
	updateBlog,
	getBlogById,
	deleteBlog,
} from '../../../../services/blogServices';

export const PATCH = async (req: NextRequest) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/blog/')[1];
	const blogData: ICreateBlogRequest = await req.json();

	if (
		!blogData.title ||
		!blogData.metaTitle ||
		!blogData.metaDescription ||
		!blogData.slug ||
		!blogData.featureImageUrl ||
		!blogData.langaugeId
	) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.MISSING_FIELDS,
			}),
		);
	}

	try {
		
		const updatedBlog = await updateBlog(blogData, id);

		return NextResponse.json(
			onSuccess(exceptions.CREATED, { blog: updatedBlog }),
		);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.BLOG_UPDATING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}
};

export const DELETE = async (req: NextRequest) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/blog/')[1];

	const getBlog = await getBlogById(id);

	if (!getBlog) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.BLOG_DOES_NOT_EXIT,
			}),
		);
	}

	try {
		await deleteBlog(id);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.BLOG_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: responseMessages.BLOG_HAS_BEEN_DELETED,
		}),
	);
};

export const GET = async (req: NextRequest) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/blog/')[1];

	const getBlog = await getBlogById(id);
	if (!getBlog) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.BLOG_DOES_NOT_EXIT,
			}),
		);
	}

	return NextResponse.json(onSuccess(exceptions.OK, { blog: getBlog }));
};
