import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s]+$/, 'Name must contain alphabets only').min(1, 'Name is required'),
  username: z.string().regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric').min(1, 'Username is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be exactly 10 digits').min(1, 'Mobile is required'),
  shareData: z.boolean().refine((val) => val === true, 'You must check this box to proceed'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
