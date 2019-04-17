<template>
  <el-popover  placement="bottom" width="160" trigger="click" v-model="visible">
    <p>确认{{name}}吗？</p>
    <div style="text-align: left; margin: 0">
      <el-button type="danger" size="mini" @click="handleHide(1)" round>确认</el-button>
      <el-button size="mini" class="btnClose" @click="handleHide(0)" round>关闭</el-button>
    </div>
    <el-button size="mini" v-waves :type="type" slot="reference">{{name}}</el-button>
  </el-popover>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    props: {
      name: {
        type: String,
        default: '',
      },
      rowId:{
        default:''
      },
      type:{
        type:String,
        default:'warning'
      }
    },
    methods: {
      handleHide(code) {
        if (parseInt(code) === 1) {
          this.$emit('emit',this.rowId,this.name);
        }
        this.visible = false;
      },
    },
  };
</script>
