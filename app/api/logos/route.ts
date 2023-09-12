import { NextResponse } from "next/server";

export async function GET() {
  const logos = [
    "javascript",
    "java",
    "php",
    "html",
    "css",
    "nodejs",
    "nestjs",
    "react",
    "nextjs",
    "antd",
    "tailwind",
    "typescript",
    "postgresql",
    "prisma",
    "nodejs",
    "mongodb",
    "typeorm",
    "sequelize",
    "mysql",
    "redis",
    "vscode",
    "git",
    "github",
    "dbeaver",
    "studio3t",
    "slack",
    "postman",
    "trello",
    "figma",
    "k8s",
    "docker",
    "nginx",
    "cmd",
    "ec2",
  ];

  return NextResponse.json(logos, { status: 200 });
}
