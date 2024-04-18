import { NextResponse } from "next/server";
import { exceptions } from "../../../../libs/exception";
import { responseMessages } from "../../../../libs/messages";
import { onSuccess, onError } from "../../../../libs/responseWrapper";
import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "../../../../services/userServices";

export const POST = async (req: Request, res: Response) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      onError(exceptions.BAD_REQUEST_EXCEPTION, {
        error: responseMessages.MISSING_FIELDS,
      })
    );
  }

  const getUser: any = await getUserByEmail(email);
  if (!getUser) {
    return NextResponse.json(
      onError(exceptions.BAD_REQUEST_EXCEPTION, {
        error: responseMessages.ENTER_VALIDE_CREDENTIALS,
      })
    );
  }

  const passwordIsValid = bcrypt.compareSync(password, getUser.password);
  if (!passwordIsValid) {
    return NextResponse.json(
      onError(exceptions.BAD_REQUEST_EXCEPTION, {
        error: responseMessages.ENTER_VALIDE_CREDENTIALS,
      })
    );
  }

  const data = {
    userName: getUser.name,
    email: getUser.email,
  };

  return NextResponse.json(
    onSuccess(exceptions.OK, {
      message: data,
    })
  );
};
