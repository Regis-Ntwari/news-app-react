import { Button, FormControl, Grid, Input } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import QuillEditor from "../editor/QuillEditor";

export const CreateArticle = (props) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  return (
    <div>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4}>
            <form>
              <FormControl
                fullWidth
                style={{ marginTop: "1cm", marginBottom: "10px" }}
              >
                <Input
                  type="text"
                  placeholder="title"
                  value={props.title}
                  required
                  name="title"
                  onChange={props.handleChange}
                />
              </FormControl>
              <br />
              <FormControl
                fullWidth
                style={{ marginTop: "1cm", marginBottom: "1cm" }}
              >
                <label htmlFor="icon-button-file">
                <input
                  type="file"
                  accept="image/*"
                  style={{display:'none'}} 
                  id="icon-button-file"
                  required
                  name="image"
                  onChange={props.handleFileChange}
                />
                  <Button 
                    component="span" 
                    color="primary" 
                    variant="outlined"
                    >
                      <Add/>Cover photo</Button>
                </label>
              </FormControl>
              <FormControl
                fullWidth
                style={{ marginTop: "1cm", marginBottom: "1cm" }}
              >
                <QuillEditor
                  placeholder={"write something"}
                  onEditorChange={onEditorChange}
                  onFilesChange={onFilesChange}
                />
              </FormControl>
              <Button variant="outlined" fullWidth onClick={() => props.uploadArticle(content)}>
                POST
              </Button>
            </form>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </Grid>
    </div>
  );
};
