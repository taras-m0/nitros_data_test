<template>
    <btn @click="setSort">
        <span v-if="direction == 0" class="glyphicon glyphicon-sort"></span>
        <span v-else-if="direction > 0" class="glyphicon glyphicon-arrow-up"></span>
        <span v-else class="glyphicon glyphicon-arrow-down"></span>
    </btn>
</template>

<script>
    import { Btn } from 'uiv';

    export default {
        props: {
            direction: Number
            , type: String
        }

        , components: { Btn }

        , methods: {
            setSort(){
                this.$emit('sort', this.type, this.direction > 0 ? -1 : 1)
            }
        }
    }
</script>