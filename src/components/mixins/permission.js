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
    $_hasMulti6: function (r) {
      const array = r.split(',');
      const result = [];
      array.forEach(state => {
        if (Global.state.permission6[`${this.prefix}/${state}`]) {
          result.push(true);
        }
      });
      if (result.length !== 0) {
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
    $_hasMulti8: function (r) {
      const array = r.split(',');
      const result = [];
      array.forEach(state => {
        if (Global.state.permission8[`${this.prefix}/${state}`]) {
          result.push(true);
        }
      });
      if (result.length !== 0) {
        return true;
      }
      return false;
    },
  },
};
export default permission;
