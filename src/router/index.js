import Vue from 'vue'
import VueRouter from 'vue-router'

import stitchClient from '@/mongoDBServices'

import Account from '@/components/account/Account'
import AccountBilling from '@/components/account/Billing'

import AppDocuments from '@/components/app/Documents'
import AppEditor from '@/components/app/Editor'

import AuthConfirmEmail from '@/components/auth/ConfirmEmail'
import AuthForgotPassword from '@/components/auth/ForgotPassword'
import AuthResendConfirmation from '@/components/auth/ResendConfirmation'
import AuthResetPassword from '@/components/auth/ResetPassword'
import AuthSignIn from '@/components/auth/SignIn'
import AuthSignUp from '@/components/auth/SignUp'

import SiteAbout from '@/components/site/About'
import SiteExamples from '@/components/site/Examples'
import SiteFAQ from '@/components/site/FAQ'
import SiteGuide from '@/components/site/Guide'
import SiteLandingPage from '@/components/site/LandingPage'
import SitePricing from '@/components/site/Pricing'
import SitePrivacyPolicy from '@/components/site/PrivacyPolicy'
import SiteTermsOfService from '@/components/site/TermsOfService'

import NotFound from '@/components/404'
import UnauthorizedAccess from '@/components/401'

Vue.use(VueRouter)

var routesAccount = [
  {
    path: '/my-account',
    component: Account,
    redirect: '/my-account/billing',
    children: [
      {
        path: 'billing',
        component: AccountBilling,
        meta: { requiresAuth: true }
      }
    ]
  }
]

var routesApp = [
  {
    path: '/app/editor',
    component: AppEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/app/editor/:documentId',
    component: AppEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/app/editor/new/:templateRef',
    component: AppEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/app/my-documents',
    component: AppDocuments,
    meta: { requiresAuth: true }
  }
]

var routesAuth = [
  {
    path: '/auth/confirm-email',
    component: AuthConfirmEmail
  },
  {
    path: '/auth/forgot-password',
    component: AuthForgotPassword
  },
  {
    path: '/auth/resend-confirmation',
    component: AuthResendConfirmation
  },
  {
    path: '/auth/reset-password',
    component: AuthResetPassword
  },
  {
    path: '/auth/sign-in',
    component: AuthSignIn
  },
  {
    path: '/auth/signed-out',
    component: AuthSignIn
  },
  {
    path: '/auth/sign-up',
    component: AuthSignUp
  }
]

var routesSite = [
  {
    path: '/',
    component: SiteLandingPage
  },
  {
    path: '/401',
    component: UnauthorizedAccess
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/about',
    component: SiteAbout
  },
  {
    path: '/examples',
    component: SiteExamples
  },
  {
    path: '/frequently-asked-questions',
    component: SiteFAQ
  },
  {
    path: '/guide',
    component: SiteGuide
  },
  {
    path: '/pricing',
    component: SitePricing
  },
  {
    path: '/privacy-policy',
    component: SitePrivacyPolicy
  },
  {
    path: '/terms-of-service',
    component: SiteTermsOfService
  },
  {
    path: '*',
    redirect: '/404'
  }
]

var router = new VueRouter({
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  mode: 'history',
  routes: routesAccount.concat(routesApp).concat(routesAuth).concat(routesSite)
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (stitchClient.authedId()) {
      next()
    } else {
      next('/auth/sign-in')
    }
  } else {
    next()
  }

  // Collapse the nav menu on mobile on page load
  var navButton = document.getElementById('navbar-burger')
  var navMenu = document.getElementById('navbar-menu')

  if (navButton && navMenu) {
    if (navButton.hasClass('is-active')) {
      navButton.removeClass('is-active')
    }

    if (navMenu.hasClass('is-active')) {
      navMenu.removeClass('is-active')
    }
  }

  window.scrollTo(0, 0)
})

export default router
