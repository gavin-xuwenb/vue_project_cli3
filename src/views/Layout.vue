<template>
  <div>
    <el-container>
      <el-header style="height:56px;padding:0 0;">
        <HeaderBar></HeaderBar>
      </el-header>
      <el-container>
				<!--
        <el-aside width="200px">
          <my-menu-side></my-menu-side>
        </el-aside>
				-->
        <el-main>
          <router-view ref="appmain" :key="this.$store.state.timestamps"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
//import MyMenuSide from './MyMenuSide.vue'
export default {
  components: {
    HeaderBar
    /*MyMenuSide*/
  },
  data () {
    return {
    }
  },
  methods: {
    // reload () {
    //   if (this.$refs.appmain.reload) {
    //     this.$refs.appmain.reload()
    //   }
    // }
  },
  updated: function () {
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 40px;
}
.el-main {
	color: #333;
}

body > .el-container {
  margin-bottom: 40px;
  background:#FFFFFF;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
