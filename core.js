var myStorage = storages.create("2567875799");

var times = 0;
var isEggMode = false;
var delay = 0;

var 聊天按钮坐标;
var 砸蛋按钮坐标;
var 送花按钮坐标;
var 菜篮子目标坐标;

var 横屏分辨率偏移;

init();
run();
function init() {
  横屏分辨率偏移 = myStorage.get("横屏分辨率偏移");
  times = myStorage.get("送菜篮子次数");

  if (myStorage.contains("送菜篮子间隔")) {
    delay = myStorage.get("送菜篮子间隔");
  }

  菜篮子目标坐标 = myStorage.get("菜篮子目标坐标");
  菜篮子目标坐标.x += 横屏分辨率偏移.x;
  菜篮子目标坐标.y += 横屏分辨率偏移.y;
  myStorage.remove("菜篮子目标坐标");

  if (myStorage.get("需要截图权限") == "true") {
    抓图更新UI坐标();
  } else {
    聊天按钮坐标 = 获取坐标("聊天按钮坐标");
    砸蛋按钮坐标 = 获取坐标("砸蛋按钮坐标");
    送花按钮坐标 = 获取坐标("送花按钮坐标");
  }
}
function run() {
  isEggMode = myStorage.get("砸蛋模式") == "true";
  // toast(isEggMode);
  for (var i = 1; i <= times; i++) {
    if (isEggMode) {
      砸蛋();
    } else {
      送花();
    }
  }
}
/**
 *
 * @param {string} name
 */
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

function 抓图更新UI坐标() {
  images.requestScreenCapture();

  sleep(1000);

  聊天按钮坐标 = 获取坐标("聊天按钮坐标");
  if (!获取坐标("聊天按钮坐标")) {
    提示抓图失败();
    return;
  }
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);

  sleep(1000);

  砸蛋按钮坐标 = 获取坐标("砸蛋按钮坐标");
  if (!获取坐标("砸蛋按钮坐标")) {
    提示抓图失败();
    return;
  }
  送花按钮坐标 = 获取坐标("送花按钮坐标");
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  if (!获取坐标("送花按钮坐标")) {
    提示抓图失败();
    return;
  }
}

function 提示抓图失败() {
  toast("抓图识别UI坐标失败!请自行设置坐标位置");
}

function 砸蛋() {
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  sleep(delay / 4);
  press(砸蛋按钮坐标.x, 砸蛋按钮坐标.y, 1);
  sleep(delay / 4);
  press(菜篮子目标坐标.x, 菜篮子目标坐标.y, 1);
  sleep(delay / 4);
  press(菜篮子目标坐标.x, 菜篮子目标坐标.y, 1);
  sleep(delay / 4);
}
function 送花() {
  press(聊天按钮坐标.x, 聊天按钮坐标.y, 1);
  sleep(delay / 4);
  press(送花按钮坐标.x, 送花按钮坐标.y, 1);
  sleep(delay / 4);
  press(菜篮子目标坐标.x, 菜篮子目标坐标.y, 1);
  sleep(delay / 4);
  press(菜篮子目标坐标.x, 菜篮子目标坐标.y, 1);
  sleep(delay / 4);
}
