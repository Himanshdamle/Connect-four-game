import gsap from "gsap";

const codeLink = document.querySelector("#source-code-link");
const duration = 0.3;
const displacement = 15;

const tl = gsap.timeline();
codeLink.addEventListener("mouseenter", () => {
  tl.to("#left-arrow", {
    x: -displacement,
    duration,
  });
  gsap.to("#right-arrow", {
    x: displacement,
    duration,
  });
  tl.set("#code-letter", { scale: 0.3 });
  tl.to("#code-letter", {
    opacity: 1,
    scale: 1,
    duration: duration + 0.2,
  });
});
codeLink.addEventListener("mouseleave", () => {
  tl.to("#code-letter", {
    opacity: 0,
    scale: 0.3,
    duration: duration + 0.2,
  })
    .to(
      "#left-arrow",
      {
        x: 25,
        duration,
      },
      "<"
    ) // "<" makes it start at the same time as the previous animation
    .to(
      "#right-arrow",
      {
        x: -25,
        duration,
      },
      "<"
    ); // Keeps it in sync
});
