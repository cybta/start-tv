import nodeBuilder from "../util/nodeBuilder.js";
import intersectionObserver from "../util/intersectionObs.js";

const listOfMovies = (appOBJ, runLandingPage) => {
  let window_offset = 0;
  let activateFirstItem = null,
    back_btn,
    nodeListOfMovie;

  //* start creating the html node elements
  // --------------------------------------

  // create the main view
  const listOfMovies_view = nodeBuilder({
    tag: "section",
    id: "listOfMovies_view",
    class: "listOfMovies_view",
    parent: "app",
  });

  // create the movie tile/card
  const createItem = (item, i) => {
    // create the movie tile/card container
    const el = nodeBuilder({
      tag: "div",
      id: "movie-" + i,
      class: "movie_tile br8 focusable",
      parent: nodeListOfMovie.id,
    });

    // create the image
    const image = nodeBuilder({
      tag: "img",
      content: `./public/images/${item.image}`,
      parent: el.id,
    });

    // create the title and alias wrapper
    const textwrapper = nodeBuilder({
      tag: "div",
      parent: el.id,
    });

    // create the title
    const title = nodeBuilder({
      tag: "h2",
      content: item.title,
      parent: textwrapper.id,
    });

    // create the alias
    const alias = nodeBuilder({
      tag: "h5",
      content: item.alias,
      parent: textwrapper.id,
    });
  };

  const fetchData = async (data_URL, cb) => {
    const response = await fetch(data_URL);
    const data = await response.json();
    cb(data);
  };

  fetchData("./data.json", (data) => {
    const listOfMovies = data.items;

    // create the header
    const header = nodeBuilder({
      tag: "header",
      id: "header",
      parent: listOfMovies_view.id,
    });

    // create the page title
    const title = nodeBuilder({
      tag: "h1",
      parent: header.id,
      content: data.title,
    });

    // create the back button
    back_btn = nodeBuilder({
      tag: "button",
      id: "back_button",
      class: "back_btn br8 focusable",
      parent: header.id,
      content: "Back",
    });

    // create the list of movie container
    nodeListOfMovie = nodeBuilder({
      tag: "div",
      id: "listOfMovies_module",
      class: "listOfMovies_module",
      parent: listOfMovies_view.id,
    });

    // assign the list of video to the main Object so we can use it in this popup
    appOBJ.videosList = listOfMovies;

    // iterating and creating the movie cards
    listOfMovies.map((item, i) => {
      createItem(item, i);
    });

    // assigning the back button to the focusable elements on the vertical axis
    let focus_vertical_Arr = ["back_button"];

    // creating the click event and focusing the first child
    const listofMovies = document.querySelectorAll(".movie_tile");
    Array.from(listofMovies).map((mov, i) => {
      // focusing the first child
      if (i === 0) mov.classList.add("focus");

      // creating the focusable elements on the vertical axis
      focus_vertical_Arr.push(mov.id);

      // creating the click event for each child
      mov.addEventListener("click", () => {
        var index = appOBJ.focusEl.replace("movie-", "");
        appOBJ.videoIndex = index;
        appOBJ.runRenderView("singleMovie", appOBJ.videosList[index]);
      });
    });

    // activate the animate on scroll
    intersectionObserver(listofMovies);

    // back button event
    back_btn.addEventListener("click", runLandingPage);

    // recreate the orientation system
    delete appOBJ.focus_horizontal_Arr;
    appOBJ.focus_vertical_Arr = focus_vertical_Arr;

    appOBJ.focus();
  });

  // --------------------------------------
  //* end creating the html node elements

  // on keys UP and DOWN scroll the amount of card
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 40:
      case 38:
        let getOffset = 0;

        if (app.focusEl === "back_button") {
          getOffset = 0;
        } else {
          getOffset =
            document.getElementById(appOBJ.focusEl).offsetTop -
            document.getElementById("header").offsetHeight;
        }

        window.scrollTo({
          top: getOffset,
        });
        break;
    }
  });
};

export default listOfMovies;
