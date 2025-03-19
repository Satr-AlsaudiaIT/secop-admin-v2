import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const RichTextEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      let newEditorState = EditorState.createWithContent(contentState);
      newEditorState = EditorState.moveFocusToEnd(newEditorState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlString = draftToHtml(rawContent);
    onChange(htmlString);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class-name mt-1 w-full bg-white  rounded-md text-sm shadow-sm"
      editorClassName="editor-class-name px-2"
      toolbarClassName="toolbar-class-name flex justify-center items-center"
      toolbar={{
        options: ["inline", "blockType", "list"],
        inline: { options: ["bold", "italic", "underline"] },
        blockType: {
          inDropdown: true,
          options: ["Normal", "H1", "H2", "H3"],
        },
        list: { options: ["unordered", "ordered"] },
      }}
    />
  );
};

export default RichTextEditor;
