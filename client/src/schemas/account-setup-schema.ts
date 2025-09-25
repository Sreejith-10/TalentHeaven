import * as z from "zod"

const educationSchema = z.object({
    institute:z.string(),
    education_type:z.string(),
    stream:z.string(),
    marks:z.string(),
    start_date:z.string(),
    end_date:z.string()
})

const experienceSchema = z.object({
    company_name:z.string(),
    position:z.string(),
    start_date:z.string(),
    end_date:z.string()
})


const projectSchema = z.object({
    project_name:z.string(),
    project_description:z.string(),
    technologies_used:z.array(z.string()),
    reference:z.string()
})

export const accountSchema = z.object({
    fname:z.string().min(3),
    lname:z.string(),
    profession:z.string(),
    about:z.string(),
    phone:z.string().optional(),
    email:z.string().email().optional(),
    skills:z.array(z.string()).optional(),
    education:z.array(educationSchema).optional(),
    experience:z.array(experienceSchema).optional(),
    job_preferences:z.array(z.string()),
    projects: z.array(projectSchema).optional(),
    references:z.array(z.object({
        link_name:z.string(),
        link_path:z.string()
    }))
})



