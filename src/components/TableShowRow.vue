<template>
    <tr>
        <td>{{ num + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ user.name }}</td>
        <td>{{ row.time }}</td>
        <td>{{ row.time * user.price }}</td>
        <td>
            <button class="button button-default" @click="$emit('setedit', row.id)">
                <span class="glyphicon glyphicon-pencil"></span>
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            num: Number,
            row: Object,
            user: Object
        }
    }
</script>