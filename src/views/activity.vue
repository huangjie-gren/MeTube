<template>
  <div>
    <!-- <p>目前还没有动态</p>
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>

<el-row>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="16">
    <el-input v-model="input" placeholder="有什么想和大家分享的？" type="textarea" rows=5 class="core-style"></el-input>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<el-row type="flex" justify="center">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-button type="primary">发布</el-button>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>

<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>


    <el-input v-model="input" placeholder="有什么想和大家分享的？" type="textarea" rows=5 ></el-input>
    
    <el-row height="500px">
      <el-col :span="3"><div class="grid-content"><i class="el-icon-edit"></i></div></el-col>
      <el-col :span="17"><div class="grid-content"></div></el-col>
      <el-col :span="3"></el-col>
      <el-col :span="3"><el-button type="primary" class="toolbar">发布</el-button></el-col>
    </el-row>

    <el-row>

    </el-row>
  </el-main>
  <el-aside width="200px">Aside</el-aside>
    </el-container>-->

    <el-row gutter="20">
      <el-col :span="5">
        <el-row>
          <img :src="logopath" class="user-pic" />
        </el-row>
      </el-col>

  
    
      <el-col :span="14" style="background-color: gray">
        <el-row class="section-block">
          <el-row class="core-style">
            <el-input v-model="input" placeholder="有什么想和大家分享的？" type="textarea" rows=5 ></el-input>

          </el-row>
          <el-row class="toolbar">
            <el-button type="primary" class="publish-btn">发布</el-button>
          </el-row>
        </el-row>

        <el-row v-for="dongtai in dongtais" :key="dongtai.id">
          <el-card>
            <el-row style="width: 100%; height: 50px;">

              <el-col :span="3">
                <img class="user-ava" :src="logopath" />
              </el-col>

              <el-col :span="21">
                <el-row>
                  究极铁憨憨
                </el-row>
                <el-row>
                  <font size="2" color="gray">发布于30分钟前</font>
                </el-row>
              </el-col>


            </el-row>
            <el-row style="width: 100%; height: 200px; padding-left: 60px;">
              <p>嘿嘿嘿</p>
              <img :src="logopath" class="user-pic" />
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // logopath: require("@/assets/logo.png"),
      logopath: 'https://metube-backend.oss-cn-beijing.aliyuncs.com/upload/f13e3e48-eea4-44a7-9e10-6ee840eb2eeb.jpg',
      input: "",
      dongtais: [
        {
          id: 1,
          msg: "aaa"
        },
        {
          id: 1,
          msg: "aaa"
        },
        {
          id: 1,
          msg: "aaa"
        }
      ]
    };
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
  width: 80%;
  height: 150px;
  background: center/cover no-repeat;
}
.section-block {
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
