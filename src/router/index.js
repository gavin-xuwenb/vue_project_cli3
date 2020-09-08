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
	component: _import('Login')
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
		path: 'specialFunc',
		component: _import('specialFunc/SpecialMain')
	},{
		path: 'systemManage',
		component: _import('systemManage/SystemMain')
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

export default router
