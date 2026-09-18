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
          "End-to-End Ownership: Architecting, developing, and maintaining high-concurrency production systems with strict SLA targets",
          "Mentorship & Leadership: Training junior software engineers in TypeScript, clean architecture patterns, and rigorous code reviews",
          "Technical Problem Solving: Compiling, analysing, and resolving complex database performance bottlenecks and service incidents",
          "Architecture Strategy: Formulating Technical Decision Records (ADRs) and collaborating closely with cross-functional product teams",
          "Industry Best Practices: Continuously modernizing codebase with latest frameworks, microservices patterns, and DevOps tooling",
        ],
        detail: [
          "Enterprise CRM Platform: Engineered multi-tenant CRM with NestJS & React (Antd); implemented Dual-DB strategy (PostgreSQL ACID transactions + MongoDB dynamic document streams) with Prisma ORM, cutting runtime data errors by 40%",
          "Enterprise DBMS Web App: Maintained mission-critical database administration and querying platform using Node.js, React, PostgreSQL, MongoDB, and TypeORM; achieved sub-second query latency across millions of records",
          "Omni-Channel Messaging Hub: Architected real-time webhook ingestion engine handling thousands of daily customer events across LINE & Facebook Messenger APIs with automated routing and zero message loss",
          "Scalable RESTful API Infrastructure: Engineered high-velocity microservices using Node.js, Express, Sequelize, and MySQL; implemented indexed queries and caching strategies achieving ~99.9% uptime",
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
