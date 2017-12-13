<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <el-row class="tac dis-flex direction-row" :span="24">
        <el-col class="item template-choose" :span="4">
          <div class="title">模板管理</div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo templates"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu :index="`${index}`" v-for="(item, index) in template" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="`${index}-${index2}`" v-for="(data, index2) in item.templetList" :key="`${index}-${index2}`" @click="getConfig(data.id)">{{data.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <transition name="slider">
          <el-col class="item":span="16" v-show="contentShow">
            <div class="dis-flex content">
              <div class="page-oper content-title">
                <div class="page-title">模板名称：{{content.name}} </div>
                <ul class="page-methods">
                  <li v-show="!previewShow">
                    <el-button type="primary" @click="save()">保存</el-button>
                  </li>
                  <li>
                    <el-button type="primary" @click="getPreview()">{{previewShow ? '取消预览' : '预览'}}</el-button>
                  </li>
                  <li>
                    <el-button type="primary" @click="release()">发布</el-button>
                  </li>
                </ul>
              </div>
              <textarea class="content" ref="text" v-model="content.content" v-show="!previewShow" refs="text"></textarea>
              <div v-html="preview" v-show="previewShow"></div>
            </div>
          </el-col>
        </transition>
        <transition name="slider">
          <el-col class="item":span="4" v-show="configShow">
            <div class="dis-flex config">
              <div class="title">版本信息：</div>
              <ul class="config-list version-list">
                <li v-for="(item, index) in version" :key="index" @click="getContent(item.version)">{{item.version}}</li>
              </ul>
            </div>
            <div class="dis-flex">
              <div class="title">变量说明：</div>
              <ul class="config-list params-list">
                <li v-for="item in parameters" :key="item.tid">
                  {{item.paramKey}}: {{item.paramValue}}
                  <el-button @click="addParams(item.paramValue)">注入</el-button>
                </li>
              </ul>
            </div>
          </el-col>
        </transition>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Templates } from '../../../services/admin';
import { cursorPosition } from '../../../libs/cursorPosition';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      template: [],
      parameters: [],
      version: [],
      content: {},
      preview: '',
      condition: {},
      contentShow: false,
      configShow: false,
      previewShow: false,
    };
  },
  created() {
    console.log(cursorPosition);
    this.init();
  },
  mixins: [mixins],
  methods: {
    init: function () {
      Templates.list().then(res => {
        this.template = res.data;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    getConfig: function (id) {
      this.condition.id = id;
      Templates.version(id).then(res => {
        this.parameters = res.data.parameters;
        this.version = res.data.versionList;
        this.configShow = true;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    getContent: function (version) {
      this.condition.version = version;
      Templates.content(this.condition).then(res => {
        this.content = res.data;
        this.contentShow = true;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    getPreview: function () {
      Templates.preview(this.condition).then(res => {
        this.preview = res.data;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
      this.previewShow = !this.previewShow;
    },
    addParams: function (text) {
      const target = this.$refs.text;
      const pos = cursorPosition.get(target);
      cursorPosition.add(target, pos, text);
    },
    save: function () {
      this.content.content = this.$refs.text.value;
      Templates.edit(this.content).then(() => {
        this.$message({
          message: '保存模板成功',
          type: 'success',
        });
      }).catch(err => {
        console.log(err);
      });
    },
    release: function () {
      Templates.release(this.condition).then(() => {
        this.$message({
          message: '发布模板成功',
          type: 'success',
        });
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
  computed: {
    contentWatch: function () {
      return this.content.content;
    },
  },
  watch: {
    contentWatch: function (val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss">
  @import '../../../scss/views/basic/templates/list.scss';
</style>
<style type="text/css">
  .el-submenu .el-submenu__title:hover{
    background-color: #e6e6e6;
  }
</style>
