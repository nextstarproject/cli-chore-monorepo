# @nextstarproject/version

> ps: 之前使用的是 `@nextstar/version` ，后来改成了 `@nextstarproject/version`，主要原因在于 github 和 npm 的 scope 设置一样方便自动化

[![github repo](https://img.shields.io/badge/github-@nextstarproject/version-1677ff)](https://github.com/nextstarproject/cli-chore-monorepo/tree/master/packages/version)  [![GitHub package](https://img.shields.io/badge/github-package-blue) ](https://github.com/nextstarproject/cli-chore-monorepo/pkgs/npm/version)  [![npm](https://img.shields.io/npm/v/%40nextstarproject%2Fversion)](https://www.npmjs.com/package/@nextstarproject/version)

## 安装

```shell
npm install -g @nextstarproject/version
```

## 使用

### 将运行的目录下全部更新至指定版本

```shell
$ ns-version u 2.0.0
```

**结果**

| (index) |              file               |
| :-----: | :-----------------------------: |
|    0    |         'package.json'          |
|    1    | 'packages/version/package.json' |

> 此处更新时只会默认忽略掉 `node_modules` 文件夹下的 `package.json` 文件。其余 `package.json` 文件将会全部更新

### 更新指定工作目录下的版本

```shell
$ ns-version up -w "./" -i minor
```

> 此处代指只更新当前目录下根路径中的 `package.json` 版本

**结果**

| (index) |      file      |   old   |   new   |
| :-----: | :------------: | :-----: | :-----: |
|    0    | 'package.json' | '1.0.0' | '1.1.0' |

其中输入的 `-w` 代表 `--workspace` ，可以多次输入，每个输入的都会使用 [`glob`](https://www.npmjs.com/package/glob) 来做匹配。

比如输入为： `packages/**` 和 `apps/**` ，则其可以查看源码，将会对齐拼接为 `packages/**/package.json` 和 `apps/**/package.json` , 将其输入到 [`glob`](https://www.npmjs.com/package/glob) 来进行处理。

其和 `unified` 一样，默认忽略 `node_modules`


## 参数


```shell
$ ns-version             
Usage: ns-version [options] [command]

CLI unified Update version

Options:
  -v, --version                  output the version number
  -h, --help                     display help for command

Commands:
  unified|u [options] <version>  Unified update to the specified version, default ignore node_modules
  update|up [options]            Upgrade the version under the specified workspace
  help [command]                 display help for command
```

### unified

```shell
$ ns-version unified -h
Usage: ns-version unified|u [options] <version>

Unified update to the specified version, default ignore node_modules

Arguments:
  version                Specifying the version

Options:
  -s, --spaces <number>  Number of spaces to indent (default: "2")
  -h, --help             display help for command
```

### update

```shell
$ ns-version update -h 
Usage: ns-version update|up [options]

Upgrade the version under the specified workspace

Options:
  -w, --workspace <workspace...>  Target workspace, default: **, Results: [workspace]/package.json, ignore node_modules (default: "**")
  -i, --increment <level>         Increment a version by the specified level.  Level can be one of: major, minor, patch, premajor, preminor, prepatch, or
                                  prerelease.  Default level is 'patch'. Only one version may be specified. (default: "patch")
  -s, --spaces <number>           Number of spaces to indent (default: "2")
  -h, --help                      display help for command
```

> 其中 `-w` 默认 `**` 其实拼接后和 `unified` 是一样的。

