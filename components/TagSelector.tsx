import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


type TagSelectorProps = {
    selectedTags: string[];
    allTags: string[];
    onTagClick: (tag: string) => void;
};

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, allTags, onTagClick }) => {
    return (
        <Stack direction="row" spacing={1} className="mt-2" flexWrap="wrap" useFlexGap>
            {allTags.map(tag => (
                <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => onTagClick(tag)}
                    size="small"
                    style={{ textTransform: 'capitalize' }}
                    sx={{ 
                        color: selectedTags.includes(tag) ? 'white' : 'black',
                        background: selectedTags.includes(tag) ? 'blue' : 'white'
                     }}
                >
                    {tag}
                </Button>
            ))}
        </Stack>
    );
};

export default TagSelector;
