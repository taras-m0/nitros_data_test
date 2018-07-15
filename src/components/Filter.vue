<template>
    <btn v-if="!show" @click="setShow">
        <span class="glyphicon glyphicon-filter"></span>
    </btn>

    <input v-else :value="value" @input="getValue" @blur="blur" ref="input" />
</template>

<script>
    import { Btn } from 'uiv';

    export default {
        components: {Btn}

        , props: {
            value: String
        }

        , data(){
            return { show: false };
        }

        , methods: {
            setShow(){
                this.show = true;
                this.$nextTick(() => this.$refs.input.focus());
            }

            , getValue(e) {
                e.preventDefault();
                this.$emit('input', e.target.value);
            }

            , blur(e){
                this.show = e.target.value != '';
            }
        }
    }
</script>