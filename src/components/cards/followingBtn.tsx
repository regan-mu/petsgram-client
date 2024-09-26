import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useState } from "react";
const FollowingBtn: React.FC<{unfollow: () => void}> = ({unfollow}) => {
    const [popUnfollow, setPopUnfollow] = useState(false);
    return (
        <div className="flex flex-col relative">
            <div className="flex gap-2 items-center bg-gray-300 py-1 px-4 rounded-md cursor-pointer" onClick={() => {setPopUnfollow(!popUnfollow)}}>
                <p>Following</p>
                {popUnfollow ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
            </div>
            {popUnfollow && <button onClick={unfollow} className="absolute w-full border rounded-md -bottom-6 font-semibold text-red-500 text-sm cursor-pointer">Unfollow</button>}
        </div>
    )
}

export default FollowingBtn;