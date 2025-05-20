let existingbutton = document.querySelector("#nav-uiconfigs");
let newbutton = existingbutton.cloneNode(true);

// Change ID from nav-uiconfigs to nav-billing
newbutton.id = "nav-billing";

newbutton.querySelector(".nav-text").innerHTML = "Billing Center";
newbutton.classList.remove("nav-link-current"); // Remove class right after cloning
document.querySelector("#nav-buttons").appendChild(newbutton);
newbutton
  .querySelector(".nav-bg-image")
  .setAttribute(
    "style",
    "background-position: 0;background-image:url('path/to/image.jpg')",
  );

newbutton.querySelector("a").addEventListener("click", function (e) {
  let navButtons = document.querySelectorAll("#nav-buttons li");
  navButtons.forEach(function (button) {
    button.classList.remove("nav-link-current");
  });

  // Add nav-link-current to the newbutton (now with ID nav-billing)
  //   newbutton.classList.add("nav-link-current");
  //   newbutton.classList.add("loading");

  document.querySelector(".navigation-title").innerHTML = "Website";
  document.querySelector("#content").innerHTML =
    "<div class='website-content'>Welcome to the Website Section</div>";

  return false;
});
