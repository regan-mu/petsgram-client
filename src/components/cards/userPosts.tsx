import { Ipost } from "../../types";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
const UserPosts: React.FC<{posts: Ipost[] | undefined}> = ({posts}) => {
    return (
        <div className="grid grid-cols-3 gap-2 pt-10">
            {posts?.map((post) => (
                <a href={`/post/${post.id}`} key={post.id} className="relative">
                    <img
                        src={`${CLOUDINARY_IMG_PREFIX}${post.image}`}
                        alt="Post"
                        className="w-full h-64 object-cover"
                    />
                    
                    {/* Overlay for likes and comments */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-white">
                        <div className="text-center">
                            <p className="font-bold">{post.likes.length} likes</p>
                            <p>{post.comments.length} comments</p>
                        </div>
                    </div>
                </a>
            ))}
      </div>
    )
}

export default UserPosts;