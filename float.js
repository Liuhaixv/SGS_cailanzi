var path = "./core.js";
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
      <horizontal>
        <button id="送花" layout_weight="1" text="送花" />
        <button id="砸蛋" layout_weight="1" text="砸蛋" />
      </horizontal>
    </vertical>
  </frame>
);

setInterval(() => {}, 1000);

window.exitOnClose();

window.adjustPosition.on("click", () => {
  window.setAdjustEnabled(!window.isAdjustEnabled());
});

window.送花.on("click", () => {
  var win = floaty.rawWindow(
    <vertical>
      <canvas id="canvas" layout_weight="1" />
    </vertical>
  );
  win.setSize(-1, -1);
  win.setTouchable(true);
  win.canvas.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_UP:
        upX = parseInt(event.getX());
        upY = parseInt(event.getY());

        var storage = storages.create("2567875799");
        var point = new Object();
        point.x = upX;
        point.y = upY;
        storage.put("菜篮子目标坐标", point);
        storage.put("砸蛋模式", "false");
        toast("请点击要送花的目标位置");
        win.close();
        engines.execScriptFile("./core.js");
        return true;
    }
    return true;
  });
});

window.砸蛋.on("click", () => {
  var win = floaty.rawWindow(
    <vertical>
      <canvas id="canvas" layout_weight="1" />
    </vertical>
  );
  win.setSize(-1, -1);
  win.setTouchable(true);
  win.canvas.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_UP:
        //     upX = parseInt(event.getX());
        upX = event.getX();
        upY = event.getY();

        var storage = storages.create("2567875799");
        var point = new Object();
        point.x = upX;
        point.y = upY;
        storage.put("菜篮子目标坐标", point);
        storage.put("砸蛋模式", "true");
        toast("请点击要砸蛋的目标位置");
        win.close();
        engines.execScriptFile("./core.js");
        return true;
    }
    return true;
  });
});
