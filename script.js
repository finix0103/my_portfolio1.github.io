//Data structures involved
//List - ["apple","banana","coconut","mango","dragonfruit"]
//Dictionary - keeps data in key-value pairs
/*
  {
    "Banana":"91116063",
    "apple":"87789090",


  }

*/
const database1 = [
  {
    question: "Who is Fumio Kishida?",
    options: ["The president of Korea","The president of Japan","The president of China","The president of Tokyo"],
    answer: "The president of Japan"
  },

  {
    question: "Whos invented drinking water?",
    options: ["Henry Cavendish","Donald Trump","Larche Lagrande","Charles Develinch"],
    answer: "Henry Cavendish"
  },

  {
    question: "Who is the strongest man ever known physicaly?",
    options: ["Angus Macaskill","arnold schwarzenegger","Ashton Hall","Laros Herhal"],
    answer: "Angus Macaskill"
  },

  {
    question: "who is the most sigma person in the world?(The past counts)",
    options: ["Sigma male","Albert Einstein","Nikola Tesla","La grande combination"],
    answer: "Nikola Tesla"
  },

  {
    question: "How many definitions does the verb 'Run' have?",
    options: ["645 definitions","125 definitions","500 definitions","1205 definitions"],
    answer: "645 definitions"
  },
];

const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container")
const ScoreLabel = document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label");
const BgmSelector = document.getElementById("bgm-selector");
const MusicBtn = document.getElementById("music-btn");
const ProgessBar = document.getElementById("progress-bar-fill");

let CurrentSong = null;
let IsMusicPlaying = false;
MusicBtn.textContent = "🔇Music Off";

//on bmg dropdown change
BgmSelector.addEventListener("change",() => {
  const SelectedSong = BgmSelector.value;
  //quit the function if the song canno be found
  if(!SelectedSong)return;
  //stop and reset previous song if it's being played
  if(CurrentSong)
  {
    CurrentSong.pause();
    CurrentSong.currentTime = 0;
  }
  //load and play the newly selected song
  CurrentSong = new Audio(SelectedSong);
  CurrentSong.loop = true;
  CurrentSong.volume = 0.2;
  CurrentSong.play();
  IsMusicPlaying = true;
  MusicBtn.textContent = "Music On"
})

MusicBtn.addEventListener("click", () => {
  if(IsMusicPlaying)
  {
    CurrentSong.pause();
    MusicBtn.textContent = "🔇Music Off";
    IsMusicPlaying = false;

  }else
  {
    CurrentSong.play();
    MusicBtn.textContent = "Music On";
    IsMusicPlaying = true;

  }
});



StartButton.addEventListener('click', StartQuiz);

let score = 0;
let timer;
let question_index = 0;

function StartQuiz()
{
  DropDown.style.display = "none";
  StartButton.style.display = "none";
  LoadQuestion();
}


function LoadQuestion()
{
  if (question_index < database1.length)
  {
    //reset the timer
    TimerLabel.textContent = 15;

    //load a question from the database
    const CurrentQuestionSet = database1[question_index];

    FeedbackLabel.textContent = "";

    // adjust progress bar's width
    ProgessBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

    QuestionLabel.textContent = CurrentQuestionSet.question;
    //erase all previous option buttons
    OptionContainer.innerHTML = '';

    // create a button for each option associated to a question
    CurrentQuestionSet.options.forEach(item => {
      const button = document.createElement('button');
      button.textContent = item;
      button.classList.add('option-btn');
      OptionContainer.appendChild(button);

      button.addEventListener('click', () => {
        DisableAllOptionButtons(); // make sure this matches your function name
        CheckAnswer(item);
      });
    });

    // turn on the timer
    timer = setInterval(() => {
        // reduce timer text by 1
        TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1;

        if (parseInt(TimerLabel.textContent) === 0)
        {  
            clearInterval(timer); // to turn off timer
            ShowFeedback(null);
        }
    }, 1000);
  } else 
  {
    EndQuiz();
  }
}

function EndQuiz()
{
  clearInterval(timer);
  QuestionLabel.textContent = "HORRAY! The Quiz has ended";
  OptionContainer.style.display = 'none';
  FeedbackLabel.style.display = 'none';
  TimerLabel.textContent = "Clap clap";
}

function DisableAllOptionButtons() 
{
  const all_option_buttons = document.querySelectorAll('.option-btn');

  all_option_buttons.forEach(button => {
    button.disabled = true;
  });
    // you’ll put logic here to disable all option buttons
}

// 'item' refers to the player selected option  
function CheckAnswer(item)
{
  const actual_ans = database1[question_index].answer;

  if(item === actual_ans)
  {
    score = score + 1;
  }

  ScoreLabel.textContent = `You scored ${score} point(s)`;
  clearInterval(timer);
  ShowFeedback(item);
}

function ShowFeedback(item)
{
  const CurrentQuestionSet = database1[question_index];
  let message = "";
  if(item === CurrentQuestionSet.answer)
  {
    message = "Correct 1 point goes to you!"
  }else if (item === null)
  {
    message = "Time's up!";
  }else
  {
    message = `Incorrect! The correct answer was ${CurrentQuestionSet.answer}`;
  }
  
  FeedbackLabel.textContent = message;
  FeedbackLabel.style.color = "rgb(255,0,0)";

  //hold for 2 seconds
  setTimeout(() =>  {
    question_index = question_index + 1;
    LoadQuestion();
  }, 2000);
}