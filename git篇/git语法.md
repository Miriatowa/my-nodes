# 前端学习之git

## 1.git基础

### 1.1 git简述

Git是一个版本管理控制系统(缩写VCS),它可以在任何时间点，将文档的状态作为更新记录保存起来，也可以在任何时间点，将更新记录恢复过来。

### 1.2 git的工作原理

| git仓库          | 暂存区             | 工作目录            |
| ---------------- | ------------------ | ------------------- |
| 用于存放提交记录 | 临时存放被修改文件 | 被git管理的项目目录 |

<img src="C:\Users\余洵杰\AppData\Roaming\Typora\typora-user-images\image-20210510093407720.png" alt="image-20210510093407720" style="zoom:67%;" />

### 1.3 git的使用

#### 1.3.1  git使用前配置

在使用git前，需要配置git用户信息，在向git仓库中提交时需要用到：

1. 配置提交用户名：`git config --global user.name ‘用户名’`

2. 配置提交用户邮箱： ` git config --global user.email ‘邮箱’`

3. 查看git配置用户信息： `git config --list`

   **注意**：配置只需要首次执行，如果要修改配置用户信息，重复上述命令

#### 1.3.2 提交步骤

1. `git init`初始化git仓库
2. `git status` 查看文件状态
3. `git add ‘文件列表’`  追踪文件
4. `git commit -m  '更新信息'`  同仓库提交代码
5. `git log` 查看提交记录 

#### 1.3.3  撤回操作

* 用暂存区中的文件覆盖工作目录中的文件: `git checkout 文件`
* 将文件从暂存区中删除：`git rm --cached 文件`
* 将git仓库中指定的更新记录恢复出来，并且覆盖暂存区和工作目录： `git rest --hard commitID`

<img src="C:\Users\余洵杰\AppData\Roaming\Typora\typora-user-images\image-20210510111331211.png" alt="image-20210510111331211" style="zoom: 67%;" />

## 2.git进阶

### 2.1 分支

分支可以认为是当前工作目录中代码的一份副本。使用分支，可以让我们从开发主线分离出来，以免影响开发主线。

<img src="C:\Users\余洵杰\AppData\Roaming\Typora\typora-user-images\image-20210511090935973.png" alt="image-20210511090935973" style="zoom: 50%;" />

#### 2.1.1 分支明细

1. 主分支（master）：第一次向git仓库中提交更新记录时自动产生的一个分支

   <img src="C:\Users\余洵杰\AppData\Roaming\Typora\typora-user-images\image-20210511091408405.png" alt="image-20210511091408405" style="zoom:67%;" />

2. 开发分支（develop）：作为开发的分支，基于master分支创建

3. 功能分支（feature）：作为开发具体功能的分支，基于开发分支创建

#### 2.1.2 分支命令

* `git branch` 查看分支
* `git branch '分支名称'` 创建分支
* `git checkout ‘分支名称’`  切换分支
* `git merge ‘来源分支’ ` 合并分支
* `git branch -d ’分支名称‘` 删除分支（分支被合并后才允许删除） 
* `git branch -D ’分支名称‘` 删除分支（分支未被合并后删除） 

### 2.2 暂时保存更改

在git中，可以暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其它工作。使用场景：分支临时切换

* 存储临时改动：`git stash`
* 恢复改动：`git stash pop`

