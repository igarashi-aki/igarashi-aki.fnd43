'use strict'

//チェックボックスを取得
const checkboxBread = document.querySelector("#js-checkbox-bread");
const checkboxBean = document.querySelector("#js-checkbox-bean");
const checkboxMeat = document.querySelector("#js-checkbox-meat");
const checkboxSoup = document.querySelector("#js-checkbox-soup");
const checkboxBag = document.querySelector("#js-checkbox-bag");
const checkboxHeart = document.querySelector("#js-checkbox-heart");

// console.log(checkboxBread.checked);
// checkboxBread.checked = false; //この行で、チェックオンオフを操作できている
// console.log(checkboxBread.checked);

//初期設定   何かした時に、この3行はnullだというエラーが出た　再現できない
// checkboxBread.checked = true;
// checkboxBean.checked = false; //html記述より、JS指示の方が勝っている
// checkboxMeat.checked = true;
// console.log(checkboxBean.checked);

//更新ボタンを取得
const addBtn = document.getElementById("js-add-btn");
console.log(addBtn);  //html読み込み後かもだが、取得できているので、綴りは合っている
            //管理者画面単体なら要素を取得できていそうだが、本画面へ行った瞬間に、エラーになる
            //本画面にいる時に更新すると、本画面にはない・nullだということか
//更新ボタンを押した時のクリックイベント
function makeCss() {
  console.log(checkboxBread.checked); //true,falseの値は取れている
  console.log(checkboxSoup.checked);  

  //toggleで切り替えてみる　★ここが上手くいってない★
  // breadImg.classList.toggle("invisible");
}

// const breadImg = document.getElementById("js-bread-img");//取得できていない。
// console.log(breadImg);                            //アクセスできない

// 更新ボタンクリック時のイベントリスナー
addBtn.addEventListener("click", makeCss); 


//パンを非表示にすることは出来たはずだが、今はnullだと。取得できない
//多分、今アクセスしているhtmlの中にはなかったよ、という？
const myElement = document.querySelector(".bread-img");
console.log(myElement);
myElement.style.display = "none";

//day8 HTML&CSSレイアウトのスライドp37にvisibility: hiddenがあり
// mySpan2.style.display ="none";
// mySpan2.className = "invisible";
// mySpan2.style.visibility ="hidden";//見えないけどあるから、場所を取るのか

//表示させるボタンを取得
// const visibleBtn = document.querySelector("#js-visible-btn");
// const mySoup = document.querySelector(".soup-img");

//表示させる関数
// function visible () {
//   console.log("押した", mySoup);
//   mySoup.classList.toggle("invisible");
// }

// //表示させるボタン押下時のイベントリスナー
// visibleBtn.addEventListener("click", visible);



