import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.resolve("./app/", "file/suradachk.pdf");
  const imageBuffer = fs.readFileSync(filePath);
  const headers = {
    "Content-Type": "application/pdf",
  };
  return new NextResponse(imageBuffer, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
