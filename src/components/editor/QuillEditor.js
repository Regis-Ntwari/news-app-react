import Axios from "axios";
import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
export default class QuillEditor extends Component {
  bandId;
  placeholder;
  onEditorChange;
  onFilesChange;
  onPollsChange;
  _isMounted;

  constructor(props) {
    super(props);

    this.state = {
      editorHtml: "",
      files: [],
    };

    this.reactQuillRef = null;
    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  };

  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  fileHandler = () => {
    this.inputOpenFileRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      console.log(e.currentTarget.files);
      const file = e.target.files[0];

      let formData = new FormData();

      // const config = {
      //   header: { "content-type": "multipart/form-data" },
      // };
      formData.append("image", file);

      Axios.post("http://localhost:8000/image/", formData).then(
        (Response) => Response.data)
        .then(data => {
          if (data) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();
            let range = quill.getSelection();
            let position = range ? range.index : 0;

            quill.insertEmbed(position, "image",  data.image);
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          } else {
            return alert("failed to upload file");
          }
        }
      );
    }
  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();

      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      Axios.post("http://localhost:8000/image", formData, config).then(
        (Response) => {
          if (Response.data.success) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();

            let range = quill.getSelection();
            let position = range ? range.index : 0;
            quill.insertEmbed(position, "video", {
              src: "http://localhost:8000/" + Response.data.url,
              title: Response.data.fileName,
            });
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          } else {
            return alert("failed to upload file");
          }
        }
      );
    }
  };
  insertFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      const formData = new FormData();

      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      Axios.post("http://localhost:8000/image/", formData, config).then(
        (Response) => {
          if (Response.data.success) {
            const quill = this.reactQuillRef.getEditor();
            quill.focus();

            let range = quill.getSelection();
            let position = range ? range.index : 0;
            quill.insertEmbed(position, "file", Response.data.fileName);
            quill.setSelection(position + 1);

            if (this._isMounted) {
              this.setState(
                {
                  files: [...this.state.files, file],
                },
                () => {
                  this.props.onFilesChange(this.state.files);
                }
              );
            }
          }
        }
      );
    }
  };
  render() {
    return (
      <div>
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
          <button className="ql-insertImage">I</button>
          <button className="ql-insertVideo">V</button>
          <button className="ql-insertFile">F</button>
          <button className="ql-link"></button>
          <button className="ql-code-block"></button>
          <button className="ql-video"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-clean"></button>
        </div>
        <ReactQuill
          ref={(el) => (this.reactQuillRef = el)}
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.inputOpenImageRef}
          style={{ display: "none" }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.inputOpenVideoRef}
          style={{ display: "none" }}
          onChange={this.insertVideo}
        />
        <input
          type="file"
          accept="*"
          ref={this.inputOpenFileRef}
          style={{ display: "none" }}
          onChange={this.insertFile}
        />
      </div>
    );
  }

  modules = {
    syntax: false,
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
      },
    },
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "file",
    "link",
    "code-block",
    "video",
    "blockquote",
    "clean",
  ];
}
