import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet-async';
import { fetchFeed } from "../utils/APIRequests";
import Post from "../components/cards/post";
import { Ipost } from "../types";

const Home = () => {
    const {data: posts} = useQuery({queryFn: fetchFeed, queryKey: ["feed"]});
    return (
        <div className="w-full p-5 flex flex-col lg:w-1/2">
            <Helmet>
                <title>Petsgram</title>
                <meta name="description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
                <meta name="keywords" content="social media, photos, Petsgram, fun" />
                <meta property="og:title" content="Petsgram" />
                <meta property="og:description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
            </Helmet>
            {posts?.map((post: Ipost) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Home;