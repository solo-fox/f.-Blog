import styled from 'styled-components'
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import BlogEditorExt from "@/components/blog/BlogEditorExt"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  {
    ssr: true
  }
);


export default function BlogEditor({value, setValue }) {
  return (
    <Editor className="editor">
      <MDEditor
        onChange={(newValue = "") => setValue(newValue)}
        textareaProps={ {
          placeholder: "Please enter Markdown text"
        }}
        height="100%"
        value={value}
        previewOptions={ {
          rehypePlugins: [[rehypeSanitize]],
          components: {
            code: BlogEditorExt
          }
        }}
        />
    </Editor>
  )
}

  const Editor = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0rem;
  grid-row-gap: 0px;
  flex-grow:1;
  `