<template>
    <tr>
        <td>{{ num + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ user.name }}</td>
        <td>{{ row.time }}</td>
        <td>{{ row.time * user.price }}</td>
        <td>
            <Btn @click="$emit('setedit', row.id)">
                <span class="glyphicon glyphicon-pencil"></span>
            </Btn>

            <Btn @click="confirm=true">
                <span class="glyphicon glyphicon-remove"></span>
            </Btn>

            <ConfirmRemove v-model="confirm" @remove="$emit('remove', row.id)"></ConfirmRemove>
        </td>

    </tr>
</template>

<script>
    import {Btn } from 'uiv';
    import ConfirmRemove from './ConfirmRemove';

    export default {
        props: {
            num: Number,
            row: Object,
            user: Object
        }

        , data(){
            return {
                confirm: false
            }
        }
        , components: {  Btn, ConfirmRemove }
    }
</script>