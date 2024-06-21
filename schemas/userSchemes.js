import z from 'zod';

const userScheme = z.object({
  name: z.string({
    invalid_type_error: 'Name is required',
    required_error: 'Name is require'
  }),
  gmail: z.string(),
  password: z.string()
});

export function verifyUser (object) {
  return userScheme.safeParse(object);
}

export function verifyParcialUser (object) {
  return userScheme.partial().safeParse(object);
}
