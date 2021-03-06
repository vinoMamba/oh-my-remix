import {Link, useLoaderData} from "remix";
import {getPosts, Post} from "~/post";

export const loader = () => getPosts();

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
