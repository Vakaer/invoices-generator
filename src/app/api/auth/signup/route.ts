import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

import { exceptions } from "../../../../libs/exception";
import { responseMessages } from "../../../../libs/messages";
import { onSuccess, onError } from "../../../../libs/responseWrapper";
import {
  getUserByName,
  getUserByEmail,
  createNewUser,
} from "../../../../services/userServices";

export const POST = async (req: Request, res: Response) => {
  const { userName, email, password } = await req.json();

  if (!userName || !email || !password) {
    return NextResponse.json(
      onError(exceptions.BAD_REQUEST_EXCEPTION, {
        error: responseMessages.MISSING_FIELDS,
      })
    );
  }

  const getUser = await getUserByName(userName);
  if (getUser) {
    return NextResponse.json(
      onError(exceptions.CONFLICT, {
        error: responseMessages.USERNAME_ALREADY_EXISTS,
      })
    );
  }

  const getEmail = await getUserByEmail(email);
  if (getEmail) {
    return NextResponse.json(
      onError(exceptions.CONFLICT, {
        error: responseMessages.EMAIL_ALREADY_EXISTS,
      })
    );
  }

  const createdUser = await createNewUser(
    userName,
    email,
    bcrypt.hashSync(password, 8)
  );
  if (!createdUser) {
    return NextResponse.json(
      onError(exceptions.UNPROCESSABLE_ENTITY_EXCEPTION, {
        error: responseMessages.USER_CREATION_FAILED_FOR_UNKNOWN_REASONS,
      })
    );
  }

  return NextResponse.json(
    onSuccess(exceptions.CREATED, {
      message: responseMessages.USER_SUCCESSFULLY_CREATED,
    })
  );
};
