<template>
  <div>
    <el-row class="b-head">
      <span class="results" v-text="total" />
      <span>评论</span>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="按热度排序" name="hotSort">
          <el-row v-for="comment in comments" :key="comment.Comment.id">
            <div class="user-face">
              <a>
                <img :src="comment.User.avatar" alt="" class="comment_user_avatar" @click="goUser(comment.User)">
              </a>
            </div>
            <div class="con">
              <el-row class="user">
                <a @click="goUser(comment.User)">
                  {{ comment.User.nickname }}
                </a>
              </el-row>
              <el-row class="text">
                {{ comment.Comment.content }}
              </el-row>
              <el-row class="info">
                <span>
                  {{ convertTimeFormat(comment.Comment.comment_time) }}
                </span>
                <span title="点赞" class="like" @click="handleCommentLike(comment)">
                  <svg-icon v-if="comment.like" :id="'like-comment-'+comment.Comment.id" icon-class="like-on" />
                  <svg-icon v-else :id="'like-comment-'+comment.Comment.id" icon-class="like-off" />
                  {{ comment.like_count }}
                </span>
                <span class="btn-hover" @click="ShowReplyArea(comment.Comment.id, null)">
                  回复
                </span>
                <div class="operation">
                  <a v-if="comment.User.id === loginUserId" @click="removeComment(comment.Comment.id)">删除评论</a>
                </div>
              </el-row>
              <div>
                <el-row v-for="reply in comment.UserReplies" :key="reply.Reply.id" class="reply-item">
                  <el-row>
                    <a class="reply-face" style="top: 0">
                      <img :src="reply.SendUser.avatar" alt class="reply_user_avatar">
                    </a>
                    <span class="text-con">
                      <a class="name" @click="goUser(reply.SendUser)">{{ reply.SendUser.nickname }}</a>
                      <span v-if="reply.Reply.level === 1">
                        回复
                        <a @click="goUser(reply.RecvUser)">@{{ reply.RecvUser.nickname }}</a>
                      </span>
                      {{ reply.Reply.content }}
                    </span>
                  </el-row>
                  <el-row>
                    <div class="info">
                      <span>
                        {{ convertTimeFormat(reply.Reply.reply_time) }}
                      </span>
                      <span title="点赞" class="like" @click="handleReplyLike(reply)">
                        <svg-icon v-if="reply.like" :id="'like-reply-'+reply.Reply.id" icon-class="like-on" />
                        <svg-icon v-else :id="'like-reply-'+reply.Reply.id" icon-class="like-off" />
                        {{ reply.like_count }}
                      </span>
                      <span class="btn-hover" @click="ShowReplyArea(comment.Comment.id, reply.SendUser)">
                        回复
                      </span>
                      <div class="operation">
                        <a v-if="reply.SendUser.id === loginUserId" @click="removeReply(reply.Reply.id)">删除评论</a>
                      </div>
                    </div>
                  </el-row>
                </el-row>
                <el-row :id="'reply-area-'+comment.Comment.id" class="comment-send" hidden>
                  <div>
                    <img :src="avatar_url" alt class="user-face">
                  </div>
                  <div class="text-container">
                    <textarea :id="'reply-text' + sortType" style="width: 100%" cols="60" name="msg" rows="5" :placeholder="replyPlaceholder" />
                    <button type="submit" class="comment-submit" @click="PostReply(comment)">发表评论</button>
                  </div>
                </el-row>
              </div>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="按时间排序" name="timeSort">
          <el-row v-for="comment in comments" :key="comment.Comment.id">
            <div class="user-face">
              <a>
                <img :src="comment.User.avatar" alt="" class="comment_user_avatar" @click="goUser(comment.User)">
              </a>
            </div>
            <div class="con">
              <el-row class="user">
                <a @click="goUser(comment.User)">
                  {{ comment.User.nickname }}
                </a>
              </el-row>
              <el-row class="text">
                {{ comment.Comment.content }}
              </el-row>
              <el-row class="info">
                <span>
                  {{ convertTimeFormat(comment.Comment.comment_time) }}
                </span>
                <span title="点赞" class="like" @click="handleCommentLike(comment)">
                  <svg-icon v-if="comment.like" :id="'like-comment-'+comment.Comment.id" icon-class="like-on" />
                  <svg-icon v-else :id="'like-comment-'+comment.Comment.id" icon-class="like-off" />
                  {{ comment.like_count }}
                </span>
                <span class="btn-hover" @click="ShowReplyArea(comment.Comment.id, null)">
                  回复
                </span>
                <div class="operation">
                  <a v-if="comment.User.id === loginUserId" @click="removeComment(comment.Comment.id)">删除评论</a>
                </div>
              </el-row>
              <div>
                <el-row v-for="reply in comment.UserReplies" :key="reply.Reply.id" class="reply-item">
                  <el-row>
                    <a class="reply-face" style="top: 0">
                      <img :src="reply.SendUser.avatar" alt class="reply_user_avatar">
                    </a>
                    <span class="text-con">
                      <a class="name" @click="goUser(reply.SendUser)">{{ reply.SendUser.nickname }}</a>
                      <span v-if="reply.Reply.level === 1">
                        回复
                        <a @click="goUser(reply.RecvUser)">@{{ reply.RecvUser.nickname }}</a>
                      </span>
                      {{ reply.Reply.content }}
                    </span>
                  </el-row>
                  <el-row>
                    <div class="info">
                      <span>
                        {{ convertTimeFormat(reply.Reply.reply_time) }}
                      </span>
                      <span title="点赞" class="like" @click="handleReplyLike(reply)">
                        <svg-icon v-if="reply.like" :id="'like-reply-'+reply.Reply.id" icon-class="like-on" />
                        <svg-icon v-else :id="'like-reply-'+reply.Reply.id" icon-class="like-off" />
                        {{ reply.like_count }}
                      </span>
                      <span class="btn-hover" @click="ShowReplyArea(comment.Comment.id, reply.SendUser)">
                        回复
                      </span>
                      <div class="operation">
                        <a v-if="reply.SendUser.id === loginUserId" @click="removeReply(reply.Reply.id)">删除评论</a>
                      </div>
                    </div>
                  </el-row>
                </el-row>
                <el-row :id="'reply-area-'+comment.Comment.id" class="comment-send" hidden>
                  <div>
                    <img :src="avatar_url" alt class="user-face">
                  </div>
                  <div class="text-container">
                    <textarea :id="'reply-text' + sortType" style="width: 100%" cols="60" name="msg" rows="5" :placeholder="replyPlaceholder" />
                    <button type="submit" class="comment-submit" @click="PostReply(comment)">发表评论</button>
                  </div>
                </el-row>
              </div>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :page-size="limit"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <el-row class="comment-send">
      <div>
        <img :src="avatar_url" alt class="user-face">
      </div>
      <div class="text-container">
        <textarea id="comment-text" style="width: 100%" cols="60" name="msg" rows="5" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" />
        <button type="submit" class="comment-submit" @click="PostComment">发表评论</button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { addReply, getVideoComments, replyLike, commentLike, removeAComment, removeAReply } from '../../api/video'
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
      limit: 3,
      total: 0,
      sortType: 0,
      avatar_url: '',
      repliedUser: {},
      replyPlaceholder: '',
      level: 0,
      loginUserId: 0
    }
  },
  computed: {
    ...mapGetters(['username', 'nickname', 'id', 'avatar'])
  },
  created() {
    this.avatar_url = this.$store.getters['avatar']
    this.loginUserId = this.$store.getters['id']
    getVideoComments({
      'user_id': this.loginUserId,
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
    handleCommentLike(comment) {
      const data = {
        'user_id': this.loginUserId,
        'comment_id': comment.Comment.id,
        'flag': true
      }
      if (!comment.like) {
        comment.like = true
        comment.like_count = comment.like_count + 1
        // document.getElementById('like-comment-' + comment.Comment.id).setAttribute('title', '取消点赞')
        // document.getElementById('like-comment-' + comment.Comment.id).setAttribute('icon-class', 'like-on')
        commentLike(data)
          .then(res => {
            console.log(res.msg)
          }).catch(error => {
            alert(error)
          })
      } else {
        data.flag = false
        comment.like = false
        comment.like_count = comment.like_count - 1
        // document.getElementById('like-comment-' + comment.Comment.id).setAttribute('title', '点赞')
        // document.getElementById('like-comment-' + comment.Comment.id).setAttribute('icon-class', 'like-off')
        commentLike(data)
          .then(res => {
            console.log(res.msg)
          }).catch(error => {
            alert(error)
          })
      }
    },
    handleReplyLike(reply) {
      const data = {
        'user_id': this.loginUserId,
        'reply_id': reply.Reply.id,
        'flag': true
      }
      if (!reply.like) {
        reply.like = true
        reply.like_count = reply.like_count + 1
        // document.getElementById('like-reply-' + reply.Reply.id).setAttribute('title', '取消点赞')
        // document.getElementById('like-reply-' + reply.Reply.id).setAttribute('icon-class', 'like-on')
        replyLike(data)
          .then(res => {
            console.log(res.msg)
          }).catch(error => {
            alert(error)
          })
      } else {
        data.flag = false
        reply.like = false
        reply.like_count = reply.like_count - 1
        // document.getElementById('like-reply-' + reply.Reply.id).setAttribute('title', '点赞')
        // document.getElementById('like-reply-' + reply.Reply.id).setAttribute('icon-class', 'like-off')
        replyLike(data)
          .then(res => {
            console.log(res.msg)
          }).catch(error => {
            alert(error)
          })
      }
    },
    handleCurrentChange(val) {
      this.start = val
      getVideoComments({
        'user_id': this.loginUserId,
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
    handleTabClick(tab, event) {
      console.log(this.activeName)
      if (this.activeName === 'timeSort') {
        this.sortType = 1
      } else if (this.activeName === 'hotSort') {
        this.sortType = 0
      }
      getVideoComments({
        'user_id': this.loginUserId,
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
    PostComment() {
      const data = {
        'video_id': parseInt(this.vid),
        'user_id': this.$store.getters['id'],
        'content': document.getElementById('comment-text').value
      }
      console.log(data)
      addVideoComment(data).then(res => {
        alert(res.msg)
        location.reload()
      })
    },
    PostReply(comment) {
      const data = {
        'comment_id': comment.Comment.id,
        'send_user_id': this.$store.getters['id'],
        'recv_user_id': comment.User.id,
        'content': document.getElementById('reply-text' + this.sortType).value,
        'level': this.level
      }
      if (this.level === 1) {
        data.recv_user_id = this.repliedUser.id
      }
      addReply(data).then(res => {
        alert(res.msg)
        location.reload()
      })
    },
    ShowReplyArea(comment_id, recv_user) {
      if (recv_user == null) {
        this.replyPlaceholder = '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。'
        this.level = 0
      } else {
        this.replyPlaceholder = '回复 ' + recv_user.nickname + ' :'
        this.level = 1
      }
      this.repliedUser = recv_user
      document.getElementById('reply-area-' + comment_id).hidden = false
    },
    goUser(user) {
      console.log('跳转到的用户ID：' + user.id)
      this.$router.push({
        name: 'space',
        query: {
          uid: user.id,
          uname: user.nickname,
          uavatar: user.avatar
        }
      })
    },
    removeComment(id) {
      const data = {
        'id': id
      }
      removeAComment(data)
        .then(res => {
          alert(res.msg)
          location.reload()
        }).catch(err => {
          alert(err)
        })
    },
    removeReply(id) {
      const data = {
        'id': id
      }
      removeAReply(data)
        .then(res => {
          alert(res.msg)
          location.reload()
        }).catch(err => {
          alert(err)
        })
    },
    convertTimeFormat(t) {
      t = t.split('T')[0] + ' ' + (t.split('T')[1]).split('+')[0];
      return t;
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
    /*font-size: 12px;*/
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
    /*width: 18px;*/
    float: right;
    /*margin-top: 5px;*/
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
  .name {
    position: relative;
    top: -1px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    /*display: block;*/
    word-wrap: break-word;
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
