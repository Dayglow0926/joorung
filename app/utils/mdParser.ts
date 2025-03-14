import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export const mdParser = async (slug: string) => {
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

  // remark 사용해서 html로 변환
  const html = await remark().use(remarkHtml).process(content);

  return { ...data, content: html };
};
