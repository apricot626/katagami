/* 材料・道具のリンクが踏まれたことを GA4 に送る — howto ページ共通

   検索語の対応表（scripts/material-links.js と material-links-en.js）は、
   いまのところ私の推測で決めています。どの資材が実際に踏まれているかが
   分かれば、勘ではなく数字で直せます。「持ち手テープ」が誰にも踏まれない
   なら、その枠は別の資材に回したほうがいい、という判断ができます。

   リンクは target="_blank" で開くので、ページはその場に残ります。
   送信前に遷移して取りこぼす心配はありません。 */
(function () {
  function ga(name, params) {
    if (typeof gtag === "function") gtag("event", name, params);
  }

  /* 枠は「材料をネットで探す」と「道具をネットで探す」の2つ。
     1つ目だけに付けると道具のクリックが丸ごと落ちます。 */
  var boxes = document.querySelectorAll(".material-links");

  /* ボタンは1枠あたり最大8本あり、ページによって本数が変わります。
     1本ずつ付けると足し忘れるので、枠の側で受けます。 */
  Array.prototype.forEach.call(boxes, function (box) {
    box.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a.ml-btn") : null;
      if (!a) return;

      var shop = a.classList.contains("ml-btn-amazon") ? "amazon"
               : a.classList.contains("ml-btn-rakuten") ? "rakuten"
               : "other";

      /* ラベルは「楽天 — キャンバス生地」の形。店名はもう shop で送るので、
         資材名だけにします。区切りは全角ダッシュです。 */
      var item = a.textContent.split("—").pop().trim().slice(0, 100);

      ga("affiliate_click", { shop: shop, item: item });
    });
  });
})();
