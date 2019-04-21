window.addEventListener("DOMContentLoaded", event => {
  var questionBank = [
    {
      question: "How many versions of the Iron Man armor has Tony Stark made?",
      alternative: ["63", "47", "29", "11"],
      answer: 2,
      photo: "assets/img/iron.jpg"
    },
    {
      question:
        "What is the name of the dog in the Collector Taneleer Tivan's museum?",
      alternative: ["Spud", "Astro", "Cosmo", "Sparky"],
      answer: 2,
      photo: "assets/img/cosmo.jpg"
    },
    {
      question: "What alien race is Gamora?",
      alternative: ["Centaurian", "Luphomolds", "Zen-Whoberis", "Badoon"],
      answer: 2,
      photo: "assets/img/gamora.jpg"
    },
    {
      question: "How many Infinity Stones are there in the MCU?",
      alternative: ["Six", "Ten", "Eight", "Five"],
      answer: 0,
      photo: "assets/img/thanos.jpg"
    },
    {
      question:
        "What is the name of the Super Soldier project in Captain America: The First Avenger?",
      alternative: ["Rebirth", "AfterLife", "Alchemy", "Avengers"],
      answer: 0,
      photo: "assets/img/rogers.jpg"
    },
    {
      question:
        "What does Tony Stark call the machine that assists him in Iron Man?",
      alternative: ["Tuna", "Dummy", "Braniac", "Gary"],
      answer: 1,
      photo: "assets/img/dummy.jpg"
    },
    {
      question:
        "What kind of food do the Avengers eat after saving New York?",
      alternative: ["Burritos", "Lemon", "Mango", "Shawarma"],
      answer: 3,
      photo: "assets/img/shawa.jpg"
    },
    {
      question: "S.H.I.E.L.D.'s highest ranking agent is:",
      alternative: ["Steve Rogers", "Black Panther", "Nick Fury", "Kowalski"],
      answer: 2,
      photo: "assets/img/nick.jpg"
    }
  ];
  //varibles
  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = questionBank.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];
  // reset
  $("#reset").hide();
  // start game
  $("#start").on("click", function() {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < qCount; i++) {
      holder.push(questionBank[i]);
    }
  });
  //timer start
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  //timer countdown
  function decrement() {
    $("#timeleft").html(`<h3 class="blinking">Time remaining:  ${timer} </h3>`);
    timer--;
    //stop timer
    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html(
        "<p>Time is up! The correct answer is: " +
          pick.alternative[pick.answer] +
          "</p>"
      );
      hidePicture();
    }
  }
  //timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  //Display random question
  function displayQuestion() {
    index = Math.floor(Math.random() * questionBank.length);
    pick = questionBank[index];
    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.alternative.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.alternative[i]);
      userChoice.attr("data-guessvalue", i);
      $("#answerblock").append(userChoice);
    }
    $(".answerchoice").on("click", function() {
      userGuess = parseInt($(this).attr("data-guessvalue"));
      if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");
        hidePicture();
      } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answerblock").html(
          "<p>Wrong! The correct answer is: " +
            pick.alternative[pick.answer] +
            "</p>"
        );
        hidePicture();
      }
    });
  }

  function hidePicture() {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    questionBank.splice(index, 1);

    var hidpic = setTimeout(function() {
      $("#answerblock").empty();
      timer = 20;

      //Score
      if (wrongCount + correctCount + unanswerCount === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answerblock").append(`
             <h4> Correct:  ${correctCount}  </h4>
             <h4> Incorrect:  ${wrongCount}  </h4>
             <h4> Unanswered:  ${unanswerCount}  </h4>`);
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
      } else {
        runTimer();
        displayQuestion();
      }
    }, 3000);
  }
  //reset game
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for (var i = 0; i < holder.length; i++) {
      questionBank.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
