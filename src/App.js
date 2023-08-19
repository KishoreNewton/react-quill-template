import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const modules = {
  toolbar: {
    container: [
      // Font and Size selectors
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // Default is the middle value

      // Basic styles
      ["bold", "italic", "underline", "strike"],

      // Script
      [{ script: "sub" }, { script: "super" }], // superscript/subscript

      // Block-level styles
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["blockquote"],

      // Text alignment
      [{ align: [] }],

      // Indent and outdent
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

      // Link, Image, and Video
      ["link", "image", "video"],

      // Horizontal rule
      ["divider"], // The string "divider" might differ depending on Quill's version and plugins

      // Inline and background color picker
      [{ color: [] }, { background: [] }],
    ],
    handlers: {
      image: imageHandler,
      video: videoHandler,
    },
  },
};

// TODO
function imageHandler() {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();

    formData.append("image", file);

    const uploadedImageUrl = await uploadImage(formData);
    const range = this.quill.getSelection(true);
    this.quill.insertEmbed(range.index, "image", uploadedImageUrl);
  };
}

// TODO
function videoHandler() {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "video/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();

    formData.append("video", file);

    const uploadedVideoUrl = await uploadVideo(formData);
    const range = this.quill.getSelection(true);
    this.quill.insertEmbed(
      range.index,
      "video",
      uploadedVideoUrl,
      Quill.sources.USER,
    );
  };
}
async function uploadImage(formData) {
  // Replace with your upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("https://example.com/uploaded-image-url.jpg");
    }, 1500);
  });
}

async function uploadVideo(formData) {
  // Replace with your video upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("https://example.com/uploaded-video-url.mp4");
    }, 1500);
  });
}

function BlogEditor() {
  const [editorHtml, setEditorHtml] = useState("");

  function handleChange(html) {
    setEditorHtml(html);
  }

  return (
    <ReactQuill value={editorHtml} onChange={handleChange} modules={modules} />
  );
}

function App() {
  return (
    <div className="App">
      <BlogEditor />
    </div>
  );
}

export default App;
