<template>
  <div>
    <el-card style="height: 150px;">
          <el-row>
            <!-- <img :src="logopath" class="user-ava" /> -->
            <el-col :span="3">
                <img class="user-ava" :src="avatar" />
              </el-col>

              <el-col :span="21">
                <el-row style="padding-left: 50px; padding-top: 15px;">
                  {{ this.username }}
                </el-row>
                <el-row style="padding-left: 50px; padding-top: 20px;">
                  <el-button :disabled="this.button_disabled" :type="this.button_type" @click="handleFollow"> {{ this.button_msg }} {{ this.followers }}</el-button>
                </el-row>
              </el-col>
          </el-row>
        </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { showFollowers } from '@/api/friendManagement'
import { showActivity } from '@/api/friendManagement'
import { countFollowers } from '@/api/friendManagement'
import { countFollowings } from '@/api/friendManagement'
import { follow } from '@/api/friendManagement'

  export default {
    name: 'Profile',
    computed: {
    ...mapGetters(['id', 'username', 'nickname', 'avatar'])
  },
    data() {
      return{
        uid: '',
        username: '',
        avatar: '',
        button_type: 'primary',
        button_msg: '+ 关注',
        button_disabled: false,
        followers: '',
      }

    },
    created() {
    this.uid = this.$store.getters['id']
    this.username = this.$store.getters['username']
    this.nickname = this.$store.getters['nickname']
    this.avatar = this.$store.getters['avatar']
    if(this.uid == undefined){
      this.uid = -1
    }

      countFollowers(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.followers = data
      })
      .catch(error => {
        alert('countFollowers')
      })

    },
    methods: {
      handleFollow(){
        this.button_type = 'info'
        this.button_disabled = true
        this.button_msg = '已关注'
        this.followers += 1

        follow(this.id, 4) // 这里的id从哪里来
      }
    }
  }
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
</style>
