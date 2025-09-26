<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="text-center">
          <!-- NS-CAPS 로고 -->
          <div class="flex justify-center mb-6">
            <NuxtLink to="/" class="relative hover:scale-105 transition-transform">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div class="text-white font-bold text-2xl">NS</div>
              </div>
              <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="heroicons:magnifying-glass" class="h-3.5 w-3.5 text-white" />
              </div>
            </NuxtLink>
          </div>
          
          <h2 class="text-center text-3xl font-bold text-gray-900">
            NS-CAPS 로그인
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            계정이 없으신가요?
            <NuxtLink to="/register" class="font-medium text-blue-600 hover:text-blue-500">
              회원가입하기
            </NuxtLink>
          </p>
        </div>
      </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 이메일 -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.email }"
                  placeholder="your@email.com"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                  {{ errors.email }}
                </p>
              </div>
            </div>

            <!-- 비밀번호 -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.password }"
                  placeholder="비밀번호를 입력하세요"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                  {{ errors.password }}
                </p>
              </div>
            </div>

            <!-- 로그인 유지 & 비밀번호 찾기 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  로그인 상태 유지
                </label>
              </div>

              <div class="text-sm">
                <NuxtLink to="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                  비밀번호를 잊으셨나요?
                </NuxtLink>
              </div>
            </div>

            <!-- 전체 에러 메시지 -->
            <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-600">{{ errors.general }}</p>
            </div>

            <!-- 로그인 버튼 -->
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full btn btn-primary"
                :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              >
                <Icon v-if="isLoading" name="heroicons:arrow-path" class="h-4 w-4 mr-2 animate-spin" />
                {{ isLoading ? '로그인 중...' : '로그인' }}
              </button>
            </div>
          </form>

          <!-- 소셜 로그인 구분선 -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <!-- 소셜 로그인 버튼들 -->
            <div class="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Icon name="ri:kakao-talk-fill" class="h-5 w-5 text-yellow-400" />
                <span class="ml-2">카카오</span>
              </button>

              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Icon name="ri:google-fill" class="h-5 w-5 text-red-500" />
                <span class="ml-2">구글</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

definePageMeta({
  layout: false
})

// 반응형 상태
const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

// 폼 검증
const validateForm = () => {
  // 에러 초기화
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!form.email) {
    errors.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.'
    isValid = false
  }

  if (!form.password) {
    errors.password = '비밀번호를 입력해주세요.'
    isValid = false
  }

  return isValid
}

// 로그인 처리
const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // TODO: 실제 로그인 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이

    // 로그인 성공 시 리다이렉트
    // TODO: 사용자 타입에 따라 다른 페이지로 이동
    const userType = 'customer' // 임시로 customer로 설정
    
    if (userType === 'customer') {
      await navigateTo('/customer/dashboard')
    } else if (userType === 'contractor') {
      await navigateTo('/contractor/dashboard')
    } else if (userType === 'admin') {
      await navigateTo('/admin/dashboard')
    }

  } catch (error) {
    errors.general = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
  } finally {
    isLoading.value = false
  }
}

// 메타 태그 설정
useHead({
  title: '로그인 - 누수케어',
  meta: [
    { name: 'description', content: '누수케어 로그인 페이지입니다.' }
  ]
})
</script>
