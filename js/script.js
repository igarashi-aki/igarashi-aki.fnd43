"use strict";
// 厳格モード

//出題エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//クイズオブジェクト管理
const quizObjects = [
  {
    text: "パンはパンでも、話を きいてくれる パンは？",
    correctAnswer: 2,
    choice1: "あんぱん",
    choice2: "しょくぱん",
    choice3: "カレーパン",
    image: "images/croissant.png",
    quizId: "0",
  },
  {
    text: "まめは まめでも、そらとぶ まめは？",
    correctAnswer: 2,
    choice1: "えだまめ",
    choice2: "そらまめ",
    choice3: "だいず",
    image: "images/bean.png",
    quizId: "1",
  },
  {
    text: "にくは にくでも、やさいの にくは？",
    correctAnswer: 1,
    choice1: "にんにく",
    choice2: "とりにく",
    choice3: "ぶたにく",
    image: "images/meat.png",
    quizId: "2",
  },
  {
    text: "スープの なかにいる いきものは？<br>（ ヒント・・・ わかめスープです😋 ）",
    correctAnswer: 1,
    choice1: "かめ",
    choice2: "さかな",
    choice3: "さめ",
    image: "images/soup.png",
    quizId: "3",
  },
  {
    text: "なつに おすすめの たべものは？",
    correctAnswer: 2,
    choice1: "すいか",
    choice2: "ドーナツ",
    choice3: "アイス",
    image: "images/summer.png",
    quizId: "4",
  },
  {
    text: "たまを 5こ あつめると でてくる たべものは？",
    correctAnswer: 3,
    choice1: "いくら",
    choice2: "ボール",
    choice3: "たまご",
    image: "images/ball.png",
    quizId: "5",
  },
];

//img要素を表示する場所を取得
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

//img要素を追加
const myObject = JSON.parse(localStorage.getItem("checkedStatus"));

for (let i = 0; i < quizObjects.length; i++) {
  if (myObject[String(i)] === true) {
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

//今解いているクイズオブジェクトを変数に入れる用　あとで判定に使う
let currentQuestion = {}; //初期化

//問題文を表示させる関数
function makeQuestion(event) {
  clearQuestionAndAnswer();
  currentQuestion = quizObjects[Number(this.dataset.quizId)];
  questionDisplay.innerHTML = currentQuestion.text;
}

// 解答選択肢を表示させる関数
function makeChoices(event) {
  // クリアーする関数を作って、呼ぶ。後で。

  currentQuestion = quizObjects[Number(this.dataset.quizId)];
  choiceDisplay1.innerHTML = currentQuestion.choice1;
  choiceDisplay1.setAttribute("id", "choice1");
  choiceDisplay1.dataset.choiceId = "1";

  choiceDisplay2.innerHTML = currentQuestion.choice2;
  choiceDisplay2.setAttribute("id", "choice2");
  choiceDisplay2.dataset.choiceId = "2";

  choiceDisplay3.innerHTML = currentQuestion.choice3;
  choiceDisplay3.setAttribute("id", "choice3");
  choiceDisplay3.dataset.choiceId = "3";
}
//画像クリック時のイベントリスナー
document.querySelectorAll("img.questionimg").forEach((element) => {
  element.addEventListener("click", makeQuestion);
  element.addEventListener("click", makeChoices);
});

//ヒントを表示
// const hintBtn = document.getElementById("js-hint-btn");
// const hintAlert = () => alert("スープは、わかめスープです。");
// hintBtn.addEventListener("click", hintAlert);

//回答エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//判定結果を表示する場所を取得
const answerDisplay = document.getElementById("js-answer-display");

//選択された回答番号を格納する変数の初期化
// let currentAnswerBtn;
let currentAnswerText;

//正誤判定関数
function judgeQ(event) {
  //エッジケース　先に回答ボタンを押したら、注意文を表示
  if (questionDisplay.textContent === "") {
    questionDisplay.textContent = "まず、すきな えを えらんでね！";
    answerDisplay.textContent = "×";
    answerDisplay.style.color = "red";
    const sound = new Audio("./sounds/incorrect.mp3");
    sound.play();
    questionDisplay.style.backgroundColor = "yellow";
    return;
  }

  currentAnswerText = Number(this.dataset.choiceId);
  if (currentQuestion.correctAnswer === currentAnswerText) {
    answerDisplay.textContent = "〇";
    answerDisplay.style.color = "green";
    const sound = new Audio("./sounds/correct.mp3");
    sound.play();
  } else {
    answerDisplay.textContent = "×";
    answerDisplay.style.color = "red";
    const sound = new Audio("./sounds/incorrect.mp3");
    sound.play();
  }
}

//回答ボタンクリック時のイベントリスナー
document.querySelectorAll(".answer-choice").forEach((btn) => {
  btn.addEventListener("click", judgeQ);
});

//クリアーボタン要素を取得
const clearBtn = document.getElementById("js-clear-btn");

//回答ディスプレイをクリアーする関数
function clearQuestionAndAnswer() {
  currentQuestion = "";
  currentAnswerText = "";
  questionDisplay.textContent = "";
  questionDisplay.style.backgroundColor = "white";
  choiceDisplay1.innerHTML = "";
  choiceDisplay2.innerHTML = "";
  choiceDisplay3.innerHTML = "";
  answerDisplay.textContent = "";
}

//クリアーボタンクリック時のイベントリスナー
clearBtn.addEventListener("click", clearQuestionAndAnswer);
