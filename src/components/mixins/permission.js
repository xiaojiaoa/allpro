import Global from '../../vuex/modules/global';

const permission = {
  data() {
    return {
      prefix: '',
    };
  },
  created() {
    this.prefix = `/${Global.state.routerActive[0]}/${Global.state.routerActive[1]}`;
  },
  methods: {
    $_has6: function (r) {
      if (Global.state.permission6[`${this.prefix}/${r}`]) {
        return true;
      }
      return false;
    },
    $_has8: function (r) {
      if (Global.state.permission8[`${this.prefix}/${r}`]) {
        return true;
      }
      return false;
    },
  },
};
export default permission;
