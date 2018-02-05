<template>
  <div class="dis-flex container">
    <div class="dis-flex"> 
      <div class="list-option">
        <div class="page-oper">
          <div class="page-title">子订单</div>
          <ul class="page-methods">
             <li>
              <el-button type="primary" @click="closeOrderChild()">关闭子订单</el-button>  
            </li>
          </ul>
        </div>
      </div>
      <div class="dis-flex" v-loading.lock="loading">
        <div class="table dis-flex">
          <div class="admin-table dis-flex">                
              <table class="admin-main-table">         
                <thead>
                  <tr>
                    <th>
                        <el-checkbox  v-model="checkAll" @change="checkAllChange(checkAll)" >全选</el-checkbox>     
                    </th>
                    <th v-for="value in thead" :title="value">
                      {{value}}
                    </th>
                  </tr>
                </thead> 
                <tbody>                  
                    <tr v-for="(item, index) in tbody">
                      <td>
                         <el-checkbox-group v-model="checkList" @change="checkSingleChange">    
                            <el-checkbox :label="item.orderReturnVo.id" :disabled="item.orderReturnVo.stcode == 999 ? true : false">{{((conditions.pageNo - 1) * conditions.pageSize) + index + 1}}</el-checkbox>
                         </el-checkbox-group>
                      </td>
                      <td class="router">
                          <span  @click="routerLink(`/order/orders/detail/${item.orderReturnVo.id}`)">{{item.orderReturnVo.tno}}</span>
                      </td>
                      <td>{{ item.orderReturnVo.orderInfo }}</td>
                      <td>
                          {{ item.orderReturnVo.orderStatusSimpleVo.stcodeStr }}
                      </td>
                      <td>
                          <el-button type="primary" size="mini" v-if="$_has8('edit01') && item.orderReturnVo.stcode >= 110 && item.orderReturnVo.stcode <=410" @click="editOrderStc(item.orderReturnVo.id,item.orderReturnVo.orderInfo)">修改订单状态</el-button>
                      </td>
                    </tr>
                    <tr v-if="tbody.length==0 && !loading">
                      <td :colspan="thead.length + 1" class="nothing-data">暂无数据</td>
                    </tr>
                </tbody>              
              </table>             
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
        <el-dialog title="修改订单信息" v-model="dialogMod" :close-on-click-modal="false" >
            <el-form id="#create" :model="order"  ref="order" :rules="rules" label-width="140px">
                <el-row>
                    <el-col :span="20">
                       <el-form-item  label="订单信息" prop="orderInfo">
                            <el-input v-model="order.orderInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMod = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit('order')">确 定</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { Order } from '../../../services/admin';
import mixins from '../../../components/mixins/base';

export default {
  data() {
    return {
      thead: ['订单号', '订单信息', '订单状态', '操作'],
      tbody: [],
      loading: true,
      paginationData: {},
      checkList: [],
      checkAll: false,
      showList: [],
      flag: true,
      dialogMod: false,
      order: {
        id: '',
        orderInfo: '',
      },
      conditions: {
        pageSize: '',
        pageNo: '',
        parentTid: this.$route.params.id,
      },
      rules: {
        orderInfo: [
          { required: true, message: '请填写订单信息' },
        ],
      },
    };
  },
  created() {
    this.init({ parentTid: this.$route.params.id });
  },
  methods: {
    init: function (val) {
      this.loading = true;
      Order.orderChildList(val).then(res => {
        this.loading = false;
        this.paginationData = res.data;
        this.tbody = res.data.result;
        this.conditions.pageSize = res.data.pageSize;
        this.conditions.pageNo = res.data.page;
        this.checkList = [];
        this.showList = [];
        this.checkAll = false;
        for (const i in this.tbody) {
          if (this.tbody[i].orderReturnVo.stcode !== 999) {
            this.showList.push(this.tbody[i].orderReturnVo.id);
          }
        }
      }).catch(err => {
        this.$message.error(`${err.msg}`);
        this.loading = false;
      });
    },
    handleSizeChange: function (val) {
      this.paginationData.pageSize = val;
      this.conditions.pageSize = val;
      this.paginationData.page = 0;
    },
    handleCurrentChange: function (val) {
      this.paginationData.page = val;
    },
    checkAllChange(val) {
      this.checkList = val ? this.showList : [];
    },
    checkSingleChange(val) {
      const checkedCount = val.length;
      this.checkAll = checkedCount === this.showList.length;
    },
    closeOrderChild() {
      if (this.checkList.length !== 0) {
        this.$confirm('确认关闭订单吗？关闭之后无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.checkList = this.checkList.join(',');
          Order.deleteChildOrder(this.checkList)
            .then(() => {
              this.$message.success('删除成功!');
              this.init({ parentTid: this.$route.params.id });
            })
            .catch(err => {
              console.log(err);
              this.$message.error(`${err.msg}`);
              this.init({ parentTid: this.$route.params.id });
            });
        });
      } else {
        this.$message.error('请至少选择一个子订单');
      }
    },
    editOrderStc(id, info) {
      this.dialogMod = true;
      this.order.id = id;
      this.order.orderInfo = info;
    },
    editSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Order.orderEdit(this.order)
            .then(() => {
              this.$message({
                message: '修改成功',
                type: 'success',
              });
              this.dialogMod = false;
              this.init(this.conditions);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('error submit!!');
        }
      });
    },
    routerLink: function (val) {
      this.$router.push(`${val}`);
    },
  },
  computed: {
    conditionsWatch: function () {
      return this.paginationData.page;
    },
  },
  mixins: [mixins],
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

<style lang="scss" scoped>

</style>
