import ejs from 'ejs'
import fs from "fs-extra"
// import axios from "axios";
// import download from "download";
import { resolve, dirname, basename } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const mirror =
//   "https://github.com/jiang-30/whirls-plus/releases/download/0.0.1/dist.zip";

// const currentTag = "0.0.1";

// axios
//   .get("https://api.github.com/repos/jiang-30/whirls-plus/releases/latest")
//   .then((res) => {
//     console.log(res.data.tag_name);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // 2. 下载
// download(mirror, resolve(__dirname, `../template/${currentTag}`), {
//   extract: true,
// }).then((res) => {
//   console.log("download", res);
// });


var json = {
	"code": "",
	"createBy": 0,
	"createDate": 0,
	"deleted": 0,
	"gp": "",
	"id": 0,
	"lastUpdateBy": 0,
	"lastUpdateDate": 0,
	"name": "",
	"objectVersionNumber": 0,
	"remarks": "",
	"status": 0
}

const list = []

Object.keys(json).map(key => {
  list.push({
    type: typeof json[key],
    prop: key
  })
})


// console.log(list)
const fn = async () =>  {
  const templatePath = 'packages/cli/src/template/page.ejs'
  const data = {fields: list, title: '名称',}

  const html  = await ejs.renderFile(templatePath, data)

  console.log(html)
}

// fn()

console.log([ false, false ].some(Boolean))

fs.writeFile('path', 'string')
