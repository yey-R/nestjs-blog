export function ImageFullPath(blogId: number, image: string) {
  const url =
    process.env.UPLOAD_URL.replace(/\/+$/, '') +
    `/${blogId}/` +
    image.replace(/^\/+/, '');

  return url;
}
