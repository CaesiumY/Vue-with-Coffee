import Vue from "vue";
import Router from "vue-router";
import PostListPage from "@/pages/PostListPage";
import PostViewPage from "@/pages/PostViewPage";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import PostCreatePage from "@/pages/PostCreatePage";
import PostEditPage from "@/pages/PostEditPage";

import AppHeader from "../components/AppHeader";
import store from "../store";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "PostListPage",
      components: {
        default: PostListPage,
        header: AppHeader
      }
    },
    {
      path: "/post/create",
      name: "PostCreatePage",
      components: {
        default: PostCreatePage,
        header: AppHeader
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다!");
          next({ name: "Signin" });
        }
        next();
      }
    },
    {
      path: "/post/:postId",
      name: "PostViewPage",
      components: {
        default: PostViewPage,
        header: AppHeader
      },
      props: {
        default: true
      }
    },
    {
      path: "/post/:postId/edit",
      name: "PostEditPage",
      components: {
        default: PostEditPage,
        header: AppHeader
      },
      props: {
        default: true
      }
    },

    {
      path: "/signup",
      name: "Signup",
      components: {
        default: Signup,
        header: AppHeader
      }
    },
    {
      path: "/signin",
      name: "Signin",
      components: {
        default: Signin,
        header: AppHeader
      }
    }
  ]
});
