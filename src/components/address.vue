<template>
  <div>
    <el-col :span="6">
      <el-col :span="23">
        <el-select  v-model="data.country" placeholder="">
          <el-option label="中国" value="100000" ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="blank"></el-col>
    </el-col>
    <el-col :span="6">
      <el-col :span="23">
        <el-select v-model="data.province" placeholder="省">
          <el-option v-for="item in list.province" :label="item.name" :value="`${item.id}`" :key="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="blank"></el-col>
    </el-col>
    <el-col :span="6">
      <el-col :span="23">
        <el-select v-model="data.city" placeholder="市">
          <el-option v-for="item in list.city" :label="item.name" :value="`${item.id}`" :key="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="1" class="blank"></el-col>
    </el-col>
    <el-col :span="6">
      <el-col :span="24">
        <el-select v-model="data.dist" placeholder="区">
          <el-option v-for="item in list.dist" :label="item.name" :value="`${item.id}`" :key="item.id"></el-option>
        </el-select>
      </el-col>
    </el-col>
  </div>
</template>
<script type="text/javascript">
import { Assistant } from '../services/admin';

export default {
  data() {
    return {
      data: {
        country: '100000',
        province: '',
        city: '',
        dist: '',
      },
      list: {
        country: [],
        province: [],
        city: [],
        dist: [],
      },
      initFlag: true,
    };
  },
  props: [
    'province',
    'city',
    'dist',
  ],
  created() {
    console.log(this.data);
    if (this.dist !== '') {
      this.init();
    } else {
      this.initFlag = false;
      this.request(this.country, 'province');
    }
  },
  methods: {
    init: function () {
      const self = this;
      Promise.all([
        Assistant.address({ id: self.data.country }),
        Assistant.address({ id: self.province }),
        Assistant.address({ id: self.city })])
        .then(([provinceData, cityData, distData]) => {
          self.list.province = provinceData.data;
          self.list.city = cityData.data;
          self.list.dist = distData.data;
          self.initFlag = false;
        });
    },
    request: function (id = 100000, list) {
      const data = {
        id: id,
      };
      Assistant.address(data).then(res => {
        this.list[list] = res.data;
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error',
        });
      });
    },
  },
  computed: {
    countryWatch() {
      return this.data.country;
    },
    provinceWatch() {
      return this.data.province;
    },
    cityWatch() {
      return this.data.city;
    },
    distWatch() {
      return this.data.dist;
    },
  },
  watch: {
    province: function (val) {
      this.data.province = `${val}`;
    },
    city: function (val) {
      this.data.city = `${val}`;
    },
    dist: function (val) {
      this.initFlag = true;
      this.data.dist = `${val}`;
      this.init();
    },
    countryWatch: function (val) {
      if (!this.initFlag) {
        this.request(val, 'province');
        this.data.province = '';
        this.data.city = '';
        this.dist = '';
      }
    },
    provinceWatch: function (val) {
      if (!this.initFlag) {
        this.request(val, 'city');
        this.data.city = '';
        this.data.dist = '';
      }
    },
    cityWatch: function (val) {
      if (!this.initFlag) {
        this.request(val, 'dist');
        this.data.dist = '';
      }
    },
    distWatch: function (val) {
      this.data.dist = val;
      this.$emit('choose', this.data);
    },
  },
};
</script>
<style lang="scss">
  // @import '../scss/components/admin-table.scss';
</style>
