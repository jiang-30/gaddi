// @ts-ignore
import { pathExists, ensureFile, readJson } from "fs-extra/esm";
import { writeFile } from 'fs/promises'
import { basename, resolve } from "path";
import ejs from 'ejs'
import { exitHandler, log, initGit, installPackage } from "../utils";

export interface IGenerateOption {
  // 模板路径
  templatePath: string
  // 模块名称，生成文件的路径 user => views/user/index.vue, views/user/option.ts, api/user/index.ts, model/user.ts
  model: string
  // 模块名称，中文名  
  name?: string
  // api接口路径
  restful?: string
  // json文件路径 
  json?: string
  // 使用数据库表来生成代码       
  table?: string
  // 配置文件路径    
  config?: string
  force?: boolean
}

export interface IGenerateField {
  label: string
  prop: string
  type: string // string int dynamic  
  required?: boolean
  max?: number
}

export async function generateHandler(projectPath: string, option: IGenerateOption) {
  const fields: IGenerateField[] = []

  if (option.json) {
    const jsonPath = resolve(projectPath, option.json)
    const isExists = await pathExists(jsonPath)

    if (!isExists) {
      exitHandler('没有找到 model 文件')
    }
    const json = await readJson(jsonPath);
    Object.keys(json).map(key => {
      fields.push({
        label: '',
        prop: key,
        type: typeof json[key],
      })
    })
  }


  const pagePath = resolve(projectPath, 'src/views', option.model, 'index.vue')
  const apiPath = resolve(projectPath, 'src/api', option.model + '.ts')
  const isModelExists = await Promise.all([pathExists(pagePath), pathExists(apiPath)])

  if (isModelExists.some(Boolean) && option.force !== true) {
    exitHandler('文件已存在')
  }

  const data = {
    fields: fields,
    title: option.name ?? '',
    restful: option.restful ?? ''
  }

  const pageStr = await ejs.renderFile(resolve(option.templatePath, 'page.ejs'), data)
  const apiStr = await ejs.renderFile(resolve(option.templatePath, 'api.ejs'), data)

  await ensureFile(pagePath)
  await ensureFile(apiPath)
  await writeFile(pagePath, pageStr, 'utf-8')
  await writeFile(apiPath, apiStr, 'utf-8')

  log('model')
  log(apiPath)
  log('option')
  log(pagePath)
}
