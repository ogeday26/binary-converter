<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input type="file" id="file" ref="myFiles" @change="previewFiles">
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      file: '',
    }
  },
  methods: {
    previewFiles() {
      const result = this.getBase64(this.$refs.myFiles.files[0]);
      console.log(result);
      
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const type = this.$refs.myFiles.files[0].type
      reader.onload = async () => {
        var data = reader.result.split(',')[1];
        data = window.atob(data);
        const ia = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i += 1) {
          ia[i] = data.charCodeAt(i);
        };
        const rData = {
          data: ia,
          type: type
        };
        try {
          const resultApi = await this.axios.post('http://localhost:3000/file', rData);
          console.log(resultApi.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
