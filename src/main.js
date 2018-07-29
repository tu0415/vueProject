import Vue from "vue";
import VueRouter from "vue-router";
import moment from "moment";
import ElementUI from "element-ui";
import VueLazyload from "vue-lazyload"; //引入这个懒加载插件
// import iView from 'iview'; // 悬停效果插件
import Vuex from "vuex";
// import Distpicker from 'v-distpicker'


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
Vue.use(Vuex); // Vue.prototype.$store


// Vue.component('v-distpicker', Distpicker)
// 引入悬停效果中间件(注册)
//   Vue.use(iView);
// 导入根组件
import App from "./App.vue";

//导入全局样式
import "./statics/site/css/style.css";

// 引入element-ui样式
import "element-ui/lib/theme-chalk/index.css";
import "./statics/site/css/style.css";

//过滤器相关
Vue.filter("dateFmt", (input, formatStr = "YYYY-MM-DD") => {
    return moment(input).format(formatStr);
});

//导入axios
import axios from "axios";
axios.defaults.baseURL = "http://47.106.148.205:8899/";
axios.defaults.withCredentials = true; // 允许携带cookie
Vue.prototype.$axios = axios;

// 路由相关
// 默认导入 ，如果 goodslist加了 {}，就称之为按需导入
import goodslist from "./compontents/goods/goodslist.vue"; //
import shopcart from "./compontents/shopcart/shopcart.vue";
import goodsinfo from "./compontents/goods/goodsinfo.vue";
import order from "./compontents/order/order.vue";
import login from "./compontents/account/login.vue";
import payOrder from "./compontents/pay/payOrder.vue";

const router = new VueRouter({
    routes: [
        { path: "/", redirect: "/goodslist" },
        { path: "/goodslist", component: goodslist },
        { path: "/shopcart", component: shopcart },
        { path: "/goodsinfo/:goodsId", component: goodsinfo },
        { path: "/login/", component: login },
        { path: "/order/:ids", component: order }, //这种传参，我们称之为params
        { path: "/order", component: order, meta: { needLogin: true } },
        { path: "/pay", component: payOrder, meta: { needLogin: true } },
    ]
});
 
// 导航守卫
router.beforeEach((to, from, next) => {
    // ...
    // console.log(to)
    // 
    if(to.fullPath != '/login') {
        localStorage.setItem("toVisitPath",to.fullPath)
    }
    if(to.meta.needLogin) { // 判断登录
        // 判断是否登录过 如果登录过 直接next()
        // 如果没有登录过 去登录
        axios.get(`site/account/islogin`).then(res=>{
            // console.log(res)
            if(res.data.code === "nologin") { // 为登录
                router.push("/login")
            } else { // 已登录
                next()
            }
        })
    }else {

        next()
    }
});

// 该对象中写的是核心模块
// 按需导入 加大括号
import {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoodsById
} from "./common/localStorage";
const store = new Vuex.Store({
    state: {
        newBuyCount: getTotalCount()
    },
    getters: {
        getBuyCount(state) {
            return state.newBuyCount;
        }
        // getLocalGoods(state){
        //     return getLocalGoods()
        // }
    },
    mutations: {
        /**
         * 新增商品
         *
         * @param {*} state 指的就是核心概念state，必须是第一个参数
         * @param {*} goods 载荷
         */
        addGoods(state, goods) {
            state.newBuyCount = addLocalGoods(goods);
        },
        /**
         * 修改商品
         *
         * @param {*} state 指的就是核心概念state，必须是第一个参数
         * @param {*} goods 载荷
         */
        updateGoods(state, goods) {
            state.newBuyCount = updateLocalGoods(goods);
        },
        /**
         * 删除商品
         *
         * @param {*} state 指的就是核心概念state，必须是第一个参数
         * @param {*} goods 载荷
         */
        deleteGoodsById(state, goodsId) {
            state.newBuyCount = deleteLocalGoodsById(goodsId);
        }
    }
});

new Vue({
    el: "#app",
    router,
    store,
    render: function(createElement) {
        return createElement(App);
    }
});
