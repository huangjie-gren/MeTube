<template>
  <div class="app-container">
     <el-table
       :data="videoList"
       style="width:100%"
     >
     <el-table-column align="center" label="我的视频" width="150">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
     </el-table-column>

     <el-table-column
       prop="name"
       width="180"
     >
     </el-table-column>
    <el-table-column class-name="status-col"  width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.url"><div class=""><router-link :to="scope.row.url">删除</router-link></div></el-tag>
        </template>
    </el-table-column>
     </el-table>
  </div>

</template>



<script>
  export default {
    data() {
      return {
        videoList: [{
          name:'video1',
          img:'',
          url:"/"
        },{
          name:'video2',
          img:'',
          url:"/"
        },{
          name:'video3',
          img:'',
          url:"/"
        }]
      }
    }
  }
</script>
