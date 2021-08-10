# airbdd的使用

### 1.airbdd的概述

​       airbdd是使用 airtest+behave开发的手机端UI测试框架，相比之前的mec、airingtest框架更注重普遍适用性。

1. 可基于 “文案” 和 path 路径编写用例，不需要开发配合添加 testId
2.  查找元素时属性不再局限于 testId，可随意指定属性，并且可同时用多个属性共同查找元素
3.   app的特性逻辑，比如 schema跳转规则、打开首页等等功能抽为配置和自定义脚本，方便新的app接入时修改几项配置即可
4.  用例失败时可在报告中查看当前用例的执行录屏，方便排查非必现bug
5.  采用了必填参数和可选参数的搭配形式，方便扩展语法
6.  点击按钮造成页面局部渲染，如何保证下一步执行是渲染完成后执行”等等兼容性逻辑的判断由框架统一提供方案，只需指定相关可选参数即可

### 2.airbdd的语法

#### 2.1 公共语句

| 语句模板                    | 含义                           |
| --------------------------- | ------------------------------ |
| 点击[]                      | 点击某TestID的元素             |
| 点击文案[]                  | 点击某文案的元素               |
| []为[]的元素的[]是[]        | 判断某元素的属性为什么         |
| []的文案包含[]              | 判断某元素的文案包含什么       |
| []的文案为[]                | 判断某元素的文案是什么         |
| 存在[]的文案                | 存在文案为什么的元素           |
| 存在[]的元素                | 存在TestID为什么的元素         |
| 存在[]为[]的元素            | 存在某属性值为某某的元素       |
| 不存在[]的元素              | 判断不存在TestID               |
| []向上滑动[]                | 将某TestId元素向上滑动一定距离 |
| []向下滑动[]                | 将某TestId元素向下滑动一定距离 |
| []向左滑动[]                | 将某TestId元素向左滑动一定距离 |
| []向右滑动[]                | 将某TestId元素向右滑动一定距离 |
| 在[]中输入[]                | 在某某元素中输入值             |
| 绑定MockSuite[]             | 绑定MockSuite                  |
| 绑定MockSuite[]并开启Case[] | 绑定MockSuite并开启Case        |
| 移除MockSuite[]             | 移除指定MockSuite              |
| 移除设备所有MockSuite       | 移除设备所有MockSuite          |
| 跳转到[]                    | 跳转到某个Schema               |
| 回到首页                    | 回到机票首页                   |
| 登录账号[]密码[]            | 登录账号密码                   |
| 退出登录                    | 退出登录                       |
| 等待[]秒                    | 等待一定时间                   |

####  2.2 cucumber语法

标题

```
feature(功能):
// 可以说点废话, 逻辑简短描述,prd地址...
```

段落：

```text
background(背景)： // 可以说点废话..
// 当given重复太多或者多个scenario用到相同的given，则抽出background。添加上下文，会在每个scenario前执行

scenario(场景)：// 可以说点废话 + 步骤关键字

scenarioOutline(场景大纲)：// 可以说点废话 + 必须配合examples使用

examples(例子)：// 不可用关键字,可为scenarioOutline准备数据
```

句子：

```text
given(假如)  // case的前置条件,开始测试前，你的程序应该处于一个定义良好的状态。
when(当)     // 操作步骤
then(那么)   // 断言
and(并且)
but(但是)
```

### 3.airbdd的使用

1、**下载项目模版（分支名称对应具体app）**： 

[  http://git.dev.sh.ctripcorp.com/flight-mobile-qatools/airbdd-demo](http://git.dev.sh.ctripcorp.com/flight-mobile-qatools/airbdd-demo)

2、配置手机：

  最好选择 小米或者华为手机（vivo、oppo等手机权限限制较大，安装app需要注册账号等）

 连接usb线

 打开开发人员选项

 打开USB调试

 打开“仅充电”模式下允许ADB调试

 use配置选择 MTP(多媒体模式)

 安装测试包（测试环境）

4、安装依赖包：

  sudo pip3 install --upgrade airbdd --proxy=[http://ntproxy.qa.nt.ctripcorp.com:8080](http://ntproxy.qa.nt.ctripcorp.com:8080/) -i http://pypi.infosec.uat.qa.nt.ctripcorp.com/simple --extra-index-url http://mirrors.aliyun.com/pypi/simple --trusted-host [pypi.infosec.uat.qa.nt.ctripcorp.com](http://pypi.infosec.uat.qa.nt.ctripcorp.com/) --trusted-host [mirrors.aliyun.com](http://mirrors.aliyun.com/)

4、安装adb:

   只需要安装adb，不需要安装整个sdk

3、修改参数:

  device_config.json 中 deviceId 设置成当前连接的手机（使用adb devices 查看）

4、配置页面schemaUrl

  配置页面的url

  rn页面类似于：

​    /rn_bus/_crn_config?CRNModuleName=RN_Bus&CRNType=1&initialPage=IndexComponent&fromCity=string&toCity=string&fromStation=string&utmSource=string

5、运行测试是否可以跳转至被测页面：

  修改demo用例

   跳转到[schemaUrl.json 中配置的页面名称]

   等待[5]秒

  airbdd run 运行demo, 看是否跳转到相应页面

6、书写用例：

  成功跳转到页面后可以按照上述语句书写用例

  元素的属性安装airtestIDE后查看
