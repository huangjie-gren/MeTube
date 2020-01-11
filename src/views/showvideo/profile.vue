<template>
  <div>
    <el-card style="height: 150px;">
          <el-row>
            <el-col :span="3">
                <a><img class="user-ava" :src="profile_avatar" @click="goUser()"/></a>
              </el-col>
              <el-col :span="21">
                <el-row style="padding-left: 50px; padding-top: 15px;">
                  <a @click="goUser()">{{ this.profile_nickname }}</a>
                </el-row>
                <el-row style="padding-left: 50px; padding-top: 20px;">
                  <el-button :type="this.button_type" @click="handleFollow" :disabled="this.isDisabled"> {{ this.button_msg }} {{ this.followers }}</el-button>
                </el-row>
              </el-col>
          </el-row>
        </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { showFollowers, unfollow } from '@/api/friendManagement'
import { showActivity } from '@/api/friendManagement'
import { countFollowers } from '@/api/friendManagement'
import { countFollowings } from '@/api/friendManagement'
import { follow } from '@/api/friendManagement'
import { getOwnerInfoByVid } from '@/api/friendManagement'
import { followOrNot } from '@/api/friendManagement'

  export default {
    name: 'Profile',
    props: {
      vid: {
        type: Number,
        default: -1
      }
    },
    computed: {
    ...mapGetters(['id', 'username', 'nickname', 'avatar'])
    },
    data() {
      return{
        profile_uid: 0,
        profile_username: '',
        profile_avatar: '',
        profile_nickname: '',
        button_type: '',
        button_msg: '',
        isDisabled: false,
        followers: 0,
        follow_or_not: 0
      }
    },
    created() {
    this.current_uid = this.$store.getters['id']

    getOwnerInfoByVid(parseInt(this.vid))
      .then(response => {
        const { code } = response
        const { data } = response
        this.profile_nickname = data.nickname
        this.profile_avatar = data.avatar
        this.profile_uid = data.id

        countFollowers(this.profile_uid)
          .then(response => {
            const { code } = response
            const { data } = response
            this.followers = data
        })
        if(this.current_uid == undefined){
          this.button_type = 'warning'
          this.button_msg = '粉丝数'
          this.isDisabled = true
        }else if(this.current_uid == this.profile_uid){
            this.button_type = 'info'
            this.button_msg = '我自己'
            this.isDisabled = true
        } else {
          followOrNot(this.current_uid, this.profile_uid)
          .then(response => {
            const { code } = response
            const { data } = response
            if(data == 0){
              this.follow_or_not = 0
              this.button_type = 'primary'
              this.button_msg = '+ 关注'
            } else{
              this.follow_or_not = 1
              this.button_type = 'info'
              this.button_msg = '已关注'
            }
          })
        }
      })

    },
    methods: {
      goUser() {
        this.$router.push({
          name: 'space',
          query: {
            uid: this.profile_uid,
            uname: this.profile_nickname,
            uavatar: this.profile_avatar
          }
        })
      },
      handleFollow(){
        if(this.follow_or_not == 0){
          this.button_type = 'info'
          this.button_msg = '已关注'
          this.followers += 1
          follow(this.current_uid, this.profile_uid)
        }else{
          this.button_type = 'primary'
          this.button_msg = '+ 关注'
          this.followers -= 1
          unfollow(this.current_uid, this.profile_uid)
        }
        this.follow_or_not = 1 - this.follow_or_not
      }
    }
  }
</script>

<style scoped>
.user-ava {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
</style>
