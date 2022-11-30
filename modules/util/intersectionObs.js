// intersection observer to detect the elements and there posiion on the screen
const intersectionObs = (entries) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        // once the element is animated stop tracking and observing it
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.7, // once the element is 70% visible add the class "show"
    }
  );

  // iterate through the array of object we want to observe
  entries.forEach((entry) => {
    observer.observe(entry);
  });
};

export default intersectionObs;
