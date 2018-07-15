<template>
  <div id="app">

    <table class="table table-bordered">
      <thead>
          <tr>
          <th>N</th>
          <th>Название
              <Sort type="name" :direction="sortType == 'name' ? sortDirection : 0" @sort="setSort"></Sort>
              <FilterVal v-model="filters.tasks"></FilterVal></th>
          <th>Исполнитель
              <Sort type="user" :direction="sortType == 'user' ? sortDirection : 0" @sort="setSort"></Sort>
              <FilterVal v-model="filters.users"></FilterVal></th>
          <th>Затраченное время в часах
              <Sort type="time" :direction="sortType == 'time' ? sortDirection : 0" @sort="setSort"></Sort>
          </th>
          <th>Стоимость работы
              <Sort type="price" :direction="sortType == 'price' ? sortDirection : 0" @sort="setSort"></Sort>
          </th>
          <th>Действия</th>
          </tr>
      </thead>

      <tbody>
          <template v-for="( row, num) in showTesks">
            <TableShowRow v-if="!row.isEdit" :num="num" :row="row"
                          :user="getUser(row.user_id )" @setedit="setEdit" @remove="removeItem"></TableShowRow>

            <TableEditRow v-else v-model="row" :num="num" :user="getUser(row.user_id )" :users="users"></TableEditRow>
          </template>

          <tr v-if="!isSaved">
              <td colspan="6">
                  <btn @click="newItem">Новый</btn>
              </td>
          </tr>
      </tbody>

        <tfoot>
            <tr>
                <th></th>
                <th>{{ totals.total }}</th>
                <th></th>
                <th>{{ totals.time }}</th>
                <th>{{ totals.price }}</th>
                <th></th>
            </tr>
        </tfoot>
    </table>

    <button class="bottom button-default" :disabled="!isSaved" @click="sendRows">Сохранить</button>
  </div>
</template>

<script>
    import 'whatwg-fetch';
    import TableShowRow from './components/TableShowRow';
    import TableEditRow from './components/TableEditRow';
    import { Btn } from 'uiv';
    import FilterVal from './components/Filter';
    import FilterData from './lib/FilterData';
    import Sort from './components/Sort';
    import SortData from './lib/SortData';


    export default {
  name: 'App',
  components: {
     TableShowRow, TableEditRow, Btn, FilterVal, Sort
  }
  , data(){
      return {
          tasks: [ ]
          , users: [ ]

          , filters: {
              tasks: '',
              users: ''
          }

          , sortType: ''
          , sortDirection: 0
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

      , setSort( type, direction ){
          this.sortType = type;
          this.sortDirection = direction;
      }

      , setEdit( taskId ){
          this.tasks.filter((item) => (item.id == taskId))[0].isEdit = true;
      }

      , removeItem( taskId ){
          console.log('removeItem', taskId);
          this.tasks = this.tasks.filter((item) => (item.id != taskId));

      }

      , newItem(){
          this.tasks.push({
              id: 0,
              isEdit: true,
              name: '',
              user_id: "",
              time: 0
          });
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
            isSaved() {
                return this.tasks.filter((item) => (item.isEdit === true)).length > 0;
            }

            , showTesks() {
                return SortData( FilterData( this.tasks, this.filters, this.users ),
                    this.sortType, this.sortDirection, this.users );
            }

            , totals(){
                
                return this.showTesks.reduce((prev, task) => {
                       const user = this.users.some( (user) => (user.id == task.user_id) ) ? // проверяем есть ли такой user
                           this.users.find( (user) => (user.id == task.user_id) ) : { price: 0, name: '' };

                       return Object.assign( prev, {
                           time: prev.time + task.time,
                           price: prev.price + user.price * task.time
                       });
                   }, {
                       time: 0,
                       price: 0,

                       total: this.showTesks.length
                   });
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
      vertical-align: middle !important;
  }
  body {
    padding: 1em;
  }
</style>
