/* eslint-disable */
<template>
  <div>
    <div id="map" :style="mapStyle"></div>
    
  </div>
</template>

<script>
import BMap from 'BMap';

export default{
  data() {
    return {
      mapStyle: {
        width: '100%',
        height: '200px',
      },
    };
  },
  created() {
  },
  mounted: function () {
    this.loadMap('杭州市');
  },
  methods: {
    loadMap: function (address) {
      const map = new BMap.Map('map');
      const myGeo = new BMap.Geocoder();
      myGeo.getPoint(address, (point) => {
        if (point) {
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom(true);
          map.addOverlay(new BMap.Marker(point));
        }
      }, '浙江省');
    },
  },
};
</script>
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>