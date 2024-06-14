"use client";

import React from "react";
import { List } from "lucide-react";
import { type Editor } from "@tiptap/react";

interface ToolbarProps {
    editor: Editor | null;
};

export const Toolbar = ({ editor }: ToolbarProps) => {
    if (!editor) {
        return null;
    }
    return (
        <div
            className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border"
        >
            <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={
                        editor.isActive("bulletList")
                            ? "bg-app-color text-white p-2 rounded-lg"
                            : "text-app-color"
                    }
                >
                    <List className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
