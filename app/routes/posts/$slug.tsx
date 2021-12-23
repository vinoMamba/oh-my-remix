import {LoaderFunction, useLoaderData} from "remix";
import invariant from "tiny-invariant";
import {getPost} from "~/post";

export const loader: LoaderFunction = async ({params}) => {
    invariant(params.slug, "expect params.slug");
    return getPost(params.slug);
};

export default function PostSlug() {
    const slug = useLoaderData();
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: slug.html}}/>
        </div>
    );
}
