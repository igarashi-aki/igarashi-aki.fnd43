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
//img要素を取得 　（これをクリックしたら、、というイベントに使う）
const breadImg = document.querySelector("#js-bread-img");
const beanImg = document.querySelector("#js-bean-img");
const meatImg = document.querySelector("#js-meat-img");
const soupImg = document.querySelector("#js-soup-img");
const bagImg = document.querySelector("#js-bag-img");
const heartImg = document.querySelector("#js-heart-img");

//6つのクイズオブジェクト 配列の中にオブジェクトを入れ子にしたい気はするが・・・
const breadObject = {text: "パンはパンでも、たべられないのは？<br>1:あんぱん　2:しょくぱん　3:フライパン", correctAnswer: 3};
const beanObject = {text: "まめは まめでも、そらとぶ まめは？<br>1:えだまめ　2:そらまめ　3:だいず", correctAnswer: 2};
const meatObject = {text: "にくは にくでも、やさいの にくは？<br>1:にんにく　2:とりにく　3:ぶたにく", correctAnswer: 1};
const soupObject = {text: "スープのなかにいる いきものは？<br>1:かめ　2:さかな　3:さめ", correctAnswer: 1};
const bagObject = {text: "かばんのなかにいる いきものは？<br>1:あり　2:ひよこ　3:かば", correctAnswer: 3};
const heartObject = {text: "やさしいの なかに はいっているものは？<br>1:やぎ　2:やさい　3:やきそば", correctAnswer: 2};

//問題文を表示する場所を取得
const questionDisplay = document.getElementById("js-question-display"); 

//今解いているクイズを変数に入れる用　あとで判定に使う
let currentQuestion; //初期化

function questionBread(event) {
  questionDisplay.innerHTML = "パンはパンでも、たべられないのは？<br>1:あんぱん　2:しょくぱん　3:フライパン"; //<br>があるのでinnerHTML
  currentQuestion = breadObject;  // returnなしで、副作用で処理している
}

function questionBean(event) {
  questionDisplay.innerHTML = "まめは まめでも、そらとぶ まめは？<br>1:えだまめ　2:そらまめ　3:だいず"; //<br>があるのでinnerHTML
  currentQuestion = beanObject;
}

function questionMeat(event) {
  questionDisplay.innerHTML = "にくは にくでも、やさいの にくは？<br>1:にんにく　2:とりにく　3:ぶたにく"; //<br>があるのでinnerHTML
  currentQuestion = meatObject;
}

//引数に渡せるのでは
function question(e) {
  questionDisplay.textContent = "テスト";
  //今クリックされた画像・・・をどうやって保持するのか？

}

breadImg.addEventListener("click", questionBread);
beanImg.addEventListener("click", questionBean);
meatImg.addEventListener("click", questionMeat);
// breadImg.addEventListener("click", question);  //考え中

//回答エリア＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const answerBtn1 = document.querySelector("#js-answer-btn1");
const answerBtn2 = document.querySelector("#js-answer-btn2");
const answerBtn3 = document.querySelector("#js-answer-btn3");

//判定結果を表示する場所を取得
const answerDisplay = document.getElementById("js-answer-display");  

//選択された回答番号を代入する用
let currentAnswerBtn; //初期化

function judge1(event) {
  currentAnswerBtn = 1;
  if (currentQuestion.correctAnswer === currentAnswerBtn) {
    answerDisplay.textContent = "〇";
    const sound = new Audio('./sounds/correct.mp3'); //ここだけ音がなる
    sound.play();
  } else {
    answerDisplay.textContent = "×";
    const sound = new Audio('./sounds/incorrect.mp3'); 
    sound.play();
  }
}

function judge2(event) {
  currentAnswerBtn = 2;
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

function judge3(event) {
  currentAnswerBtn = 3;
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

answerBtn1.addEventListener("click", judge1);
answerBtn2.addEventListener("click", judge2);
answerBtn3.addEventListener("click", judge3);

//クリアーボタンを押したら、空になる　イベントリスナー
const clearBtn = document.getElementById("js-clear-btn");

function clearQuestionAndAnswer() {
  currentQuestion = "";
  currentAnswerBtn = "";
  questionDisplay.textContent = "";
  answerDisplay.textContent = "";
}

clearBtn.addEventListener("click", clearQuestionAndAnswer);

//選択されたクイズobjectが持っているanswer情報、回答予想が、一致しているかを判定
// function judge(object, currentAnswer) {
//   if (object["correctAnswer"] === currentAnswer) {
//     return "〇";  //これをjs-answer-displayへテキストコンテンツしたい
//   } else {
//     return "×"; //これをjs-answer-displayへテキストコンテンツしたい
//   }
// }

//選んだ問題、答え予想に対して、期待値が正解、不正解のテスト
// test(judge(breadObject, 1), "×");
// test(judge(beanObject, 3), "×");
// test(judge(meatObject, 1), "〇");
// test(judge(soupObject, 1), "〇");
// test(judge(bagObject, 2), "×");
// test(judge(heartObject, 2), "〇");
// test(judge(currentQuestion, currentAnswerBtn), "×");



//別の書き方だと、選ばれた問題と、答え予想の組み合わせで、6組み合わせ〇、それ以外は×とも書けそう★★★
//別の複製ファイルに書いてみるか
//12/23　オブジェクト入門の確認3のポケモンの問題がヒントかも