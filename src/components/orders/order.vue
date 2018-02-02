
<template>
      <el-dialog :title="`新建${title}`" v-model="alert" :close-on-click-modal="false" custom-class="addOrder-dialog">
            <el-form id="#create" :model="order"  :rules="orderRules" ref="order" label-width="140px">
                <el-row>
                    <el-col :span="19">
                       <el-form-item  label="订单信息" prop="orderInfo">
                         <el-input v-model="order.orderInfo"> </el-input>
                        </el-form-item>
                    </el-col>
                      <el-col :span="3"> 
                         <el-form-item label="" label-width="15px" prop="orderNum">
                            <el-input v-model="order.orderNum" placeholder="订单数量"></el-input>         
                        </el-form-item>
                      </el-col>
                </el-row>
                <el-row>
                     <el-col :span="11"> 
                        <el-form-item label="订单子类型" prop="orderSubType">
                           <el-select v-model="order.orderSubType" >
                                <el-option label="定制" value="10" ></el-option>
                                <el-option label="成品" value="20"></el-option>
                            </el-select>
                        </el-form-item>
                     </el-col>
                      <el-col :span="11" v-if="order.orderSubType == 20"> 
                         <el-form-item label="" label-width="15px" prop="finishedProductId">
                            <el-select v-model="order.finishedProductId" >
                                <el-option :label="item.name" v-for="item in material" :key="item.id" :value="item.id"></el-option> 
                            </el-select>
                          </el-form-item>
                     </el-col>
               </el-row>
                <el-row>
                   <el-col :span="11" >
                       <el-form-item  label="空间" prop="spaceName">
                           <el-input v-model="order.spaceName" :disabled="true"></el-input>
                        </el-form-item>
                   </el-col>
                   <el-col  :span="11" >
                       <el-form-item  label="品牌" prop="brandId">
                           <el-select v-model="order.brandId" >
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
                        <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="order.remark"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  size="medium" @click="submitOrder('order')">确认新建</el-button>
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
      goodsType: [],
      decoColorId: [],
      brandId: [],
      prodType: [],
      orderInfo: [],
      material: [],
      options: {
        type: '',
      },
      order: {
        lid: '',
        cid: '',
        spaceId: '',
        spaceName: '',
        remark: '',
        orderType: '',
        goodsType: '',
        decoColorId: '',
        deliveryTime: '',
        brandId: '',
        prodType: '',
        orderSubType: '10',
        orderInfo: '',
        orderNum: '1',
        finishedProductId: '',
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
        spaceName: [
          { required: true, message: '请输入空间名' },
        ],
        id: [
          { required: true, message: '请选择物料信息' },
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
        Order.getMaterial(),
      ])
        .then(([goodsType, decoColorId, brandinfo, material]) => {
          this.goodsType = goodsType.data;
          this.decoColorId = decoColorId.data;
          this.brandId = brandinfo.data;
          this.material = material.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData() {
      Assistant.prodType({ spaceType: this.sendInfo.spaceTypeId }).then((res) => {
        this.prodType = res.data;
      }).catch(err => {
        console.log(err);
      });
      this.title = this.sendInfo.orderSuperTypeName;
      this.order.orderType = this.sendInfo.orderSuperType;
      this.order.spaceId = this.sendInfo.spaceId;
      this.order.spaceName = this.sendInfo.spaceName;
      this.order.lid = this.sendInfo.lid;
      this.order.cid = this.sendInfo.cid;
      if (this.sendInfo.orderSuperType === 1) {
        this.options.type = 'addOrder';
      } else if (this.sendInfo.orderSuperType === 3) {
        this.options.type = 'addProject';
      }
    },
    submitOrder(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Order[this.options.type].call(this, this.order).then(() => {
            this.$message({
              message: '新增成功',
              type: 'success',
            });
            this.$emit('initOrder', this.order.lid);
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
  watch: {
    alert: function (val) {
      if (val === false) {
        this.$refs.order.resetFields();
      }
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
/* .dialog-footer button{
 float: left;
}
.upload-demo{
  width: 130px;
  float: left;
  margin:0 15px;
} */
</style>
