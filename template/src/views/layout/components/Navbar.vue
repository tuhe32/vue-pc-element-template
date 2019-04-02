<template>
  <div>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <!--<lang-select class="international right-menu-item"></lang-select>-->

      <!--<el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">-->
        <!--<theme-picker class="theme-switch right-menu-item"></theme-picker>-->
      <!--</el-tooltip>-->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="baseUtil.isNotBlank(avatar)" class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <img v-else class="user-avatar" src="../../../assets/images/head.jpg" >
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!--<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">-->
            <!--<el-dropdown-item>-->
              <!--{{$t('navbar.github')}}-->
            <!--</el-dropdown-item>-->
          <!--</a>-->
          <el-dropdown-item divided>
            <span @click="modifyPassword" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>

  <!--修改密码对话框-->
  <el-dialog :title="modifyPwdTitleName" :visible.sync="modfiyPwdVisible" center>
    <el-form  label-width="160px">
      <el-form-item label="姓名:">
        {{name}}
      </el-form-item>
      <el-form-item label="密码:" required :class="{error: validation.hasError('password')}" >
        <el-input v-model="password" type="password"  style="width:300px;"></el-input>
        <span class="v-message">{{ validation.firstError('password') }}</span>
      </el-form-item>
      <el-form-item label="确认密码:" required :class="{error: validation.hasError('confirmpsd')}">
        <el-input v-model="confirmpsd" type="password"  style="width:300px;"></el-input>
        <span class="v-message">{{ validation.firstError('confirmpsd') }}</span>
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
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
import {savePassword} from "../../../api/api";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // LangSelect,
    // ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
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
  validators: {
    'password':function (value) {
      return this.validator.value(value).required("请输入密码").regex('^[a-zA-Z0-9]{6,12}$','请输入6到12位字母或数字');
    },
    'confirmpsd,password':function (value,password) {
      if (this.validation.isTouched('confirmpsd')) {
        return this.validator.value(value).required('请再次填写登录密码').match(password,'两次密码不一致');
      }
    },
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
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    savePassword(){
      this.$validate().then(async function (success) {
        if(success){
          this.isSubmitLoading = true;
          let resp = await savePassword({ password:this.password})
          console.log('[保存用户结果]',resp)
          if(this.qUtil.validResp(resp)){
            this.isSubmitLoading = false
            this.modfiyPwdVisible = false
            this.$message({ message: "修改密码成功", type: 'success' });
           this.logout()
          }else this.$message({ message: resp.msg, type: 'warning' });
        }
      }.bind(this))

    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
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
