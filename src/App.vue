<template>
  <div id="app">

    <table class="table table-bordered">
      <thead>
          <th>N</th>
          <th>Название</th>
          <th>Исполнитель</th>
          <th>Затраченное время в часах</th>
          <th>Стоимость работы</th>
          <th>Действия</th>
      </thead>

      <tbody>
          <template v-for="( row, num) in tasks">
            <TableShowRow v-if="!row.isEdit" :num="num" :row="row"
                          :user="getUser(row.user_id )" @setedit="setEdit"></TableShowRow>

            <TableEditRow v-else v-model="row" :num="num" :user="getUser(row.user_id )" :users="users"></TableEditRow>
          </template>
      </tbody>
    </table>

    <button class="bottom button-default" :disabled="!isSaved" @click="sendRows">Сохранить</button>
  </div>
</template>

<script>
    import 'whatwg-fetch';
    import TableShowRow from './components/TableShowRow';
    import TableEditRow from './components/TableEditRow';

    export default {
  name: 'App',
  components: {
     TableShowRow, TableEditRow
  }
  , data(){
      return {
          tasks: [ ]
          , users: [ ]
      }
    }
    , created(){
        const self = this;

        fetch('/api/users')
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                json.forEach((item) => {
                    self.users.push( item );
                });
                return json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            }).then(function () {
                return fetch('/api/tasks');
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                json.forEach((item) => {
                    self.tasks.push( Object.assign(item, { isEdit: false }));
                });
                return json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }

    , methods: {
      getUser( id ){
          const user = this.users.filter((item) => (item.id == id));

          if(user.length > 0){
              return user[0];
          }else {
              return {
                  id: '', name: 'неизвестно', price: 0
              }
          }
      }

      , setEdit( taskId ){
          this.tasks.filter((item) => (item.id == taskId))[0].isEdit = true;
      }

      , sendRows(e){
          e.preventDefault();

          const sended = [ ];

          this.tasks.filter((item) => (item.isEdit)).forEach((item) => {
              sended.push(item);
              item.isEdit = false;
          });

          console.log( 'Send 2 Server', JSON.stringify( sended ));
      }
    }

    , computed: {
      isSaved(){
          return this.tasks.filter((item) => (item.isEdit === true)).length > 0;
      }
        }
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
  th {
    text-align: center;
  }
  body {
    padding: 1em;
  }
</style>
