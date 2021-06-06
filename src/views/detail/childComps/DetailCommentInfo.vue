<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="commentinfo-header">
      <div class="commentheader-title">用户评价</div>
      <div class="commentheader-more">
        更多
        <i class="commentarrow-right"></i>
      </div>
    </div>
    <div class="commentinfo-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="commentinfo-detail">
      <p>{{commentInfo.content}}</p>
      <div class="commentinfo-other">
        <span class="commentdate">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="commentinfo-imgs">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      showDate(value){
        // 1.将时间戳转成 Date 对象
        const date = new Date(value * 1000)
        // 2.将 date 进行格式化(使用别人封装好的插件)
        return formatDate(date, "yyyy-MM-dd hh:mm:ss")
      }
    }
  }
</script>

<style>
  .comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .commentinfo-header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .commentheader-title{
    float: left;
    font-size: 15px;
  }

  .commentheader-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .commentinfo-user{
    padding: 10px 0 5px;
  }

  .commentinfo-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .commentinfo-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .commentinfo-detail{
    padding: 0 5px 15px;
  }

  .commentinfo-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .commentinfo-detail .commentinfo-other{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .commentinfo-other .commentdate{
    margin-right: 8px;
  }

  .commentinfo-imgs{
    margin-top: 10px;
  }

  .commentinfo-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>