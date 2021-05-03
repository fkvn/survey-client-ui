import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const STR_TYPE = "str";
export const DATE_TYPE = "date";

export const toSentenceCase = (inputStr = "") => {
  if (!inputStr) return "";

  let sentenceCase = "";
  sentenceCase = inputStr.toLowerCase();
  sentenceCase = sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1);
  return sentenceCase;
};

export const getIndexById = (items = [], itemId) => {
  if (items.length < 1) return [];

  return items.reduce(
    (index, item, i) => (Number(item.id) === Number(itemId) ? i : index),
    -1
  );
};

export const sortableObjectByValue = (obj = {}) => {
  if (isEmpty(obj)) return [];

  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, _], rank) => ({ ...r, [k]: rank + 1 }), {});
};

export function round(value, places) {
  var multiplier = Math.pow(10, places);

  return Math.round(value * multiplier) / multiplier;
}

export const updateSortedTitles = (
  currentSortedAttr,
  currentOrderByAsc,
  newSortedAttr,
  newSortedType
) => {
  return {
    sortedAttr: newSortedAttr,
    sortedType: newSortedType,
    OrderByAsc: newSortedAttr !== currentSortedAttr ? true : !currentOrderByAsc,
  };
};

export const sortedItems = (
  items = [],
  sortedAttr,
  sortedType,
  orderAsc,
  grouped = false,
  groupAttr
) => {
  if (items.length < 1) return [];

  let sortedItems = [];

  if (grouped) {
    sortedItems = items.sort((a, b) => (a[groupAttr] < b[groupAttr] ? 1 : -1));
  } else {
    sortedItems = [...items];
  }

  if (sortedType === DATE_TYPE) {
    sortedItems = sortedItems.sort((a, b) =>
      a[sortedAttr] < b[sortedAttr] ? 1 : -1
    );
  } else {
    sortedItems = sortedItems.sort((a, b) =>
      a[sortedAttr] > b[sortedAttr] ? 1 : -1
    );
  }

  if (!orderAsc) {
    sortedItems = sortedItems.reverse();
  }

  return sortedItems;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const successfulState = (state, updatedProperties) => {
  const { err, errMsg, ...withouErrState } = state;

  return {
    ...withouErrState,
    ...updatedProperties,
  };
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};

export const dateFormat = (date) => {
  let formatedDate = "";

  let exportDate = [
    { key: "year", value: date.getFullYear() },
    { key: "month", value: date.getMonth() + 1 },
    { key: "day", value: date.getDate() },
    { key: "hours", value: date.getHours() },
    { key: "minutes", value: date.getMinutes() },
    { key: "seconds", value: date.getSeconds() },
  ];

  exportDate = exportDate.reduce((newDate, { key, value }) => {
    return {
      ...newDate,
      [key]: value < 10 ? `0${value}` : value,
    };
  }, {});

  formatedDate = `${exportDate.year}-${exportDate.month}-${exportDate.day} ${exportDate.hours}:${exportDate.minutes}:${exportDate.seconds}`;

  return formatedDate;
};

export const updateQDescImgs = (description, attachments) => {
  // remove all white spaces between tag

  const desc = description.replace(/>\s+</g, "><");

  const pTag = ["<p>", "</p>"];
  const firstPTagValue = desc.slice(
    desc.search(pTag[0]) + "<p>".length,
    desc.search(pTag[1])
  );
  const firstPTag = `${pTag[0]}${firstPTagValue}${pTag[1]}`;

  // remove first <p>
  let updateDesc = desc.replace(firstPTag, firstPTagValue);

  // remove all empty <p>
  updateDesc = updateDesc.replace(/<p><\/\p>/g, "");

  const element = document.createElement("div");
  element.innerHTML = updateDesc;

  const imgSrcUrls = element.getElementsByTagName("img");
  for (let i = 0; i < imgSrcUrls.length; i++) {
    const attachmentIndex = Number(
      imgSrcUrls[i].getAttribute("attachmentindex")
    );
    // update url
    if (
      attachmentIndex >= 0 &&
      attachments &&
      attachmentIndex < attachments.length
    ) {
      imgSrcUrls[i].setAttribute("src", attachments[attachmentIndex]);
    }

    // update style
    const imgStyles = imgSrcUrls[i].getAttribute("style").split(";");
    for (let j = 0; j < imgStyles.length; j++) {
      const style = imgStyles[j].split(":");

      if (style[0] === "height") {
        imgSrcUrls[i].setAttribute("height", style[1].trim());
      } else if (style[0] === "width") {
        imgSrcUrls[i].setAttribute("width", style[1].trim());
      }
    }
    imgSrcUrls[i].removeAttribute("style");

    // update alignment
    const parent = imgSrcUrls[i].parentNode;
    const parentStyles = parent.getAttribute("style")
      ? parent.getAttribute("style").split(";")
      : [];
    let imgAlignment = "";

    for (let j = 0; j < parentStyles.length; j++) {
      const style = parentStyles[j].split(":");
      if (style[0] === "text-align") {
        imgAlignment = style[1];
        if (style[1] === "none") {
          parent.setAttribute(
            "style",
            parent
              .getAttribute("style")
              .replace("text-align:none", "text-align: center")
          );
        }
      }
    }

    imgSrcUrls[i].setAttribute("alignment", imgAlignment.trim());
  }

  // insert <figure> tag for converToHTML purpose
  for (let i = 0; i < imgSrcUrls.length; i++) {
    const parent = imgSrcUrls[i].parentNode;
    const wrapper = document.createElement("figure");
    wrapper.appendChild(imgSrcUrls[i]);
    parent.append(wrapper);
  }

  // for display first div (parent node)
  const divTag = element.getElementsByTagName("div");
  for (let i = 0; i < divTag.length; i++) {
    const classNameValue = divTag[i].getAttribute("class");
    divTag[i].setAttributeNS(
      null,
      `class`,
      classNameValue ? classNameValue + " my-2" : "my-2"
    );
  }

  return element.innerHTML;
};

export const exportFromEditor = (editorState, attachmentObjects) => {
  const contentState = editorState.getCurrentContent();
  const markup = draftToHtml(convertToRaw(contentState));

  let newDescription = markup;
  const newattachments = [];

  const element = document.createElement("div");
  element.innerHTML = newDescription;

  const imgSrcUrls = element.getElementsByTagName("img");

  for (let i = 0; i < imgSrcUrls.length; i++) {
    const src = imgSrcUrls[i].getAttribute("src");
    const attachment = attachmentObjects && attachmentObjects[src];

    if (attachment) {
      imgSrcUrls[i].setAttribute("attachmentIndex", i);

      newattachments[
        newattachments[i - 1] ? i : i - 1 < 0 ? 0 : i - 1
      ] = attachment;
    }
  }

  newDescription = element.innerHTML;

  const isEmptyEditor =
    (contentState && contentState.hasText()) || newattachments.length > 0
      ? false
      : true;

  return [newDescription, newattachments, isEmptyEditor];
};

export const getFileNameFromDisposition = (disposition) => {
  let filename = "";
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }

  return filename;
};

export const BlobToFile = (blob, fileName) => {
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type: blob.type,
  });
};

export const exclusiveArr = (a1, a2) => {
  var a2Set = new Set(a2);
  return a1.filter(function (x) {
    return !a2Set.has(x);
  });
};

export const diffArr = (a1, a2) => {
  return exclusiveArr(a1, a2).concat(exclusiveArr(a2, a1));
};

export const moveItemFromSource = (source = [], oldIndex = 0, newIndex = 0) => {
  const afterMovedSource = [...source];

  if (oldIndex !== newIndex && afterMovedSource.length > 0) {
    let currentValueIndex = 0;

    for (let i = 0; i < source.length; i++) {
      if (i === oldIndex || i === newIndex) {
        if (i === oldIndex) {
          if (currentValueIndex === oldIndex) {
            currentValueIndex = currentValueIndex + 1;
          }
          afterMovedSource[i] = { ...source[currentValueIndex] };
          currentValueIndex = currentValueIndex + 1;
        }
        // newIndex
        else {
          afterMovedSource[i] = { ...source[oldIndex] };
        }
      } else {
        if (currentValueIndex === oldIndex) {
          currentValueIndex = currentValueIndex + 1;
        }
        afterMovedSource[i] = { ...source[currentValueIndex] };
        currentValueIndex = currentValueIndex + 1;
      }
    }

    return afterMovedSource;
  }
};

// export const checkValidity = ( value, rules ) => {
//     let isValid = true;
//     if ( !rules ) {
//         return true;
//     }

//     if ( rules.required ) {
//         isValid = value.trim() !== '' && isValid;
//     }

//     if ( rules.minLength ) {
//         isValid = value.length >= rules.minLength && isValid
//     }

//     if ( rules.maxLength ) {
//         isValid = value.length <= rules.maxLength && isValid
//     }

//     if ( rules.isEmail ) {
//         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//         isValid = pattern.test( value ) && isValid
//     }

//     if ( rules.isNumeric ) {
//         const pattern = /^\d+$/;
//         isValid = pattern.test( value ) && isValid
//     }

//     return isValid;
// }
