import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import User from '../views/user/User'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/home',
    component: Home,
    meta: {
      name: '应用管理',
      // id: "1",
      iconclass: "el-icon-user-solid"
    },
    redirect: "/home/user",
    children: [
      {
        path: "/home/user",
        component: User,
        meta: { name: "用户管理", }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

const originVueRouter = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, onComplete, onAbort) {
  return originVueRouter.call(this, location, () => { })
}

router.beforeEach((to, from, next) => {

  if (to.path === '/login') {
    if (sessionStorage.getItem('username')) {
      router.push('/home/statics')
    } else {
      next()
    }
    return;
  }


  if (sessionStorage.getItem('username')) {
    next()
  } else {
    router.push('/login')
  }

})

router.afterEach((to, from) => {
  console.log('aftereach:', to)
  console.log(this);
  Store.commit('SET_MENU_ACTIVE', to.meta.id)
})

export default router
