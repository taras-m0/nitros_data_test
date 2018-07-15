<template>
    <Modal :value="show" @input="close" auto-focus :header="false">
        <p>Удалить?</p>
        <div slot="footer">
            <btn @click="$emit('close',false)">Нет</btn>
            <btn type="warning" @click="remove">Да</btn>
        </div>
    </Modal>
</template>


<script>
    import {Btn, Modal } from 'uiv';

    export default {
        model: {
            prop: 'show',
            event: 'close'
        }

        , props: {
            show: Boolean
        }

         , methods: {
            remove() {
                this.$emit('close', false);
                this.$emit('remove');
            }

            , close( val ){
                this.$emit('close', val);
            }
        },

        components: {
            Modal, Btn
        }
    }
</script>
