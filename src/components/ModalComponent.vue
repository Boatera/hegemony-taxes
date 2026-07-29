<script lang="ts" setup>
import { useSlots, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const slots = useSlots();
const hasSlot = (name: string) => {
    return !!slots[name];
};

defineProps({
    show: Boolean,
});

const emit = defineEmits(['modal-close']);

const target = ref(null);
onClickOutside(target, () => emit('modal-close'));
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container" ref="target">
                <div class="modal-header">
                    <slot name="header" />
                </div>
                <div class="modal-body">
                    <slot name="content" />
                </div>
                <div v-if="hasSlot('footer')" class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    color: var(--c-white);
}

.modal-container {
    box-shadow: 2px 2px 3em rgba(0, 0, 0, 1);
    border: 1px solid var(--c-grey-500);
    border-radius: 0.45em;
    overflow: hidden;

    width: 19em;
    margin: 6em auto 0 auto;
    background-color: var(--c-app-bg);

    .modal-header {
        background: var(--c-grey-900);
        background: linear-gradient(0deg, var(--c-grey-900) 0%, var(--c-app-bg) 100%);
        border-bottom: 1px solid var(--c-grey-600);
        text-align: center;

        font-weight: bold;
        font-size: 1.5em;
        padding: 0.2em 0;
    }

    .modal-footer {
        background-color: var(--c-grey-900);
        border-top: 1px solid var(--c-grey-600);
        text-align: center;

        font-size: 1.4em;
        padding: 0 0.2em;
    }
}
</style>
