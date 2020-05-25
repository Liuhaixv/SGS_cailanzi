"ui";
ui.layout(
  <LinearLayout orientation="vertical">
    <vertical
      padding="10 6 0 6"
      bg="#ffffff"
      w="*"
      h="auto"
      margin="0 5"
      elevation="1dp"
    >
      <Switch
        id="autoService"
        w="*"
        checked="{{auto.service != null}}"
        textColor="#666666"
        text="无障碍服务"
      />
      <button id="autoHint" color="white" text="无障碍服务未开启" />
    </vertical>

    <appbar background="#ef7a82">
      <tabs id="tabs" />
    </appbar>

    <viewpager id="viewpager" textColor="#666666">
      <vertical>
        <card
          w="*"
          h="100"
          margin="10 5"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <vertical padding="18 8" h="auto">
            <TextView
              gravity="left"
              inputType="number"
              text="送花/砸蛋时间间隔(单位:毫秒)"
            ></TextView>
            <input
              w="*"
              inputType="number"
              id="delay"
              hint="1000毫秒=1秒"
            ></input>
          </vertical>
          <View bg="#4caf50" h="*" w="10" />
        </card>
        <card
          w="*"
          h="100"
          margin="10 5"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <vertical padding="18 8" h="auto">
            <TextView gravity="left" inputType="number" text="数量"></TextView>
            <input
              w="*"
              inputType="number"
              id="菜篮子数量"
              hint="输入数量"
            ></input>
          </vertical>
          <View bg="#2196f3" h="*" w="10" />
        </card>

        <card
          w="*"
          h="80"
          margin="10 5"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <vertical padding="18 8" h="auto">
            <button id="更新" text="更新配置"></button>
          </vertical>
          <View bg="#ab82ff" h="*" w="10" />
        </card>

        <vertical>
          <button id="start" text="start" />
        </vertical>
      </vertical>
      <vertical>
        <card
          w="*"
          h="100"
          margin="10 5"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <vertical padding="18 8" h="auto">
            <TextView
              gravity="left"
              inputType="number"
              text="全场送花/砸蛋时间间隔(单位:毫秒)"
            ></TextView>
            <input
              w="*"
              inputType="number"
              id="全场时间间隔"
              hint="1000毫秒=1秒"
            ></input>
          </vertical>
          <View bg="#4caf50" h="*" w="10" />
        </card>
        <card
          w="*"
          h="80"
          margin="10 5"
          cardCornerRadius="2dp"
          cardElevation="1dp"
          gravity="center_vertical"
        >
          <vertical padding="18 8" h="auto">
            <button id="更新全场间隔" text="更新配置"></button>
          </vertical>
          <View bg="#ab82ff" h="*" w="10" />
        </card>

        <vertical>
          <button id="全场菜篮子" text="start" />
        </vertical>
      </vertical>
    </viewpager>
  </LinearLayout>
);

init();

//无障碍开关监控
ui.autoService.setOnCheckedChangeListener(function (widget, checked) {
  //打勾，未启动无障碍服务
  if (checked && !auto.service) {
    app.startActivity({
      action: "android.settings.ACCESSIBILITY_SETTINGS",
    });
  }
  ui.autoService.setChecked(auto.service != null);
  if (!checked && auto.service) {
    auto.service.disableSelf();
    ui.autoService.setChecked(false);
  }
  update_autoHint();
});

//设置滑动页面的标题
ui.viewpager.setTitles(["正常模式", "全场砸蛋/送花模式"]);
//滑动页面和标签页联动
ui.tabs.setupWithViewPager(ui.viewpager);

ui.更新.on("click", () => {
  var 数量 = ui.菜篮子数量.getText();
  var 间隔 = ui.delay.getText();
  myStorage.put("送菜篮子次数", 数量.toString());
  myStorage.put("送菜篮子间隔", 间隔.toString());
});

ui.更新全场间隔.on("click", () => {
  var 间隔 = ui.全场时间间隔.getText();
  myStorage.put("全场时间间隔", 间隔.toString());
});

ui.start.on("click", () => {
  var delay = ui.delay.getText();
  myStorage.put("送菜篮子间隔", delay.toString());
  engines.execScriptFile("./float.js");
});

ui.全场菜篮子.on("click", () => {
  engines.execScriptFile("./float2.js");
});

/////////////////////////////////////////////////////////////////////////////////
function init() {
  update_autoHint();

  myStorage = storages.create("2567875799");
  if (
    myStorage.contains("聊天按钮坐标") &&
    myStorage.contains("砸蛋按钮坐标") &&
    myStorage.contains("送花按钮坐标") &&
    myStorage.get("聊天按钮坐标") != null &&
    myStorage.get("砸蛋按钮坐标") != null &&
    myStorage.get("送花按钮坐标") != null
  ) {
    //不进行抓图，不申请截图权限
    myStorage.put("需要截图权限", "false");
  } else {
    myStorage.put("需要截图权限", "true");
  }

  if (myStorage.contains("送菜篮子间隔")) {
    ui.delay.setText(myStorage.get("送菜篮子间隔"));
  }
  if (myStorage.contains("送菜篮子次数")) {
    ui.菜篮子数量.setText(myStorage.get("送菜篮子次数"));
  }
  if (myStorage.contains("全场时间间隔")) {
    ui.全场时间间隔.setText(myStorage.get("全场时间间隔"));
  }
}

function update_autoHint() {
  if (ui.autoService.checked) {
    ui.autoHint.setText("无障碍服务已经开启");
    ui.autoHint.setBackgroundColor(colors.BLUE);
  } else {
    ui.autoHint.setText("无障碍服务未开启");
    ui.autoHint.setBackgroundColor(colors.RED);
  }
}

/**
 * 以下均为测试用代码
 */
