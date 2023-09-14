import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    about: {
      personal: {
        name: "Suradach Kanphaisit",
        nickName: "Dach",
        birthday: "1998-04-03",
        email: "suradach.kan@gmail.com",
        hobby: {
          sport: "Football",
          music:
            "ACϟDC /  Guns N' Roses / Justin Bieber / BTS /BlackPink  / NEWJEANS",
          movie: "Anime / Marvel Universe / K-Dramas",
          games: "Dota2 / Valorant",
        },
        militaryStatus: "Conscripted",
      },
      education: {
        university: {
          name: "Pibulsongkram Rajabhat University",
          details:
            "Bachelor's degree computer engineering | July 2015 - Demcember 2019 Grade point average:3.14",
        },
        school: {
          name: "Nabot Pittayakhom School",
          details:
            "High School Science,Math | May 2009 - May 2015 Grade point average:3.64",
        },
      },
    },
    skills: {
      languages: [
        "JavaScript && TypeScript",
        "Java",
        "PHP",
        "HTML && CSS",
        "SQL",
      ],
      frameworks: [
        "NodeJs (NestJs)",
        "ReactJS (NextJs)",
        "Antd",
        "Tailwind CSS",
      ],
      orm: ["Sequelize", "Typeorm", "Prisma", "Mongoose"],
      tools: [
        "Visual Studio Code",
        "Git && Github",
        "DBeaver && Studio3T",
        "Slack && Trello",
        "Figma",
        "postman",
      ],
      database: ["Mysql", "Postgresql", "Mongodb", "Redis"],
      other: [
        "K8S && Docker",
        "Nginx && Apache",
        "Basic Command lines",
        "AWS (ec2)",
        "Line && Facebook Messenger API",
      ],
    },
    experience: [
      {
        company: "O S D Co., LTd.",
        position: "Full Time: Senior Software Developer",
        responsibilities: [
          "Staying up to date with the software development industry and studying the latest trends and programming techniques",
          "Training junior software engineers to ensure they understand",
          "Compiling, analysing and summarising information regarding development and service issues",
          "Taking ownership of developed applications and systems",
          "Engaging in product development and brainstorming with team members",
        ],
        detail: [
          "Maintained Web App (CRM). Stack: NestJs, ReactJs(Antd),TypeScript, PostgreSQL, MongoDB, Prisma",
          "Maintained Web App (DBMS). Stack: Node.js, React, PostgreSQL, MongoDB, TypeORM",
          "Maintained Web App (Messenger & Line channels) Stack: Node.js, React, MongoDB",
          "Built RESTful API. Stack: Node.js, Express, Sequelize, MySQL",
        ],
        date: "Apr 2020 - Present",
      },
    ],
    contact: {
      email: "suradach.kan@gmail.com",
      website: "https://suradachk.com",
      github: "https://github.com/suradachk",
      linkin: "https://www.linkedin.com/in/suradachk",
    },
  };

  return NextResponse.json(data, { status: 200 });
}
