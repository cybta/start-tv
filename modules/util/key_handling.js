const keyHanlding = (appOBJ, renderView) => {
  // focusing the Element
  window.focusEl = (elID) => {
    appOBJ.focusEl = elID;
    const element = document.getElementById(elID);
    const allFocused = document.querySelectorAll(".focus");

    for (let i = 0; i < allFocused.length; i++) {
      allFocused[i].classList.remove("focus");
      allFocused[i].blur();
    }

    if (element) element.classList.add("focus");
    if (element) element.focus();
  };

  // decreasing the counter
  const decrease_Counter = (counter, arrLength) => {
    if (counter > 0) {
      return --counter;
    } else {
      return arrLength.length - 1;
    }
  };

  // increasing the counter
  const increase_Counter = (counter, arrLength) => {
    if (counter < arrLength.length - 1) {
      return ++counter;
    } else {
      return 0;
    }
  };

  // keys mapping
  const keyEventPressed = function (e) {
    switch (e.keyCode) {
      case 40:
        handleKeyDown();
        break;

      case 38:
        handleKeyUp();
        break;

      case 37:
        handleKeyLeft();
        break;

      case 39:
        handleKeyRight();
        break;

      case 13:
        handleKeyEnter();
        break;

      default:
        console.log("[keyCode]", e.keyCode);
    }
  };

  // detecting the orientation vertical or horizontal and which direction the user is going (up, down || left, right)
  const focusSystem = (orientation, direction) => {
    const currentFocus = appOBJ.focusEl;

    let arrayMap = null;
    if (orientation === "horizontal") {
      arrayMap = appOBJ.focus_horizontal_Arr;
    } else {
      arrayMap = appOBJ.focus_vertical_Arr;
    }

    arrayMap.map((el, i) => {
      if (el === currentFocus) {
        const acivateIndex =
          direction === "decrease"
            ? decrease_Counter(i, arrayMap)
            : increase_Counter(i, arrayMap);

        console.log(arrayMap[acivateIndex]);
        focusEl(arrayMap[acivateIndex]);
      }
    });
  };

  // on enter key function
  const activateEl = () => {
    switch (appOBJ.view) {
      case "landing_page":
        switch (appOBJ.focusEl) {
          case appOBJ.focus_horizontal_Arr[0]:
            renderView("list_movies_view");
            break;

          case appOBJ.focus_horizontal_Arr[1]:
            self.close();
            break;
        }
        break;

      //
      case "list_movies_view":
        if (appOBJ.focusEl.includes("movie-")) {
          var index = appOBJ.focusEl.replace("movie-", "");
          appOBJ.videoIndex = index;
          renderView("singleMovie", appOBJ.videosList[index]);
        }
        break;

      //
      case "singleMovie":
        if (appOBJ.focusEl === "back_button") {
          window.closePopUp();
        } else {
          window.renderNextVideo();
        }
        break;
    }
  };

  // beautify and make the logic clearer
  const focusManager = {
    EnterEvent: () => {
      activateEl();
    },
    LeftEvent: () => {
      if (appOBJ.view === "singleMovie") {
        window.renderPrevVideo();
        return;
      }
      focusSystem("horizontal", "decrease");
    },
    RightEvent: () => {
      if (appOBJ.view === "singleMovie") {
        window.renderNextVideo();
        return;
      }
      focusSystem("horizontal", "increase");
    },
    UpEvent: () => {
      focusSystem("vertical", "decrease");
    },
    DownEvent: () => {
      focusSystem("vertical", "increase");
    },
  };

  document.addEventListener("keydown", keyEventPressed);

  // key down functionality
  const handleKeyDown = () => {
    switch (appOBJ.view) {
      case "landing_page":
        return;
      case "list_movies_view":
      case "singleMovie":
        focusManager.DownEvent();
        break;
    }
  };

  // key up functionality
  const handleKeyUp = () => {
    switch (appOBJ.view) {
      case "landing_page":
        return;
      case "list_movies_view":
      case "singleMovie":
        focusManager.UpEvent();
        break;
    }
  };

  // key left functionality
  const handleKeyLeft = () => {
    switch (appOBJ.view) {
      case "landing_page":
      case "singleMovie":
        focusManager.LeftEvent();
        break;
      case "list_movies_view":
        return;
    }
  };

  // key right functionality
  const handleKeyRight = () => {
    switch (appOBJ.view) {
      case "landing_page":
      case "singleMovie":
        focusManager.RightEvent();
        break;
      case "list_movies_view":
        return;
    }
  };

  // key enter functionality
  const handleKeyEnter = () => {
    focusManager.EnterEvent();
  };

  focusEl("enter_btn");
};

export default keyHanlding;
