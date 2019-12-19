<template>
<div>
  <p><center><font size="5">全部关注</font></center></p>

  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    class="list-item">
    <el-table-column
      label="Avatar"
      prop="avatar">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" width="%5" class="head_pic"/>
      </template>
    </el-table-column>
    <el-table-column
      label="Name"
      prop="username">
    </el-table-column>
    <el-table-column
      label="Nickname"
      prop="nickname">
    </el-table-column>

    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
import { mapGetters } from "vuex"
/* eslint-disable */
import { showFollowings } from "@/api/test";
import { unfollow } from "@/api/test";
export default {
  computed: {
    ...mapGetters(["username"])
  },
  data() {
    console.log("hahahaha");
    return {
        msg: "",
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://metube-backend.oss-cn-beijing.aliyuncs.com/IMG_5726%2820190616-124344%29.jpg",
        sizeList: ["large", "medium", "small"],
        tableData: ""
        
      };  
  },
  created() {
    //alert(this.$store.getters["username"]);
    // showFollowings(this.$store.getters["username"])
    showFollowings(4)
      .then(response => {
        const { code } = response;
        const { data } = response;
        this.tableData = data;
        // 必须带this
        
        // const { id } = a;
        // alert(id);
        

        // const{ id } = data;
        // const { username } = data;
        // const { nickname } = data;
        // const { avatar } = data;
        this.msg = code;
      })
      .catch(error => {
        alert("created error");
      });
  },
  methods: {
    onClick() {
      
    },
    handleEdit(index, row) {
        console.log(index, row.data);
      },

    handleDelete(index, row) {
      console.log(index, row);
      unfollow(4, row.id)
      .then(response => {
        const { code } = response;
        const { data } = response;
        this.tableData = data;// 必须带this
        
        this.msg = code;
      })
      .catch(error => {
        alert("created error");
      });
    }
  }
};
</script>

<style>
  .list-item img {
    border-radius: 60px;
    width: 60px;
    height: 60px;
  }
  .el-row {
    margin-bottom: 10px;
    /* &:last-child {
      margin-bottom: 0;
    } */
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
  .grid-content {
    border-radius: 4px;
    min-height: 72px;
    /* min-height: 36px; */
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
