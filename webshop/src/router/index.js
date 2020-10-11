import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./../pages/Home/Home');
const Search = () => import('./../pages/Search/Search.vue')
const Goods = () => import('./../pages/Goods/Goods')
const Login = () => import('./../pages/Login/Login')
const AdminLogin = () => import('./../pages/AdminLogin/AdminLogin')
const Admin = () => import('./../pages/Admin/Admin.vue')
const ShopCar = () => import('./../pages/ShopCar/ShopCar.vue')
const Me = () => import('./../pages/Me/Me.vue')
const Profile = () => import('./../pages/Me/children/Profile.vue')
const Update = () => import('./../pages/Me/children/Update.vue')
const EditPhone = () => import('./../pages/Me/children/EditPhone.vue')
const EditPwd = () => import('./../pages/Me/children/EditPwd.vue')
const Sales = () => import('./../pages/Me/children/Sales.vue')
const AdminGoods = () => import('./../pages/Admin/children/AdminGoods.vue')
const AdminUpdate = () => import('./../pages/Admin/children/AdminUpdate.vue')
const AddGoods = () => import('./../pages/Admin/children/AddGoods.vue')
const AdminUsers = () => import('./../pages/Admin/children/AdminUsers.vue')
const AdminSales = () => import('./../pages/Admin/children/AdminSales.vue')
const SearchDetial = () => import('./../pages/SearchDetial/SearchDetial.vue')

Vue.use(Router)
//解决路由重复问题
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象上的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
      path: '/home',
      component: Home,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/searchdetail',
      component: SearchDetial,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true
      }
    },
    {
      path: '/me',
      component: Me,
      children: [{
          path: '/me/profile',
          component: Profile
        },
        {
          path: '/me',
          redirect: '/me/profile'
        },
        {
          path: '/me/update',
          component: Update
        },
        {
          path: '/me/editphone',
          component: EditPhone
        },
        {
          path: '/me/editpwd',
          component: EditPwd
        },
        {
          path: '/me/sales',
          component: Sales
        }
      ]
    },
    {
      path: '/shopcar',
      component: ShopCar
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search/:id/:pageNo',
      component: Search,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: true
      }
    },
    {
      path: '/goods/:id',
      component: Goods,
      meta: {
        showHeaderTop: true,
        showHeaderSearch: false
      }
    },
    {
      path: '/adminlogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      component: Admin,
      children: [{
          path: '/admin/admingoods',
          component: AdminGoods
        },
        {
          path: '/admin/adminupdate',
          component: AdminUpdate
        },
        {
          path: '/admin/addgoods',
          component: AddGoods
        },
        {
          path: '/admin/adminusers',
          component: AdminUsers
        },
        {
          path: '/admin/adminsales',
          component: AdminSales
        }
      ]
    }
  ]
})
