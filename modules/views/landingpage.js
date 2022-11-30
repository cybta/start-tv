import nodeBuilder from "../util/nodeBuilder.js";
const landingPage = (appOBJ, enterMovieList) => {
  //* start creating the html node elements
  // --------------------------------------

  // create the main view
  const landingpage_view = nodeBuilder({
    tag: "section",
    id: "landingpage_view",
    class: "landingpage_view",
    parent: "app",
  });

  // create the enter button
  const enterApp = nodeBuilder({
    tag: "button",
    id: "enter_btn",
    class: "enter_btn br8 px25 py45 focus focusable",
    content: "Enter",
    parent: landingpage_view.id,
  });

  // create the exit button
  const exitApp = nodeBuilder({
    tag: "button",
    id: "exit_btn",
    class: "exit_btn br8 px25 py45 focusable",
    content: "Exit",
    parent: landingpage_view.id,
  });

  // --------------------------------------
  //* end creating the html node elements
  appOBJ.focus_horizontal_Arr = ["enter_btn", "exit_btn"];

  // close the window
  exitApp.addEventListener("click", () => {
    self.close();
  });

  // show the list of movies on enter button click
  enterApp.addEventListener("click", enterMovieList);
};

export default landingPage;
