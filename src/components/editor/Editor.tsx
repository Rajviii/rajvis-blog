"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import {
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2,
  Undo, Redo, Code, Image as ImageIcon, Loader2, Table as TableIcon
} from "lucide-react";
import { useState, useRef } from "react";

interface EditorProps {
  content: any;
  onChange: (content: any) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const buttons = [
    { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
    { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
    { icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
    { icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
    { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
    { icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
    { icon: <Code size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
    { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
    { icon: <TableIcon size={18} />, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), active: editor.isActive('table') },
  ];

  return (
    <div className="flex flex-col border-b border-border bg-background/50 backdrop-blur-md rounded-t-xl sticky top-0 z-10">
      <div className="flex flex-wrap gap-1 p-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            className={`p-2 rounded-md transition-colors ${btn.active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
          >
            {btn.icon}
          </button>
        ))}
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-2 hover:bg-muted text-muted-foreground rounded-md disabled:opacity-50"
          title="Insert Image"
        >
          {isUploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-muted text-muted-foreground rounded-md">
          <Undo size={18} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-muted text-muted-foreground rounded-md">
          <Redo size={18} />
        </button>
      </div>

      {editor.isActive('table') && (
        <div className="flex flex-wrap gap-1 p-2 bg-muted/40 border-t border-border text-xs items-center">
          <span className="text-muted-foreground mr-2 font-medium">Table Options:</span>
          <button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Add Col Before</button>
          <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Add Col After</button>
          <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Delete Col</button>
          <div className="w-px h-4 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().addRowBefore().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Add Row Before</button>
          <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Add Row After</button>
          <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="px-2 py-1 bg-background border border-border hover:bg-muted text-foreground rounded">Delete Row</button>
          <div className="w-px h-4 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="px-2 py-1 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 rounded font-medium">Delete Table</button>
        </div>
      )}
    </div>
  );
};

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: "Write your story here...",
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-lg max-w-none focus:outline-none min-h-[400px] p-6 text-foreground",
      },
    },
  });

  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
