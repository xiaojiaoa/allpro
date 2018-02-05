
<template>
      <el-dialog title="修改订单" v-model="alert" :close-on-click-modal="false" custom-class="addOrder-dialog">
            <el-form id="#create" :model="order"  :rules="orderRules" ref="order" label-width="140px">
                <el-row>
                    <el-col :span="19">
                       <el-form-item  label="订单信息" prop="orderInfo">
                         <el-input v-model="order.orderInfo"> </el-input>
                        </el-form-item>
                    </el-col>
                      <el-col :span="3"> 
                         <el-form-item label="" label-width="15px" prop="orderNum">
                            <el-input v-model="order.orderNum" placeholder="订单数量" :disabled="true"></el-input>         
                        </el-form-item>
                      </el-col>
                </el-row>
                </el-row>
                <el-row>
                   <el-col :span="11" >
                       <el-form-item  label="空间">
                           <el-input v-model="order.spaceName" :disabled="true"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col  :span="11" >
                       <el-form-item  label="品牌" prop="brandId">
                           <el-select v-model="order.brandId" :disabled="true">
                                <el-option :label="item.name" v-for="item in brandId" :key="item.id" :value="item.id"></el-option> 
                            </el-select>
                        </el-form-item>
                   </el-col>
                </el-row>
                 <el-row>
                   <el-col :span="11" >
                       <el-form-item  label="产品" prop="prodType">
                           <el-select v-model="order.prodType">
                                <el-option :label="item.name" v-for="item in prodType" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col  :span="11" >
                       <el-form-item  label="主材颜色" prop="decoColorId">
                           <el-select v-model="order.decoColorId">
                                <el-option :label="item.name" v-for="item in decoColorId" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="11">
                        <el-form-item label="约定交付时间" prop="deliveryTime">
                          <el-col :span="24">
                            <el-date-picker
                              v-model="order.deliveryTime"
                              type="datetime"
                              :disabled="true"
                              @change="format('deliveryTime')"
                              placeholder="选择日期时间">
                            </el-date-picker>
                          </el-col>
                        </el-form-item>
                   </el-col>
                   <el-col  :span="11">
                       <el-form-item  label="商品类型" prop="goodsType">
                           <el-select v-model="order.goodsType">
                               <el-option :label="item.name" v-for="item in goodsType" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                   </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="order.remark" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  size="medium" @click="submitOrder('order')">确认修改</el-button>
                <el-button @click="alert = false">取 消</el-button>
            </div>
    </el-dialog>
</template>
<script>
import mixins from '../../components/mixins/base';
import { Order, Assistant } from '../../services/admin';

export default {
  data() {
    const orderNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('数量不能为空'));
      } else if (!Number.isInteger(parseInt(value, 10))) {
        callback(new Error('请输入数字值'));
      } else if (parseInt(value, 10) < 1) {
        callback(new Error('数量不能小于1'));
      } else {
        callback();
      }
      return false;
    };
    return {
      alert: false,
      title: '',
      operation: '',
      goodsType: [],
      decoColorId: [],
      brandId: [],
      prodType: [],
      orderInfo: [],
      options: {
        type: '',
      },
      order: {
        lid: '',
        cid: '',
        spaceId: '',
        spaceName: '',
        remark: '',
        orderType: '1',
        goodsType: '',
        decoColorId: '',
        deliveryTime: '',
        brandId: '',
        prodType: '',
        orderSubType: '',
        orderInfo: '',
        orderNum: '',
        id: `${this.$route.params.id}`,
      },
      orderRules: {
        orderSubType: [
          { required: true },
        ],
        deliveryTime: [
          { required: true, message: '请选择日期' },
        ],
        orderInfo: [
          { required: true, message: '请填写订单信息' },
        ],
        orderNum: [
          { validator: orderNumber, required: true },
        ],
        brandId: [
          { required: true, message: '请填写品牌' },
        ],
        prodType: [
          { required: true, message: '请选择产品' },
        ],
        decoColorId: [
          { required: true, message: '请选择主材颜色' },
        ],
        goodsType: [
          { required: true, message: '请选择商品类型' },
        ],
      },
    };
  },
  mixins: [mixins],
  props: ['sendInfo'],
  created() {
    this.init();
  },
  methods: {
    show() {
      this.alert = true;
    },
    hide() {
      this.alert = false;
    },
    init() {
      Promise.all([
        Assistant.goodsType(),
        Assistant.decoColorId(),
        Assistant.brandinfo(),
      ])
        .then(([goodsType, decoColorId, brandinfo]) => {
          this.goodsType = goodsType.data;
          this.decoColorId = decoColorId.data;
          this.brandId = brandinfo.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData() {
      Assistant.prodType({ spaceType: this.sendInfo.spaceTypeId }).then((res) => {
        this.prodType = res.data;
        this.order.prodType = this.sendInfo.prodType;
      }).catch(err => {
        console.log(err);
      });
      this.order.orderSubType = this.sendInfo.orderSubType;
      this.order.orderInfo = this.sendInfo.orderInfo;
      this.order.spaceName = this.sendInfo.spaceName;
      this.order.orderNum = this.sendInfo.orderNum;
      this.order.goodsType = this.sendInfo.goodsType;
      this.order.decoColorId = this.sendInfo.decoColorId;
      this.order.remark = this.sendInfo.remark;
      this.order.deliveryTime = this.sendInfo.deliveryTime;
      this.order.brandId = this.sendInfo.brandId;
    },
    submitOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.order.deliveryTime = this.format(this.sendInfo.deliveryTime);
          Order.orderEdit(this.order).then((res) => {
            console.log('res', res);
            this.$message({
              message: '修改成功',
              type: 'success',
            });
            this.$emit('init', this.$route.params.id);
            this.alert = false;
          }).catch(err => {
            console.log(err);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    format: function (key) {
      this.order[`${key}`] = this.dateHmsFormat(this.order[`${key}`]);
    },
  },
};
</script>
<style scoped>
@import "../../scss/components/alert.scss";
.el-dialog__header {
  padding: 0;
}
.dialog-footer{
  height: 28px;
}
</style>
