import animate from "animateplus";

export const animateModal = (cn) => {
  animate({
    elements: document.getElementsByClassName(cn),
    easing: "out-quartic",
    duration: 700,
    opacity: [0, 1],
    transform: ["translateY(30px)", 0],
  });
};
