import { Icomment } from "../../types";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
const SingleComment: React.FC<{comment: Icomment}> = ({comment}) => {
    return (
        <div className="p-3 flex w-full h-auto gap-4">
            <a href={`/profile/${comment.owner.id}`} className="w-11 h-10 bg-gray-300 rounded-full  overflow-hidden border">
                <img className="w-full h-full object-cover" src={`${CLOUDINARY_IMG_PREFIX}${comment.owner.avatar}`} alt={comment.owner.username} />
            </a>
            <div className="w-full flex ">
                <div className="w-full h-auto">
                    <a href={`/profile/${comment.owner.id}`} className="font-semibold mr-2">{comment.owner.username}</a>
                    <span className="text-gray-700" >{comment.message}</span>
                    <p className="mt-2 text-gray-500">{comment.age}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleComment;