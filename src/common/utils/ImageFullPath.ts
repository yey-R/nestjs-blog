import { InvalidPathError } from '../exceptions/InvalidPathError';

export function ImageFullPath(blogId: number, image: string) {
  const regex = '^(/{0,1}(?!/))[A-Za-z0-9/-_]+(.([a-zA-Z]+))?$';
  const isPath = new RegExp(regex).test(image);

  if (!isPath) {
    throw new InvalidPathError('Invalid path');
  }

  return `${process.env.UPLOAD_URL}/${blogId}/${image}`;
}
