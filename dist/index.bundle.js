let existingbutton = document.querySelector("#nav-uiconfigs");
let newbutton = existingbutton.cloneNode(true);
newbutton.querySelector(".nav-text").innerHTML = "Billing Center";
document.querySelector("#nav-buttons").appendChild(newbutton);
newbutton
  .querySelector(".nav-bg-image")
  .setAttribute(
    "style",
    "background-position: 0;background-image:url('path/to/image.jpg')",
  );

newbutton.querySelector("a").addEventListener("click", function (e) {
  e.preventDefault();

  let navButtons = document.querySelectorAll("#nav-buttons li");
  navButtons.forEach(function (button) {
    button.classList.remove("nav-link-current");
  });

  existingbutton.classList.remove("nav-link-current");
  newbutton.classList.add("nav-link-current");

  document.querySelector(".navigation-title").innerHTML = "Website";
  document.querySelector("#content").innerHTML =
    "<div class='website-content'>Welcome to the Website Section</div>";

  return false;
});
