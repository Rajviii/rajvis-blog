"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, 
  Undo, Redo, Code, Image as ImageIcon
} from "lucide-react";

interface EditorProps {
  content: any;
  onChange: (content: any) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const buttons = [
    { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
    { icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { icon: <Code size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock") },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 backdrop-blur-md rounded-t-xl sticky top-0 z-10">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          className={`p-2 rounded-md transition-colors ${btn.active ? "bg-primary text-white" : "hover:bg-white/10 text-gray-400"}`}
        >
          {btn.icon}
        </button>
      ))}
      <div className="w-px h-6 bg-white/10 mx-1 self-center" />
      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-white/10 text-gray-400 rounded-md">
        <Undo size={18} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-white/10 text-gray-400 rounded-md">
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story here...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[400px] p-6",
      },
    },
  });

  return (
    <div className="glass rounded-xl border border-white/10 overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
