<template>
    <section>
        <sticky :className="'sub-navbar draft'">
            <el-button v-loading="isSubmitLoading" style="margin-left: 10px;" type="success" @click="submit">保存
            </el-button>
        </sticky>
        <el-form :model="roleForm" ref="roleForm" label-width="125px" :rules="rules" v-loading="loading"
                 element-loading-text="如心动则人妄动，伤其身痛其骨，于是体会到世间诸般痛苦">
            <el-row class="createPost-main-container">
                <el-form-item label="角色名称:" prop="name">
                    <el-input v-model="roleForm.name" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="roleForm.availableStatus" style="width:300px;">
                        <el-option :value="1" label="启用"></el-option>
                        <el-option :value="0" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="roleForm.remark"
                              style="width:500px;margin-bottom:0px;"></el-input>
                </el-form-item>
                <el-form-item label="菜单权限:">
                    <el-tree
                            :data="menuData"
                            ref="tree"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            :default-checked-keys="menuKeys"
                            :props="menuProps">
                    </el-tree>
                </el-form-item>
            </el-row>
        </el-form>
    </section>
</template>
<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  import {saveRole, getRoleDetail, getMenuList} from "../../api/auth";
  import {require} from '../../utils/rules';

  export default {
    name: "RoleDetail",
    components: {Sticky},
    data() {
      return {
        pageTitle: '新增角色',
        loading: false,
        isSubmitLoading: false,
        roleForm: {
          name: "",
          availableStatus: 1,
          remark: ""
        },
        menuData: [],
        menuKeys: [],
        menuProps: {
          children: 'menuList',
          label: 'name'
        },
        rules: {name: [require("请输入角色名称")]}
      }
    },
    methods: {
      submit() {
        this.$refs['roleForm'].validate(async (success) => {
          if (success) {
            let nodes = this.$refs.tree.getCheckedNodes(false, true);
            let menuIds = []
            nodes.forEach((m) => {
              menuIds.push(m.id)
            })
            let resp = await saveRole({adminRole: this.roleForm, menuIds: menuIds})
            if (this.qUtil.validResp(resp)) {
              this.$store.dispatch('tagsView/delCurrentViews', {
                view: this.$route,
                $router: this.$router,
                nextView: {name: 'RoleList'}
              })
            }
          }
        })
      },
      async loadMenu() {
        let resp = await getMenuList();
        if (this.qUtil.validResp(resp)) {
          this.menuData = this.baseUtil.modelCopy(resp.data.dataList)
        }
      },
      async loadModel() {
        let id = this.$route.query.id || 0
        if (id > 0) {
          let resp = await getRoleDetail({id: id})
          if (this.qUtil.validResp(resp)) {
            this.pageTitle = "编辑角色"
            if (resp.data.adminRole != null) {
              this.menuKeys = this.baseUtil.modelCopy(resp.data.adminRole.menuIds)
            }
            this.roleForm = this.baseUtil.modelCopy(resp.data.adminRole)
          }
        }
      },
    },
    mounted() {
      this.loadMenu()
      this.loadModel()
    }
  }
</script>
