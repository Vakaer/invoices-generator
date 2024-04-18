import { NextResponse, NextRequest } from 'next/server';

import { exceptions } from '../../../../libs/exception';
import { responseMessages } from '../../../../libs/messages';
import { onSuccess, onError } from '../../../../libs/responseWrapper';
import {
	getAllTrashedTool,
	getToolById,
	toolTrashedHandler,
} from '../../../../services/toolServices';

export const GET = async () => {
	const tools = await getAllTrashedTool();

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			trashedTools: tools,
			trashedTotalTools: tools.length,
		}),
	);
};

export const PATCH = async (req: NextRequest) => {
	const url = new URL(req.url);
	const id: string = String(url.searchParams.get('id'));
	const isPublishString: string = String(url.searchParams.get('isPublish'));
	const isPublish: boolean =
		isPublishString.toLowerCase() === 'true' ? true : false;

	const getTool = await getToolById(id);
	if (!getTool) {
		return NextResponse.json(
			onError(exceptions.NOT_FOUND_EXCEPTION, {
				error: responseMessages.TOOL_DOES_NOT_EXIT,
			}),
		);
	}

	const trashedTool = await toolTrashedHandler(id, isPublish);
	if (!trashedTool) {
		return NextResponse.json(
			onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
				error:
					responseMessages.TOOL_DELETING_PROCESS_FAILED_FOR_UNKNOWN_REASONS,
			}),
		);
	}

	const message = trashedTool.isPublished
		? responseMessages.TOOL_HAS_BEEN_REVERTED
		: responseMessages.THE_TOOL_HAS_BEEN_MOVED_TO_THE_TRASHED_LIST;

	return NextResponse.json(
		onSuccess(exceptions.OK, {
			message: message,
		}),
	);
};
