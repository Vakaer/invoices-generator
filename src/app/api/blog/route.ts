import { NextResponse } from 'next/server';

import { exceptions } from '../../../libs/exception';
import { responseMessages } from '../../../libs/messages';
import { onSuccess, onError } from '../../../libs/responseWrapper';
import { ICreateBlogRequest } from '../../../types/blogTypes';
import {
	createNewBlog,
	getAllPublishedBlog,
} from '../../../services/blogServices';

export const GET = async () => {
	const blogs = await getAllPublishedBlog();

	return NextResponse.json(
		onSuccess(exceptions.OK, { blogs: blogs, totalBlogs: blogs.length }),
	);
};

export const POST = async (req: Request) => {
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
		await createNewBlog(blogData);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.BLOG_CREATING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	return NextResponse.json(
		onSuccess(exceptions.CREATED, {
			message: responseMessages.BLOG_SUCCESSFULLY_CREATED,
		}),
	);
};
