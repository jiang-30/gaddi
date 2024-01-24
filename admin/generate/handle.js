import { resolve, basename } from 'node:path'
import ejs from 'ejs'
import { writeFile } from 'node:fs'
import { copy, emptyDir } from 'fs-extra'
import mysql from 'mysql2/promise'
import shell from 'shelljs'
// let name = process.argv[2] || 'Auto-commit';
// let exec = shell.exec

// if (exec('git add .').code !== 0) {
//     echo('Error: Git add failed')
//     exit(1)
// }
// if (exec(`git commit -am "${name}"`).code !== 0) {
//     echo('Error: Git commit failed')
//     exit(1)
// }
// if (exec('git push').code !== 0) {
//     echo('Error: Git commit failed')
//     exit(1)
// }

export async function generateRouter(req, res, next) {
  console.log(req.url)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  let data = null

  if (req.url === '/tables') {
    data = await tables(req, res)
  } else if (req.url === '/columns') {
    data = await columnsByTable(req, res)
  } else if (req.url === '/columns/json') {
    data = await columnsByJson(req, res)
  } else if (req.url === '/preview') {
    data = await preview(req, res)
  } else if (req.url === '/files') {
    data = await files(req, res)
  }

  res.end(data)
}

/**
 * 查询数据库下所有表名、表注释
 * TABLE_NAME AS 表名, TABLE_COMMENT AS 表注释
 */
async function tables(req, res) {
  const connection = await mysql.createConnection({
    host: '39.104.48.239',
    port: 3307,
    database: 'gaddi_service',
    user: 'root',
    password: 'Mysql@123456',
  })

  const [rows, fields] = await connection.query(
    "SELECT TABLE_NAME AS `tableName`, TABLE_COMMENT AS `tableComment` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'gaddi_service'",
  )

  await connection.end()

  console.log('results', rows)

  return JSON.stringify(rows)
}

/**
 * 查询数据库下字典表下所有字段名、数据类型、字段注释
 * COLUMN_COMMENT AS 字段注释, COLUMN_NAME AS 字段名, DATA_TYPE AS 数据类型, CHARACTER_MAXIMUM_LENGTH as 长度, NUMERIC_PRECISION as 小数长度, NUMERIC_SCALE as 小数, IS_NULLABLE as 是否为空,  COLUMN_KEY as 主键, COLUMN_DEFAULT as 默认值
 */
async function columnsByTable(req, res) {
  const connection = await mysql.createConnection({
    host: '39.104.48.239',
    port: 3307,
    database: 'gaddi_service',
    user: 'root',
    password: 'Mysql@123456',
  })
  const [rows, fields] = await connection.query(
    "SELECT COLUMN_COMMENT AS `comment`, COLUMN_NAME AS `name`, DATA_TYPE AS `type`, CHARACTER_MAXIMUM_LENGTH as `length`, NUMERIC_PRECISION as `numericLength`, NUMERIC_SCALE as `numericLength1`, IS_NULLABLE as `isNull`,  COLUMN_KEY as `isKey`, COLUMN_DEFAULT as `default` FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_SCHEMA = 'gaddi_service' AND TABLE_NAME = 'sys_dict'",
  )
  await connection.end()

  console.log('results', rows)

  return JSON.stringify(rows)
}

/**
 *
 */
async function columnsByJson(req, res) {
  const json = req.body
  const rows = []

  Object.keys(json)

  console.log('results', rows)

  return JSON.stringify(rows)
}

/**
 * 生成构建数据
  prop: "${field.propertyName}",
  label: "${field.comment}",
  type: "${field.metaInfo.jdbcType}",
  type1: "${field.propertyType}",
  prop1: "${field.propertyName}",
  isLogic: ${field.logicDeleteField?c},
  isVersion: ${field.versionField?c},
  isFill: ${(field.fill??)?c},
  isKey: ${field.keyFlag?c},
 */
async function preview(req, res) {
  const config = {
    projectPath: 'D:/gaddi',
    basePath: 'src',
    modulePath: 'admin/dict',
    columns: [
      {
        字段注释: '',
        字段名: 'num1',
        数据类型: 'int',
        长度: null,
        小数长度: 10,
        小数: 0,
        是否为空: 'YES',
        主键: '',
        默认值: null,
      },
      {
        字段注释: '',
        字段名: 'id',
        数据类型: 'int',
        长度: null,
        小数长度: 10,
        小数: 0,
        是否为空: 'NO',
        主键: 'PRI',
        默认值: null,
      },
      {
        字段注释: '',
        字段名: 'type',
        数据类型: 'varchar',
        长度: 50,
        小数长度: null,
        小数: null,
        是否为空: 'NO',
        主键: '',
        默认值: 'list',
      },
      {
        字段注释: '',
        字段名: 'code',
        数据类型: 'varchar',
        长度: 191,
        小数长度: null,
        小数: null,
        是否为空: 'NO',
        主键: 'UNI',
        默认值: null,
      },
      {
        字段注释: '',
        字段名: 'label',
        数据类型: 'varchar',
        长度: 191,
        小数长度: null,
        小数: null,
        是否为空: 'NO',
        主键: '',
        默认值: null,
      },
      {
        字段注释: '',
        字段名: 'remark',
        数据类型: 'varchar',
        长度: 191,
        小数长度: null,
        小数: null,
        是否为空: 'YES',
        主键: '',
        默认值: null,
      },
      {
        字段注释: '',
        字段名: 'created_at',
        数据类型: 'datetime',
        长度: null,
        小数长度: null,
        小数: null,
        是否为空: 'NO',
        主键: '',
        默认值: 'CURRENT_TIMESTAMP(3)',
      },
      {
        字段注释: '',
        字段名: 'updated_at',
        数据类型: 'datetime',
        长度: null,
        小数长度: null,
        小数: null,
        是否为空: 'NO',
        主键: '',
        默认值: 'CURRENT_TIMESTAMP(3)',
      },
      {
        字段注释: '',
        字段名: 'num',
        数据类型: 'decimal',
        长度: null,
        小数长度: 10,
        小数: 2,
        是否为空: 'NO',
        主键: '',
        默认值: null,
      },
    ],
  }

  const data = {
    schemaName: '',
    ModuleName: '',
    package: {
      Entity: '',
      Mapper: '',
      Service: '',
      ServiceImpl: '',
      Controller: '',
    },
    table: {
      name: '',
      comment: '',
      entityName: '',
      mapperName: '',
      serviceName: '',
      serviceImplName: '',
      controllerName: '',
      superEntityClass: '',
      superMapperClass: '',
      superServiceClass: '',
      superServiceImplClass: '',
      superControllerClass: '',
    },
    fields: [
      {
        propertyName: '',
        propertyType: '',
        name: '',
        type: '',
        comment: '',
        annotationColumnName: '',
        logicDeleteField: '',
        keyType: '',
        keyFlag: '',
        fillType: '',
        fillFlag: '',
        convert: '',
        versionType: '',
        metaInfo: {
          length: '',
        },
      },
    ],
    author: {},
    date: {},
    frontFiles: [
      {
        name: 'api',
        projectPath: '',
        path: '/api/dict.js',
      },
      {
        name: 'page',
        projectPath: '',
        path: '/views/admin/dict/index.vue',
      },
      {
        name: 'option',
        projectPath: '',
        path: '/views/admin/dict/option.js',
      },
    ],
    BackFiles: ['entiry', 'mapper', 'mapper.xml', 'service', 'service.impl', 'controller'],
  }

  return JSON.stringify(data)
}

/**
 * 代码生成
 */
async function files(req, res) {
  const templatePath = resolve(process.cwd(), './')
  const data = req.body

  const pageStr = await ejs.renderFile(resolve(templatePath, 'generate/template/page.ejs'), data)

  console.log(pageStr)

  // await ensureFile(pagePath)
  // await ensureFile(apiPath)
  // await writeFile(pagePath, pageStr, 'utf-8')
  // await writeFile(apiPath, apiStr, 'utf-8')

  return pageStr
}
