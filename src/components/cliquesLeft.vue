<template>
  <transition-group>
    <div class="icon-oper" :key="1">
      <div>
        <span>
          <i class="iconfont icon-xinjian" @click="add()"></i>
        </span>
      </div>
      <div>
        <span>
          <i class="iconfont icon-sousuo"></i>
        </span>
      </div>
    </div>
      <ul :key="2">
        <li v-for="item in list" :key="item.id">
          <div class="title" @click="choose(item.id)" :class="{active: item.id === active}">{{item.name}}</div>
          <div class="data" v-for="data in item.children" @click="choose(item.id)" :class="{active: item.id === active}">{{data.name}}</div>
        </li>
      </ul>
    </div>
  </transition-group>
</template>
<script type="text/javascript">
import Rules from '../assets/validate/rules';
import { Department } from '../services/admin';

export default {
  data() {
    return {
      form: {},
      list: {},
      paginationData: {},
      conditions: {
        pageNo: 1,
        pageSize: 20,
        owner: '',
        name: '',
      },
      dialogShow: false,
      active: 0,
      rules: {
        owner: [
          { ...Rules.required, message: '请填写负责人姓名' },
        ],
        ownerMobile: [
          { ...Rules.required, message: '请填写负责人手机' },
        ],
        name: [
          { ...Rules.required, message: '请填写机构名称' },
        ],
        type: [
          { ...Rules.select, message: '请选择机构类型', type: 'number' },
        ],
        isWarehouse: [
          { ...Rules.select, message: '请选择' },
        ],
        dist: [
          { ...Rules.select, message: '请选择地区' },
        ],
        address: [
          { ...Rules.required, message: '请填写详细地址' },
        ],
      },
    };
  },
  created() {
    // this.init();
  },
  props: [
    'type',
    'id',
  ],
  methods: {
    add: function () {
      this.dialogShow = true;
    },
    init: function () {
      const self = this;
      if (this.type === 'organ') {
        Department.listByOrgan(self.id, self.conditions).then(res => {
          self.list = res.data;
        }).catch(err => {
          console.log(err);
        });
      } else {
        Department.listByStore(self.id, self.conditions).then(res => {
          self.list = res.data;
        }).catch(err => {
          console.log(err);
        });
      }
    },
  },
  watch: {
    id: function () {
      this.init();
    },
  },
};
</script>
<style lang="scss">
.icon-oper{
  position: absolute;
  top: -14px;
  >div{
    display: inline-block;
    span{
      background-color: #3599e6;
      border-radius: 50%;
      display: inline-block;
      width: 28px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin: 0 20px;
      cursor: pointer;
      i{
        color: #fff;
        font-size: 16px;
      }
    }
    input{
      width: 240px;
      height: 28px;
      border: 1px solid #3599e6;
      border-radius: 14px;
      padding: 0 17px;
      &:not(:last-of-type){
        margin-right: 10px;
      }
    }
  }
}
.organ{
margin-right: 16px;
width: 160px;
border: 1px solid #dce2e5;
ul{
  height: 100%;
  padding: 24px 20px;
  overflow-y: auto;
  li{
    >div{
      &:not(:last-of-type){
        margin-bottom: 10px;
      }
    }
    .title{
      font-size: 14px;
      color: #212121;
      cursor: pointer;
      position: relative;
      &.active{
        font-weight: bold;
        color: #212121;
      }
    }
    .data{
      text-indent: 14px;
      font-size: 13px;
      color: #666;
      cursor: pointer;
      position: relative;
      &:hover{
        color: #212121;
      }
      &.active{
        font-weight: bold;
        color: #212121;
        &:after{
          content: "";
          position: absolute;
          width: 4px;
          height: 16px;
          background-color: #3599e6;
          border-radius: 2px;
          top: -1px;
          left: -4px;
        }
      }
    }

    &:not(:last-of-type){
      margin-bottom: 21px;
    }
  }
}
}
</style>
