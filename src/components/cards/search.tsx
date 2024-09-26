import { useState } from "react";
import { PostOwner } from "../../types";
import { SearchUser } from "../../utils/APIRequests";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
import { AiOutlineClose   } from "react-icons/ai";

const Search: React.FC<{closeSearch: () => void}> = ({closeSearch}) => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<PostOwner[]>([]);

    // Trigger the search when input changes
    const handleSearchChange = async  (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.trim()) {
            const data: PostOwner[] = await SearchUser(value);
            setSearchResults(data);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="fixed flex flex-col w-full max-w-md mx-auto left-64 top-0 z-50 bg-white h-screen p-10 border">
            <div className="w-full h-auto mb-7 flex justify-between items-center">
                <h2 className="font-semibold text-2xl">Search</h2>
                <AiOutlineClose size={22} onClick={() => closeSearch()} className="cursor-pointer hover: scale-105" />
            </div>
            <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {showSuggestions && searchResults  && (
            <div className="z-10 w-full bg-white border rounded-md shadow-lg mt-1" >
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <a href={`/profile/${result.id}`}
                        key={result.id}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                        <img
                            src={`${CLOUDINARY_IMG_PREFIX}${result.avatar}`}
                            alt={result.username}
                            className="w-8 h-8 rounded-full mr-3"
                        />
                        <span>{result.username}</span>
                        </a>
                    ))
                ) : (
                    <div className="p-2 text-gray-500">No results found.</div>
                )}
            </div>
            )}
        </div>
    )
}

export default Search;