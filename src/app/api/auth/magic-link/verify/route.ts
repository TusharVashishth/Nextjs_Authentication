import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";

connect();

export async function POST(request: NextRequest) {
  const payload: MagicLinkPayloadVerify = await request.json();

  // * Decreypt the email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const email = crypt.decrypt(payload.email);

  // * fetch user with this
  const user = await User.findOne({
    email: email,
    magic_link_token: payload.token,
  });

  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 400,
      message: "Magic link is not valid link.",
    });
  }

  //   * Now check that link is not older than 15 minutes
  const fifteenMinAgo = new Date();
  fifteenMinAgo.setMinutes(fifteenMinAgo.getMinutes() - 15);

  if (user.magic_link_sent_at <= fifteenMinAgo) {
    return NextResponse.json({
      status: 400,
      message: "Magic link got expired.please try to send new link.",
    });
  }

  //   * Reset old magic link fields
  user.magic_link_token = null;
  user.magic_link_sent_at = null;
  await user.save();

  return NextResponse.json({
    status: 200,
    message: "Link is valid.",
    email: email,
  });
}
