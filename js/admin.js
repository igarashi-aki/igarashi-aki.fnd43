'use strict'
//チェックボックスを取得
const checkboxBread = document.querySelector("#js-checkbox-bread");
const checkboxBean = document.querySelector("#js-checkbox-bean");
const checkboxMeat = document.querySelector("#js-checkbox-meat");
const checkboxSoup = document.querySelector("#js-checkbox-soup");
const checkboxSummer = document.querySelector("#js-checkbox-summer");
const checkboxBall = document.querySelector("#js-checkbox-ball");

//配列っぽくリスト状にチェックボックス6個取得
const checkboxs = document.getElementsByClassName("check-btn");

//ローカルストレージのデータを取り出して、チェックボックスへ反映
const reloadDateObject = JSON.parse(localStorage.getItem("checkedStatus")); //オブジェクト
for (let i = 0; i < checkboxs.length; i++) {
  checkboxs[i].checked = reloadDateObject[String(i)];
}

//更新ボタンを取得
const addBtn = document.getElementById("js-add-btn");

//クイズ追加関数
function addQuiz(e) {
  const checkedDeta = {};  

  for (let i = 0; i < checkboxs.length; i++) {
    checkedDeta[i] = checkboxs[i].checked;
  }

  localStorage.setItem("checkedStatus", JSON.stringify(checkedDeta));
}

// 更新ボタンクリック時のイベントリスナー
addBtn.addEventListener("click", addQuiz);