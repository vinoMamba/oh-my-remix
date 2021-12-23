import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import {marked} from "marked";

export type Post = {
    id: number;
    slug: string;
    title: string;
}
export type PostMarkdownAttributes = {
    title: string
}

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
    return attributes.title;
}

const postsPath = path.join(__dirname, "..", "posts");

export async function getPosts() {
    const dir = await fs.readdir(postsPath);
    return Promise.all(
        dir.map(async (fileName, index) => {
            const file = await fs.readFile(
                path.join(postsPath, fileName)
            );
            const {attributes} = parseFrontMatter(
                file.toString()
            );
            invariant(isValidPostAttributes(attributes), `${fileName} has bad meta data`);
            return {
                id: index,
                slug: fileName.replace(/\.md$/, ""),
                title: (attributes as { title: string }).title
            };
        })
    );
}

export async function getPost(slug: string) {
    const filePath = path.join(postsPath, slug + '.md');
    const file = await fs.readFile(filePath);
    const {attributes, body} = parseFrontMatter(file.toString());
    console.log('-=-=-=-=-=-=');
    invariant(isValidPostAttributes(attributes), `${filePath} is missing attribute`);
    const html = marked(body);
    return {
        slug,
        title: attributes.title,
        html
    };
}
