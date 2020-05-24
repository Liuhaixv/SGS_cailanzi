images.requestScreenCapture();
// log(getPointOfImage("鸡蛋按钮"));
// log(getPointOfImage("鲜花按钮"));

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
