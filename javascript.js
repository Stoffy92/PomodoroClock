// Global Variables

let sessionLength = 25; // Default Timer Length
let sessionSecond = 0;

let breakLength = 5; // Default Timer Length
let breakSecond = 0;

let currentMin = sessionLength; // Values used for pause and reset
let currentSec = sessionSecond;

let isTicking = false; // Timer not running by default
let session = true; // Check if session or break
let sessionInterval; // Variable to hold interval, counts timer down

// Eventlisteners 
$(document).ready(function() {
  $("#break-decrement").click(function(e) {
    e.preventDefault();
    if (!isTicking) {
      // Check if clock is running before decreasing increments
      let count = parseInt($("#break-length").text()); //
      if (count > 1) {
        // Stops breakLength going into negative
        count--;
      }
      breakLength = count; // set breakLength to value of count
      $("#break-length").text(count); // Update DOM
    }
  });

  $("#break-increment").click(function(e) {
    e.preventDefault();
    if (!isTicking) {
      // clock is not ticking, you may add increments
      let count = parseInt($("#break-length").text());
      count++;
      breakLength = count; // set breakLength to value of count
      $("#break-length").text(count); // Update DOM with new value
    }
  });

  $("#session-increment").click(function(e) {
    e.preventDefault();
    if (!isTicking) {
      // clock is not ticking, you may add increments
      let count = parseInt($("#session-min").text());
      if (count < 60) {
        count++;
      }
      $("#session-min").text(count); // Update DOM with new value
      $("#session-length").text(count); // Update DOM with new value
      sessionLength = count; // set sessionLength to value of count
      reset(); //
    }
  });

  $("#session-decrement").click(function(e) {
    e.preventDefault();
    if (!isTicking) {
      // clock is not ticking, you may add increments
      let count = parseInt($("#session-min").text());
      if (count > 1) { // sessionLength won't go below 1
        count--;
      }
      $("#session-min").text(count); // Update DOM
      $("#session-length").text(count); // Update DOM
      sessionLength = count; // set sessionLength to value of count
      reset();
    }
  });

  $("#start").click(function(e) {
    e.preventDefault();
    changeIcon(); // Changes icon and starts timer
  });

  $("#reset").click(function(e) {
    e.preventDefault();
    if (!isTicking) { // Stops timer from being reset unless paused
      reset();
    }
  });

  function startTimer() {
    changeState();
    $(".reset").addClass("disabled");
    let min = currentMin; // Get session length value
    let sec = currentSec; // currentMin & currentSec values are saved when stopTimer is called
    sessionInterval = setInterval(function() {
      changeState(); // timer is starting, change session = true
      if (sec > 0) {
        sec--; // if sec is more than 0, - 1
        if (sec < 10) {
          $("#session-sec").text("0" + sec); // if seconds are less than 10, display 0 for cleaner format
        } else {
          $("#session-sec").text(sec);
        }
      } else {
        min--; // when sec reaches 0, decrement 1 min 
        sec = 59;
        $("#session-sec").text(sec);
        $("#session-min").text(min);
      }

      if (min === 0 && sec === 0) { // when min and sec reach 0, set session to true or false
        if (session) {
          session = false; // when mins and sec reach 0, set session to false and use break values
          min = breakLength;
          sec = breakSecond;
          beep();
        } else {
          session = true; // when mins and sec reach 0, set session to true and use session values
          min = sessionLength;
          sec = sessionSecond;
          beep();
        }
      }
    }, 1000); // This block of code will run every 1000ms
  }

  function stopTimer() {
    clearInterval(sessionInterval); // Clears interval 
    currentMin = parseInt($("#session-min").text()); // show paused vaulues
    currentSec = parseInt($("#session-sec").text()); // show paused vaulues
    $("#timer-label").text("Session paused"); // let the user know that the session is paused
    $(".reset").removeClass("disabled"); // when timer stops, buttons are no longer disabled
  }

  function reset() {
    currentSec = 0;
    currentMin = sessionLength; // gives startTimer function an updated value of sessionLength
    session = true; // Reset the session to default state
    $("#session-sec").text("00"); // show updated values
    $("#session-min").text(currentMin); // reset to default value
  }

  function changeIcon() { // Toggle function for better UX/UI
    if (isTicking) {
      $("#start .fa").removeClass("fa-pause");
      $("#start .fa").addClass("fa-play");
      isTicking = false; // clock is not ticking, show play symbol
      stopTimer(); // clock is not ticking by default
    } else {
      $("#start .fa").removeClass("fa-play");
      $("#start .fa").addClass("fa-pause");
      isTicking = true; // clock is ticking, show pause symbol
      startTimer(); // start timer
    }
  }

  function changeState() {
    
    if (session) {  // show text based on session
      $("#timer-label").text("Get Working!"); 
    } else {
      $("#timer-label").text("Break Time");
    }
  }

  function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}


});
