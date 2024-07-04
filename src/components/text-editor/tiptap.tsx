import React from 'react';
import { Toolbar } from './toolbar';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react'


interface TiptapProps {
    content: string;
    onChange: (newText: string) => void;
}

export const Tiptap = ({
    content,
    onChange,
}: TiptapProps) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-4',
                    },
                    itemTypeName: 'listItem',
                    keepMarks: true,
                    keepAttributes: true,
                }
            }),
        ],
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-4 py-3 justify-start border-b border-r border-l items-start w-full gap-3 font-medium pt-4 rounded-bl-md rounded-br-md outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        content: content
    })

    if (!editor) {
        return null
    }

    return (
        <div className="w-full">
            <Toolbar editor={editor} />
            <EditorContent 
                editor={editor}
                placeholder="Activate the bullet list button."
            />
        </div>
    )
}