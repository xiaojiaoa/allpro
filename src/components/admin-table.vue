<template>
  <transition>
    <div class="admin-table dis-flex">
      <el-checkbox-group v-model="checkList">
        <table class="admin-main-table">
          <thead>
            <tr>
              <th @click="aaa">序号</th>
              <th v-for="value in thead" :title="value">
                {{value}}
              </th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in tbody">
                <td>
                  <el-checkbox :label="index+1" v-if="checkbox"></el-checkbox>
                  <span v-else>{{index+1}}</span>
                </td>
                <td v-for="value in item" :title="value" :class="{ operation: Array.isArray(value)}">
                  <div v-if="Array.isArray(value)">
                    <span v-for="(oper, index) in value">
                      {{oper.text}}
                      <el-button
                        :key="index"
                        :type="oper.type" 
                        :icon="oper.icon"
                        @click="funcHandle(oper.func)"
                        >
                        {{oper.title}}
                        <i :class="oper.iconright" v-if="oper.iconright"></i>
                      </el-button>
                    </span>
                  </div> 
                  <div v-else>
                    <router-link to="aaa" class="router" v-if="false">
                      {{value}}
                    </router-link> 
                    <span v-else>
                      {{value}}
                    </span> 
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </el-checkbox-group>
    </div>
  </transition>
</template>
<script type="text/javascript">

export default {
  data() {
    return {
      checkList: [],
      thead: this.head,
      tbody: this.body,
    };
  },
  props: [
    'head',
    'body',
    'checkbox',
  ],
  methods: {
    funcHandle: function (val) {
      this.$emit('func', val);
    },
    aaa: function () {
      console.log(this.checkList);
    },
  },
  watch: {
    body: function (data) {
      this.tbody = data;
    },
    checkList: function (data) {
      this.$emit('checkbox', data);
    },
  },
};
</script>
<style lang="scss">
  @import '../scss/components/admin-table.scss';
</style>
