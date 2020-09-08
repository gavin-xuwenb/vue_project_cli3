<template>
<div class="main">
<el-row class="tac">
    <el-col :span="24" >
        <el-menu style="min-height:600px;text-align:left"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="2" @click="userManage">
              <i class="el-icon-user-solid"></i>
              <span slot="title">人员管理</span>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-s-platform"></i>
              <span slot="title">设备管理</span>
          </el-menu-item>
					<el-menu-item index="4">
					    <i class="el-icon-lock"></i>
					    <span slot="title">权限管理</span>
					</el-menu-item>
					<el-menu-item index="5">
					    <i class="el-icon-s-grid"></i>
					    <span slot="title">特殊功能</span>
					</el-menu-item>
					<el-menu-item index="6">
					    <i class="el-icon-setting"></i>
					    <span slot="title">系统管理</span>
					</el-menu-item>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>VUE语法示例</span>
            </template>
            <el-menu-item index="4-1-1" @click="dynamicRouter">动态路由</el-menu-item>
            <el-menu-item index="4-1-3" @click="todoFn">TodoList</el-menu-item>
            <el-menu-item index="4-1-2" @click="renderFn">slot(插槽)</el-menu-item>
          </el-submenu>
        </el-menu>
    </el-col>
</el-row>
</div>
</template>
<script>
export default {
  name: 'MyMenuSide',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    userManage () {
      console.log('用户管理')
      // replace 和 push 的区别，replace在history 里面不会产生多余的path
      // this.$store.commit('refreshTime') // 刷新时间戳
      // console.log('timestamps==>' + this.$store.state.timestamps)
      this.$router.replace('/layout/userManage')
    },
    dynamicRouter () {
      console.log('动态路由')
      this.$router.replace('/layout/dynamicComponent')
    },
    todoFn () {
      console.log('todoList')
      this.$router.replace('/layout/todoList')
    },
    renderFn () {
      console.log('renderFunction')
      this.$router.replace('/layout/renderFunction')
    }
  }
}
</script>
<style>
.main{
  background:#FFFFFF;;
}
</style>
