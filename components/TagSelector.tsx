import React from "react";

type TagSelectorProps = {
    selectedTags: string[];
    allTags: string[];
    onTagClick: (tag: string) => void;
};

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, allTags, onTagClick }) => {
    return (
        <label>
            Event Tags
            <ul className="flex space-x-2">
                {allTags.map(tag => (
                    <li className="mt-2" key={tag}>
                        <button type="button" onClick={() => onTagClick(tag)} className={`px-2 py-1 ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {tag}
                        </button>
                    </li>
                ))}
            </ul>
        </label>
    );
};

export default TagSelector;
