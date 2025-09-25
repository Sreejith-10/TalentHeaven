export type EducationType = {
  _id?: string;
  institute: string;
  education_type: string;
  stream: string;
  marks: string;
  start_date: string;
  end_date: string;
};

export type ExperienceType = {
  _id?: string;
  company_name: string;
  start_date: string;
  end_date: string;
  position: string;
};

export type ProjectsType = {
  _id?: string;
  project_name: string;
  project_description: string;
  technologies_used: string[];
  reference: string;
};

export type UserType = {
  user_id: string;
  fname: string;
  lname: string;
  profession: string;
  about: string;
  phone: string;
  email: string;
  skills: string[];
  education: EducationType[];
  experience: ExperienceType[];
  job_preferences: string[];
  projects: ProjectsType[];
  references: { link_name: string; link_path: string }[];
  profile_image: string;
};

export type JobType = {
  _id: string;
  company_id: string;
  role: string;
  vaccancy: string;
  job_type: string;
  job_mode: string;
  job_description: string;
  job_industry: string,
  job_category: string,
  job_requirements: string[];
  skill_rquired: string[];
  experience: string;
  salary: string;
  status: string;
  applications: {
    user_id: string;
    applied_on: number;
    status: string;
  }[];
  applications_start_date: string;
  applications_end_date: string;
  duration: number;
  createdOn: number;
};

export type CompanyType = {
  company_about: string;
  company_address: string;
  company_city: string;
  company_country: string;
  company_id: string;
  company_name: string;
  company_state: string;
  phone_number: string;
  reference: string;
};

export type RecruiterType = {
  company_id: string;
  recruiter_id: string;
  recruiter_name: string;
  recruiter_email: string;
  phone: string;
};

export type ChatType = {
  sender_id: string;
  message: string;
  date: number;
};

export interface IJobPagination {
  jobList: JobType[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export type VarientType = "default" | "applied" | "accepted" | "rejected"
