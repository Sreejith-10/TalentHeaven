import { JobModel } from "../models/jobModel.js";

export const searchJobs = async (req, res) => {
  try {
    const searchQuery = req.query;
    const {
      query,
      job,
      location,
      filter_job_type,
      filter_job_mode,
      filter_experience,
      filter_salary,
      limit,
      page,
    } = searchQuery;
    let jobs = [];

    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);

    if (query && !job) {
      jobs = await JobModel.find();
    }

    if (job) {
      const searchKey = new RegExp(`^${job}.*`, "gi");
      jobs = await JobModel.find({ role: { $regex: searchKey } });
    }

    //location

    //job function is complex

    if (filter_job_type) {
      let temp = [...jobs];
      if (Array.isArray(filter_job_type)) {
        jobs = temp.filter((item) => {
          return filter_job_type.some((key) => key === item);
        });
      } else {
        jobs = temp.filter((item) => item.job_type === filter_job_type);
      }
    }

    if (filter_job_mode) {
      let temp = [...jobs];
      if (Array.isArray(filter_job_mode)) {
        jobs = temp.filter((item) => {
          return filter_job_mode.some((key) => key === item);
        });
      } else {
        jobs = temp.filter((item) => item.job_mode === filter_job_mode);
      }
    }

    if (filter_experience) {
      let temp = [...jobs];

      if (Array.isArray(filter_experience)) {
        jobs = temp.filter((job) => {
          return filter_experience.some(
            (item) => item.toLowerCase() === job.experience.toLowerCase(),
          );
        });
      } else {
        jobs = temp.filter((job) => {
          if (
            filter_experience.toLowerCase() === job.experience.toLowerCase()
          ) {
            return job;
          }
        });
      }
    }

    if (filter_salary) {
      let temp = [...jobs];

      if (Array.isArray(filter_salary)) {
        jobs = temp.filter((job) => {
          return filter_salary.some(
            (item) => item.toLowerCase() === job.salary.toLowerCase(),
          );
        });
      } else {
        jobs = temp.filter((job) => {
          if (filter_salary.toLowerCase() === job.salary.toLowerCase()) {
            return job;
          }
        });
      }
    }

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const pages = jobs.slice(startIndex, endIndex);

    return res.status(200).json({
      jobList: pages,
      pagination: {
        total: jobs.length,
        limit: limitNum,
        page: pageNum,
        totalPages: Math.ceil(jobs.length / limitNum),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, message: "error" });
  }
};
