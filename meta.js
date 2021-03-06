const path = require('path')
const fs = require('fs')

const {
  installDependencies,
  runLintFix,
  printMessage,
  cdAndRun
} = require('./utils')

module.exports={
    prompts:{
        name: {
            type: 'string',
            required: true,
            message: '项目名是啥',
        },
        projectName: {
            type: 'string',
            required: true,
            message: '项目中文名是啥',
        },
        author: {
            type: 'string',
            message: '你是谁啊',
        },
        description: {
            type: 'string',
            required: false,
            message: '描述一下项目吧，不写也行',
            default: '一个PC端的项目',
        },
        autoInstall: {
          type: 'list',
          message:
            '项目创建后，你必须得安一下包依赖，不懂就去百度',
          choices: [
            {
              name: ' OK ，用 Yarn安吧',
              value: 'yarn',
              short: 'yarn',
            },
            {
              name: '好的, 用 NPM 安吧',
              value: 'npm',
              short: 'npm',
            },
            {
              name: '我舅不愿安，怎么着！',
              value: false,
              short: 'no',
            },
          ],
        },
    },
    
    filters: {
        "tslint.json": "lint",
        "tsconfig.json": "lint"
    },
    skipInterpolation: [
      "**/*.vue"
    ],
    complete: function (data,{chalk}) {
        const green = chalk.green

        const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

        if (data.autoInstall) {
          installDependencies(cwd, data.autoInstall, green)
            // .then(() => {
            //   return runLintFix(cwd, data, green)
            // })
            // .then(() => {
            //   printMessage(data, green)
            // })
            .then(() => {
              return cdAndRun(cwd,data,green)
            })
            .catch(e => {
              console.log(chalk.red('Error:'), e)
            })
        } else {
          printMessage(data, chalk)
        }
    }
}