import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export const POST = async (req: Request) => {
  const emailUsername = process.env.EMAIL_USERNAME;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const body = await req.json();
  const { email, subject, message } = body;
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });
  if (email && subject && message) {
    const mailOptions = {
      from: emailUsername,
      to: "suradach.kan@gmail.com",
      subject: subject,
      text: message,
    };
    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
  return NextResponse.json({ message: "body can't empty!" }, { status: 500 });
};
