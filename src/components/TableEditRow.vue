<template>
    <tr>
        <td>{{ num + 1 }}</td>
        <td><input type="text" v-model="name" /></td>
        <td><select v-model="edituser">
            <option v-for="curruser in users" :value="curruser.id">{{ curruser.name }}</option>
        </select> </td>
        <td><input type="text" v-model="time" /></td>
        <td>{{ row.time * user.price }}</td>
        <td></td>
    </tr>
</template>

<script>
    export default {
        model: {
            prop: 'row',
            event: 'input'
        }
        , props: {
            num: Number,
            row: Object,
            user: Object,
            users: Array
        }

        , computed: {
            name: {
                get(){
                    return this.row.name;
                }
                , set(val){
                    this.row.name = val;
                    this.$emit('input', this.row);
                }
            }

            , edituser: {
                get(){
                    return this.user.id;
                }
                ,set(val){
                    this.row.user_id = val;
                    this.$emit('input', this.row);
                }
            }

            , time: {
                get(){
                    return this.row.time;
                }

                , set(val){
                    this.row.time = parseFloat( val );
                    this.$emit('input', this.row);
                }
            }
        }
    }
</script>

<style>
    input, select {
        padding: .5em 1em;
        width: 100%;
    }


</style>