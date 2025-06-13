"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";

// ... (all your plugin imports remain the same)
import {
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  BlockToolbar,
  BalloonEditor,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PlainTableOutput,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount,
  Markdown,
  SelectAll,
  Undo,
  BalloonToolbar,
  SimpleUploadAdapter,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "./admin-textarea.css";

export default function AdminTextarea({ lan, data, onChange }) {
  const editorRef = useRef(null);
  const debounceTimer = useRef(null);
  // --- NEW: A ref to flag if the change is from the editor itself ---
  const isChangeFromEditor = useRef(false);

  const editorConfig = useMemo(
    () => ({
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "sourceEditing",
          "showBlocks",
          "|",
          "heading",
          "style",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "insertImage",
          "insertTable",
          "highlight",
          "blockQuote",
          "codeBlock",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Markdown,
        SelectAll,
        Undo,
        BalloonToolbar,
        SimpleUploadAdapter,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        Base64UploadAdapter,
        BlockQuote,
        BlockToolbar,
        BalloonEditor,
        Bold,
        Code,
        CodeBlock,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        FullPage,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageEditing,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        ImageUtils,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Mention,
        PageBreak,
        Paragraph,
        PasteFromMarkdownExperimental,
        PasteFromOffice,
        PlainTableOutput,

        RemoveFormat,
        ShowBlocks,
        SourceEditing,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextPartLanguage,
        TextTransformation,
        Title,
        TodoList,
        Underline,
        WordCount,
      ],
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "|",
        "bulletedList",
        "numberedList",
      ],
      blockToolbar: [
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
      ],
      htmlSupport: {
        allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
      },
      style: {
        definitions: [
          {
            name: "Article category",
            element: "h3",
            classes: ["category"],
          },
          {
            name: "Title",
            element: "h2",
            classes: ["document-title"],
          },
          {
            name: "Subtitle",
            element: "h3",
            classes: ["document-subtitle"],
          },
          {
            name: "Info box",
            element: "p",
            classes: ["info-box"],
          },
          {
            name: "CTA Link Primary",
            element: "a",
            classes: ["button", "button--green"],
          },
          {
            name: "CTA Link Secondary",
            element: "a",
            classes: ["button", "button--black"],
          },
          {
            name: "Marker",
            element: "span",
            classes: ["marker"],
          },
          {
            name: "Spoiler",
            element: "span",
            classes: ["spoiler"],
          },
        ],
      },
      menuBar: {
        isVisible: true,
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      fullscreen: {
        onEnterCallback: (container) =>
          container.classList.add(
            "editor-container",
            "editor-container_classic-editor",
            "editor-container_include-style",
            "editor-container_include-word-count",
            "editor-container_include-fullscreen",
            "main-container"
          ),
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:wrapText",
          "imageStyle:breakText",
          "|",
          "resizeImage",
        ],
      },
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      placeholder: "Type or paste your content here!",
      language: {
        ui: "en", // Keep UI language consistent
        content: lan, // Set content language (for spellcheck etc.)
      },
    }),
    [lan]
  );

  // This effect now correctly handles external vs. internal changes.
  useEffect(() => {
    // If the flag is true, it means the change came from this editor.
    // We should ignore the update and reset the flag.
    if (isChangeFromEditor.current) {
      isChangeFromEditor.current = false;
      return;
    }

    // If the flag is false, the change is external (e.g., loading a post).
    // It's now safe to update the editor's content.
    if (editorRef.current && editorRef.current.getData() !== (data || "")) {
      editorRef.current.setData(data || "");
    }
  }, [data]); // This hook still runs when the `data` prop changes.

  // The debounced handler that updates the parent component.
  const handleDebouncedChange = useCallback(
    (editor) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const editorData = editor.getData();
        // --- NEW: Set the flag before updating the parent ---
        isChangeFromEditor.current = true;
        onChange(editorData);
      }, 500);
    },
    [onChange]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={data || ""}
          onReady={(editor) => {
            editorRef.current = editor;
          }}
          onChange={(event, editor) => {
            // On every keystroke, use the debounced handler.
            handleDebouncedChange(editor);
          }}
          onBlur={(event, editor) => {
            // When the user clicks away, we want an immediate update.
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current);
            }
            // --- NEW: Also set the flag here for the blur-triggered update ---
            isChangeFromEditor.current = true;
            onChange(editor.getData());
          }}
        />
      </div>
    </div>
  );
}
