<template>
  <div>
    <el-row class="b-head">
      <span class="results" v-text="total"></span>
      <span>评论</span>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="按热度排序" name="hotSort">
          <commentTabPart :comments="comments" sortTypeName="hotSort" :loginUser="loginUser" :islogin="islogin"></commentTabPart>
        </el-tab-pane>
        <el-tab-pane label="按时间排序" name="timeSort">
          <commentTabPart :comments="comments" sortTypeName="timeSort" :loginUser="loginUser" :islogin="islogin"></commentTabPart>
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
        <img :src="loginUser.avatar" alt class="user-face">
      </div>
      <div class="text-container">
        <textarea id="comment-text" style="width: 100%" cols="60" name="msg" rows="5" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></textarea>
        <button type="submit" class="comment-submit" @click="PostComment">发表评论</button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getVideoComments } from '../../api/video'
import { addVideoComment } from '../../api/video'
import { mapGetters } from 'vuex'
import { getToken} from '../../utils/auth'
import CommentTabPart from './commentTabPart'

export default {
  name: 'Comment',
  components: { CommentTabPart },
  props: {
    vid: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      activeName: 'hotSort',
      comments: [],
      start: 1,
      limit: 5,
      total: 0,
      sortType: 0,
      loginUser: {
        id: -1,
        avatar: '',
        nickname: ''
      },
      islogin: getToken() == "" || getToken() == undefined ? false : true,
      reply_start: 0,
      reply_fold_limit: 3
    }
  },
  computed: {
    ...mapGetters(['nickname', 'id', 'avatar'])
  },
  created() {
    if(this.islogin) {
      this.loginUser.avatar = this.$store.getters['avatar'];
      this.loginUser.id = this.$store.getters['id'];
    } else {
      this.loginUser.avatar = "https://metube-backend.oss-cn-beijing.aliyuncs.com/true.jpeg";
    }
    getVideoComments({
      'user_id': this.loginUser.id,
      'start': this.start,
      'limit': this.limit,
      'sort_type': this.sortType,
      'video_id': parseInt(this.vid),
      'reply_start': this.reply_start,
      'reply_fold_limit': this.reply_fold_limit
    }).then(res => {
      this.comments = res.data.comments
      this.total = res.data.total
      // console.log(this.total)
    }).catch(error => {
      alert(error)
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.start = val
      getVideoComments({
        'user_id': this.loginUser.id,
        'start': this.start,
        'limit': this.limit,
        'sort_type': this.sortType,
        'video_id': this.vid,
        'reply_start': this.reply_start,
        'reply_fold_limit': this.reply_fold_limit
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
        'user_id': this.loginUser.id,
        'start': this.start,
        'limit': this.limit,
        'sort_type': this.sortType,
        'video_id': parseInt(this.vid),
        'reply_start': this.reply_start,
        'reply_fold_limit': this.reply_fold_limit
      }).then(res => {
        this.comments = res.data.comments
        this.total = res.data.total
        console.log(this.total)
      }).catch(error => {
        alert(error)
      })
    },
    PostComment() {
      if(!this.islogin) {
        this.$router.push('/login');
        return;
      }
      const data = {
        'video_id': this.vid,
        'user_id': this.loginUser.id,
        'content': document.getElementById('comment-text').value
      }
      // console.log(data)
      addVideoComment(data).then(res => {
        alert(res.msg)
        location.reload()
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
