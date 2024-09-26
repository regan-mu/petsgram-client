import { AiOutlineClose   } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import SingleComment from "./singleComment";
import { Icomment, PostOwner } from "../../types";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
import AddComment from "../forms/addComment";
import { fetchPostComments } from "../../utils/APIRequests";

interface comment {
    closePopup: () => void,
    owner: PostOwner,
    image: string,
    id: number,
    postAge: string,
    postCaption: string
}

const Comments: React.FC<comment> = ({closePopup, owner, image, id, postAge, postCaption}) => {
    const {data} = useQuery({queryFn: () => fetchPostComments(id), queryKey: ["comments"]});
    return (
        <div className="w-screen h-screen flex justify-center items-center p-10 fixed left-0 top-0 bg-black bg-opacity-80">
            <div className="h-full w-5/6 grid bg-white grid-cols-7 relative rounded-md">
                <div className="absolute -top-5 -right-20 cursor-pointer" onClick={closePopup}>
                    <AiOutlineClose size={22} color={"white"} />
                </div>
                <div className="w-full h-full col-span-3">
                    <img className="w-full h-full object-cover rounded-tl-md rounded-bl-md" src={`${CLOUDINARY_IMG_PREFIX}${image}`} alt="petsgram" /> 
                </div>
                <div className="col-span-4 relative overflow-y-scroll min-h-full">
                    <a href={`/profile/${owner.id}`} className="w-full h-max flex justify-left items-center gap-4 p-3 border-b sticky top-0 bg-white">
                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={`${CLOUDINARY_IMG_PREFIX}${owner.avatar}`} alt={owner.username} />
                        </div>
                        <h3 className="font-semibold">{owner.username}</h3>
                    </a>
                    <div className="p-3 flex w-full h-auto gap-4">
                        <a href={`/profile/${owner.id}`} className="w-11 h-10 bg-gray-300 rounded-full  overflow-hidden border">
                            <img className="w-full h-full object-cover" src={`${CLOUDINARY_IMG_PREFIX}${owner.avatar}`} alt={owner.username} />
                        </a>
                        <div className="w-full flex ">
                            <div className="w-full h-auto">
                                <a href={`/profile/${owner.id}`} className="font-semibold mr-2">{owner.username}</a>
                                <span className="text-gray-700" >{postCaption}</span>
                                <p className="mt-2 text-gray-500">{postAge}</p>
                            </div>
                        </div>
                    </div>
                    {data?.map((comment: Icomment) => <SingleComment key={comment.id} comment={comment} />)}
                    <div className="w-full h-auto p-3 sticky left-0 bottom-0 bg-white">
                        <AddComment postID={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments;