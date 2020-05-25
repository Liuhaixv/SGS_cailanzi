var myStorage = storages.create("2567875799");

var p = new Array();

var is全场砸蛋 = true;
var 聊天按钮坐标;
var 砸蛋按钮坐标;
var 送花按钮坐标;

var 横屏分辨率偏移;

var delay;

init();
run();

function 全场砸蛋() {
  sleep(1000);
  for (var i = 0; i < 7; i++) {
    砸蛋(p[i]);
  }
}

function 全场送花() {
  for (var i = 0; i < 7; i++) {
    送花(p[i]);
  }
}

function 砸蛋(point) {
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  sleep(delay / 4);
  press(砸蛋按钮坐标.x, 砸蛋按钮坐标.y, 1);
  sleep(delay / 4);
  press(point.x, point.y, 1);
  sleep(delay / 4);
  press(point.x, point.y, 1);
  sleep(delay / 4);
}

function 送花(point) {
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  sleep(delay / 4);
  press(送花按钮坐标.x, 送花按钮坐标.y, 1);
  sleep(delay / 4);
  press(point.x, point.y, 1);
  sleep(delay / 4);
  press(point.x, point.y, 1);
  sleep(delay / 4);
}

function 获取坐标(name) {
  if (myStorage.contains(name) && myStorage.get(name) != null) {
    return myStorage.get(name);
  } else {
    抓图保存坐标(name);
    return 获取坐标(name);
  }
}
function 抓图保存坐标(name) {
  if (name == "聊天按钮坐标") {
    var point = getPointOfImage("聊天按钮");
    // log(point);
    myStorage.put(name, point);
    return point;
  }
  if (name == "砸蛋按钮坐标") {
    var point = getPointOfImage("鸡蛋按钮");
    // log(point);
    myStorage.put(name, point);
    return point;
  }
  if (name == "送花按钮坐标") {
    var point = getPointOfImage("鲜花按钮");
    // log(point);
    myStorage.put(name, point);
    return point;
  }
}

function getPointOfImage(name) {
  var result = images.findImage(
    captureScreen(),
    images.read("./" + name + ".png"),
    {
      threshold: 0.9,
    }
  );
  return result;
}

function init() {
  横屏分辨率偏移 = myStorage.get("横屏分辨率偏移");

  if (myStorage.get("需要截图权限") == "true") {
    images.requestScreenCapture();
    sleep(1000);
    聊天按钮坐标 = 获取坐标("聊天按钮坐标");
    press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
    sleep(1000);
    砸蛋按钮坐标 = 获取坐标("砸蛋按钮坐标");
    送花按钮坐标 = 获取坐标("送花按钮坐标");
    press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  } else {
    聊天按钮坐标 = 获取坐标("聊天按钮坐标");
    砸蛋按钮坐标 = 获取坐标("砸蛋按钮坐标");
    送花按钮坐标 = 获取坐标("送花按钮坐标");
  }

  for (var i = 0; i < 7; i++) {
    p[i] = myStorage.get(i + "号位坐标");
    p[i].x += 横屏分辨率偏移.x;
    p[i].y += 横屏分辨率偏移.y;
  }

  delay = myStorage.get("全场时间间隔");
}

function run() {
  is全场砸蛋 = myStorage.get("全场砸蛋") == "true";
  if (is全场砸蛋) {
    全场砸蛋();
  } else {
    全场送花();
  }
}
