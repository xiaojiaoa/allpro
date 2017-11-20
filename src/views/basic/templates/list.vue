<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <el-row class="tac dis-flex">
        <el-col :span="4">
          <div class="title">模板管理</div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo templates"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu :index="index" v-for="(item, index) in template" v-key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="index-index2" v-for="(data, index2) in item.templetList" v-key="index-index2">{{data.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Templates } from '../../../services/admin';

export default {
  data() {
    return {
      template: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      Templates.list().then(res => {
        this.template = res.data;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../scss/views/basic/templates/list.scss';
</style>
<style type="text/css">
  .el-submenu .el-submenu__title:hover{
    background-color: #e6e6e6;
  }
</style>
