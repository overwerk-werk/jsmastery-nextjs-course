"use client";

import '@mdxeditor/editor/style.css'

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { basicDark } from 'cm6-theme-basic-dark'
import "./dark-editor.css";
import { useTheme } from "next-themes";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, editorRef, fieldChange, ...props }: Props) => {
    const { resolvedTheme } = useTheme();

    const theme  = resolvedTheme === "dark" ? [basicDark] : [];

  return (
    <MDXEditor
    key={resolvedTheme}
      markdown={value}
      className="background-light900_dark200 light-border-2 markdown-editor grid dark-editor w-full border"
      onChange={fieldChange}
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: ""}),
        codeMirrorPlugin({
            codeBlockLanguages: {
                css: 'css',
                txt: 'txt',
                sql: 'sql',
                html: 'html',
                saas: 'saas',
                scss: 'scss',
                bash: 'bash',
                json: 'json',
                js: 'javascript',
                ts: 'typescript',
                "": 'unspecified',
                tsx: "Typescript (React)",
                jsx: "Javascript (React)"
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({viewMode: 'rich-text' , diffMarkdown: ''}),
        toolbarPlugin({
            toolbarContents: () =>
                (
                <ConditionalContents 
                options={[
                    {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />
                    },
                    {
                        fallback: () => (
                            <>
                            <UndoRedo />
                            <Separator />

                            <BoldItalicUnderlineToggles />
                            <Separator />

                            <ListsToggle />
                            <Separator />

                            <CreateLink />
                            <InsertImage />
                            <Separator />
                            
                            <InsertTable />
                            <InsertThematicBreak />

                            <InsertCodeBlock />


                            
                            </>
                        ),
                    },
                ]}
                />
            )},
        )
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default Editor;
