const app = document.querySelector("#app");
import _handleKeyCode from "./modules/util/key_handling.js";
import landingpage from "./modules/views/landingpage.js";
import listOfMovies from "./modules/views/listOfMovies.js";
import renderVideoView from "./modules/views/renderVideoView.js";

window.appOBJ = null;

const _init = () => {
  appOBJ = {};

  // assigning active views and elements
  appOBJ.view = "landing_page";
  appOBJ.focusEl = "enter_btn";

  const runMoviesList = () => {
    app.textContent = "";
    appOBJ.view = "list_movies_view";
    appOBJ.focusEl = "movie-0";
    listOfMovies(appOBJ, runLandingPage);
    appOBJ.focus();
  };

  const runLandingPage = () => {
    app.textContent = "";
    appOBJ.view = "landing_page";
    appOBJ.focusEl = "enter_btn";
    landingpage(appOBJ, runMoviesList);
    appOBJ.focus();
  };

  appOBJ.runRenderView = (viewName, videoOBJ) => {
    switch (viewName) {
      case "landing_page":
        runLandingPage();
        break;
      case "list_movies_view":
        runMoviesList();
        break;
      case "singleMovie":
        renderVideoView(appOBJ, videoOBJ);
        break;
    }
  };

  landingpage(appOBJ, runMoviesList);

  _handleKeyCode(appOBJ, (getView, videoOBJ) => {
    switch (getView) {
      case "landing_page":
        app.textContent = "";
        landingpage(appOBJ, runMoviesList);
        break;

      case "list_movies_view":
        runMoviesList(appOBJ, runLandingPage);
        break;

      case "singleMovie":
        renderVideoView(appOBJ, videoOBJ);
    }
  });

  appOBJ.open = () => {
    console.log("--> open the app");
  };

  appOBJ.close = () => {
    console.log("<-- close the app");
    appOBJ = null;
  };

  appOBJ.focus = () => {
    const focusElements = document.querySelectorAll(".focusable");
    Array.from(focusElements).map((el) => {
      el.addEventListener("mouseenter", (e) => {
        focusEl(e.target.id);
      });
    });
  };

  appOBJ.focus();
};

// init
_init();
