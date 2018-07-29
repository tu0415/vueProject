<template>
      <div>
            <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!-- 当条件为真时才会渲染, 不然会报一个title 为undefined的错 -->
                    <div v-if="goods.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                    <div class="magnifier-container">
                        <div class="images-cover"></div>
                        <!--当前图片显示容器-->
                        <div class="move-view"></div>
                        <!--跟随鼠标移动的盒子-->
                    </div>
                    <div class="magnifier-assembly">
                        <div class="magnifier-btn">
                            <span class="magnifier-btn-left">&lt;</span>
                            <span class="magnifier-btn-right">&gt;</span>
                        </div>
                        <!--按钮组-->
                        <div class="magnifier-line">
                            <ul class="clearfix animation03">
                                <li v-for="item in goods.imglist" :key="item.id">
                                    <div class="small-img">
                                        <img :src="item.thumb_path" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!--缩略图-->
                    </div>
                    <div class="magnifier-view"></div>
             <!--经过放大的图片显示容器-->
            </div>
            </div>
            <div class="goods-spec">
                    <h1>{{goods.goodsinfo.title}}</h1>
                        <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                        <div class="spec-box">
                            <dl>
                                <dt>货号</dt>
                                <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                            </dl>
                            <dl>
                                <dt>市场价</dt>
                                <dd>
                                    <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                </dd>
                            </dl>
                            <dl>
                                <dt>销售价</dt>
                                <dd>
                                    <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                </dd>
                            </dl>
                        </div>
                        <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model= "buyCount"  :min="1" :max="goods.goodsinfo.stock_quantity" size="small"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy" >
                                                <button  class="buy">立即购买</button>
                                                <button ref="addCart" @click= "addTopShopCart" 
                                                    class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                                <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click= "isShowCommodity=true" href="javascript:;" :class= "{selected:isShowCommodity}" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a :class= "{selected:!isShowCommodity}"  @click= "isShowCommodity=false" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                                </Affix>
                            <div v-show= "isShowCommodity" class="tab-content entry" style="display: block;">
                                <div style="padding:10px" v-html= "goods.goodsinfo.content"></div>
                            </div>
                            <div v-show= "!isShowCommodity" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textAreaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click= "postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if= "commentInfo.totalcount === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for= "item in commentInfo.message" :key= "item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt("YYYY-DD-MM HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change= "handleSizeChange"
                                            @current-change= "handleCurrentChange"
                                            :current-page= "pageIndex"
                                            :page-sizes= "[2, 5, 10, 20]"
                                            :page-size= "pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total= "commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to= "'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to= "'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <!-- 被动画的元素 -->
        <transition  v-on:before-enter="beforeEnter"
                     v-on:enter="enter"
                     v-on:after-enter="afterEnter">
             <div v-show= "isShow" ref="animateRef" v-if= "goods.imglist" class="animateDiv">
                 <img :src= "goods.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* @import "../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css"; */
/* 导入放大镜的css */
@import "../../statics/site/js/jqimgzoom/css/magnifier.css";
.animateDiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
}
.animateDiv img {
    width: 50px;
    height: 50px;
}
</style>

<script>
import "../../statics/site/js/jqimgzoom/js/magnifier.js";
// 按需导入 用到的是Affix
import { Affix } from "iview";

export default {
    data() {
        return {
            // 定义数据模型
            goods: {},
            buyCount: 1, //购买数量 初始值
            isShowCommodity: true, // 是否显示商品介绍
            pageIndex: 1, // 定义页面 默认第一页
            pageSize: 3, // 页容量
            commentList: [], // 评论的内容
            commentInfo: {}, // 评论相关信息
            addOffset: null, // 动画开始的时候top left 值
            shoppingCartCountOffset: null, //动画结束的时候top left 值
            isShow: false
        };
    },
    // 按需加载 注册的组件
    components: {
        // 内部注册的组件,就是goodsinfo.vue的子组件
        Affix
    },
    // 监控路径的变换
    // 点击推荐商品列表 左边相对应的显示
    watch: {
        $route: function(newValue) {
            // console.log(newValue);
            // 监控到路径后重新发送请求
            this.getGoodsData();
            // 调用评论数据
            this.getCommentListData();
        }
    },
    // 调用一个方法
    created() {
        this.getGoodsData();
        this.getCommentListData();
    },
    // 重新渲染完毕后才会调用updated这个方法
    updated() {
        $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
        // 获取按钮的left top值
    },
    // 具体的方法写在method里面
    methods: {
        // 获取商品数据
        getGoodsData() {
            // 获取地址 可以使用模板字符串           带过来的id值  goodsId与main.js中的 路径上的goodsId对应
            const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
            // 发送请求
            this.$axios.get(url).then(res => {
                // console.log(res.data.message);
                this.goods = res.data.message;
                setTimeout(() => {
                    // 获取动画开始时的位置
                    this.addOffset = $(this.$refs.addCart).offset();
                    // console.log(this.addOffset);
                    // 让他图片移动到开始位置
                    $(this.$refs.animateRef).css(this.addOffset);
                    // 获取动画结束时的位置
                    this.shoppingCartCountOffset = $(
                        "#shoppingCartCount"
                    ).offset();
                }, 2000);
            });
        },
        // 分页获取评论
        getCommentListData() {
            const url = `site/comment/getbypage/goods/${
                this.$route.params.goodsId
            }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
            this.$axios.get(url).then(res => {
                // console.log(res.data);
                this.commentInfo = res.data;
            });
        },
        // 分页组件相关的方法
        // 更改了页容量
        handleSizeChange(pageSize) {
            // console.log(pageSize)
            this.pageSize = pageSize;

            this.pageIndex = 1;
        },
        // 更改了页码
        handleCurrentChange(pageIndex) {
            //  console.log(pageIndex)
            this.pageIndex = pageIndex;
            // 重新发送请求
            this.getCommentListData();
        },
        // 提交评论
        postComment() {
            // 获取内容
            // console.log(this.$refs.textAreaRef.value)
            const conent = this.$refs.textAreaRef.value;
            if (conent.trim().length === 0) {
                this.$message({
                    message: "请填写内容",
                    type: "waring"
                });
                return;
            }

            // 发送post请求
            const url = `site/validate/comment/post/goods/${
                this.$route.params.goodsId
            }`;
            //                      参数          内容
            this.$axios.post(url, { commenttxt: conent }).then(res => {
                this.$message({
                    message: "评论成功",
                    type: "success"
                });
                // return;
                // 清空内容
                this.$refs.textAreaRef.value = "";
                //
                // this.postComment()
            });
            this.getCommentListData();
        },
        // 加入购物车
        addTopShopCart() {
            this.isShow = true;
            //调用Vuex的mutations方法
            //载荷就是参数
            const goods = {
                goodsId: this.$route.params.goodsId,
                buyCount: this.buyCount
            };
            this.$store.commit("addGoods", goods);
        },
        beforeEnter: function(el) {
            el.style.top = `${this.addOffset.top}px`;
            el.style.left = `${this.addOffset.left}px`;
            el.style.transfrom = `scale(1)`;
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function(el, done) {
            el.style.transition = "all 1s";

            // 刷新动画帧
            el.offsetWidth;

            // 设置结束位置
            el.style.top = `${this.shoppingCartCountOffset.top}px`;
            el.style.left = `${this.shoppingCartCountOffset.left}px`;
            el.style.transfrom = `scale(1)`;

            done();
        },
        afterEnter: function(el) {
            // ...
            this.isShow = false;
        }
    }
};
</script>
