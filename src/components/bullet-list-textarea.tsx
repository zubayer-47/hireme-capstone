"use client";

import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";

type BulletListTextareaProps = {
  placeholder: string,
  descriptions: string[],
  onUpdate: (descriptions: string[]) => void;
}

export const BulletListTextarea = ({ 
  placeholder, 
  descriptions, 
  onUpdate 
}: BulletListTextareaProps) => {
  const [content, setContent] = useState(descriptions.map(line => `• ${line}`).join('\n'));

  // This makes sure that when the component is rendered the bullet points is visible
  // And when user enters a new line a bullet list will be generated at the beginning
  useEffect(() => {
    setContent(descriptions.map(line => `• ${line}`).join('\n'));
  }, [descriptions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContent(value);

    // Remove the bullet list when passing it as value
    const updatedDescriptions = value.split('\n').map(line => line.replace(/^•\s?/, ''));
    onUpdate(updatedDescriptions);
  };


  return (
    <Textarea
        rows={10}
        className="w-full"
        value={content}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
  )
}