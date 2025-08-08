# 一路通关Python全栈开发
这个仓库文档用于全栈开发学习，本仓库将从Vue3一直到Django5的学习，来速通一遍基础常用知识，之后再通过一个商城项目进行一个巩固，最后再学习Linux上项目的部署与运行，最大程度地完整教学开发一个全站项目的全部流程。

另外，感谢这个视频，本文档大部分教学流程参考这个视频（https://www.bilibili.com/video/BV1Vs3Qz7Ebn/?p=2&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=b11032d396f25002b8224909afe74c7d），可能会有部分补充的地方，大部分地方基本一致，可以将其作为参考视频一同用于学习此仓库内容。



# 1.git基本操作

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



# 2.Vue3

Vue3的中文官方文档https://cn.vuejs.org/guide/quick-start.html



## Vue的核心

Vue的核心只有两点：

一、响应式数据绑定

当数据发生改变时，数据可以自动更新，我们不必关心dom操作。

二、可组合的视图组件

把视图按照功能切分成若干个基本单元，组件可以一级一级组合整个应用，有易于维护、复用性强等特点。



## Vue3项目创建

根据官方文档中这一节内容进行https://cn.vuejs.org/guide/quick-start.html

本次Vue创建方式是用``create-vue``官方的项目脚手架工具

```
#1.选择合适文件夹，输入创建指令
npm create vue@latest

#2.输入项目名称

#3.添加依赖
#添加依赖后会出现到package.json的dependencies中，此后安装新的包与库都会同步更新
通常只要Pinia、Router、ESLint

#4.试验特性选择空

#5.项目是否不需要示例？No

#############################

#项目安装好之后，需要安装上述依赖（他们现在只存在于package.json中，还未安装）
npm install

#安装好之后就会出现node_modules文件夹，这里面放的就是项目的库与包

#启动项目的指令
npm run dev

```



# 3.npm的认识

npm全称为Node Package Manager即，Node包管理工具

他是Node.js默认的，以JS编写的软件包管理工具

## npm在vue中的体现

Vue项目中的包与库的位置存于node_modules文件夹中，这个文件夹通常非常大，在Git传输时通常不传输。我们通常是通过package.json中dependencies来安装项目需要的库与包，只需要``npm i``即可一键安装。

若是后期重新安装新的库与包，package.json中的dependencies会同步更新库与包信息

```
#1.安装该库，并且自动添加依赖到 package.json 的 dependencies 部分
npm install 库名

#2.精确版本控制
npm install axios@1.3.4 --save-exact

#3.不保存到 package.json
npm install moment --no-save

#4.使用 --save-dev 标志安装开发依赖（测试工具、构建工具、代码检查等）
npm install jest --save-dev
```



## 手撕package.json内容

以刚刚创建的vue项目中的package.json为例子。

```
{
  "name": "vue-demo",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --fix"
  },
  "dependencies": {
    "pinia": "^3.0.3",
    "vue": "^3.5.18",
    "vue-router": "^4.5.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.31.0",
    "@vitejs/plugin-vue": "^6.0.1",
    "eslint": "^9.31.0",
    "eslint-plugin-vue": "~10.3.0",
    "globals": "^16.3.0",
    "vite": "^7.0.6",
    "vite-plugin-vue-devtools": "^8.0.0"
  }
}
```

我们只挑拣其中重要的来讲述：

- name可以理解为包的名称
- scripts中存放着几个重要的指令
  - "dev": "vite"。用于日常开发启动开发服务器。用``npm run dev``启动
  - "build": "vite build"。用于项目部署前构建生产环境优化的文件。用``npm run build``启动(后面会学习到)
  - "preview": "vite preview".用于部署前测试本地预览构建后的生产环境效果。用``npm run preview``启动
- dependencies中存放着库，每个库拥有自己的版本，在执行``npm i``后他们的下载版本有所区别
  - 前面带着``^``的表示,只有第一位是固定的，后面几位默认用最新版本
  - 前面带着``~``的表示,只有前两位是固定的,后面一位默认用最新版本
  - 前面什么都不带，表示只用精确版本



# webpack的理解

webpack是一个模块打包器，也叫构建工具。

其目标就是将任何前端资源（html、css、js、jpg等）打包在一起，然后给浏览器使用

webpack网站（https://www.webpackjs.com/）



webpack优点：

- webpack可以打包压缩各类文件，加快网站运行速度
- webpack可以自动帮助我们自动编译各类文件，加快开发速度



## webpack的基本概念与打包过程

webpack基本概念有四个结构概念和五个文件概念

webpack有以下四个结构概念：

- 树结构
- 模块
- chunk(箱子/块)
- bundle(包/捆)



假设，你现在有一堆前端资源，十分复杂凌乱。此时，你创建了一个index文件，作为``入口文件``，拿来引入各个这个前端资源，假如说你先引入了main.html，main.html中引入了hello.js、world.jpg、nihao.css等等，这样index文件中有好几个像main.html一样的前端资源，他们层层叠叠、递归深入，形成了``树结构``。

形成树结构的每一个节点，也就是每一个前端资源文件，就成为``模块``。

为了提升前端资源加载效率，webpack会将前端的资源分门别类，形成一个有一个的箱子``chunk``。例如：将用户一进入网站就会用到的资源放入主箱子、将用户稍后才用得到的资源放入懒加载箱子、将图片、视频、样式等公共资源放入公共箱子、将webpack自身要用到的管理工具放入运行时箱子等等。总而言之，``chunk``就是模块的集合，这个集合有一套自称逻辑的分类方式，这套分类方式可以提升网站加载效率,将一个又一个的模块分类打包成chunk的过程称作``打包过程``。

将一个个的模块打包成逻辑箱子chunk后，webpack会进一步对他进行压缩、编译、封装等操作，变成实体箱子``bundle``，变成这样之后，就可以交给浏览器直接运行了。从chunk变成bundlee的过程又称作``压缩过程``。



webpack有以下五个文件概念：

- entry(入口)
- output(出口)
- loader(转换)
- plugins(插件)
- mode(模式)



通过入口文件``entry``，将整个文件打包后放置的位置就是``output``出口文件。

由于webpack本质上只认识js、json格式文件，所以就需要将其他前端文件通过``loader``转换成这些格式的文件。

有时候loader不足以转换所有文件，此时就需要引入``plugins``插件来进行转换。

模式``mode``是转换时候的方式，有开发模式**development**和生产模式**production**，生产模式下打包后的文件会变成一个有多行代码、有注释、可读性强的文件，生产模式下打包后的文件会变成只有一行、没有注释、可读性差、极度压缩的文件。



webpack整个的处理过程可以简化成以下的图

![75456925086](一路通关Python全栈开发图片集\1754569250860.png)





## webpack的安装与初体验

新建webpack_test文件夹，在里面新建webpackdemo1，在这里面测试webpack。

首先，在webpackdemo1打开终端，输入``npm init -y``，此时就会生成一个package.json文件。

![75456995643](一路通关Python全栈开发图片集\1754569956433.png)

接着，继续在当前终端位置里面，安装webpack，``npm install -g webpack webpack-cli --D``。用``webpack -v``检查是否安装成功。

![75456999810](一路通关Python全栈开发图片集\1754569998102.png)

我们之后创建src文件夹，在下面先创建入口文件``index.js``，然后创建模块one.js、two.js用于测试。

![75457147330](一路通关Python全栈开发图片集\1754571473306.png)

我们在这三个文件中象征性地写一些东西用于测试

```javascript
//one.js(模块1)
let n=100;
const Myadd=(x,y)=>{
    return x+y
}

let myGreet="hello"

export {n,Myadd}
export default myGreet


//two.js(模块2)
import myGreet,{n,Myadd} from "./one"

let sum=Myadd(10,n)

let allGreet=myGreet+"world"

export default allGreet
export {sum}


//index.js(入口文件)
import Greet,{sum} from "./two"

console.log(sum);

console.log(Greet);


```



之后，我们在webpackdemo1打开终端。输入``webpack --mode=development``。之后就会生成dist文件夹，里面有一个main.js文件。如果上述过程出错，说明你的模块书写有错误，更正后重新打包即可。

![75457153290](一路通关Python全栈开发图片集\1754571532906.png)

![75457156667](一路通关Python全栈开发图片集\1754571566675.png)



此时我们运行一下main.js文件。在webpackdemo1打开终端，输入``node dist/main.js``

![75457186698](一路通关Python全栈开发图片集\1754571866989.png)

运行成功！



补充一下，webpack的两种打包方式以及其区别：

- 开发环境打包。``webpack --mode=development``，这样打包后main.js内部的代码有多行，并且附带注释

![75457215189](一路通关Python全栈开发图片集\1754572151896.png)

- 生产环境打包。``webpack --mode=production``，这样打包后main.js内部的代码只有一行，并且没有任何其他无关东西（包括注释），这样就可以极度压缩代码

![75457219962](一路通关Python全栈开发图片集\1754572199626.png)



## webpack基本总体配置

指定入口文件、出口文件，并进行打包。

![75463469331](一路通关Python全栈开发图片集\1754634693317.png)

成功将打包文件输出到``./build/``文件夹中。

![75463476617](一路通关Python全栈开发图片集\1754634766174.png)





由于每次的打包这样指定入口文件、出口文件夹过于麻烦，此时我们就可以创建一个配置文件夹来解决这个问题。（此处参考这个网页https://www.webpackjs.com/concepts/#entry）

先删除之前的build、dist两个文件夹。此时我们在webpackdemo1文件夹下创建文件``webpack.config.json``,在此处定义5个文件基本概念(entry、output、loader、plugins、mode)。

```json
const {resolve}=require("path") //引入解析路径

module.exports = {
    // 1.指定入口文件
    entry: './src/index.js',

    // 2.指定出口文件
    output: {
        filename: 'bundle.js',  // 输出文件名修改
        path:resolve(__dirname,'build') //输出文件夹修改为build

        // 这样一修改，打包文件就会输出到 ./build/budle.js
    },

    // 3.loader转换定义
    // loader可以将js、json格式以外的文件转换成webpack可以识别的这两种文件
    module: {
        rules: [
            
        ],
    },

    // 4.plugins插件
    // 扩展webpack的loader转换的格式
    plugins: [

    ],

    // 5.mode
    // 分为开发环境development、生产环境production
    mode:'production'

};
```



这样定义好之后，直接打开webpackdemo1的终端，直接输入``webpack``就可以直接进行打包。

![75463617370](一路通关Python全栈开发图片集\1754636173705.png)



打包成功！

![75463627329](一路通关Python全栈开发图片集\1754636273293.png)



总结：我们学习webpack主要就是学习``webpack.config.js``这个文件的书写。后面几节中，还有对这5个配置的其他补充。



## 多入口多出口配置

本届概要：本节将从之前小结的“单入口单出口”，先扩展成“多入口单出口”，再扩展成“多入口多出口”，最后扩展成“多个chunk对应一个bundle的多入口多出口”最终配置。



首先创建两个新文件，作为另外一个出口文件的源代码

![75463702329](一路通关Python全栈开发图片集\1754637023293.png)



我们先配置一个“多入口单出口”的webpack配置。

```json
const {resolve}=require("path")

// 多入口单出口配置
module.exports = {
    // 传入列表，指定多入口
    // 这样打包后会形成单个chunk、单个bundle
    entry: [
        './src/index.js',
        './src/enterA.js'
    ],

    // 此时出口文件配置是一个
    output: {
        filename: 'bundle.js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    plugins: [

    ],

    mode:'production'

};
```

打包后，并运行。此时两个入口文件会依次在出口文件中运行

![75463714022](一路通关Python全栈开发图片集\1754637140229.png)



接着我们进一步拓展写成多入口多出口的写法。entry写成字典形式，output的filname写成变量形式。

```json
const {resolve}=require("path")

// 多入口多出口配置
module.exports = {
    // 多入口的另一种写法，常用于多入口多出口配置
    // 这样打包后会形成多个chunk、多个bundle
    entry:{
        // 写成字典格式，键是入口名，值是入口位置
        first:"./src/index.js",
        second:"./src/enterA.js"
    },

    // 多出口配置
    output: {
        // [name]就是上面入口的键，first、second
        // 即出口文件会变成first.js、second.js。他们都会在build目录下
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    plugins: [

    ],

    mode:'production'

};
```

之后，我们先删除之前的build文件夹。重新执行``webpack``指令，进行打包，之后分别执行first.js、second.js两个包

![75463791155](一路通关Python全栈开发图片集\1754637911558.png)



补充，多个chunk对应一个bundle的多入口多出口配置

```json
const {resolve}=require("path")


module.exports = {
    // 补充，多个chunk对应一个bundle的多入口多出口配置
    entry:{
        first:["./src/index.js","./src/b.js"],  //多个chunk对应一个bundle
        second:"./src/enterA.js"                //一个chunk对应一个bundle
    },

    
    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    plugins: [

    ],

    mode:'production'

};
```



## html的打包与压缩（插件的使用）

html的打包需要下载一个插件（plugins）来解决loader无法打包html文件的情况。

第一步，在webpackdemo1打开终端输入``npm i html-webpack-plugin -D``。

![75464354611](一路通关Python全栈开发图片集\1754643546117.png)

注意：下载解析html的插件时，加上了"-D"会将其添加到package.json中的依赖devDependencies里面,相当于加上“--save-dev”。

![75464379033](一路通关Python全栈开发图片集\1754643790335.png)

第二步，在webpack.config.js中引入该插件。首先获取到插件类，然后在plugins中声明成对象，就完成了。

```json
const {resolve}=require("path")

// 获取到html打包工具类
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/b.js"],
        second:"./src/enterA.js"

        // 引入插件后，就不需要定义html的入口文件
        // 到时候会将上面两个文件打包后，自动放入打包后的index.html中
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    // 下载一个html解析插件
    // npm i html-webpack-plugin -D
    plugins: [
        // 引入插件
        new HtmlWebpackPlugin() //将类声明称对象
        // 此插件会默认将所有的bundle都引入到我的新html打包文件中
    ],

    mode:'production'

};
```

第三步，在终端执行`webpack`进行打包。然后在./build/文件夹中出现first.js、second.js、index.htm。三个文件，他们都是打包压缩好的bundle。

![75464449939](一路通关Python全栈开发图片集\1754644499397.png)

注意：`html-webpack-plugin`这个插件会在打包时默认生成一个空的html文件，默认名字就叫做index.html，并且在这个文件中引入所有被打包好的入口文件，此处就是引入了first.js、second.js。

![75464455491](一路通关Python全栈开发图片集\1754644554912.png)



这样做好之后，就完成了html解析插件的默认打包方式。此外还可以在声明html解析插件对象时，添加一些参数来调整打包功能。此处只是重点介绍三个参数：template、filname、minify。在此之前现在src文件夹下创建test.html文件

```json
const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            // template键对应的值是要打包的哪个html文件，里面引入所有的output文件
            // 若template为空，则生成一个空html文件，同时里面也会引入所有的output文件
            template:"./src/test.html",

            // filename表示输出html文件的名称
            // 若filename为空，则文件名默认为index.html
            filename:"webpackdemo.html",

            minify:{    //压缩参数
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }

        })
    ],

    mode:'production'

};
```

注意：若要打包多个html，则多复制几个这样的对象声明即可



学到这个地方，你是否有疑问：能否有选择性地引入output文件呢？其实是可以的。下面就是示例：

我们接着在src文件夹下创建test2.html文件。之后添加chunks参数，里面传入列表，列表内元素就是entry中声明的键（output文件名称）

```json
const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/test.html",
            filename:"webpackdemo.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }

        }),

        // 打包多个html时，只需要复制多声明几个对象即可
        new HtmlWebpackPlugin({
            template:"./src/test2.html",
            filename:"webpackdemo2.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            },
            // 在chunks参数中引入entry文件中的键，来选择性地引入到时候output的文件
            chunks:['first']
        }),
    ],

    mode:'production'

};
```

运行`webpack`后成功打包

![75464664910](一路通关Python全栈开发图片集\1754646649101.png)



## css的打包与压缩(loader的使用)

webpack的loader支持css的打包与压缩，下面就将讲述它的使用流程。

第一步，在webpackdemo1中打开终端，输入`npm i css-loader style-loader -D`。下载了两个插件，其中css-loader为了可以在js文件中引入css样式，style-loader为了可以与html关联并使得样式生效。(-D能够让这两个库写入package.json的依赖中)

![75465529757](一路通关Python全栈开发图片集\1754655297570.png)

第二步，创建测试文件`style.css`，并在`index.js`中引入该文件

```css
/* style.css */
#s1{
    color: red;
}

h1{
    font-style: italic;
}
```

```javascript
import Greet,{sum} from "./two"
import "./style.css"    //这种写法仅适配webpack(并且下载了特定插件)，一般js文件不建议这样引入

console.log(sum);

console.log(Greet);

console.log("这个是第一个入口，名为index");


```

第三步，书写`webpack.config.js`的module中的内容

```json
	module: {
        // 在此处书写loader
        rules: [
            {test:/\.css$/,use:['style-loader','css-loader']}, //二者顺序不可颠倒

        ],
    },
```

`webpack.config.js`完整版如下:

```json
const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        // 在此处书写loader
        rules: [
            {test:/\.css$/,use:['style-loader','css-loader']}, //二者顺序不可颠倒

        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/test.html",
            filename:"webpackdemo.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }

        }),
        new HtmlWebpackPlugin({
            template:"./src/test2.html",
            filename:"webpackdemo2.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            },
            chunks:['first']
        }),
    ],

    mode:'production'

};
```

第四步，在终端中输入`webpack`后进入webpackdemo.html文件并运行。此处可见，样式引入成功！！！

![75465609185](一路通关Python全栈开发图片集\1754656091858.png)



补充点：此时我们去看webpackdemo.html的源代码发现css文件并没有单独引入，他是裹挟在first.js中一起被引入的，这与传统的前端引入非常不同。如果我们想单独引入css该怎么做呢？

此时我们就需要再次下载一个插件，`npm i mini-css-extract-plugin -D`。

![75465641422](一路通关Python全栈开发图片集\1754656414229.png)

然后在`webpack.config.js`中，

先在哈希表外声明插件类`const MiniCssExtractPlugin=require("mini-css-extract-plugin")`，

再到plugins中写一个插件对象`new MiniCssExtractPlugin()`（这次不用写其他参数，默认构造即可）,

最后在css的loader声明的use列表最前面加上`MiniCssExtractPlugin.loader`。

```json
const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

// 声明单独提取css的插件的类
const MiniCssExtractPlugin=require("mini-css-extract-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            // 加上新插件的loader
            // 为了避免冲突，去掉之前的style-loader
            {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']},
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/test.html",
            filename:"webpackdemo.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }

        }),
        new HtmlWebpackPlugin({
            template:"./src/test2.html",
            filename:"webpackdemo2.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            },
            chunks:['first']
        }),

        // 单独提取css的插件对象
        new MiniCssExtractPlugin()

    ],

    mode:'production'

};
```

运行webpack后，css文件生成成功

![75465709359](一路通关Python全栈开发图片集\1754657093593.png)

在webpackwedemo1.html文件中也成功单独引入了css样式，而不是夹带在js中

![75465719178](一路通关Python全栈开发图片集\1754657191784.png)



引申补充：

1.less的引入

```json
//上面的配置全部不变,先执行 npm i less-loader
//把module中rules列表中再添加一项
{test:/\.less$/,use:[MiniCssExtractPlugin.loader,'less-loader']},
```



## webpack服务器配置

`npm i webpack-dev-server -g`全局安装webpack服务器配置。

安装好之后先删除之前的build文件夹。

之后输入`webpack serve`,然后就会跳出一下内容，我们可以通过`http://localhost:8080/`来访问我们打包的项目。

![75465793419](一路通关Python全栈开发图片集\1754657934194.png)

地址栏中输入`http://localhost:8080/webpackdemo.html`，就可以访问打包好的html。

![75465803976](一路通关Python全栈开发图片集\1754658039767.png)

注意此处的后缀`webpackdemo.html`出自webpack.config.js中的plugin的html解析对象的filename

![75465820758](一路通关Python全栈开发图片集\1754658207583.png)

注意点：这样子启动服务器，它并不会生成build文件夹以及打包后的产物。



接下来我们进入webpack服务器配置。

通过`webpack serve --port 端口号`可以自由控制项目运行的端口号。

也可以通过修改`webpack.config.js`来手动修改服务器配置,在暴露项的最后再添加一个`devServer`在这里书写服务器配置项。

```json
const {resolve}=require("path")

const HtmlWebpackPlugin=require("html-webpack-plugin")

const MiniCssExtractPlugin=require("mini-css-extract-plugin")

module.exports = {
    entry:{
        first:["./src/index.js","./src/B.js"],
        second:"./src/enterA.js"
    },

    output: {
        filename: '[name].js',
        path:resolve(__dirname,'build') 
    },

    module: {
        rules: [
            {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']},
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/test.html",
            filename:"webpackdemo.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }

        }),
        new HtmlWebpackPlugin({
            template:"./src/test2.html",
            filename:"webpackdemo2.html",
            minify:{
                collapseWhitespace:true,
                removeComments:true
            },
            chunks:['first']
        }),
        new MiniCssExtractPlugin()
    ],

    mode:'production',

    // webpack服务器配置
    devServer:{
        port:5500,  //服务器端口号
        compress:true   //是否压缩
    }

};
```



最后，我们添加这个项目的指令。由于每次启动服务器都要输入`webpack serve`十分不美观而且没有统一的那种美感。因此我们就要书写package.json中的script指令。

这里补充一点，`npm run script中的键`就可以相当于运行了键对应的值。比如此处的npm run test就会echo打印后面的字符串，npm run dev 就会运行我们的目标指令webpack serve。

```json
//在package.json的script中添加这样两条
//后面带的mode为强制执行模式
//npm run dev执行webpack服务器的开发模式
//npm run build执行webpack服务器的生产模式
"dev":"webpack serve --mode=development",
"build":"webpack serve --mode=production"
```

完整的webpack.json如下：

```json
{
  "name": "webpackdemo1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack serve --mode=development",
    "build": "webpack serve --mode=production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "css-loader": "^7.1.2",
    "html-webpack-plugin": "^5.6.3",
    "mini-css-extract-plugin": "^2.9.3",
    "style-loader": "^4.0.0"
  }
}
```

此时，我们分别运行`npm run dev`和`npm run build`都可以运行服务器。运行这些指令中可能要求我们下载一些插件，请选择“yes”进行下载































