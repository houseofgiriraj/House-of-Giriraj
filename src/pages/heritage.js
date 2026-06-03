import "../../css/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("atelier-video");
  if (video) {
    const num = String(Math.floor(Math.random() * 7) + 1).padStart(2, "0");
    const src = document.createElement("source");
    src.src = "/assets/videos/atelier/atelier-" + num + ".mp4";
    src.type = "video/mp4";
    video.appendChild(src);
    video.load();
  }
});
