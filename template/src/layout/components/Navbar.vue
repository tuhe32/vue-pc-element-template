<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <!--<error-log class="errLog-container right-menu-item hover-effect" />-->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!--<el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">-->
          <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--</el-tooltip>-->

        <!--<lang-select class="right-menu-item hover-effect" />-->

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="validUtil.isNotBlank(avatar)" class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <img v-else class="user-avatar" src="../../assets/images/head.jpg" >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="modifyPassword" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--修改密码对话框-->
    <el-dialog :title="modifyPwdTitleName" :visible.sync="modfiyPwdVisible" center>
      <el-form  label-width="160px">
        <el-form-item label="姓名:">
          {{name}}
        </el-form-item>
        <el-form-item label="密码:" required  >
          <el-input v-model="password" type="password"  style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" required >
          <el-input v-model="confirmpsd" type="password"  style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isSubmitLoading" @click="savePassword()">保 存</el-button>
        <el-button type="lightBrown" @click="modfiyPwdVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
import {savePassword} from "../../api/auth";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  data(){
    return{
      modifyPwdTitleName:'修改密码',
      modfiyPwdVisible:false,
      isSubmitLoading:false,
      password:null,
      confirmpsd:null,
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    modifyPassword(){
        this.password = null
        this.confirmpsd = null
        this.modfiyPwdVisible = true
    },
    async logout() {
      await this.$store.dispatch('FedLogOut')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async savePassword(){
      this.isSubmitLoading = true;
      let resp = await savePassword({ password:this.password})
      console.log('[保存用户结果]',resp)
      if(this.qUtil.validResp(resp)){
          this.isSubmitLoading = false
          this.modfiyPwdVisible = false
          this.$message({ message: "修改密码成功", type: 'success' });
          this.logout()
      }else this.$message({ message: resp.msg, type: 'warning' });
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
