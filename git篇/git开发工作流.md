# git开发指南

## 常见的git工作流

1. 集中工作流
2. 功能分支工作流
3. gitflow工作流
4. forking工作流

## 规范

* 主分支master，每次开发新功能都要从远程仓库master分支建立新分支
* 保证主分支master是线性提交，没有分叉且有最新的稳定commits
* 每开发一个新功能，建立新的分支。命名规则为dev_××
* 每次发布必须拉relase分支
* 每次发布的代码，都需要在release上打上版本tag${日期}
* 定期从release branch merge到master，master为稳定的版本

## 其他

* 克隆：`git clone ${ssh地址}`

* 本地拉取分支：`git checkout -branch dev_airportCache origin/master`

* 开发完成，本地提交commit

  `git add <文件名>`

  `git commit -m 提交信息`

  

* 需要注意的是,由于小k在开发过程中可能其他人已经在master上有了新的提交,所以推到远程仓库之前,必须拉取远程主分支,而且为了维持主分支的**线性提交**,必须是rebase!

    `git pull origin master **--rebase**`

* 推到远端

  ` git push -u origin dev_airportCache`

* 用你的分支进行提测,如果bug,就重新进行2-3步骤,然后直接git push
* 提交merge request,codereview成功后就能将代码合入主分支,接着就可以将源分支删除,由于在开发的时候你可能提交了许多commit,在和进master之前可以把多个commit squash到一起再合
* 在发布之前,给master分支打一个tag,规定版本号,比如说v1.1.5,怎么添加tag
* 拉取release分支发布,比如说当天是2019-04-12,就创建一个新分支叫release_20210612
* 生产发布
