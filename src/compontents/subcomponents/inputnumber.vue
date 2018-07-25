<template>
    <div>
        <div class="left">-</div>
        <div class="num">{{count}}</div>
        <div class="right">+</div>
    </div>
</template>

<style scoped>
.left,
.num,
.right {
    display: inline-block;
    width: 30px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid #d3d3d3;
}
</style>


<script>
export default {
    props: {
        initCont: {
            type: Number,
            // required: true,
             default: 100
        }
    },

    data() {
        return {
            count: 1
        };
    },
    created() {
        console.log(this.initCont);
    }
};
</script>

