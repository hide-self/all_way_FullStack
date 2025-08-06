# 一路通关Python全栈开发
这个仓库文档用于全栈开发学习，本仓库将从Vue3一直到Django5的学习，来速通一遍基础常用知识，之后再通过一个商城项目进行一个巩固，最后再学习Linux上项目的部署与运行，最大程度地完整教学开发一个全站项目的全部流程。

另外，感谢这个视频，本文档大部分教学流程参考这个视频（https://www.bilibili.com/video/BV1Vs3Qz7Ebn/?p=2&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=b11032d396f25002b8224909afe74c7d），可能会有部分补充的地方，大部分地方基本一致，可以将其作为参考视频一同用于学习此仓库内容。



## 1.git基本操作

此处只介绍ssh方式，因为此方式基本包含了http方式的流程与方法，并且ssh方式比http方式更快更高效，对于同一台电脑，ssh方式在设置后基本上可以是一劳永逸的

```shell
//在目的仓库位置的父文件夹中，打开Open Git Bash here

ssh-keygen -t rsa -C "注册邮箱"  //使用SSH生成公私钥对，执行指令之后连续回车即可

//之后在这个文件中生成了私钥 (/c/Users/Qiao/.ssh/id_rsa)，在这个文件夹中生成了公钥(/c/Users/Qiao/.ssh/id_rsa.pub)

//接下来，点击github右上角头像，进入settings，找到SSH and GPG keys，添加NEW SSH KEY，标题任意，复制公钥进KEY中

//先创建好一个新仓库(http方式从下面直接开始即可)
//然后，就可以正式复制仓库了
git clone ssh方式的地址

//复制好之后在当前文件夹下就会有这个仓库文件夹了

//进行更新后，就需要将更新内容推到github上
git add *
git commit -m"注释内容"
git push

//拉取仓库内容(每日上班第一步)
git pull


//补充查看更新日志方式
git log		//显示仓库的修改日志（会完整显示版本号、修改人、修改时间、注释内容等）
git log --pretty=oneline	//在一行内简洁显示修改日志

```



