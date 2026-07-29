<script setup lang="ts">
const { min, max, format, indicatorClass } = defineProps<{
    min: number | string;
    max: number | string;
    indicatorClass?: string;
    format?: (x: number) => string | number;
}>();

const value = defineModel('value', { default: 0, type: Number });
const indicator = defineModel('indicator', { default: undefined, type: Number });

function setValue(num: number) {
    value.value = num;
}

function _(num: number) {
    return num - 1 + Number(min);
}

function count() {
    return Number(max) - Number(min);
}
</script>

<template>
    <div class="wrapper" :class="{ tight: count() > 9 }">
        <div class="range">
            <div class="range-slider">
                <div class="sliderthumbs no-select">
                    <span v-for="i in count() + 1" v-bind:key="i" class="sliderthumb-container">
                        <span>&nbsp;</span>
                        <div
                            @click.prevent="() => setValue(_(i))"
                            class="sliderthumb-label pointer"
                            :class="{ active: value == _(i), [indicatorClass || 'indicator-warn']: indicator == _(i) }"
                        >
                            {{ format ? format(_(i)) : _(i) }}
                        </div>
                    </span>
                </div>
                <div class="slider">
                    <input type="range" v-model="value" :min="min" :max="max" step="1" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    color: var(--c-grey-700);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2em 0.4em;
}

.range {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
    width: 100%;
}

.range-slider {
    flex: 1;
}

.sliderthumbs {
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0.8em 10px;

    margin-top: 0px;
}

.sliderthumbs span {
    display: flex;
    justify-content: center;
    width: 1px;
    margin-top: 0px;
}

.sliderthumb-label {
    position: absolute;
    padding: 0.1em;
    min-width: 2em;
    text-align: center;

    font-weight: bold;
    font-size: 1.4em;
    color: var(--c-grey-200);

    opacity: 0.6;
    text-shadow: var(--c-slider-label-shadow) 0 0 4px;
}

.sliderthumb-container:first-child .sliderthumb-label {
    min-width: 1.25em;
    margin-left: 0.75em;
    padding-right: 0.75em;
}

.sliderthumb-container:last-child .sliderthumb-label {
    min-width: 1.25em;
    margin-right: 0.75em;
    padding-left: 0.75em;
}

.tight .sliderthumb-label {
    min-width: 1.5em;
    font-size: 1.25em;
}

.sliderthumb-container:first-child .sliderthumb-label {
    min-width: 1em;
    margin-left: 0.5em;
    padding-right: 0.5em;
}

.sliderthumb-container:last-child .sliderthumb-label {
    min-width: 1em;
    margin-right: 0.5em;
    padding-left: 0.5em;
}

.sliderthumb-label.active {
    opacity: 1;
    color: var(--c-white);
    text-shadow: var(--c-slider-label-shadow) 0 0 5px;
}

.slider {
    margin-right: 4px;
}

/*=============
End tick marks
=========================*/

input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    width: 100%;
}

/* Styles Firefox */
input[type='range']:focus,
input[type='range']:focus::-moz-range-thumb {
    outline: none;
}

input[type='range']::-moz-range-track {
    background-color: var(--c-slider-track);
    border-radius: 1em;
    height: 0.4em;
}

input[type='range']::-moz-range-thumb {
    background-color: var(--c-slider-thumb);
    border: 1px solid var(--c-slider-thumb-border);
    box-shadow: var(--c-slider-thumb-shadow) 0px 0px 4px;
    border-radius: 1.2em;
    height: 1em;
    width: 1em;
    transition: 0.2s ease-in-out;
}

/* Styles Webkit */
input[type='range']:focus::-webkit-slider-thumb {
    outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
    background-color: var(--c-slider-track);
    border-radius: 1em;
    height: 0.4em;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -0.4em;
}

input[type='range']::-webkit-slider-thumb {
    background-color: var(--c-slider-thumb);
    border: 1px solid var(--c-slider-thumb-border);
    box-shadow: var(--c-slider-thumb-shadow) 0px 0px 4px;
    border-radius: 1.2em;
    height: 1em;
    width: 1em;
    transition: 0.2s ease-in-out;
}

input[type='range']:hover::-moz-range-thumb {
    background-color: var(--c-slider-thumb-hover);
    box-shadow: var(--c-slider-thumb-shadow) 0px 0px 7px;
}

input[type='range']:hover::-webkit-slider-thumb {
    background-color: var(--c-slider-thumb-hover);
    box-shadow: var(--c-slider-thumb-shadow) 0px 0px 7px;
}
</style>
