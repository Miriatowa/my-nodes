# 前端学习之webpack打包工具

## 1、webpack简介

webpack是一种前端资源构建工具，一个静态模块打包器。在webpack看来，前端的所有资源文件都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的而静态资源

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f8040833-b067-4f14-836a-a9837f7dab99/288a798b-4da9-47a7-8c76-a1783eac8bbc.png)

## 2、webpack五个核心

#### 2.1 Entry

**入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

#### 2.2 Output

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*，以及如何命名这些文件，默认值为 `./dist`。

```js
const path = require('path');
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

#### 2.3 Loader

*loader* 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://www.webpackjs.com/concepts/modules)，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

```javascript
const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

```

#### 2.4 Plugins

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```



#### 2.5 Mode

Mode指示webpack使用模式的配置

| 选项        | 描述                                                         | 特点                       |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| development | 会将process.env.NODE_ENV的值设为development。启用NamedChunksPlugin和NamedModulesPlugin | 能让代码本地调试运行的环境 |
| production  | 会将process.env.NODE_ ENV的值设为production。启用FlagDependencyUsagePlugin,FlagIncludedChunksPlugin,ModuleConcatenationPlugin, NoEmitOnErrorsPlugin,OccurrenceOrderPlugin, SideEffectsFlagPlugin和UglifyJsPlugin. | 能让代码优化上线环境       |

```javascript
module.exports = {
  mode: 'production'
};
```

## 3、打包css样式资源

```javascript
const config ={
    module: {
        rules: [
            {
                test: /\.css$/,
                //use数组中的loader执行顺序：从左到右，从上到下，依次执行
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }，
            //配置less
            {
              test: /\.less$/,
              use: [
            	 'style-loader',
                 'css-loader',
            	 'less-loader'
        ]
            }
            
        ]
    }
}
```

## 4、打包html资源

```javascript
const HtmlWepackPlugin = require('html-wepack-plugin')
const config ={
    plugin: [
    	//功能：默认创建一个空的HTML，自动引入打包输出的所有资源
    	new HtmlWebpackPlugin({template: './src/index.html'})
    ]
}
```

## 5、打包图片资源

```javascript
const config ={
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
                //图片大小小于8kb，就会被base64处理
                //优点：减少请求数量
                //缺点：图片体积会更大
                limit: 8 * 1024，
                name: '[hash:10].[ext]',
                //关闭es6模块化
                esModule: false
            }
        },
        {
            //处理html中的img资源
            test: /\.html$/,
            loader: 'html-loader'
        }
        ]
    }
}
```

## 6、打包其它资源

```javascript
const config ={
	//打包其它资源
    module: {
        rules: [{
           //排除css/js/html
           exclude: /\.(css|js|html)$/,
           loader: 'file-loader'
        }]
    }
}
```

## 7、自动编译devServer

```javascript
const config ={
	devServer: {
		contentBase: reslove(__dirname, 'build'),
		//启动gzip压缩
		compress: true,
		//端口号
		port: 3000,
		//自动打开浏览器
		open: true
	}
}
```

