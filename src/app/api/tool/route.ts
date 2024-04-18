import { NextResponse } from 'next/server';

import { exceptions } from '../../../libs/exception';
import { responseMessages } from '../../../libs/messages';
import { onSuccess, onError } from '../../../libs/responseWrapper';
import { ICreateToolRequest } from '../../../types/toolTypes';
import {
	createNewTools,
	getAllPublishedTool,
} from '../../../services/toolServices';

export const GET = async () => {
	const tools = await getAllPublishedTool();

	return NextResponse.json(
		onSuccess(exceptions.OK, { tools: tools, totalTools: tools.length }),
	);
};

export const POST = async (req: Request) => {
	const toolRequestData: ICreateToolRequest = await req.json();

	if (
		!toolRequestData.name ||
		!toolRequestData.metaTitle ||
		!toolRequestData.metaDescription ||
		!toolRequestData.slug
	) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.MISSING_FIELDS,
			}),
		);
	}

	try {
		await createNewTools(toolRequestData);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.TOOL_CREATING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	return NextResponse.json(
		onSuccess(exceptions.CREATED, {
			message: responseMessages.TOOL_SUCCESSFULLY_CREATED,
		}),
	);
};
