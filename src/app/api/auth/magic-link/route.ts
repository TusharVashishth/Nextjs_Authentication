import { User } from "@/models/User";
import cryptoRandomString from "crypto-random-string";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { render } from "@react-email/render";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { sendEmail } from "@/config/mail";
import { connect } from "@/database/mongo.config";

connect();

export async function POST(request: NextRequest) {
  const payload: MagicLinkPayload = await request.json();

  // * First check if email exist or not
  const user = await User.findOne({ email: payload.email });
  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "Invalid credentials.Please check your email.",
      },
    });
  }

  //   * Generate magic link token
  const randomStr = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });

  user.magic_link_token = randomStr;
  user.magic_link_sent_at = Date.now();
  await user.save();

  // * Encrypt user email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const encryptedEmail = crypt.encrypt(user.email);

  const url = `${Env.APP_URL}/magic-link/${encryptedEmail}?signature=${randomStr}`;

  try {
    const html = render(
      MagicLinkEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    );

    // * Send email to user
    await sendEmail(payload.email, "Magic Link for Login", html);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully.please check your email.",
    });
  } catch (error) {
    console.log("the error is", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong.please try again!",
    });
  }
}
