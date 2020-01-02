<template>
  <div>
  
    <el-row gutter="20">
      <el-col :span="2"><div style="background: white"></div></el-col>
      <el-col :span="5">
        <el-card style="height: 200px;">
          <el-row>
            <!-- <img :src="logopath" class="user-ava" /> -->
            <el-col :span="3">
                <img class="user-ava" :src="this.avatar" />
              </el-col>

              <el-col :span="21">
                <el-row style="padding-left: 50px; padding-top: 5px;">
                  {{ this.nickname }}
                </el-row>
                <el-row style="padding-left: 50px; padding-top: 0px; color: gray">
                  {{ this.username }}
                </el-row>
                <el-row style="padding-left: 50px; padding-top: 20px;">
                  <p>粉丝&nbsp;&nbsp;&nbsp;&nbsp; {{ this.followers }}</p>
                  <p>关注&nbsp;&nbsp;&nbsp;&nbsp; {{ this.followings }}</p>
                </el-row>
              </el-col>
          </el-row>
        </el-card>
      </el-col>

  
    
      <el-col :span="14" style="background-color: white; padding: 0px;">
        

        <el-row v-for="dongtai in dongtais" :key="dongtai.id">
          <el-card style="height: 400px;">
            <el-row style="width: 100%; height: 50px;">

              <el-col :span="3">
                <img class="user-ava" :src="logopath" />
              </el-col>

              <el-col :span="21">
                <el-row>
                  {{ dongtai.username }}
                </el-row>
                <el-row>
                  <font size="2" color="gray">{{ dongtai.release_time }}</font>
                </el-row>
              </el-col>


            </el-row>
            <el-row style="width: 100%; height: 200px; padding-left: 90px;">
              <p style="margin: 10px;">{{ dongtai.title }}</p>
              <a :href="dongtai.url"><img :src="dongtai.avatar" class="user-pic" /></a>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { showFollowers } from '@/api/friendManagement'
import { showActivity } from '@/api/friendManagement'
import { countFollowers } from '@/api/friendManagement'
import { countFollowings } from '@/api/friendManagement'


export default {
  computed: {
    ...mapGetters(['id', 'username', 'nickname', 'avatar'])
  },
  data() {
    return {
      logopath: 'https://metube-backend.oss-cn-beijing.aliyuncs.com/upload/f13e3e48-eea4-44a7-9e10-6ee840eb2eeb.jpg',
      input: "",
      dongtais: '',
      username: '',
      avatar: '',
      followers: '',
      followings: '',
      uid: 1,
      nickname: '',
    };
  },
  created(){
    this.uid = this.$store.getters['id']
    this.username = this.$store.getters['username']
    this.nickname = this.$store.getters['nickname']
    this.avatar = this.$store.getters['avatar']

    // if(this.uid == undefined){
    //   alert('请先登录！')
    //   this.href()
    // }
    if(this.uid == undefined){
       this.uid = 1
    }


    showActivity(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.dongtais = data   // 必须带this
      })

      countFollowers(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.followers = data
      })

      countFollowings(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.followings = data
      })

  },
  methods: {
    href(){
        this.$router.push({ path:'/login'})
      }
  }
};
</script>



<style scoped>
.user-ava {
  /* display: block; */
  border-radius: 50%;
  /* position: absolute;*/
  width: 48px;
  height: 48px;
  /* top: 24px;
    left: 24px; */
  /* background-size: cover;
    background-position: center center;
    background-repeat: no-repeat; */
}
.el-card {
  width: 100%;
  height: 310px;
  padding-top: 0px;
  /* margin-left: 88px; */
  /* "width: 100%; height: 310px; padding-top: 0px;" */
}
.publish-btn {
  margin-right: 0px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.toolbar {
  margin-top: 8px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.core-style {
  width: 100%;
  min-height: 76px;
  max-height: 300px;
  letter-spacing: 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px 12px;
  overflow: auto;
  white-space: pre-wrap;
  color: #222;
  background-color: #e5e9ef;
  font-size: 14px;
  vertical-align: baseline;
  outline: none;
  border: 1px solid transparent;
  line-height: 22px;
  border-radius: 4px;
  word-break: break-all;
}
.editor[data-v-db227d08] {
  position: relative;
}
.placeholder-shown[data-v-db227d08]::before {
  content: attr(placeholder);
  color: #555;
  position: absolute;
  top: 5px;
  left: 13px;
  pointer-events: none;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 1px;
}
.list-item img {
  border-radius: 60px;
  width: 60px;
  height: 60px;
}
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 400px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 800px;
}
.user-pic {
  width: 70%;
  height: 250px;
  background: center/cover no-repeat;
}
.section-block {
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
