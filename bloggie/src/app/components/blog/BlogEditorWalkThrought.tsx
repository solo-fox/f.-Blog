import Joyride from "react-joyride";

export default function BlogEditorWalkThrought() {
  var steps = [
    {
      target: ".tools",
      content: "This is the Info Tool Bar!",
    },
    {
      target: ".date",
      content: "This shows todays Date.",
    },
    {
      target: ".words",
      content: "This shows how many words have been written.",
    },
    {
      target: ".publish",
      content: "Click this when you are finished to make your post shine!",
    },
    {
      target: ".theme",
      content: "Switch between dark and light Editor!",
    },
    {
      target: ".blogname",
      content: "Don't forget to name your blog before publishing.",
    },
    {
      target: ".editor",
      content: "This is the writing section.",
    },
  ];
  return <Joyride steps={steps} />;
}
