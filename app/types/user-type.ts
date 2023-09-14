export interface IPersonalHobby {
  sport: string;
  music: string;
  movie: string;
  games: string;
}

export interface IPersonalInfo {
  name: string;
  nickName: string;
  birthday: string;
  email: string;
  hobby: IPersonalHobby;
  militaryStatus: string;
}

export interface IUniversityInfo {
  name: string;
  details: string;
}

export interface ISchoolInfo {
  name: string;
  details: string;
}

export interface IEducationInfo {
  university: IUniversityInfo;
  school: ISchoolInfo;
}

export interface ISkills {
  languages: string[];
  frameworks: string[];
  orm: string[];
  tools: string[];
  database: string[];
  other: string[];
}

export interface IExperienceDetail {
  company: string;
  position: string;
  responsibilities: string[];
  detail: string[];
  date: string;
}

export interface IContactInfo {
  email: string;
  website: string;
  github: string;
  linkin: string;
}

export interface IUserData {
  about: {
    personal: IPersonalInfo;
    education: IEducationInfo;
  };
  skills: ISkills;
  experience: IExperienceDetail[];
  contact: IContactInfo;
}
