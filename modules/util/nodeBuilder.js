// generating a guid to randomize and ID so you can call it by node.id
const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const nodeBuilder = (mainOBJ) => {
  // creating the tags and checking types and
  const tag = mainOBJ.tag ? mainOBJ.tag : "div";
  const el = document.createElement(tag);
  el.id = mainOBJ.id ?? guid();
  if (mainOBJ.title) el.title = mainOBJ.title;

  if (mainOBJ.tag === "input") {
    if (mainOBJ.type) el.type = mainOBJ.type;
    if (mainOBJ.type === "range") {
      if (mainOBJ.min) el.min = mainOBJ.min;
      if (mainOBJ.max) el.max = mainOBJ.max;
      if (mainOBJ.step) el.step = mainOBJ.step;
    }
    if (mainOBJ.value) el.value = mainOBJ.value;
  }

  if (mainOBJ.class) {
    el.className = mainOBJ.class;
  }

  // checking the tag if img or video
  switch (mainOBJ.tag) {
    case "img":
    case "video":
      el.src = mainOBJ.content;
      break;
    default:
      el.textContent = mainOBJ.content;
      break;
  }

  // if the dev forgot to add the parents fall back to the app element
  const parentId = mainOBJ.parent ?? "app";

  // append to parent element
  const parentElement = document.getElementById(parentId);
  parentElement.appendChild(el);

  // referance ID
  return el;
};

export default nodeBuilder;
