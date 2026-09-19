"use strict";

//出題エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const quizObjects = [
  {
    text: "パンはパンでも、話を きいてくれる パンは？",
    // datasetと厳密等価か比較したいので、文字列
    correctAnswer: "1",
    choices: ["あんぱん", "しょくぱん", "カレーパン"],
    image: "images/croissant.png",
    quizId: 0,
  },
  {
    text: "まめは まめでも、そらとぶ まめは？",
    correctAnswer: "1",
    choices: ["えだまめ", "そらまめ", "だいず"],
    image: "images/bean.png",
    quizId: 1,
  },
  {
    text: "にくは にくでも、やさいの にくは？",
    correctAnswer: "0",
    choices: ["にんにく", "とりにく", "ぶたにく"],
    image: "images/meat.png",
    quizId: 2,
  },
  {
    text: "スープの なかにいる いきものは？<br>（ ヒント・・・ わかめスープです😋 ）",
    correctAnswer: "0",
    choices: ["かめ", "はくちょう", "わに"],
    image: "images/soup.png",
    quizId: 3,
  },
  {
    text: "なつに おすすめの たべものは？",
    correctAnswer: "1",
    choices: ["すいか", "ドーナツ", "アイス"],
    image: "images/summer.png",
    quizId: 4,
  },
  {
    text: "たまを 5こ あつめた たべものは？",
    correctAnswer: "2",
    choices: ["いくら", "ボール", "たまご"],
    image: "images/ball.png",
    quizId: 5,
  },
];

const quizsContainer = document.getElementById("js-quizs-container");

//初期設定
if (!localStorage.getItem("checkedStatus")) {
  const checkedDeta = {
    0: true,
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
  };
  localStorage.setItem("checkedStatus", JSON.stringify(checkedDeta));
}

//設定内容にて画像をブラウザへ表示
const checkedStatu = JSON.parse(localStorage.getItem("checkedStatus"));
for (let i = 0; i < quizObjects.length; i++) {
  if (checkedStatu[String(i)] === true) {
    const createImg = document.createElement("img");
    createImg.src = quizObjects[i].image;
    createImg.className = "questionimg";
    createImg.dataset.quizId = quizObjects[i].quizId;
    quizsContainer.appendChild(createImg);
  }
}

//問題文を表示する場所を取得
const questionDisplay = document.getElementById("js-question-display");
//解答選択肢を表示する場所を取得
const choiceDisplay1 = document.getElementById("js-choice-display1");
const choiceDisplay2 = document.getElementById("js-choice-display2");
const choiceDisplay3 = document.getElementById("js-choice-display3");
const choiceDisplays = [choiceDisplay1, choiceDisplay2, choiceDisplay3];

let currentQuestion = {};

//問題文を表示させる関数
function makeQuestion(event) {
  clearQuestionAndAnswer();
  currentQuestion = quizObjects[this.dataset.quizId];
  questionDisplay.innerHTML = currentQuestion.text;
}

// 解答選択肢を表示させる関数
function makeChoices(event) {
  currentQuestion = quizObjects[this.dataset.quizId];
  currentQuestion.choices.forEach((element, n) => {
    choiceDisplays[n].innerHTML = element;
    choiceDisplays[n].dataset.choiceId = n;
  });
}

//画像クリック時のイベントリスナー
document.querySelectorAll("img.questionimg").forEach((element) => {
  element.addEventListener("click", makeQuestion);
  element.addEventListener("click", makeChoices);
});

//回答エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//判定結果を表示する場所を取得
const answerDisplay = document.getElementById("js-answer-display");

//選択された回答番号を格納する変数の初期化
let currentAnswerText;

//正誤判定関数
function judgeQ(event) {
  //エッジケース　先に回答ボタンを押したら、注意文を表示
  if (questionDisplay.textContent === "") {
    questionDisplay.textContent = "まず、すきな えを えらんでね！";
    incorrect();
    questionDisplay.style.backgroundColor = "yellow";
    return;
  }

  currentAnswerText = this.dataset.choiceId;
  currentQuestion.correctAnswer === currentAnswerText ? correct() : incorrect();
}

const correct = () => {
  answerDisplay.textContent = "〇";
  answerDisplay.style.color = "green";
  const sound = new Audio("./sounds/correct.mp3");
  sound.play();
};

const incorrect = () => {
  answerDisplay.textContent = "×";
  answerDisplay.style.color = "red";
  const sound = new Audio("./sounds/incorrect.mp3");
  sound.play();
};

//回答ボタンクリック時のイベントリスナー
document.querySelectorAll(".answer-choice").forEach((btn) => {
  btn.addEventListener("click", judgeQ);
});

//クリアーボタン要素を取得
const clearBtn = document.getElementById("js-clear-btn");

//回答ディスプレイをクリアする関数
function clearQuestionAndAnswer() {
  currentQuestion = null;
  currentAnswerText = null;
  questionDisplay.textContent = "";
  questionDisplay.style.backgroundColor = "white";
  choiceDisplay1.innerHTML = "";
  choiceDisplay2.innerHTML = "";
  choiceDisplay3.innerHTML = "";
  answerDisplay.textContent = "";
}

//クリアーボタンクリック時のイベントリスナー
clearBtn.addEventListener("click", clearQuestionAndAnswer);
