<template>
    <div class="w-full">
        <div class="flex flex-col h-full dark:text-black">
            <InputLabel class="text-2xl mb-[10px]">
                Frequency Filter Specifications
            </InputLabel>
            <InputLabel class="mt-[10px]">
                minFreq
            </InputLabel>
            <InputLabel v-if="minError" class="text-red-500">
                {{ errorMessages.minFreq }}
            </InputLabel>
            <TextInput v-model="minFreq" :value="minFreq" v-on:blur="validateFreq()">

            </TextInput>
            <InputLabel class="mt-[10px]">
                maxFreq
            </InputLabel>
            <InputLabel v-if="maxError" class="text-red-500">
                {{ errorMessages.maxFreq }}
            </InputLabel>
            <TextInput v-model="maxFreq" :value="maxFreq" v-on:blur="validateFreq()">

            </TextInput>
            <div class="flex w-full justify-start align-baselien content-end">
                <PrimaryButton class="flex w-2/3 justify-center mt-[20px]" v-on:click="onRestoreDefault($event)">
                    Restore Defaults
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'

const specificationDefaults = {
    minFreq: 0,
    maxFreq: 100
};
const errorMessages = {
    minFreq: "minFreq must be an integer greater than or equal to 0 and less than maxFreq",
    maxFreq: "maxFreq must be an integer greater than or equal to 0 and more than minFreq"
}
let minFreq = specificationDefaults.minFreq
let maxFreq = specificationDefaults.maxFreq
let minError = false
let maxError = false

export default defineComponent({
    components: {
        ApplicationLogo,
        PrimaryButton,
        InputLabel,
        TextInput
    },
    data: function () {
        return {
            specificationDefaults,
            minFreq,
            maxFreq,
            minError,
            maxError,
            errorMessages
        }
    },
    methods: {
        onRestoreDefault: function (event) {
            this.minFreq = specificationDefaults.minFreq
            this.maxFreq = specificationDefaults.maxFreq
            this.minError = false
            this.maxError = false
            this.onChange();
        },
        validateFreq: function () {
            if (isNaN(minFreq)) {
                this.minError = true
                return
            } else if (this.minFreq < 0 || this.minFreq >= this.maxFreq) {
                this.minError = true
                return
            }
            if (isNaN(this.maxFreq)) {
                this.maxError = true
                return
            } else if (this.maxFreq <= this.minFreq) {
                this.maxError = true
                return
            }
            this.maxError = false;
            this.minError = false;           
            this.onChange();
            return
        },
        onChange: function () {
            if (!this.maxError && !this.minError) {
                let frequencyFilter = {
                    min_freq: this.minFreq,
                    max_freq: this.maxFreq,
                }
                this.$emit("frequencyFilterChanged", frequencyFilter)
            }
            return
        }
    }
})

</script>
