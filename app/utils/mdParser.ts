import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const mdParser = (slug: string) => {
  const filePath = path.join(
    process.cwd(),
    'contents',
    '__posts',
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return { ...data, content };
};
