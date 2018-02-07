<template>
  <div class="container">
    <edit :type="materialEditInfo" :show="materialEditShow" @change="reflash"></edit>
    <div class="page-oper">
      <div class="page-title">物料信息</div>
      <ul class="page-methods">
        <li>
          <el-button type="primary" icon="edit" @click="edit()">修改信息</el-button>
        </li>
      </ul>
    </div>
    <div class="default-detail"  v-loading.lock="loading">
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">物料编号</el-col>
          <el-col :span="16">{{data.no}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">物料名称</el-col>
          <el-col :span="16">{{data.name}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">单位</el-col>
          <el-col :span="16">{{data.unitName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">规格</el-col>
          <el-col :span="16">{{data.standard}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">物料规格</el-col>
          <el-col :span="16">长{{data.length}}宽{{data.width}}重量{{data.weight}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">是否可外购</el-col>
          <el-col :span="16">{{data.purchasableName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">是否可销售</el-col>
          <el-col :span="16">{{data.marketableName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">是否可自制</el-col>
          <el-col :span="16">{{data.homemadeName}}</el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="8" class="label">生产耗用</el-col>
          <el-col :span="16">{{data.consumptionName}}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="8" class="label">劳动服务</el-col>
          <el-col :span="16">{{data.labourServiceName}}</el-col>
        </el-col>
      </el-row>
      <el-row class="textarea">
        <el-col>
          <el-col class="label el-1-9">物料图片</el-col>
          <el-col class="text el-8-9">
            <span v-for="item in data.pictures" :key="item.id">             
              <img :src="picStatic+item.savePath" alt="">
            </span>
          </el-col>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import { Material } from '../../../services/admin';
import mixins from '../../../components/mixins/base';
import edit from './edit.vue';

export default {
  data() {
    return {
      data: {},
      loading: true,
      picStatic: Material.picStatic,
      materialEditInfo: {
        title: '编辑物料',
        btn: '确定编辑',
        type: 'edit',
        id: this.$route.params.id,
      },
      materialEditShow: false,
    };
  },
  created() {
    this.init(this.$route.params.id);
  },
  methods: {
    init: function (val) {
      Material.detail(val).then(res => {
        this.loading = false;
        this.data = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    edit: function () {
      this.materialEditShow = !this.materialEditShow;
    },
    reflash: function () {
      this.init(this.$route.params.id);
    },
  },
  components: {
    edit,
  },
  mixins: [mixins],
};
</script>

<style lang="scss" scoped>
  // @import '../scss/views/index.scss';
  img{
    width: 100px;
    margin-right: 20px;
  }
</style>
