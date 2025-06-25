# setup
## 基本使用
顶级变量可直接用于 template：不需要 return 因为不是函数，不需要返回
```vue
<script setup>
import { ref, reactive, toRefs } from 'vue'

const state = reactive({
    name: 'xxx'
})

const countRef = ref(100)

function addCount () {
    countRef.value++
}
<script>

<template>
    <p @click="addCount">{{countRef}}</p>
    <p>{name}</p>
</template>
```

## 定义属性和事件
```vue
// Child2.vue
<script setup>
import {defineProps, defineEmits } from 'vue'

// 定义属性
const props = defineProps({
    name: String,
    age: Number
})

// 定义事件
const emit = defineEmits(['change', 'delete'])
function deleteHandler() {
    emit('delete', 'aaa')
}
</script>

<template>
    <p>Child2 - name: {{props.name}}, age: {{props.age}}</p>
    <button @click="$emit('change', 'bbb')">change</button>
    <button @click="deleteHandler">delete</button>
</template>
```

## 使用 defineExpose 暴露数据
```vue
<script setup>
import {ref, defineExpose} from 'vue'

const a = ref(101)
const b = 200

defineExpose({
    a,
    b
})
</script>
```

