export function ImageFullPath(blogId: number, image: string) {
  return `${process.env.UPLOAD_URL}/${blogId}/${image}`;
}
