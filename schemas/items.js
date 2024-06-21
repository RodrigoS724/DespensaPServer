import z from 'zod';

const itemScheme = z.object({
  userId: z.number().min(0),
  name: z.string({
    invalid_type_error: 'ITEM name be required',
    required_error: 'ITEM title is require'
  }),
  photo_url: z.string().url({
    message: 'Poster must be a url'
  }),
  brand: z.string(),
  type: z.enum([
    'fruta',
    'verdura',
    'limpieza',
    'higiene',
    'conservas',
    'otros']),
  price: z.number().min(0),
  stock: z.number().min(0)
});

const brandScheme = z.object({
  name: z.string()
});

export function verifyBrand (object) {
  return brandScheme.safeParse(object);
}

export function verifyItem (object) {
  return itemScheme.safeParse(object);
}

export function verifyParcialItem (object) {
  return itemScheme.partial().safeParse(object);
}
