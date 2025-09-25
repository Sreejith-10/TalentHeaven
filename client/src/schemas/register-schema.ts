import * as z from "zod"

export const RegisterSchema = z.object({
    name:z.string().min(3,{message:"provide a proper name"}),
    email:z.string().email(),
    password:z.string().min(6,{message:"password shoule be atleast 6 char long"})
})