var path = "./全场菜篮子.js";
var playerIndex = 0;
var myStorage = storages.create("2567875799");

if (!files.exists(path)) {
  toast("脚本文件不存在: " + path);
}
var window = floaty.window(
  <frame>
    <vertical>
      <button
        id="adjustPosition"
        text="调整悬浮窗位置"
        w="*"
        h="40"
        bg="#77ffffff"
      />
      <button id="设置坐标" text="设置坐标" w="*" h="40" />
      <horizontal>
        <button id="全场送花" layout_weight="1" text="全场送花" />
        <button id="全场砸蛋" layout_weight="1" text="全场砸蛋" />
      </horizontal>
    </vertical>
  </frame>
);

setInterval(() => {}, 1000);

window.exitOnClose();

window.adjustPosition.on("click", () => {
  window.setAdjustEnabled(!window.isAdjustEnabled());
});

window.设置坐标.on("click", () => {
  var win = floaty.rawWindow(
    <vertical>
      <canvas id="canvas" layout_weight="1" />
    </vertical>
  );
  toast("请点击第" + (playerIndex + 1) + "个人的位置");
  win.setSize(-1, -1);
  win.setTouchable(true);
  win.canvas.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_UP:
        upX = event.getX();
        upY = event.getY();
        var point = new Object();
        point.x = upX;
        point.y = upY;
        if (playerIndex >= 0 && playerIndex < 6) {
          toast("请点击第" + (playerIndex + 2) + "个人的位置");
          myStorage.put(playerIndex + "号位坐标", point);
          playerIndex++;
        } else {
          toast("坐标设置完毕");
          myStorage.put(playerIndex + "号位坐标", point);
          playerIndex = 0;
          win.close();
        }
        return true;
    }
    return true;
  });
});

window.全场砸蛋.on("click", () => {
  myStorage.put("全场砸蛋", "true");
  engines.execScriptFile("./全场菜篮子.js");
});

window.全场送花.on("click", () => {
  myStorage.put("全场砸蛋", "false");
  engines.execScriptFile("./全场菜篮子.js");
});
