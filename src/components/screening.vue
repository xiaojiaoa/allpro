<template>
  <transition>
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="screening" >
        <span class="autoWidth" v-for="(data, index) in screening" v-show="showExtra | index == 0" :key="index">
          <el-form-item v-if="item.show !== false" v-for="(item, index2) in data" :label="item.label" :key="index2">
            <el-input v-model="formInline[`${item.field}`]" :placeholder="item.label" v-if="item.type == 'input'"></el-input>
            <el-input type="number" v-model="formInline[`${item.field}`]" :placeholder="item.label" v-if="item.type == 'number'"></el-input>
            <el-select key="selectLinkage" v-model="formInline[`${item.field}`]" clearable :placeholder="item.label" v-if="(item.type == 'select' || item.type == 'selectLinkage') && item.data && (item.defaultValue !== undefined && item.defaultValue !== null)" disabled>
              <el-option v-for="(option, index4) in item.data" :label="option.name" :value="option.value ? option.value : option.id" :key="index4"></el-option>
            </el-select>
            <el-select key="select" v-model="formInline[`${item.field}`]" clearable :placeholder="item.label" v-if="(item.type == 'select' || item.type == 'selectLinkage') && item.data && (item.defaultValue === undefined || item.defaultValue === null)" @change="dataChange(item)">
              <el-option v-for="(option, index3) in item.data" :label="option.name" :value="option.value ? option.value : option.id" :key="index3"></el-option>
            </el-select>
            <el-date-picker v-if="item.type == 'datepicker'"
              v-model="formInline[`${item.field}`]"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              @change="format(`${item.field}`)">
            </el-date-picker>

            <el-date-picker v-if="item.type == 'daterange'"
              v-model="formInline[`${item.field}`]"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2"
              @change="format(`${item.field}`)">
            </el-date-picker>

            <el-cascader v-if="item.type == 'cascader' && item.data"
              v-model="formInline[`${item.field}`]"
              :options="item.data"
              clearable>
            </el-cascader>
          </el-form-item>
          <el-form-item class="oper" v-if="index == 0">
            <el-button type="primary" @click="submitBtn">查询</el-button>
            <el-button @click="resetBtn" :class="{ mr: !showExtraBtn}">重置</el-button>
            <el-button type="text" @click="toggle" v-if="showExtraBtn">高级查询<i class="iconfont icon-gaojichaxunxiala" :class="{ rotate: showExtra}"></i></el-button>
          </el-form-item>
        </span>
        </transition-group>
      </el-form>
    </div>
  </transition>
</template>
<script type="text/javascript">
import mixins from '../components/mixins/base';

export default {
  data() {
    return {
      showExtra: false,
      showExtraBtn: false,
      formInline: {
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          },
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - (3600 * 1000 * 24));
            picker.$emit('pick', date);
          },
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - (3600 * 1000 * 24 * 7));
            picker.$emit('pick', date);
          },
        }],
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      screeningHeight: '',
    };
  },
  created() {
    if (this.screening.length === 2) {
      this.showExtraBtn = true;
    }
    if (this.queryData) {
      this.formInline = this.queryData;
    }
    this.defaultData();
  },
  mounted() {
    this.screeningHeight = `${this.$refs.screening.$el.scrollHeight - 24}px`;
  },
  updated() {
  },
  props: {
    screening: {
      default: Object,
    },
    queryData: {
      default: Object,
    },
    flag: {
      default: false,
    },
  },
  methods: {
    submitBtn: function () {
      for (const [key, value] of Object.entries(this.formInline)) {
        if (value === undefined) {
          delete this.formInline[`${key}`];
        }
      }
      this.$emit('submit', this.formInline);
    },
    defaultData() {
      this.screening.forEach(n => {
        n.forEach(v => {
          if (v.defaultValue !== undefined &&
            v.defaultValue !== null) {
            this.formInline[`${v.field}`] = v.defaultValue;
          }
        });
      });
    },
    dataChange: function (item) {
      if (item.type === 'selectLinkage') {
        if (item.change === true) {
          item.data.forEach(v => {
            if (v.id === this.formInline[`${item.field}`]) {
              this.formInline[`${item.field}New`] = v;
            }
          });
          this.filterData(item.index);
          this.$emit('dataChange', this.formInline);
        }
      } else {
        this.$emit('selectChange', this.formInline);
      }
    },
    filterData: function (val) {
      const self = this;
      self.screening.forEach(v => {
        v.forEach(n => {
          if (n.index !== undefined && n.index > val) {
            self.resetValue(n.field);
          }
        });
      });
    },
    resetBtn: function () {
      this.formInline = {};
      this.$emit('submit', {});
    },
    resetValue: function (val) {
      console.log(val);
      delete this.formInline[`${val}`];
    },
    toggle: function () {
      this.showExtra = !this.showExtra;
      this.screeningHeight = '';
    },
    format: function (val) {
      const target = this.formInline[`${val}`];
      if (Array.isArray(this.formInline[`${val}`])) {
        target.forEach((v, k) => {
          if (v !== null) {
            this.formInline[`${val}`][k] = this.dateFormat(v);
          } else {
            delete this.formInline[`${val}`];
          }
        });
      } else {
        this.formInline[`${val}`] = this.dateFormat(this.formInline[`${val}`]);
      }
    },
  },
  mixins: [mixins],
  watch: {
    screening: function (val) {
      this.screeningData = val;
      this.defaultData();
    },
    queryData: function (val) {
      this.formInline = val;
    },
    flag: function () {
      this.defaultData();
    },
  },
};
</script>
<style lang="scss">
  .mr{
    margin-right: 82px!important;
  }
  @import '../scss/components/screening.scss';
</style>
