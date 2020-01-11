<template>
<div>

  <p><center><font size="5">全部关注</font></center></p>

  <el-table
    :data="tableData.filter(data => !search || 
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.nickname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    class="list-item">
    <el-table-column align="center" label="Avatar" prop="avatar">
      <template slot-scope="scope">
        <a><img :src="scope.row.avatar" width="%5" class="head_pic" @click="goUser(scope.row)"/></a>
      </template>
    </el-table-column>
    <el-table-column align="center" label="Name" prop="username"> </el-table-column>
    <el-table-column align="center" label="Nickname" prop="nickname"> </el-table-column>
    <el-table-column align="center">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Unfollow</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { showFollowings } from '@/api/friendManagement'
import { unfollow } from '@/api/friendManagement'

export default {
  computed: {
    ...mapGetters(['username'])
  },
  data() {
    return {
      tableData: '',
      search: '',
      uid: 1,
    }
  },
  created() {
    this.uid = this.$store.getters['id']

    showFollowings(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.tableData = data
      })
  },
  methods: {
    goUser(user) {
        this.$router.push({
          name: 'space',
          query: {
            uid: user.id,
            uname: user.nickname,
            uavatar: user.avatar
          }
        })
      },
    handleDelete(index, row) {
      unfollow(this.uid, row.id)
      .then(response => {
        const { code } = response
        const { data } = response
        this.tableData = data
      })
    }
  }
}
</script>

<style>
  .list-item img {
    border-radius: 60px;
    width: 60px;
    height: 60px;
  }
</style>