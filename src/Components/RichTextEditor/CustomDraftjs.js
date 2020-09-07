import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  convertFromHTML,
  ContentBlock,
  genKey,
} from "draft-js";

import * as funcs from "../../shared/utility";
import * as actionCreators from "../../store/actionCreators/Surveys/index";
import axios from "../../axios-surveyservice";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { genKey } from "draft-js";

const CustomDraftjs = ({ props, innerref }) => {
  const {
    editorClassName = "mx-3 my-1",
    editorStyle = {
      overflow: "auto",
      maxHeight: "200px",
      whiteSpace: "pre",
    },
    imageDefaultSize = {
      height: "120px",
      width: "100px",
    },
    defaultEditor = null,
  } = props;

  const [request, setRequest] = useState({
    editorState: EditorState.createEmpty(),
    attachmentObjects: [],
    contentState: null,
    rawContentState: null,
    markup: null,
  });

  const dispatch = useDispatch();
  const loading = useRef(true);

  useEffect(() => {
    const initilizeWithDefaultData = async () => {
      const element = document.createElement("div");
      element.innerHTML = defaultEditor;
      // element.prepend((document.createElement("p").placeholder = "|"));
      const imgSrcUrls = element.getElementsByTagName("img");

      for (let i = 0; i < imgSrcUrls.length; i++) {
        const regexFindId = /\/api\/files\/(?<id>\d+)/;
        const src = imgSrcUrls[i].getAttribute("src");

        if (regexFindId.test(src)) {
          await axios
            .get(src, {
              responseType: "blob",
              timeout: 30000,
            })
            .then((file) => {
              const fileName = funcs.getFileNameFromDisposition(
                file.headers["content-disposition"]
              );
              const newFile = funcs.BlobToFile(file.data, fileName);
              imgSrcUrls[i].setAttribute("src", src);
              dispatch(
                actionCreators.updateAttachmentObjects({
                  [src]: newFile,
                })
              );
            });
        }
      }

      const blocksFromHTML = convertFromHTML(element.innerHTML);
      let defaultState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const blockMap = defaultState.getBlockMap();

      // add block to last
      let newBlockMap = blockMap;

      if (blockMap.toSeq().last().getType() === "atomic") {
        const newBlock = new ContentBlock({
          key: genKey(),
          text: "",
          type: "unstyled",
        });

        newBlockMap = blockMap
          .toSeq()
          .concat([[newBlock.getKey(), newBlock]])
          .toOrderedMap();
      }

      // add block to first
      if (blockMap.toSeq().first().getType() === "atomic") {
        const newBlock = new ContentBlock({
          key: genKey(),
          text: "",
          type: "unstyled",
        });

        newBlockMap = newBlockMap
          .reverse()
          .toSeq()
          .concat([[newBlock.getKey(), newBlock]])
          .toOrderedMap()
          .reverse();
      }

      defaultState = defaultState.merge({
        blockMap: newBlockMap,
      });

      loading.current = false;

      updateRequest(EditorState.createWithContent(defaultState));
    };

    if (loading.current && defaultEditor) {
      initilizeWithDefaultData();
    }
  });

  const updateRequest = (newState) => {
    const newContentState = newState.getCurrentContent();
    const newRawContentState = convertToRaw(newContentState);
    const newMarkup = draftToHtml(newRawContentState);

    setRequest({
      ...request,
      editorState: newState,
      contentState: newContentState,
      rawContentState: newRawContentState,
      markup: newMarkup,
    });
  };

  const handleKeyCommand = (command) => {
    // console.log(command);

    // didn't handle "enter" or "split-block" yet
    const newState = RichUtils.handleKeyCommand(request.editorState, command);

    if (newState) {
      updateRequest(newState);
      return "handled";
    }

    return "not-handled";
  };

  const uploadImageCallBack = (file) => {
    const localSrc = URL.createObjectURL(file);

    dispatch(actionCreators.updateAttachmentObjects({ [localSrc]: file }));

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: localSrc } });
    });
  };

  const onEditorStateChange = async (newState) => {
    updateRequest(newState);
  };

  const toolbarConfig = {
    options: [
      "inline",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "image",
    ],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ["bold", "italic", "underline", "strikethrough", "monospace"],
    },
    link: {
      options: ["link"],
    },
    image: {
      uploadEnabled: true,
      uploadCallback: uploadImageCallBack,
      previewImage: true,
      className: "float-left",
      alignmentEnabled: true,
      inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
      alt: { present: true, mandatory: false },
      defaultSize: { ...imageDefaultSize },
    },
  };

  return (
    <div className="border" style={{ maxWidth: "800px" }}>
      <Editor
        ref={innerref}
        editorState={request.editorState}
        editorStyle={editorStyle ? editorStyle : {}}
        editorClassName={editorClassName ? editorClassName : ""}
        handleKeyCommand={handleKeyCommand}
        toolbar={toolbarConfig}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default React.forwardRef((props, ref) => (
  <CustomDraftjs props={props} innerref={ref} />
));
