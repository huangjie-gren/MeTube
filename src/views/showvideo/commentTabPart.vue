<template>
  <div>
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
            <a v-if="comment.User.id === loginUser.id" @click="removeComment(comment.Comment.id)">删除评论</a>
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
                  <a v-if="reply.SendUser.id === loginUser.id" @click="removeReply(reply.Reply.id)">删除评论</a>
                </div>
              </div>
            </el-row>
          </el-row>
          <el-row :id="'more-reply-' + sortTypeName + '-' + comment.Comment.id" class="view-more" v-if="comment.reply_count > foldLimit">
            共{{ comment.reply_count }}条回复，
            <a class="btn-more" @click="showOnePageReply(comment)">点击查看</a>
          </el-row>
          <el-row :id="'reply-page-' + sortTypeName + '-' + comment.Comment.id" hidden>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :page-size="limit"
                :total="comment.reply_count"
                @current-change="handleCurrentChange($event, comment)"
              />
            </div>
          </el-row>
          <el-row :id="'reply-area-' + sortTypeName + '-' + comment.Comment.id" class="comment-send" hidden>
            <div>
              <img :src="loginUser.avatar" alt class="user-face">
            </div>
            <div class="text-container">
              <textarea :id="'reply-text-' + sortTypeName + '-' + comment.Comment.id" style="width: 100%" cols="60" name="msg" rows="5" :placeholder="replyPlaceholder"></textarea>
              <button type="submit" class="comment-submit" @click="PostReply(comment)">发表评论</button>
            </div>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { replyLike, commentLike, removeAComment, removeAReply, addReply, getReplies } from '../../api/video'
  export default {
    name: 'commentTabPart',
    props: {
      sortTypeName: {
        type: String,
        default: ""
      },
      comments: {
        type: Array,
        default: () => {
          return[]
        }
      },
      loginUser: {
        type: Object,
        default: () => ({})
      },
      islogin: {
        type: Boolean,
        default : false
      }
    },
    data() {
      return {
        lastCommentId: -1,
        level: 0,
        replyPlaceholder: '',
        repliedUser: {},
        foldLimit: 3,
        limit: 5,
      }
    },
    methods: {
      handleCurrentChange(val, comment) {
        console.log(val)
        console.log(comment.Comment.id)
        getReplies({
          'user_id': this.loginUser.id,
          'start': val,
          'limit': this.limit,
          'comment_id': comment.Comment.id
        }).then(res => {
          comment.UserReplies = res.data.UserReplies
          comment.reply_count = res.data.total
        }).catch(error => {
          alert(error)
        })
      },
      handleCommentLike(comment) {
        if(!this.islogin) {
          this.$router.push('/login');
          return;
        }
        const data = {
          'user_id': this.loginUser.id,
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
        if(!this.islogin) {
          this.$router.push('/login');
          return;
        }
        const data = {
          'user_id': this.loginUser.id,
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
      PostReply(comment) {
        if(!this.islogin) {
          this.$router.push('/login');
          return;
        }
        const textAreaId = 'reply-text-' + this.sortTypeName + '-' + comment.Comment.id;
        console.log(textAreaId);
        const data = {
          'comment_id': comment.Comment.id,
          'send_user_id': this.$store.getters['id'],
          'recv_user_id': comment.User.id,
          'content': document.getElementById(textAreaId).value,
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
        if(this.lastCommentId !== -1) document.getElementById('reply-area-' + this.sortTypeName + '-' + this.lastCommentId).hidden = true;
        if (recv_user == null) {
          this.replyPlaceholder = '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。'
          this.level = 0
        } else {
          this.replyPlaceholder = '回复 ' + recv_user.nickname + ' :'
          this.level = 1
        }
        this.repliedUser = recv_user;
        document.getElementById('reply-area-' + this.sortTypeName + '-' + comment_id).hidden = false;
        this.lastCommentId = comment_id;
      },
      showOnePageReply(comment) {
        if(comment.reply_count > this.limit) document.getElementById('reply-page-' + this.sortTypeName + "-" + comment.Comment.id).hidden = false;
        getReplies({
          'user_id': this.loginUser.id,
          'start': 0,
          'limit': this.limit,
          'comment_id': comment.Comment.id
        }).then(res => {
          comment.UserReplies = res.data.UserReplies
          comment.reply_count = res.data.total
        }).catch(error => {
          alert(error)
        })
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
  .text {
    font-size: 14px;
  }

  .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    /*border-top: 1px solid #e5e9ef;*/
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
  .view-more {
    font-size: 12px;
    color: #6d757a;
  }
  .btn-more {
    padding: 2px 3px;
    border-radius: 4px;
  }
</style>
