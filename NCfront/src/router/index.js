import Vue from 'vue'
import Router from 'vue-router'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Proba from '@/components/proba'
import Registration from '@/components/wellcome/registration'
import Wellcome from '@/components/wellcome/wellcome'
import Login from '@/components/wellcome/login'
import Dashboard from '@/components/dashboard/dashboard'
import Magazine from '@/components/dashboard/magazine'
import Profile from '@/components/user/profile'
import Search from '@/components/dashboard/search'

import VueCookie from "vue-cookie";
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/skills',
      name: 'Skills',
      component: Skills
    },
   // {
    //  path: '/about/:name',
      //name: 'about',
     // component: About
    //},
    {
      path: '/users/sign-up',
      name: 'users',
      component: Proba 

    },
    {
      path: '/wellcome',
      name: 'wellcome',
      component: Wellcome 

    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard', 
      component: Dashboard,
      children: [
        { path: 'magazine', component: Magazine},
        { path: 'search', component: Search},
        { path: 'skills', component: Skills},
        { path: 'profile', component: Profile}
      ]
    }


  ]
})