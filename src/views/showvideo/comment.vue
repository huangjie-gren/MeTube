<template>
  <div>
    <el-row class="b-head">
      <span class="results" v-text="total"></span>
      <span>评论</span>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="按热度排序" name="hotSort">
          <el-row v-for="comment in comments" :key="comment.Comment.id">
            <div class="user-face">
              <a href="#">
                <img :src="comment.User.avatar" alt="" class="comment_user_avatar">
              </a>
            </div>
            <div class="con">
              <el-row class="user">
                {{ comment.User.nickname }}
              </el-row>
              <el-row class="text">
                {{ comment.Comment.content }}
              </el-row>
              <el-row class="info">
                <span>
                  {{ comment.Comment.comment_time }}
                </span>
                <span class="like">
                  <i></i>
                  {{ comment.Comment.like_count }}
                </span>
                <span class="btn-hover">
                  回复
                </span>
                <div class="operation">
                  <div class="spot"></div>
                </div>
              </el-row>
              <div>
                <el-row v-for="reply in comment.UserReplies" :key="reply.Reply.id" class="reply-item">
                  <a class="reply-face" style="top: 0">
                    <img :src="reply.SendUser.avatar" alt>
                  </a>
                  <div class="reply-con">
                    <div class="user">
                      <a class="name" href="#"></a>
                      <span class="text-con">
                        回复
                        <a href="#">@{{ reply.RecvUser.nickname }}</a>
                        {{ reply.Reply.content }}
                      </span>
                    </div>
                  </div>
                  <div class="info">
                    <span>
                      {{ reply.Reply.reply_time }}
                    </span>
                    <span class="like">
                      <i></i>
                      {{ reply.Reply.like_count }}
                    </span>
                    <span class="btn-hover">
                      回复
                    </span>
                    <div class="operation">
                      <div class="spot"></div>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="按时间排序" name="timeSort">按时间排序</el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <div class="block">
        <span class="demonstration">页数较少时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </el-row>
    <el-row class="comment-send">
      <div>
        <img :src="avatar_url" alt class="user-face">
      </div>
      <div class="text-container">
        <textarea id="comment-area" style="width: 100%" cols="60" name="msg" rows="5" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></textarea>
        <button type="submit" class="comment-submit" @click="PostComment">发表评论</button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getVideoComments } from '../../api/video'
import { addVideoComment } from '../../api/video'
import { mapGetters } from 'vuex'
export default {
  name: 'Comment',
  props: {
    vid: {
      type: String,
      default: '-1'
    }
  },
  data() {
    return {
      activeName: 'hotSort',
      comments: [],
      start: 0,
      limit: 6,
      total: 0,
      sortType: 0,
      avatar_url: ''
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'id', 'avatar'])
  },
  created() {
    this.avatar_url = this.$store.getters['avatar']
    getVideoComments({
      'start': this.start,
      'limit': this.limit,
      'sort_type': this.sortType,
      'video_id': parseInt(this.vid)
    }).then(res => {
      this.comments = res.data.comments
      this.total = res.data.total
      console.log(this.total)
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(this.activeName)
      console.log(tab, event)
      // getVideoComments(this.start, this.limit, this.sortType, this.vid).then(res => {
      //   this.comments = res.data.comments
      //   this.total = res.data.total
      // })
    },
    PostComment() {
      alert('点！')
      const data = {
        'video_id': parseInt(this.vid),
        'user_id': this.$store.getters['id'],
        'content': document.getElementById('comment-area').value
      }
      console.log(data)
      addVideoComment(data).then(res => {
        alert(res.msg)
      })
    }
  }
}
</script>

<style scoped>
  .b-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;
  }
  .results {
    margin-right: 10px;
  }
  .bb-comment {
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    font-size: 0;
    zoom: 1;
    min-height: 100px;
    background: #fff;
  }
  .comment-head {
    margin: 0 0 24px;
    border-bottom: 1px solid #e5e9ef;
  }
  .tabs-order {
    float: left;
    margin-bottom: -1px;
  }
  .header_page {
    float: right;
    line-height: 36px;
  }
  .paging-box {
    font-size: 12px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .comment_list {
    padding-top: 20px;
  }
  .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    /*border-top: 1px solid #e5e9ef;*/
  }
  .user_face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
  }
  .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
  }
  .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word
  }
  .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
  }
  .like {
    cursor: pointer;
  }
  .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
  }
  .operation {
    position: relative;
    width: 18px;
    float: right;
    margin-top: 5px;
    margin-right: 0;
  }
  .spot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    /*TODO:替换一下图片*/
    /*background: url() no-repeat;*/
    background-position: -151px -280px;
  }
  .comment_user_avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .reply_user_avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .reply-item {
    padding: 10px 0;
  }
  .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
  }
  .reply-con {
    display: inline-block;
    width: calc(100% - 34px);
  }
  .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
  }
  .name {
    position: relative;
    top: -1px;
  }
  .text-con {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }
  .comment-send {
    margin: 10px 0;
  }
  .user-face {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    float: left;
    margin: 7px 0 0 5px;
    position: relative;
  }
  .text-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
  }
  .comment-submit {
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: .1s;
    user-select: none;
    outline: none;
  }
</style>
