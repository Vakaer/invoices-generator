import { NextResponse } from "next/server";
import { getAllLanguages } from "../../../services/languageServices"

import { exceptions } from "../../../libs/exception";
import { responseMessages } from "../../../libs/messages";
import { onSuccess, onError } from "../../../libs/responseWrapper";

export const GET = async (req: Request, res: Response) => {
	const languages = await getAllLanguages()
	
	return NextResponse.json(onSuccess(exceptions.OK, { languages: languages, totalLanguages: languages.length }));
};