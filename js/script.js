'use strict'
// 1行目に記載している 'use strict' は削除しないでください
let actual; 
let expected;

function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log("OK! Test PASSED.");
  } else {
    console.error("Test FAILED. Try again!");
    console.group("Result:");
    console.log("  actual:", actual);
    console.log("expected:", expected);
    console.trace();
    console.groupEnd();
  }
}

//出題エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//配列に6個のクイズのオブジェクトが入っている
const quizObjects = [
  {text: "パンはパンでも、たべられないのは？<br>1:あんぱん　2:しょくぱん　3:フライパン", correctAnswer: 3},
  {text: "まめは まめでも、そらとぶ まめは？<br>1:えだまめ　2:そらまめ　3:だいず", correctAnswer: 2},
  {text: "にくは にくでも、やさいの にくは？<br>1:にんにく　2:とりにく　3:ぶたにく", correctAnswer: 1},
  {text: "スープのなかにいる いきものは？<br>1:かめ　2:さかな　3:さめ", correctAnswer: 1},
  {text: "かばんのなかにいる いきものは？<br>1:あり　2:ひよこ　3:かば", correctAnswer: 3},
  {text: "やさしいの なかに はいっているものは？<br>1:やぎ　2:やさい　3:やきそば", correctAnswer: 2},
];

//問題文を表示する場所を取得
const questionDisplay = document.getElementById("js-question-display"); 

//今解いているクイズオブジェクトを変数に入れる用　あとで判定に使う
let currentQuestion; //初期化

//問題文を表示させる関数
function makeQuestion(event) {  //eの中身はコンソールに出せる
  currentQuestion = quizObjects[Number(this.dataset.quizId)];//quizId（文字列）をNumnerで数値に。
  questionDisplay.innerHTML = currentQuestion.text;
}

//画像クリック時のイベントリスナー
document.querySelectorAll("img.questionimg").forEach((element) => {//1つ目はパンのimg要素を取り出した
  element.addEventListener("click", makeQuestion);  //そのパンのimg要素がクリックされたら、のイベント
});

//回答エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
//判定結果を表示する場所を取得
const answerDisplay = document.getElementById("js-answer-display");  

//選択された回答番号を代入する用
let currentAnswerBtn; //初期化

//正誤判定する関数
function judgeQ(event) {
  //エッジケース　先に回答ボタンを押したら、注意文を表示
  if (questionDisplay.textContent === "") {
    questionDisplay.textContent = "まず、すきな えを えらんでね！";
    return;
  }

  currentAnswerBtn = Number(this.dataset.btnId);  //クリックされたボタン　1か2か3を代入したい
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
document.querySelectorAll(".answer-btn").forEach((btn) => {//まず1つ目btn要素を取り出した
  btn.addEventListener("click", judgeQ);  //そのbtn要素がクリックされたら、のイベント
});

//クリアーボタンを押したら、空になる　イベントリスナー
const clearBtn = document.getElementById("js-clear-btn");

function clearQuestionAndAnswer() {
  currentQuestion = "";
  currentAnswerBtn = "";
  questionDisplay.textContent = "";
  answerDisplay.textContent = "";
}

clearBtn.addEventListener("click", clearQuestionAndAnswer);


//別の書き方だと、選ばれた問題と、答え予想の組み合わせで、6組み合わせ〇、それ以外は×とも書けそうではある

//テスト
const breadImg = document.getElementById("js-bread-img");//取得できる
console.log(breadImg); 