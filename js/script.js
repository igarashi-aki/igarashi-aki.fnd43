'use strict'
// 厳格モード

//出題エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//クイズオブジェクト管理
const quizObjects = [
  {
    text: "パンはパンでも、たべられないパンは？<br>1:あんぱん　2:しょくぱん　3:フライパン",
    correctAnswer: 3,
    image: "images/bread.png",
    quizId: "0",
    visible: true,
  },
  {
    text: "まめは まめでも、そらとぶ まめは？<br>1:えだまめ　2:そらまめ　3:だいず",
    correctAnswer: 2,
    image: "images/bean.png",
    quizId: "1",
    visible: true,
  },
  {
    text: "にくは にくでも、やさいの にくは？<br>1:にんにく　2:とりにく　3:ぶたにく",
    correctAnswer: 1,
    image: "images/meat.png",
    quizId: "2",
    visible: true,
  },
  {
    text: "スープのなかにいる いきものは？<br>1:かめ　2:さかな　3:さめ",
    correctAnswer: 1,
    image: "images/soup.png",
    quizId: "3",
    visible: false,
  },
  {
    text: "かばんのなかにいる いきものは？<br>1:あり　2:ひよこ　3:かば",
    correctAnswer: 3,
    image: "images/bag.png",
    quizId: "4",
    visible: false,
  },
  {
    text: "やさしいの なかに はいっているものは？<br>1:やぎ　2:やさい　3:やきそば",
    correctAnswer: 2,
    image: "images/heart.png",
    quizId: "5",
    visible: false,
  },
];

//img要素を追加する場所を取得
const quizsContainer = document.getElementById("js-quizs-container");

//img要素を追加
for (let i = 0; i < quizObjects.length; i++) {
  if (quizObjects[i].visible === true) {
    const createImg = document.createElement("img");
    createImg.src = quizObjects[i].image;
    createImg.className = "questionimg";
    createImg.dataset.quizId = quizObjects[i].quizId;
    quizsContainer.appendChild(createImg);
  }
}

//問題文を表示する場所を取得
const questionDisplay = document.getElementById("js-question-display");

//今解いているクイズオブジェクトを格納する変数の初期化（判定に使用）
let currentQuestion; 

//問題文を表示させる関数
function makeQuestion(event) {  
  clearQuestionAndAnswer();
  questionDisplay.style.backgroundColor = "white";  
  currentQuestion = quizObjects[Number(this.dataset.quizId)];
  questionDisplay.innerHTML = currentQuestion.text;
}

//画像クリック時のイベントリスナー
document.querySelectorAll("img.questionimg").forEach((element) => {
  element.addEventListener("click", makeQuestion);  
});

//回答エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//判定結果を表示する場所を取得
const answerDisplay = document.getElementById("js-answer-display");

//選択された回答番号を格納する変数の初期化
let currentAnswerBtn; 

//正誤判定関数
function judgeQ(event) {
  //エッジケース　先に回答ボタンを押したら、注意文を表示
  if (questionDisplay.textContent === "") {
    questionDisplay.textContent = "まず、すきな えを えらんでね！";
    answerDisplay.textContent = "×";
    const sound = new Audio('./sounds/incorrect.mp3'); 
    sound.play();
    questionDisplay.style.backgroundColor = "yellow"; 
    return;
  }

  currentAnswerBtn = Number(this.dataset.btnId);  
  if (currentQuestion.correctAnswer === currentAnswerBtn) {
    answerDisplay.textContent = "〇";
    const sound = new Audio('./sounds/correct.mp3');
    sound.play();
  } else {
    answerDisplay.textContent = "×";
    const sound = new Audio('./sounds/incorrect.mp3');
    sound.play();
  }
}

//回答ボタンクリック時のイベントリスナー
document.querySelectorAll(".answer-btn").forEach((btn) => {
  btn.addEventListener("click", judgeQ);  
});

//クリアーボタン要素を取得
const clearBtn = document.getElementById("js-clear-btn");

//回答ディスプレイをクリアーする関数
function clearQuestionAndAnswer() {
  currentQuestion = "";
  currentAnswerBtn = "";
  questionDisplay.textContent = "";
  answerDisplay.textContent = "";
  questionDisplay.style.backgroundColor = "white";
}

//クリアーボタンクリック時のイベントリスナー
clearBtn.addEventListener("click", clearQuestionAndAnswer);

