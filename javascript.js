console.log("JavaScript Loaded!");

// var pomodoro = {
//     init: function init() {
//         this.buttonVariables();
//         this.updateValues();
//         this.bindEvents();
//     }

// }

// buttonVariables: function buttonVariables() {
//     // Buttons
//     var breakIncrease = document.getElementById("break-increment"); // Increase Break Timer
//     var breakDecrease = document.getElementById("break-decrement"); // Decrease Break Timer

//     var sessionIncrease = document.getElementById("session-increment"); // Increase Session Timer
//     var sessionDecrease = document.getElementById("session-decrement"); // Decrease Session TImer

//     var sessionToggle = document.getElementById("start_stop"); // Play/Pause Session
//     var sessionReset = document.getElementById("reset"); // Reset Session
// }

// updateValues: function updateValues() { // Change HTML values to current values
//     pomodoro.breakLengthTimer.innerHTML = this.breakLengthTimer;
// }

// // Timer Display
// var breakLengthTimer = document.getElementById("break-length"); // Break Time Length
// var sessionLengthTimer = document.getElementById("session-length"); // Sesssion Time Length
// var sessionCountdown = document.getElementById("time-left"); // Session Time Left

// // Default Length values
// this.sessionCountdown = 25;
// this.sessionLengthTimer = 25;
// this.breakLengthTimer = 5;

// // Binding
// bindEvents: function bindEvents() {
//     this.breakIncrease.onClick = pomodoro.breakIncrease;
//     this.breakDecrease.onClick = pomodoro.breakDecrease;
// }

// breakIncrease: function breakIncrease() {
//     if (pomodoro.breakLengthTimer < 30){
//         pomodoro.breakLengthTimer += 1;
//         pomodoro.updateValues();
//     }
// }
// pomodoro.init();

$(document).ready(function() {
  // Run jQuery onload

  // Selecting Elements
  var breakLength = parseInt($("#break-length").html()); // Turn string into Int
  var sessionLength = parseInt($("#session-length").html()); // Turn string into Int

  var sessionLength = 25; // Default Session Length
  var breakLength = 5; // Default Break Length
  var countdown = 0; // Used to set/clear interval
  var seconds = 0; 

  // Binding Click Events
  
  $("#break-increment").click(function() {
    // Increase Break length on click
    if (breakLength < 60) {
      // Set max limit on Break
      breakLength += 1; // Increase int by value of 1
      $("#break-length").html(breakLength); // Change HTML value
    }
  });

  $("#break-decrement").click(function() {
    // Decrease Break length on click
    if (breakLength > 1) {
      // Stop break going into negative
      breakLength -= 1; // Decrease int by value of 1
      $("#break-length").html(breakLength); // Change HTML value
    }
  });

  $("#session-increment").click(function() {
    // Increase Session length on click
    if (sessionLength < 60) {
      // Set max limit on
      sessionLength += 1; // Increase int by value of 1P
      $("#session-length").html(sessionLength); // Change HTML value
      $("#time-left").html(sessionLength + ":0" + seconds); // Reflect Value Change
    }
  });

  $("#session-decrement").click(function() {
    // Increase Session length on click
    if (sessionLength > 1) {
      // Set max limit on
      sessionLength -= 1; // Increase int by value of 1
      $("#session-length").html(sessionLength); // Change HTML value
      $("#time-left").html(sessionLength + ":0" + seconds); // Reflect Value change
    }
  });

 

  $("#start_stop").click(function() {
    // seconds = 0; // sets global variable to 0, then passes to new function
    sessionCountdown(sessionLength, seconds);
  });

  function sessionCountdown(minutes, seconds) {
    countTimer = setInterval(function() {
      if (minutes === 0 && seconds === 0) {
        // when minutes and seconds reach 0, stop timer
        clearInterval(countTimer);
        if (countdown === 0) {
          timeLeft = breakLength;
          countdown += 1;
          $("#timer-label").html("Break Time Left");
        } else {
          timeLeft = sessionLength;
          countdown -= 1;
          $("#timer-label").html("Session Time Left");
        }
        sessionCountdown(timeLeft, 0);
      } else if (seconds != 0) {
        if (seconds <= 10) {
          seconds -= 1;
          timeLeft = minutes + ":0" + seconds;
        } else {
          seconds -= 1;
          timeLeft = minutes + ":" + seconds;
        }
      } else if (seconds === 0) {
        seconds = 59;
        minutes -= 1;
        timeLeft = minutes + ":" + seconds;
      }
      $("#time-left").html(timeLeft);
    }, 1000);
  }

  $("#reset").click(function() {
    sessionLength = 25; // Reset to default
    breakLength = 5; // Reset to default
    seconds = 0;
    $("#session-length").html(sessionLength);
    $("#time-left").html(sessionLength + ":0" + seconds);
    $("#break-length").html(breakLength);
    console.log(sessionLength);
  })
});

// struggle session length was changing but countdown timer started from

// $("#start_stop").click(function() {
//   var sessionCountdown = setInterval(sessionTimer, 1000); // Run this function every 1 second

//   function sessionTimer() {
//     sessionCountdownTimer -= 1;
//     $("#time-left").html(sessionCountdownTimer);
//     if (sessionCountdownTimer === 0) {
//       clearInterval(sessionCountdown); // When countdown reaches 0, stop
//       var breakCountdown = setInterval(breakTimer, 1000);
//     }
//     $("#time-left").html(sessionCountdownTimer);

//     function breakTimer() {
//       $("#session-label").html("Break");
//       $("#break-length").show();
//       breakCount -= 1;
//       if (breakCount === 0) {
//         clearInterval(breakCountdown);
//       }
//     }
//   }
// });
