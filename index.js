let existingbutton = document.querySelector("#nav-uiconfigs");
let newbutton = existingbutton.cloneNode(true);

newbutton.id = "nav-billing";

newbutton.querySelector(".nav-text").innerHTML = "Billing Center";
newbutton.classList.remove("nav-link-current");
document.querySelector("#nav-buttons").appendChild(newbutton);
newbutton
  .querySelector(".nav-bg-image")
  .setAttribute(
    "style",
    "background-position: 50%;background-repeat:no-repeat; background-size: 70%; background-image: url('https://raw.githubusercontent.com/VoiceLogix/billing-portal/refs/heads/main/public/asset/billing-center.svg');",
  );

newbutton.querySelector("a").addEventListener("click", function (e) {
  e.preventDefault();

  let navButtons = document.querySelectorAll("#nav-buttons li");
  navButtons.forEach(function (button) {
    button.classList.remove("nav-link-current");
  });
  const newTextSpan = newbutton.querySelector("span.nav-text");
  if (newTextSpan) newTextSpan.style.color = "#404040";
  document.querySelector(".navigation-title").innerHTML = "Billing Center";
  document.querySelector("#content").innerHTML =
    "<div id='billing-center-content'></div>";

  return false;
});
