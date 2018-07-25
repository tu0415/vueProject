#### vue项目搭建

    项目打开方式 npm run dev 
    
    1. 创建一个项目的根目录
        item 
        | src 项目的源代码目录
            | main.js  项目的入口文件
            | App.vue  根组件  项目启动后看到的第一个组件
        | package.json 项目配置文件
        | webpack.config.dev.js 项目开发阶段的配置文件
        
    2. 运行命令(依次)
    
     npm init -y  配置文件
     
     cnpm i vue -S  渲染vue 即跟组件
     
     cnpm i vue-loader css-loader style-loader vue-template-compiler -D 相关依赖包
     
     cnpm i webpack-dev-server@2.11.2 webpack@3.12.0 -D 开发阶段打包
     
     cnpm i html-webpack-plugin -D   打包生成了bundle.js之后，运行bundle.js
     
     cnpm i vuex -S 建一个空白仓库 存放核心模块
     
      直接新建一个空白项目
        
      vue init webpack-simple vue_project   (vue_project 文件名称)

#### 
        
        
    