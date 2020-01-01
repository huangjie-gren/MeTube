<template>
<div>
  <p><center><font size="5">我的粉丝</font></center></p>

  <el-table
    :data="tableData.filter(data => !search || 
      data.username.toLowerCase().includes(search.toLowerCase()) ||
      data.nickname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    class="list-item">
    <el-table-column label="Avatar" prop="avatar">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" width="%5" class="head_pic"/>
      </template>
    </el-table-column>

    <el-table-column label="Name" prop="username">
    </el-table-column>

    <el-table-column label="Nickname" prop="nickname">
    </el-table-column>

    <el-table-column align="right">
      <template slot="header" slot-scope="scope"> <!--  -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { showFollowers } from '@/api/friendManagement'
import { unfollow } from '@/api/friendManagement'

export default {
  computed: {
    ...mapGetters(['id'])
  },
  data() {
    return {
      uid:'',
      tableData: '',
      search: ''
    }
  },
  created() {
    this.uid = this.$store.getters['id']
    showFollowers(this.uid)
      .then(response => {
        const { code } = response
        const { data } = response
        this.tableData = data   // 必须带this
      })
      .catch(error => {
        alert('created error')
      })
  },
  methods: {
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
