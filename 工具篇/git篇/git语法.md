# 前端学习之git

## 1.git基础

### 1.1 git简述

Git是一个版本管理控制系统(缩写VCS),它可以在任何时间点，将文档的状态作为更新记录保存起来，也可以在任何时间点，将更新记录恢复过来。

### 1.2 git的工作原理

| git仓库          | 暂存区             | 工作目录            |
| ---------------- | ------------------ | ------------------- |
| 用于存放提交记录 | 临时存放被修改文件 | 被git管理的项目目录 |

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/c1fe35ec-e698-482c-9d4d-b834a4f6d149.png" style="zoom:67%;" />

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

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/cb9bf6e2-9313-483d-b272-5ef36ad081d6.png" style="zoom:67%;" />

## 2.git进阶

### 2.1 分支

分支可以认为是当前工作目录中代码的一份副本。使用分支，可以让我们从开发主线分离出来，以免影响开发主线。

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/9e6ba174-9ffa-4b04-954f-a61f88eda980.png" style="zoom:67%;" />

#### 2.1.1 分支明细

1. 主分支（master）：第一次向git仓库中提交更新记录时自动产生的一个分支

   <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/3c257ba3-2a78-4eb8-bc19-4903bd31d2bd.png" style="zoom: 67%;" />

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

### 2.3 提交

* 提交到远程：`git push {远程仓库地址} {分支名称}`

  ```
  $  git push origin feature-branch:feature-branch    //推送本地的feature-branch(冒号前面的)分支到远程origin的feature-branch(冒号后面的)分支(没有会自动创建)
  ```

* 提交到本地：`git commit -m {提交说明}`
  - feat：新功能（feature）
  - fix：修补bug
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动
  
* 拉取远程仓库最新版本：`git pull {远程仓库地址} {分支名称}`

### 2.4 远程仓库操作

* 载入远程仓库，查看信息：`git remote -v`

* 添加远程版本库：`git remote add {名称(master)}  {git地址}`  如：

  `git remote add origin git@github.com:tianqixin/runoob-git-test.git`

* 删除远程仓库： `git remote rm {别名}`
* 修改仓库名：`git remote rename {旧别名} {新别名}`

## 3  git工作

### 3.1 多人协作开发流程

* A在自己得计算机中创建本地仓库
* A在github中创建远程仓库
* A将本地仓库推送到远程仓库：`git push {远程仓库地址(origin)} {分支名称}`
* B克隆远程仓库到本地进行开发： `git clone {远程仓库地址}`
* B将本地仓库中开发得内容推送到远程仓库
* A将远程仓库中得最新内容拉去到本地: `git pull {远程仓库地址(origin)} 分支名称`

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/83d67592-605d-4dac-b695-8058a41cacf8.png" style="zoom: 67%;" />

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/4ed90641-576e-4302-826c-4a1f82587050.png" style="zoom:50%;" />

### 3.2 多人开发冲突

在多人同时开发一个项目时，如果两个人修改了同一个文件的同一个地方，就会发生冲突。冲突需要人为解决

#### 3.2.1 冲突实例

当`git pull`拉取最新代码时，遇到以下情况：

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/4dc0cf90-14ea-4505-8567-957c9730e84a.png" style="zoom:50%;" />



在出现这种情况时需要你输入新的merge信息的终端窗口，在最上面的提示句下有一行空格，按照链接的帮助，按”i”进入输入模式，随便输入个什么，然后 ESC，直接输入”:wq”你会发现这个出现在终端的最下面，这是OK的，最后 enter，就OK了。



当push代码的时候，别人已经更新代码

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/cc22db4c-a781-49c0-ac88-077e6d277b5d.png" style="zoom:80%;" />

在出现这种情况时，可以输入`git merge --abort`或者`git reset --merge`

### 3.3 跨团队协作

1. 程序员c fork仓库
2. 程序员c 将仓库克隆到本地进行修改
3. 程序员c 将仓库推送到远程
4. 程序员c发起pull request
5. 远仓库作者审核
6. 原仓库作者合并代码



### 3.4 SSH免登录

SSH协议通过验证公钥和私钥是否匹配决定验证是否通过

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/4b1711df-87ad-4931-9d48-42e6f85805d2.jpg" style="zoom:50%;" />

* 生成密钥：ssh-keygen

* 秘钥存储目录：C:\Users\用户\.ssh

* 公钥名称：id_rsa.pub

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/e1d1b27e-a72e-44c5-a590-094e373038a8.jpg" style="zoom: 80%;" />

需要放在github服务器中，打开文件全选复制，头像settings-SSH and GPG keys

* 私钥名称：id_rsa
