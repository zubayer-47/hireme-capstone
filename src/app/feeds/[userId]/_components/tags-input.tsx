"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useState, useRef } from 'react';

type TagsInputProps = {
    value: string[];
    onChange: (tags: string[]) => void;
};

export const TagsInput = ({ value, onChange }: TagsInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
                setInputValue("");
            }
        } else if (e.key === "Backspace" && !inputValue) {
            onChange(value.slice(0, -1));
        }
    };

    const handleTagRemove = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <>
            {value.length > 0 && (
                <div className="flex items-center  flex-wrap flex-grow overflow-x-auto w-full space-x-0.5">
                    {value.map((tag, index) => (
                        <Badge key={index} className="mb-1 flex items-center gap-1 dark:bg-neutral-950 hover:dark:bg-neutral-800 dark:border-white/[0.1] hover:dark:border-white/[0.3] border-black/[0.1] hover:border-black/[0.3] bg-neutral-300 dark:text-neutral-400 text-neutral-600" >
                            {tag}
                            <X className="text-app-color h-4 w-4 cursor-pointer" onClick={() => handleTagRemove(index)} />
                        </Badge>

                    ))}
                </div>
            )}
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter..."
                className="tags-input"
            />
        </>
    );
};
