import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Can't be empty" }).email().trim().min(1),
  password: z
    .string({ required_error: "Please check again" })
    .min(8, "At least 8 characters"),
});

export const registerFormSchema = loginFormSchema
  .extend({
    confirm: z
      .string({ required_error: "Please check again" })
      .min(8, "At least 8 characters"),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
