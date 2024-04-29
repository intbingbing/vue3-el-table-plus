<template>
  user:{{ input }}
  pass:{{ pass }}
  <el-input v-model="input" style="width: 240px" placeholder="Please input" />
  <el-input v-model="pass" style="width: 240px" type="password" placeholder="Please input password" show-password />
  <el-button type="primary" @click="login" :loading="isLoading">login</el-button>

  <!-- {{ isFetching }} -->
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { useFetch, useStorage } from '@vueuse/core'
import { loginFetch } from '@/api'
const input = ref('vue')
const pass = ref('')
const isLoading = ref(false)
const router = useRouter()

async function login() {
  isLoading.value = true
  console.log(input.value)
  console.log(pass.value)
  // const { isFetching, error, data } = useFetch('https://httpbin.org/get')
  const { userName, token } = await loginFetch()
  console.log(userName, token)
  isLoading.value = false
  useStorage('user', { userName, token })
  router.push('/home')
  // watchEffect(() => {
  //   console.log(isFetching.value, error.value, data.value)
  // }, { immediate: false })
  // router.push('/home')
}
</script>
