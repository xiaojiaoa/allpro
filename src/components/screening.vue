<template>
  <transition>
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="screening" >
        <transition-group name="fade">
          <span class="autoWidth" v-for="(data, index) in screening" v-show="showExtra | index == 0" :key="index">
            <el-form-item v-for="(item, index) in data" :label="item.label" :key="index">
              <el-input v-model="formInline[`${item.field}`]" :placeholder="item.label" v-if="item.type == 'input'"></el-input>
              <el-input type="number" v-model="formInline[`${item.field}`]" :placeholder="item.label" v-if="item.type == 'number'"></el-input>
              <el-select v-model="formInline[`${item.field}`]" :placeholder="item.label" v-if="item.type == 'select' && item.data">
                <el-option v-for="(option, index) in item.data" :label="option.name" :value="option.value ? option.value : option.id" :key="index"></el-option>
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
                :options="item.data"
                @change="handleChange">
              </el-cascader>

            </el-form-item>
            <el-form-item class="oper" v-if="index == 0">
              <el-button type="primary" @click="submitBtn">查询</el-button>
              <el-button @click="resetBtn">重置</el-button>
              <el-button type="text" @click="toggle" v-if="">高级查询<i class="iconfont icon-gaojichaxunxiala" :class="{ rotate: showExtra}"></i></el-button>
            </el-form-item>
          </span>
        </transition-group>
      </el-form>
    </div>
  </transition>
</template>
<script type="text/javascript">

export default {
  data() {
    return {
      showExtra: false,
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
  },
  mounted() {
    this.screeningHeight = `${this.$refs.screening.$el.scrollHeight - 24}px`;
  },
  props: [
    'screening',
  ],
  methods: {
    submitBtn: function () {
      for (const [key, value] of Object.entries(this.formInline)) {
        if (value === undefined) {
          delete this.formInline[`${key}`];
        }
      }
      this.$emit('submit', this.formInline);
    },

    resetBtn: function () {
      Object.assign(this.$data, this.$options.data());
      this.$emit('submit', this.formInline);
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
    handleChange: function (val) {
      const [one, two] = val;
      this.formInline.sendType = one;
      this.formInline.sendValue = two;
    },
  },
};
</script>
<style lang="scss">
  @import '../scss/components/screening.scss';
</style>
