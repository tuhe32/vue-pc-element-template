<template>
  <section class="createPost-container">
      <el-form ref="userForm"  label-width="125px" v-loading="loading" element-loading-text="如心动则人妄动，伤其身痛其骨，于是体会到世间诸般痛苦">
        <sticky :className="'sub-navbar draft'">
          <el-button v-loading="isSubmitLoading" style="margin-left: 10px;" type="success" @click="submit">保存 </el-button>
        </sticky>

        <el-row class="createPost-main-container">
          <el-form-item label="用户名:" required :class="{error: validation.hasError('userForm.username')}">
            <el-input v-model="userForm.username" style="width:300px;"></el-input>
            <span class="v-message">{{ validation.firstError('userForm.username') }}</span>
          </el-form-item>
          <el-form-item v-if="!isEdit" label="密码:" required :class="{error: validation.hasError('password')}">
            <el-input v-model="password" type="password" style="width:300px;"></el-input>
            <span class="v-message">{{ validation.firstError('password') }}</span>
          </el-form-item>
          <el-form-item v-if="!isEdit" label="确认密码:" required :class="{error: validation.hasError('confirmpsd')}">
            <el-input v-model="confirmpsd" type="password" style="width:300px;"></el-input>
            <span class="v-message">{{ validation.firstError('confirmpsd') }}</span>
          </el-form-item>
          <el-form-item label="姓名:" required :class="{error: validation.hasError('userForm.name')}">
            <el-input v-model="userForm.name" style="width:300px;"></el-input>
            <span class="v-message">{{ validation.firstError('userForm.name') }}</span>
          </el-form-item>
          <el-form-item label="手机号:" >
            <el-input v-model="userForm.phone" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="是否启用:">
            <el-select v-model="userForm.isEnable" style="width:300px;">
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="roleIds" multiple placeholder="请选择" style="width:300px;">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="userForm.remark" style="width:500px;margin-bottom:0px;"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
  </section>
</template>
<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  import {saveWebUser,getWebUserDetail,getAllRole} from "../../api/api";
  export default {
    name:"webUserDetail",
    components: { Sticky },
    data() {
      return{
          pageTitle: '新增用户',
          loading: false,
          isSubmitLoading: false,
          userForm: {
            username:null,
            name:"",
            phone:"",
            isEnable:1,
            remark:"",
          },
        isEdit:false,
        password:null,
        confirmpsd:null,
        roles:[],
        roleIds:null,
        menuData:[],
        menuKeys:[],
        menuProps:{
          children: 'menuList',
          label: 'name'
        },
      }
    },
    validators: {
      'userForm.username': function(value) {
        return this.validator.value(value).required('请填写用户名').regex('^[a-zA-Z0-9\u4e00-\u9fa5]{3,40}$','用户名为3-12位字母,数字或汉字');
      },
      'password':function (value) {
        if(this.isEdit==true){
          return  this.validator
        }
          return this.validator.value(value).required("请输入密码").regex('^[a-zA-Z0-9]{6,12}$','请输入6到12位字母或数字');
      },
      'confirmpsd,password':function (value,password) {
        if(this.isEdit==true){
          return this.validator
        }
        if (this.validation.isTouched('confirmpsd')) {
          return this.validator.value(value).required('请再次填写登录密码').match(password,'两次密码不一致');
        }
      },
      'userForm.name': function(value) {
        return this.validator.value(value).required('请填写姓名').regex('^[a-zA-Z\u4e00-\u9fa5]{2,40}$','用户名为2-12位字母或汉字');
      },
//      'respData.templeUser.name': validatorUtils.require,
    },
    methods: {
       submit() {
        this.$validate().then(async function (success) {
         if(success){
           let resp = await saveWebUser({adminUser:this.userForm,  password:this.password,roleIds:this.roleIds})
           console.log('[保存用户结果]',resp)
           if(this.qUtil.validResp(resp)){
             this.$message({ message: resp.msg, type: 'success' });
             this.$store.dispatch('delCurrentViews',{
                view: this.$route,
                $router: this.$router
             })
           }
         }
        }.bind(this))
      },
      async loadRole(){
        let resp = await getAllRole();
        if(resp.data!=null){
          this.roles = this.baseUtil.modelCopy(resp.data.dataList)
        }
      },
     async loadModel(){
       let id  =   this.$route.query.id || 0
        if(id > 0){
         let resp = await getWebUserDetail({id:id})
          if(this.qUtil.validResp(resp)){
            this.pageTitle = "编辑用户"
            this.isEdit = true
            if(resp.data.adminUser!=null){
              this.roleIds = this.baseUtil.modelCopy(resp.data.adminUser.roleIds)
            }
            this.userForm = this.baseUtil.modelCopy(resp.data.adminUser)
          }
        }else {
         this.isEdit = false
        }
      },
    },
    mounted() {
      this.loadRole()
      this.loadModel()
    }
  }
</script>
