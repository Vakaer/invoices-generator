import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import { getBlogBySlug } from '../../../../services/blogServices';

export const GET = async (req: NextRequest) => {
	const url = new URL(req.url);
	const slug: string = String(url.searchParams.get('slug'));

	const getBlog = await getBlogBySlug(slug);
	if (!getBlog) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.BLOG_DOES_NOT_EXIT,
			}),
		);
	}

	return NextResponse.json(onSuccess(exceptions.OK, { blog: getBlog }));
};
