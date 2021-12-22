import {Link, useLoaderData} from "remix";

export type Post = {
    id: number;
    slug: string;
    title: string;
}
export const loader = (): Post[] => {
    return [
        {
            id: 0,
            title: "My First Post",
            slug: "my-first-post",
        },
        {
            id: 1,
            title: "A App I Made Just For You",
            slug: "90s-app",
        }
    ];
};


const Posts = () => {
    const posts = useLoaderData<Post[]>();
    return (
        <div>
            <p>Posts</p>
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link to={post.slug}>{post.title}</Link>
                        </li>
                    );
                })}
            </ul>
            <Link to="/">back</Link>
        </div>
    );
};
export default Posts;