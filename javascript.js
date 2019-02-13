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
        } else {
          session = true; // when mins and sec reach 0, set session to true and use session values
          min = sessionLength;
          sec = sessionSecond;
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
});

