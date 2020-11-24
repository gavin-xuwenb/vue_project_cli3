<template>
	<div>
		<div id="nav-1">
			<ul class="nav">
				<li class="slide1"></li>
				<li class="slide2"></li>
				<li><a class="active" href="javascript:void(0);" @click="userManage">人员管理</a></li>
				<li><a href="javascript:void(0);" @click="deviceManage">设备管理</a></li>
				<li><a href="javascript:void(0);" @click="authManage">权限管理</a></li>
				<li><a href="javascript:void(0);" @click="reportQuery">报表查询</a></li>
				<li><a href="javascript:void(0);" @click="systemManage">系统管理</a></li>
			</ul>	
		</div>
		<div class="header_right">
		  <span>welcome,{{userName}}</span>
		  <a class="login-out" @click="logout">退出</a>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	name: 'HeaderBar',
	data () {
		return {
			userName:''
		}
	},
    computed: {
		
    },
	methods: {
		userManage () {
			this.$router.push('/layout/userManage')
		},
		deviceManage () {
			this.$router.push('/layout/deviceManage')
		},
		authManage () {
			this.$router.push('/layout/authManage')
		},
		reportQuery () {
			this.$router.push('/layout/reportQuery')
		},
		systemManage () {
			this.$router.push('/layout/systemManage')
		},
	  logout () {
	    let that = this
	    //that.$store.dispatch('userLoginOut', { isLogin: false, token: '', userName: '' }).then(() => {
	      // location.reload() // 为了重新实例化vue-router对象 避免bug
	      window.sessionStorage.clear()
	      that.$router.push('/login')
	    //})
	  },
	  setFn () {
	  }
	},
    mounted () {
		this.userName = sessionStorage.getItem('token')
		$("#nav-1 a").on("click", function() {
		    var position = $(this)
		        .parent()
		        .position();
		    var width = $(this)
		        .parent()
		        .width();
		    $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
		});
		
		$("#nav-1 a").on("mouseover", function() {
		    var position = $(this)
		        .parent()
		        .position();
		    var width = $(this)
		        .parent()
		        .width();
		    $("#nav-1 .slide2")
		        .css({
		            opacity: 1,
		            left: +position.left,
		            width: width
		        })
		        .addClass("squeeze");
		});
		
		$("#nav-1 a").on("mouseout", function() {
		    $("#nav-1 .slide2")
		        .css({ opacity: 0 })
		        .removeClass("squeeze");
		});
		
		var currentWidth = $("#nav-1 .nav")
		    .find(".active")
		    .parent("li")
		    .width();
		var current = $(".nav .active").position();
		$("#nav-1 .slide1").css({ left: +current.left, width: currentWidth });
		
		this.$router.replace('/layout/userManage')
    }
}
</script>
<style scoped >
#nav-1 {
	border: 1px solid #e8dddd;
	border-top: 3px solid #ff8500;
} 
#nav-1 .nav {
	width: 570px;
	margin: 0 auto;
  position: relative;
  border: none;
  display: flex;
  list-style: none;
  background: #f5f5f5;
  padding: 1px;
}
#nav-1 .nav li {
  margin: 0px;
}
#nav-1 .nav li a {
  position: relative;
  padding: 0.4em 2em;
  font-size: 14px;
  border: none;
  color: #333;
  display: inline-block;
  text-decoration: none;
	text-align: center;
  z-index: 3;
}
#nav-1 .nav li a:hover {
  color: #FF8500;
}
#nav-1 .slide1,
#nav-1 .slide2 {
  position: absolute;
  display: inline-block;
  height: 3em;
  border-radius: 10em;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1.05);
}
#nav-1 .nav .slide1 {
  background-color: #569fe8;
  z-index: 2;
}
#nav-1 .nav .slide2 {
  opacity: 0;
  background: #fff;
  border: 1px solid #8ab9ff;
  z-index: 1;
}

.squeeze {
  transition: all 1.5s;
  -webkit-transform: scale(0.9);
          transform: scale(0.9);
}

.header_right {
	position: relative;
	float:right;
	margin-top: -47px;
	margin-right: 10px;
	text-align: center;
}

.header_right a{
	width: 60px;
	height: 20px;
	line-height: 20px;
	margin-left: 10px;
	display: inline-block;
	text-decoration: none;
	background-color: #8AB9FF;
	cursor: pointer;
	border-radius:15px;
	border-style: solid;
	border-color: #13E8E9;
}
.header_right a:hover{
	background-color: #B3C0D1;
	color: red;
}
</style>
