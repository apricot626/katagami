/* ホームの絞り込み。型紙260種とガイド260本を、その場で絞る。

   一覧の各 <li> に data-s（型紙名・カテゴリ・副題・言い換え・作りの特徴）が
   入っているので、それを対象に部分一致で消し込むだけ。サーバも索引も要りません。

   ・カタカナ/ひらがな、大小文字、全角/半角の差は吸収します
   ・空白区切りは AND（「犬 ベスト」で絞り込める）
   ・中身が全部消えた副題・カテゴリは、見出しごと隠します */
(function () {
  "use strict";
  var box = document.getElementById("siteSearch");
  if (!box) return;
  var input = box.querySelector("input");
  var count = document.getElementById("searchCount");
  var clear = box.querySelector(".search-clear");
  box.hidden = false;                       // JS が動くときだけ出す

  var EN = document.documentElement.lang === "en";

  /* ひらがな→カタカナ、全角英数→半角、小文字化。表記ゆれを吸収する。 */
  function norm(s) {
    return String(s)
      .replace(/[ぁ-ゖ]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) + 0x60); })
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); })
      .replace(/[ー－―‐]/g, "-")
      .toLowerCase();
  }

  /* 対象の一覧を集める（型紙一覧・作り方ガイド一覧の両方）。
     副題の表示判定は一覧をまたいではいけないので、<ul> ごとに持つ。 */
  var lists = [].slice.call(document.querySelectorAll(".pat-list, .howto-chips"))
    .map(function (ul) {
      return [].slice.call(ul.children).map(function (li) {
        return li.classList.contains("pat-sub")
          ? { el: li, sub: true }
          : { el: li, sub: false, t: norm(li.getAttribute("data-s") || li.textContent) };
      });
    });
  var blocks = [].slice.call(document.querySelectorAll(".cat-block"));

  function apply(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    var hit = 0;

    lists.forEach(function (items) {
      items.forEach(function (it) {
        if (it.sub) return;
        var ok = words.every(function (w) { return it.t.indexOf(w) >= 0; });
        it.el.hidden = !ok;
        if (ok) hit++;
      });
      /* 副題は、同じ一覧の中で次の副題までに残りがなければ隠す */
      for (var i = 0; i < items.length; i++) {
        if (!items[i].sub) continue;
        var any = false;
        for (var j = i + 1; j < items.length && !items[j].sub; j++) {
          if (!items[j].el.hidden) { any = true; break; }
        }
        items[i].el.hidden = !any;
      }
    });

    /* 中身が空になったカテゴリごと隠す */
    blocks.forEach(function (b) {
      b.hidden = !b.querySelector("li:not(.pat-sub):not([hidden])");
    });

    if (count) {
      if (!words.length) count.textContent = "";
      else if (hit) count.textContent = EN ? hit + " found" : hit + " 件";
      else count.textContent = EN ? "No matches" : "見つかりませんでした";
    }
    if (clear) clear.hidden = !words.length;
  }

  var timer;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { apply(input.value); }, 80);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; apply(""); }
  });
  if (clear) clear.addEventListener("click", function () {
    input.value = ""; apply(""); input.focus();
  });

  /* ?q=... で開かれたときは、その語で絞った状態にする */
  var q = new URLSearchParams(location.search).get("q");
  if (q) { input.value = q; apply(q); }
})();
