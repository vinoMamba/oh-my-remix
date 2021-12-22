import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";

export type Post = {
    id: number;
    slug: string;
    title: string;
}

const postsPath = path.join(__dirname, "..", "posts");

export async function getPost() {
    const dir = await fs.readdir(postsPath);
    return Promise.all(
        dir.map(async (fileName, index) => {
            const file = await fs.readFile(
                path.join(postsPath, fileName)
            );
            const {attributes} = parseFrontMatter(
                file.toString()
            );
            return {
                id: index,
                slug: fileName.replace(/\.md$/, ""),
                title: (attributes as { title: string }).title
            };
        })
    );
}
