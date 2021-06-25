# node.js命令行工具开发入门

作为程序员，平时或多或少都用过一些命令行工具，以JS开发者较为熟悉的npm包——http-server为例，一般通过npm全局安装之后，就可以在命令行输入http-server指令以及参数之后，便可以快速启动一个HTTP服务器。

那么，如果你已经掌握node.js开发，你也可以编写自己的命令行工具，只需参照下面的步骤即可。

### 一、编写功能脚本

这里的功能脚本就是你希望该工具完成具体功能的代码实现。比如最简单的：

index.js —— say hello
```javascript
module.exports = (name) => {
  console.log(`hello ${name}`);
}
```

### 二、准备bin文件

在你的根目录下创建bin目录，并添加一个可执行脚本。

hello.js

```javascript
#!/usr/bin/env node
const { program } = require("commander");
const package = require("../package.json");
const hello = require("../");

program.version(package.version);

// 处理--name参数
program.option("-n, --name <name>", "名字", (name) => {
  hello(name);
});

program.parse();
```

说明：
- 文件的扩展名不重要，可以是.js或者其他（也可以没有），建议使用.js方便代码编写
- 文件首行要添加 ***#!/usr/bin/env node*** ，表明该脚本将尝试使用node执行
- 代码中用到了commander这个开源库，用来解析命令行指令、参数并执行对应的程序，非常推荐使用

### 三、配置package.json

作为一个npm包，需要配置几个关键字段

```json
{
  ... // 省略其他常规字段
  
  // 配置哪些文件需要被发布出去，不要遗漏
  "files": ["bin", "index.js"],
  // 配置bin文件的路径，当包被安装时，将会根据此配置创建对应平台的可执行文件
  "bin": {
    "hello": "./bin/hello.js"
  }
}
```

### 四、发布

这一步如果不熟悉请参考相关文章。主要是先注册npm账户、登录、发布。

### 五、测试

发布之后，就可以通过npm全局安装，然后在终端输入命令与参数即可：

```bash
npm i -g <包名> # 全局安装

hello --name world # 终端将会输出：hello world
```

也可以不发布，直接全局安装本地的包再测试：

```bash
npm i -g . # 在工程根目录下执行，会将当前目录当作一个npm包，并全局安装
```
