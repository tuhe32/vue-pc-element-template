<template>
  <div class="app-container product-list">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="params.key" placeholder="请输入角色名称"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="params.availableStatus" placeholder="请选择角色状态" @change="search">
            <el-option value="" label="请选择角色状态"></el-option>
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="addRole">新增角色</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table  :data="roleList">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="角色名称" :min-width="100"  align="center"></el-table-column>
      <el-table-column prop="availableStatus" label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.availableStatus == 1">启用</p>
          <p v-else>禁用</p>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.$index, scope.row)" size="mini">编辑</el-button>
          <disable name="删除" :rowId="scope.row.id.toString()" @emit="handleDelete" ></disable>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="pageSizes"
      :page-size="params.pageSize"
      layout=" sizes, prev, pager, next,total"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {getRoleList,deleteRole} from "../../api/api";
  import {fmMoney,fmDate} from "../../utils";
  import Disable from "@/components/Disable";

  export default {
    name:'role',
    components:{Disable},
    data(){
      return{
        params: {
          key: null,
          availableStatus:null,
          page: 1, pageSize: 10,
          order: null, sort: null
        },
        roleList:[],
        pageSizes:[10,20,30],
        total:0,
      }
    },
    methods:{
      handleCurrentChange(val){
        this.params.page = val;
        this.init();
      },
      handleSizeChange(val){
        this.params.pageSize = val;
        this.init();
      },
      handleEdit(index,row){
        this.$router.push({name: 'RoleDetail',query:{id:row.id}})
      },
      //  async handleDelete(index,row){
      //  let resp = await deleteRole({id:row.id});
      //  this.init()
      // },

      async handleDelete(id,name){
        if(name == '删除') {
          let data = {
            id:id,
          }
          let resp = await deleteRole(data)
          if(this.qUtil.validResp(resp)){
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
          }else {
            this.$message({
              message: '删除失败!',
              type: 'warning'
            });
          }
          this.init();
        }
      },
      formatPrice(price){
        return fmMoney(price,2,true)
      },
      formatDate(date){
        return fmDate(date,"yyyy-MM-dd")
      },
      addRole() {
        this.$router.push({name: 'RoleDetail'})
      },
      //搜索
      search(){
        this.params.page = 1;
        this.init();
      },
      async init(){
        // let data = {
        //   infomation : this.information,
        //   infoStatus : this.infoStatus,
        //   pageNum : this.page,
        //   pageSize : this.pageSize,
        // };
        let resp = await getRoleList(this.params);
        console.log('[测试接口]',resp);
        if(resp.data!=null){
          this.roleList = resp.data.dataList;
          this.total = resp.data.total;
        }
      }
    },
    mounted(){
      this.init();
    }
  }

</script>
<style>
  .product-list .el-table,.product-list .el-table th{
    text-align: center;
  }
</style>
