import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import')

Vue.use(VueRouter)

// 防止点击重复路由时控制台报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const routes = [
{ 
	path: '/',
	redirect: '/login'
},
{
	path: '/login',
	name: 'Login',
	component: _import('Login'),
	meta: {
	  requireAuth: false
	}
},
{ 
	path: '/404',
	component: _import('404'),
	meta: {
		requireAuth: false
	}
},
{ 
	path: '/layout',
	component: _import('Layout'),
	children: [{
		path: '404',
		component: _import('404')
	},{
		path: 'userManage',
		component: _import('userManage/UserManage')
	},{
		path: 'deviceManage',
		component: _import('deviceManage/DeviceMain')
	},{
		path: 'reportQuery',
		component: _import('reportQuery/ReportMain')
	},{
		path: 'systemManage',
		component: _import('systemManage/SystemMain')
		// children: [{
		// 	path: 'timeReset',
		// 	component: _import('systemManage/TimeReset')
		// },{
		// 	path: 'remoteOpenDoor',
		// 	component: _import('systemManage/RemoteOpenDoor')
		// },{
		// 	path: 'orderTest',
		// 	component: _import('systemManage/OrderTest')
		// }]
	},{
		path: 'authManage',
		component: _import('authManage/AuthMain')
	}],
	meta: {
		requireAuth: true
	}
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if (document.querySelector('.el-container')) {
		document.querySelector('.el-container').scrollTop = 0
	}
  
	if (to.path === '/login') {
		next()
	} else {
		if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
			// 如果是一次登录长期（不关闭浏览器窗口）有效 ，则使用getToken() 进行登录判断
			// 这里不能使用 this.$store.state 组件还没挂载 ，而因该用router.app.$store
			if (sessionStorage.getItem('token')) {
				next()
			} else {
				next({
				  path: '/login',
				  query: {
					redirect: to.fullPath
				  } // 将跳转的路由path作为参数，登录成功后跳转到该路由
				})
			}
		} else {
		    next()
		}
	}
})

export default router
