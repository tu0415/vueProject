import Vue from "vue";
import VueRouter from "vue-router";
import moment from "moment";
import ElementUI from "element-ui";
import VueLazyload from "vue-lazyload"; //引入这个懒加载插件
// import iView from 'iview'; // 悬停效果插件
import Vuex from 'vuex'

//集成中间件/插件【注意：必须是基于Vue的】
Vue.use(VueRouter); //Vue.prototype.$route  {{this.$route.params.goodsId}}获取带过去的ID值
Vue.use(ElementUI);
// 懒加载
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: 'dist/error.png',
    loading: require("./statics/site/images/01.gif"),
    attempt: 1
});
Vue.use(Vuex)
// 引入悬停效果中间件(注册)
//   Vue.use(iView);
// 导入根组件
import App from "./App.vue";

//导入全局样式
import "./statics/site/css/style.css";

// 引入element-ui样式
import "element-ui/lib/theme-chalk/index.css";

//过滤器相关
Vue.filter("dateFmt", (input, formatStr = "YYYY-MM-DD") => {
    return moment(input).format(formatStr);
});

//导入axios
import axios from "axios";
axios.defaults.baseURL = "http://47.106.148.205:8899/";
Vue.prototype.$axios = axios;

// 路由相关
// 默认导入 ，如果 goodslist加了 {}，就称之为按需导入
import goodslist from "./compontents/goods/goodslist.vue"; //
import shopcart from "./compontents/shopcart/shopcart.vue";
import goodsinfo from "./compontents/goods/goodsinfo.vue";

const router = new VueRouter({
    routes: [
        { path: "/", redirect: "/goodslist" },
        { path: "/goodslist", component: goodslist },
        { path: "/shopcart", component: shopcart },
        { path: "/goodsinfo/:goodsId", component: goodsinfo }
    ]
});

// 该对象中写的是核心模块
const store = new Vuex.Store({
    // state: {
    //   todos: [
    //     { id: 1, text: '...', done: true },
    //     { id: 2, text: '...', done: false }
    //   ]
    // },
    // getters: {
    //   doneTodos: state => {
    //     return state.todos.filter(todo => todo.done)
    //   }
    // }
});

new Vue({
    el: "#app",
    router,
    store,
    render: function(createElement) {
        return createElement(App);
    }
});
