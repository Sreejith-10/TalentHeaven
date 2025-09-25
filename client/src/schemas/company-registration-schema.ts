import * as z from "zod";


export const comapnyRegistrationSchema = z.object({
    company_name:z.string().min(3,{message:"provide a name"}),
    company_logo:z.string(),
    company_about:z.string(),
    company_category:z.string(),
    company_industry:z.string(),
    company_country:z.string(),
    company_state:z.string(),
    company_city:z.string(),
    company_address:z.string(),
    reference:z.string(),
    phone_number:z.string()
})