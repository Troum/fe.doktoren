import {createRouter, createWebHistory} from 'vue-router'
import Authentication from "@/router/middleware/authentication"
import Animation from "@/router/middleware/animation";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    redirect: 'dashboard',
    meta: {
      authenticated: false
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
          authenticated: false
        }
      }
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: {
      authenticated: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'doctors',
        name: 'doctors.index',
        component: () => import('@/views/entities/doctors/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'doctors/create',
        name: 'doctors.create',
        component: () => import('@/views/entities/doctors/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'doctors/edit/:id',
        name: 'doctors.edit',
        component: () => import('@/views/entities/doctors/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'centers',
        name: 'centers.index',
        component: () => import('@/views/entities/centers/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'centers/create',
        name: 'centers.create',
        component: () => import('@/views/entities/centers/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'centers/edit/:id',
        name: 'centers.edit',
        component: () => import('@/views/entities/centers/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specialities',
        name: 'specialities.index',
        component: () => import('@/views/entities/specialities/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specialities/create',
        name: 'specialities.create',
        component: () => import('@/views/entities/specialities/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specialities/edit/:id',
        name: 'specialities.edit',
        component: () => import('@/views/entities/specialities/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'cities',
        name: 'cities.index',
        component: () => import('@/views/entities/cities/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'cities/create',
        name: 'cities.create',
        component: () => import('@/views/entities/cities/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'cities/edit/:id',
        name: 'cities.edit',
        component: () => import('@/views/entities/cities/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'countries',
        name: 'countries.index',
        component: () => import('@/views/entities/countries/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'countries/create',
        name: 'countries.create',
        component: () => import('@/views/entities/countries/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'countries/edit/:id',
        name: 'countries.edit',
        component: () => import('@/views/entities/countries/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'positions',
        name: 'positions.index',
        component: () => import('@/views/entities/positions/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'positions/create',
        name: 'positions.create',
        component: () => import('@/views/entities/positions/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'positions/edit/:id',
        name: 'positions.edit',
        component: () => import('@/views/entities/positions/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'universities',
        name: 'universities.index',
        component: () => import('@/views/entities/universities/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'universities/create',
        name: 'universities.create',
        component: () => import('@/views/entities/universities/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'universities/edit/:id',
        name: 'universities.edit',
        component: () => import('@/views/entities/universities/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'types',
        name: 'types.index',
        component: () => import('@/views/entities/types/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'types/create',
        name: 'types.create',
        component: () => import('@/views/entities/types/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'types/edit/:id',
        name: 'types.edit',
        component: () => import('@/views/entities/types/edit.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specializations',
        name: 'specializations.index',
        component: () => import('@/views/entities/specializations/index.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specializations/create',
        name: 'specializations.create',
        component: () => import('@/views/entities/specializations/create.vue'),
        meta: {
          authenticated: true
        },
      },
      {
        path: 'specializations/edit/:id',
        name: 'specializations.edit',
        component: () => import('@/views/entities/specializations/edit.vue'),
        meta: {
          authenticated: true
        },
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(Authentication)
router.afterEach(Animation)

export default router
