import { z } from 'zod';

const emailValidatorSchema = z.email('Invalid email address').min(1).max(255);
const passwordValidatorSchema = z.string().trim().min(4);

export const registerValidatorSchema = z.object({
    name: z.string().trim().min(1).max(255),
    email: emailValidatorSchema,
    password: passwordValidatorSchema
});

export const loginValidatorSchema = z.object({
    email: emailValidatorSchema,
    password: passwordValidatorSchema
});

export type RegisterValidatorSchemaType = z.infer<typeof registerValidatorSchema>;
export type LoginValidatorSchemaType = z.infer<typeof loginValidatorSchema>;