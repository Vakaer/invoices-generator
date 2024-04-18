import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import { ICreateToolRequest } from '../../../../types/toolTypes';
import {
	updateTool,
	getToolById,
	deleteTool,
} from '../../../../services/toolServices';

export const PATCH = async (req: NextRequest) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/tool/')[1];
	const toolUpdateRequestData: ICreateToolRequest = await req.json();

	if (
		!toolUpdateRequestData.name ||
		!toolUpdateRequestData.metaTitle ||
		!toolUpdateRequestData.metaDescription ||
		!toolUpdateRequestData.slug
	) {
		return NextResponse.json(
			onError(exceptions.BAD_REQUEST_EXCEPTION, {
				error: responseMessages.MISSING_FIELDS,
			}),
		);
	}

	try {
		const updatedTool = await updateTool(toolUpdateRequestData, id);

		return NextResponse.json(
			onSuccess(exceptions.CREATED, { tool: updatedTool }),
		);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.TOOL_UPDATING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}
};

export const GET = async (req: NextRequest, res: Response) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/tool/')[1];

	const getTool = await getToolById(id);

	if (!getTool) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.TOOL_DOES_NOT_EXIT,
			}),
		);
	}

	return NextResponse.json(onSuccess(exceptions.OK, { tool: getTool }));
};

export const DELETE = async (req: NextRequest, res: Response) => {
	const url = req.nextUrl.pathname;
	const id: string = url.split('/tool/')[1];

	const getBlog = await getToolById(id);

	if (!getBlog) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.BLOG_DOES_NOT_EXIT,
			}),
		);
	}

	try {
		await deleteTool(id);
	} catch (err) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.TOOL_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: responseMessages.TOOL_HAS_BEEN_DELETED,
		}),
	);
};
