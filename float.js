var path = "./core.js";
var myStorage = storages.create("2567875799");

var index = 0;

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
  toast("请点击要送花的目标位置");
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

        //存储中有偏移信息
        if (index == 0) {
          if (myStorage.contains("横屏分辨率偏移")) {
            let offset = myStorage.get("横屏分辨率偏移");
            point.x += offset.x;
            point.y += offset.y;
            myStorage.put("菜篮子目标坐标", point);
            myStorage.put("砸蛋模式", "false");
            win.close();
            engines.execScriptFile("./core.js");
          } else {
            index++;
            engines.execScriptFile("./分辨率校准.js");
          }
        } else if (index == 1) {
          /**
           * 校准分辨率
           */
          var correctPoint = new Object();
          var offset = new Object();
          correctPoint.x = 200;
          correctPoint.y = 200;
          offset.x = correctPoint.x - point.x;
          offset.y = correctPoint.y - point.y;
          myStorage.put("横屏分辨率偏移", offset);

          index = 0;
          win.close();
          engines.execScriptFile("./core.js");
        }

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
  toast("请点击要砸蛋的目标位置");
  win.setSize(-1, -1);
  win.setTouchable(true);
  win.canvas.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
      case event.ACTION_UP:
        //     upX = parseInt(event.getX());
        upX = event.getX();
        upY = event.getY();

        var point = new Object();
        point.x = upX;
        point.y = upY;
        myStorage.put("菜篮子目标坐标", point);
        myStorage.put("砸蛋模式", "true");
        win.close();
        engines.execScriptFile("./core.js");
        return true;
    }
    return true;
  });
});
