<script lang="ts">
import { defineComponent } from 'vue';

const isNaN = Number.isNaN || window.isNaN;
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/;
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/;
const normalizeDecimalNumber = (value: number, times = 100000000000) =>
    REGEXP_DECIMALS.test(String(value)) ? Math.round(value * times) / times : value;

const setInterval = window.setInterval;
const clearInterval = window.clearInterval;
const setTimeout = window.setTimeout;

export default defineComponent({
    name: 'NumberInput',

    props: {
        attrs: {
            type: Object,
            default: undefined,
        },

        center: Boolean,
        disabled: Boolean,

        inline: Boolean,

        max: {
            type: Number,
            default: Infinity,
        },

        min: {
            type: Number,
            default: -Infinity,
        },

        intervalDelay: {
            type: Number,
            default: 350,
        },

        intervalTimeout: {
            type: Number,
            default: 150,
        },

        name: {
            type: String,
            default: undefined,
        },

        placeholder: {
            type: String,
            default: undefined,
        },

        readonly: Boolean,
        rounded: Boolean,

        size: {
            type: String,
            default: undefined,
        },

        step: {
            type: Number,
            default: 1,
        },

        modelValue: {
            type: Number,
            default: NaN,
        },
    },

    emits: ['update:modelValue'],

    data() {
        return {
            value: NaN,
            touchActive: false,
            activeIntervals: [] as any[],
        };
    },

    computed: {
        increasable(): boolean {
            return isNaN(this.value) || this.value < this.max;
        },
        decreasable(): boolean {
            return isNaN(this.value) || this.value > this.min;
        },
    },

    watch: {
        modelValue: {
            immediate: true,
            handler(newValue, oldValue) {
                if (
                    // Avoid triggering change event when created
                    !(isNaN(newValue) && typeof oldValue === 'undefined') &&
                    // Avoid infinite loop
                    newValue !== this.value
                ) {
                    this.setValue(newValue);
                }
            },
        },
    },

    methods: {
        isNaN,
        change(event: any) {
            this.setValue(event.target.value);
        },
        paste(event: ClipboardEvent) {
            const clipboardData = event.clipboardData || (window as any).clipboardData;
            if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
                event.preventDefault();
            }
        },

        touchStarted(fn: Function) {
            this.touchActive = true;
            fn();
            setTimeout(() => {
                if (!this.touchActive) return;
                this.activeIntervals.push(
                    setInterval(() => {
                        if (this.touchActive) fn();
                    }, this.intervalTimeout),
                );
            }, this.intervalDelay);
        },
        touchEnded() {
            this.touchActive = false;
            let i = 0;
            while ((i = this.activeIntervals.pop())) {
                clearInterval(i);
            }
        },
        decrease() {
            if (this.decreasable) {
                let { value } = this;

                if (isNaN(value)) {
                    value = 0;
                }

                this.setValue(normalizeDecimalNumber(value - this.step));
            }
        },

        /**
         * Increase the value.
         */
        increase() {
            if (this.increasable) {
                let { value } = this;

                if (isNaN(value)) {
                    value = 0;
                }

                this.setValue(normalizeDecimalNumber(value + this.step));
            }
        },

        /**
         * Set new value and dispatch change event.
         * @param {number} value - The new value to set.
         */
        setValue(value: number) {
            const oldValue = this.value;
            let newValue = typeof value !== 'number' ? parseFloat(value) : value;

            if (!isNaN(newValue)) {
                if (this.min <= this.max) {
                    newValue = Math.min(this.max, Math.max(this.min, newValue));
                }

                if (this.rounded) {
                    newValue = Math.round(newValue);
                }
            }

            this.value = newValue;

            if (newValue === oldValue) {
                // Force to override the number in the input box (#13).
                (this.$refs.input as HTMLInputElement).value = String(newValue);
            }

            this.$emit('update:modelValue', newValue, oldValue);
        },
    },
});
</script>

<template>
    <div class="number-input">
        <button
            class="number-input-button pointer number-input-button-minus"
            type="button"
            tabindex="-1"
            :disabled="disabled || readonly || !decreasable"
            @mousedown.prevent="touchStarted(decrease)"
            @touchstart.prevent="touchStarted(decrease)"
            @mouseup.prevent="touchEnded"
            @touchend.prevent="touchEnded"
            @mouseout="touchEnded"
        />
        <input
            ref="input"
            class="number-input-input"
            v-bind="attrs"
            type="number"
            :name="name"
            :value="isNaN(value) ? '' : value"
            :min="min"
            :max="max"
            :step="step"
            :readonly="readonly"
            :disabled="disabled || (!decreasable && !increasable)"
            :placeholder="placeholder"
            autocomplete="off"
            @change="change"
            @paste="paste"
        />
        <button
            class="number-input-button pointer number-input-button-plus"
            type="button"
            tabindex="-1"
            :disabled="disabled || readonly || !increasable"
            @mousedown.prevent="touchStarted(increase)"
            @touchstart.prevent="touchStarted(increase)"
            @mouseup.prevent="touchEnded"
            @touchend.prevent="touchEnded"
            @mouseout="touchEnded"
        />
    </div>
</template>

<style lang="scss">
@use '@/assets/styles/breakpoints' as bp;

.number-input {
    display: block;
    font-size: 0;
    max-width: 100%;
    overflow: hidden;
    position: relative;

    border-radius: 0.4rem;
    border: 1px solid var(--c-grey-800);

    & > input {
        -moz-appearance: textfield;
        text-align: center;
        border-radius: 0.4rem;
        font-size: 1.25rem;
        padding: 0.5rem 0;

        font-weight: bold;
        width: 100%;

        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid var(--c-grey-250);
        display: block;
        line-height: 1.3;
        max-width: 100%;
        transition: border-color 0.15s;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        &:focus {
            outline: none;
        }

        &:disabled,
        &[readonly] {
            background-color: var(--c-off-white);
        }
    }

    & > .number-input-button {
        background-color: rgba(255, 255, 255, 0.6);
        border: 0;
        bottom: 1px;
        position: absolute;
        top: 1px;
        width: 3.2rem;
        z-index: 1;
        transition:
            background-color 0.15s var(--ease),
            transform 0.08s var(--ease);

        &:focus {
            outline: none;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.85);

            &::before,
            &::after {
                background-color: var(--c-grey-900);
            }
        }

        &:active {
            transform: scale(0.92);
        }

        &:disabled {
            opacity: 0.65;

            &::before,
            &::after {
                background-color: rgba(119, 119, 119, 0.75);
            }
        }

        &::before,
        &::after {
            background-color: var(--c-black);
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: background-color 0.15s;
        }

        &::before {
            height: 2px;
            width: 35%;
        }

        &::after {
            height: 40%;
            width: 2px;
        }

        &.number-input-button-minus {
            border-bottom-right-radius: 0;
            border-right: 1px solid var(--c-grey-250);
            border-top-right-radius: 0;
            left: 1px;

            &::after {
                visibility: hidden;
            }
        }

        &.number-input-button-plus {
            border-bottom-left-radius: 0;
            border-left: 1px solid var(--c-grey-250);
            border-top-left-radius: 0;
            right: 1px;
        }

        @include bp.between('md', 'lg') {
            width: 2.6rem;

            &::after {
                height: 35%;
            }
        }

        @include bp.below('md') {
            width: 2.85rem;

            &::after {
                height: 36%;
            }
        }
    }
}
</style>
