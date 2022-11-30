import nodeBuilder from "../util/nodeBuilder.js";

const renderVideoView = (appOBJ, object) => {
  appOBJ.view = "singleMovie";

  // get the previews elements focus to reuse it
  appOBJ.previous_focus_vertical_Arr = appOBJ.focus_vertical_Arr;
  appOBJ.previousFocus = appOBJ.focusEl;

  // remove any popups if any
  if (document.getElementById("popup"))
    document.getElementById("popup").remove();

  // create the main view
  const popupModule = nodeBuilder({
    tag: "div",
    id: "popup",
    class: "fullMovie",
    parent: "app",
  });

  // create the main image
  const image = nodeBuilder({
    tag: "img",
    class: "br8 anim",
    content: `./public/images/${object.image}`,
    parent: popupModule.id,
  });

  // create the text wrapper for title, alias and description
  const textwrapper = nodeBuilder({
    tag: "div",
    class: "anim",
    parent: popupModule.id,
  });

  // create the back button
  const back_btn = nodeBuilder({
    tag: "button",
    id: "popup-back",
    class: "popup-back br8 focusable anim",
    content: "Back",
    parent: popupModule.id,
  });

  // create the title
  const title = nodeBuilder({
    tag: "h1",
    class: "anim",
    content: object.title,
    parent: textwrapper.id,
  });

  // create the alias
  const alias = nodeBuilder({
    tag: "h5",
    class: "anim",
    content: object.alias,
    parent: textwrapper.id,
  });

  // create the description
  const description = nodeBuilder({
    tag: "div",
    class: "description anim",
    content: object.description,
    parent: textwrapper.id,
  });

  // create the next btn
  const nexBtn = nodeBuilder({
    tag: "button",
    id: "nex_btn",
    class: "nex_btn br8 px15 py25 focusable anim",
    content: "Next",
    parent: textwrapper.id,
  });

  // create the focusable vertical fileds
  appOBJ.focus_vertical_Arr = ["nex_btn", "popup-back"];

  // animate and fade in the contnt
  setTimeout(() => {
    popupModule.style.opacity = 1;

    setTimeout(() => {
      nexBtn.classList.add("focus");
      appOBJ.focusEl = "nex_btn";
    }, 1000);
  }, 300);

  // close the popup
  window.closePopUp = () => {
    popupModule.classList.add("hide");
    setTimeout(() => {
      appOBJ.view = "list_movies_view";
      appOBJ.focus_vertical_Arr = appOBJ.previous_focus_vertical_Arr;
      appOBJ.focusEl = appOBJ.previousFocus;
      focusEl(appOBJ.focusEl);

      nexBtn.removeEventListener("click", renderNextVideo, false);
      popupModule.remove();
    }, 300);
  };

  // close the popup on back button click
  back_btn.addEventListener("click", () => {
    closePopUp();
  });

  // run the hover function
  appOBJ.focus();

  // rerender content on next
  const reRenderData = (newVidOBJ) => {
    // select all animat elements and hide them
    const allAnim = document.querySelectorAll(".anim");
    Array.from(allAnim).map((el) => {
      setTimeout(() => {
        el.classList.add("hideEl");
      }, 300);
    });

    // wait for the element to hide and change values
    setTimeout(() => {
      title.textContent = newVidOBJ.title;
      alias.textContent = newVidOBJ.alias;
      description.textContent = newVidOBJ.description;
      image.src = `./public/images/${newVidOBJ.image}`;

      // show the new elements back on the screen
      Array.from(allAnim).map((el) => {
        setTimeout(() => {
          el.classList.remove("hideEl");
        }, 200);
      });
    }, 600);
  };

  // detect the next video and run rerender video view
  window.renderNextVideo = () => {
    if (appOBJ.videoIndex < appOBJ.videosList.length - 1) {
      ++appOBJ.videoIndex;
    } else {
      appOBJ.videoIndex = 0;
    }
    reRenderData(appOBJ.videosList[appOBJ.videoIndex]);
  };

  // detect the next video and run rerender video view
  window.renderPrevVideo = () => {
    if (appOBJ.videoIndex > 0) {
      --appOBJ.videoIndex;
    } else {
      appOBJ.videoIndex = appOBJ.videosList.length - 1;
    }
    reRenderData(appOBJ.videosList[appOBJ.videoIndex]);
  };

  // add the next button click functionality
  nexBtn.addEventListener("click", renderNextVideo, false);
};

export default renderVideoView;
