#!/usr/bin/env node
import { Command } from "commander";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { version } from "../package.json";
import { initHandler } from "./command/init";
import { generateHandler } from "./command/generate";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name("gaddi")
  .usage("[command] [options]")
  .description("gaddi 脚手架")
  .version(version);

// 创建项目
program
  .command("init")
  .description("创建项目")
  .argument("<project_name>", "项目名称")
  .option("-f, --force", "覆盖同名目录")
  .action((projectName, options) => {
    options.templatePath = resolve(__dirname, "../template");
    options.configPath = resolve(__dirname, "../config.json");
    const projectPath = process.cwd();
    initHandler(resolve(projectPath, projectName), options);
  });

// 代码生成
program
  .command("generate")
  .description("代码生成")
  .argument("<model>", "模块名称")
  .option("-n, --name <path>", "模块中文名称")
  .option("-j, --json <path>", "json文件路径")
  .option("-r, --restful <path>", "restful接口路径")
  .option("-t, --table <table_name>", "表名称")
  .option("-c, --config <path>", "配置文件路径", '默认路径')
  .option("-f, --force", "覆盖同名目录")
  .action((model, option) => {
    option.templatePath = resolve(__dirname, "../template")
    option.model = model
    const projectPath = process.cwd()
    generateHandler(projectPath, option)
  });

// 解析参数
program.parse();
