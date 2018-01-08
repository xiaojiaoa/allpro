<template>
  <div class="dis-flex container">
    <div class="dis-flex">
      <div>
        <screening :screening="screening" @submit="query"></screening>
        <div class="page-oper">
          <div class="page-title">文档列表</div>
          <ul class="page-methods">
            <li v-if="$_has8('add00')">
              <el-button type="primary" @click="edit()">新建文档</el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="table dis-flex">
        <div class="admin-table dis-flex">
          <el-checkbox-group>
            <table class="admin-main-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th v-for="value in thead" :title="value">
                    {{value}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tbody">
                  <td>
                    {{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}
                  </td>
                  <td class="router"><span @click="detail(item.id)">{{item.title}}</span></td>
                  <td>{{ item.empName }}</td>
                  <td>{{ unixFormat(item.addTime) }}</td>
                  <td>{{ item.typeName }}</td>
                </tr>
               <tr v-if="tbody.length==0">
                  <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </el-checkbox-group>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.page"
            :page-size="paginationData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.totalItems">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import screening from '../../../components/screening.vue';
import { NoticeInfo } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['标题', '发表人', '日期', '文档类型'],
      tbody: [],
      screening: [
        [
          {
            label: '文档类型',
            type: 'select',
            field: 'type',
            data: [],
          },
          {
            label: '发布范围',
            type: 'cascader',
            field: 'scope',
            data: [
              {
                value: '1',
                label: '门店类型',
                children: [],
              },
              {
                value: '2',
                label: '位置类型',
                children: [],
              },
              {
                value: '3',
                label: '机构类型',
                children: [],
              },
            ],
          },
        ],
      ],
      storeInfo: [],
      placeInfo: [],
      orgInfo: [],
      paginationData: {},
      checkList: [],
      conditions: {
        pageSize: '',
        pageNo: '',
      },
    };
  },
  created() {
    this.init();
  },
  mixins: [mixins],
  methods: {
    init: function (val) {
      Promise.all([NoticeInfo.noticeTypes(), NoticeInfo.list(val), NoticeInfo.storeInfo(),
        NoticeInfo.placeInfo(), NoticeInfo.orgInfo()])
        .then(([noticeTypes, list, storeInfo, placeInfo, orgInfo]) => {
          console.log(1, storeInfo.data);
          this.screening[0][0].data = noticeTypes.data;
          this.screening[0][1].data[0].children = this.filterData(storeInfo.data);
          this.screening[0][1].data[1].children = this.filterData(placeInfo.data);
          this.screening[0][1].data[2].children = this.filterData(orgInfo.data);
          this.paginationData = list.data;
          this.tbody = list.data.result;
          this.conditions.pageSize = list.data.pageSize;
          this.conditions.pageNo = list.data.page;
        })
        .catch(err => {
          console.log(err);
        });
    },
    query: function (val) {
      if (Object.keys(val).length === 0) {
        this.conditions = {};
        this.conditions.pageSize = this.paginationData.pageSize;
        this.conditions.pageNo = this.paginationData.page;
        this.paginationData.page = 0;
      } else {
        Object.assign(this.conditions, val);
        this.paginationData.page = 0;
        if ('scope' in val && val.scope !== '') {
          const [one, two] = val.scope;
          this.conditions.sendType = one;
          this.conditions.sendValue = two;
        }
        delete this.conditions.scope;
      }
    },
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      this.paginationData.page = val;
    },
    detail: function (val) {
      this.$router.push(`/basic/noticeInfo/detail/${val}`);
    },
    edit: function () {
      this.$router.push('/basic/noticeInfo/edit');
    },
    filterData(data) {
      const a = [];
      const c = {};
      c.value = '-1';
      c.label = '全部';
      a.push(c);
      for (let i = 0; i < data.length; i += 1) {
        const b = {};
        b.value = data[i].id;
        b.label = data[i].name;
        a.push(b);
      }
      return a;
    },
  },
  components: {
    screening,
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  watch: {
    conditionsWatch: function (val) {
      if (val !== 0) {
        this.conditions.pageNo = val;
        this.init(this.conditions);
      }
    },
  },
};
</script>

<style lang="scss">

</style>

