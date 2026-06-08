(function () {
  "use strict";

  const AUDIO_SRC = "/assets/website-music/Rondo_in_A_Minor.mp3";
  const VOLUME = 0.25;
  const FADE_DURATION = 500;

  var audio = new Audio(AUDIO_SRC);
  audio.loop = true;
  audio.volume = VOLUME;

  var fadeRafId = null;
  var btns, icons, tip, wrap, tipLabel;

  function getElements() {
    btns = document.querySelectorAll("[data-music-toggle]");
    icons = {
      desktop: document.getElementById("music-icon"),
      mobile: document.getElementById("music-icon-mobile")
    };
    tip = document.getElementById("music-tip");
    wrap = document.querySelector(".music-toggle-wrap");
    tipLabel = document.querySelector(".music-tip-label");
  }

  function setIcon(state) {
    var iconName = state === "playing" ? "music_note" : "music_off";
    if (icons.desktop) icons.desktop.textContent = iconName;
    if (icons.mobile) icons.mobile.textContent = iconName;
  }

  function setTipText(state) {
    if (!tipLabel) return;
    tipLabel.textContent = state === "playing" ? "Turn off ambient music" : "Turn on ambient music";
  }

  function fadeVolume(from, to, duration, cb) {
    if (fadeRafId) cancelAnimationFrame(fadeRafId);
    var start = performance.now();
    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t < 1) fadeRafId = requestAnimationFrame(step);
      else { fadeRafId = null; if (cb) cb(); }
    }
    fadeRafId = requestAnimationFrame(step);
  }

  var userToggled = false;

  function stop() {
    if (fadeRafId) { cancelAnimationFrame(fadeRafId); fadeRafId = null; }
    audio.pause();
    audio.currentTime = 0;
    setIcon("stopped");
    setTipText("stopped");
    localStorage.setItem("musicEnabled", "false");
    localStorage.removeItem("musicPosition");
    btns.forEach(function (b) { b.classList.remove("is-active"); });
  }

  function play() {
    userToggled = true;
    audio.volume = VOLUME;
    audio.play().catch(function (err) {
      console.warn("Ambient music play failed:", err);
    });
    setIcon("playing");
    setTipText("playing");
    localStorage.setItem("musicEnabled", "true");
    btns.forEach(function (b) { b.classList.add("is-active"); });
  }

  function savePosition() {
    if (!audio.paused) {
      localStorage.setItem("musicPosition", audio.currentTime);
    }
  }

  function resumeFromSaved() {
    var savedTime = localStorage.getItem("musicPosition");
    if (savedTime) audio.currentTime = parseFloat(savedTime);

    function tryPlay() {
      audio.volume = 0;
      return audio.play();
    }

    tryPlay()
      .then(function () { fadeVolume(0, VOLUME, FADE_DURATION); })
      .catch(function () {
        function onGesture() {
          if (userToggled) return;
          tryPlay().then(function () { fadeVolume(0, VOLUME, FADE_DURATION); }).catch(function () {});
          document.removeEventListener("click", onGesture);
          document.removeEventListener("touchstart", onGesture);
          document.removeEventListener("keydown", onGesture);
        }
        document.addEventListener("click", onGesture);
        document.addEventListener("touchstart", onGesture);
        document.addEventListener("keydown", onGesture);
      });
  }

  function init() {
    getElements();
    if (!btns.length) return;

    window.addEventListener("beforeunload", savePosition);
    window.addEventListener("pagehide", savePosition);

    if (localStorage.getItem("musicEnabled") === "true") {
      setIcon("playing");
      setTipText("playing");
      btns.forEach(function (b) { b.classList.add("is-active"); });
      resumeFromSaved();
    } else {
      setIcon("stopped");
      setTipText("stopped");
    }

    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (audio.paused) {
          var savedTime = localStorage.getItem("musicPosition");
          if (savedTime && audio.currentTime === 0) {
            audio.currentTime = parseFloat(savedTime);
          }
          play();
        } else {
          stop();
        }
      });
    });

    if (!tip || !wrap) return;

    var isHovering = false;
    var autoTimer = null;

    function showTip() { tip.classList.add("is-visible"); }
    function hideTip() { tip.classList.remove("is-visible"); }

    if (!localStorage.getItem("musicTipShown")) {
      showTip();
      autoTimer = setTimeout(function () {
        if (!isHovering) hideTip();
        localStorage.setItem("musicTipShown", "true");
        autoTimer = null;
      }, 2500);
    }

    wrap.addEventListener("mouseenter", function () {
      isHovering = true;
      showTip();
    });

    wrap.addEventListener("mouseleave", function () {
      isHovering = false;
      hideTip();
    });

    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (autoTimer) {
          clearTimeout(autoTimer);
          autoTimer = null;
        }
        hideTip();
        localStorage.setItem("musicTipShown", "true");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
