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
          return false;
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
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다.");
          next({ name: "Signin" });
          return false;
        }
        // PostViewPage에서 넘어가는 것 외에, 주소로 넘어갔을 때도 동작하게 하려고 다시 데이터 GET
        store
          .dispatch("fetchPost", to.params.postId)
          .then(response => {
            const post = store.state.post;
            const isAuthor = post.user.id === store.state.me.id;

            if (isAuthor) {
              next();
            } else {
              alert("게시물의 작성자만 게시물을 수정할 수 있습니다.");
              next(from);
            }
          })
          .catch(error => {
            alert(error.response.data.msg);
            next(from);
          });
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
