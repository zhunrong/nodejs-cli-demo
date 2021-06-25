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
