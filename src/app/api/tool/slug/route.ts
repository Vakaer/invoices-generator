import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import { getToolBySlug } from '../../../../services/toolServices';

export const GET = async (req: NextRequest) => {
	const url = new URL(req.url);
	const slug: string = String(url.searchParams.get('slug'));

	const getTool = await getToolBySlug(slug);
	if (!getTool) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.TOOL_DOES_NOT_EXIT,
			}),
		);
	}

	return NextResponse.json(onSuccess(exceptions.OK, { tool: getTool }));
};
