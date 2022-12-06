<!--
 * @Description: 
 * @Version: 
 * @Author: 
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-06 14:15:07
-->
# antd4.24.3 + ahooks + zustand + webpack5

```
git clone xxxx
git submodule update --init --recursive
```
or
```
git clone --recurse-submodules
```

当子packages变化
先到子packages提交
然后主项目

```
git submodule update 更新子模块的代码
Submodule path 'packages/subfooter': checked out '23b62a66dc5b3ddcf08598f6090fd68f8f79065e' //牵出的特殊版本
Submodule path 'packages/subheader': checked out '77f8a85280c13cd8dcf6ec162be09f27e90d488b'
```
git submodule foreach 'git pull origin master'
```
```
git submodule update
```

```
git branch -a
* (HEAD detached from 77f8a85)
```

可知在不同场景下子模块的更新方式如下：

> 对于子模块，只需要管理好自己的版本，并推送到远程分支即可；
> 对于父模块，若子模块版本信息未提交，需要更新子模块目录下的代码，并执行 commit 操作提交子模块版本信息；
> 对于父模块，若子模块版本信息已提交，需要使用 git submodule update ，Git 会自动根据子模块版本信息更新所有子模块目录的相关代码。


# 删除子模块

git submodule deinit 命令卸载一个子模块。这个命令如果添加上参数 --force，则子模块工作区内即使有本地的修改，也会被移除

```
git submodule deinit project-sub-1
git rm project-sub-1
```

执行 git submodule deinit project-sub-1 命令的实际效果，是自动在 .git/config 中删除了以下内容

```
[submodule "project-sub-1"]
url =  https://github.com/username/project-sub-1.git
```

执行 git rm project-sub-1 的效果，是移除了 project-sub-1 文件夹，并自动在 .gitmodules 中删除了以下内容：

```
[submodule "project-sub-1"]
path = project-sub-1
url =  https://github.com/username/project-sub-1.git
```

此时，主项目中关于子模块的信息基本已经删除（虽然貌似 .git/modules 目录下还有残余）：

```
➜ project-main git:(master) ✗ gs
位于分支 master
您的分支与上游分支 'origin/master' 一致。
要提交的变更：
（使用 "git reset HEAD <文件>..." 以取消暂存）
修改： .gitmodules
删除： project-sub-1
```

```
git commit -m "delete submodule project-sub-1"
```
提交代码至此完成对子模块的删除