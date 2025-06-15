import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material";
import { Pallet } from "@mui/icons-material";


type TagSelectorProps = {
    selectedTags: string[];
    allTags: string[];
    onTagClick: (tag: string) => void;
};

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, allTags, onTagClick }) => {
    const theme = useTheme();
    
    const { palette } = theme;

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
                        background: selectedTags.includes(tag) ? palette.primary.main : 'white',
                        '&:hover': {
                            backgroundColor: palette.primary.main,
                            color: 'white'
                        },
                     }}
                >
                    {tag}
                </Button>
            ))}
        </Stack>
    );
};

export default TagSelector;
