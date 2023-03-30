import { Router } from 'vue-router';

export const useNprogress = (router: Router) => {
  router.beforeEach((to, from, next) => {
    // NProgress.start()
    next();
  });

  router.afterEach(() => {
    // NProgress.done()
  });
};

export const useTitle = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const title = to.meta.title || import.meta.env.VITE_APP_TITLE;
    const subtitle = import.meta.env.VITE_APP_SUBTITLE;
    document.title = `${title} | ${subtitle}`
    next();
  });
};

export const useAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
    }
    next();
  });
};