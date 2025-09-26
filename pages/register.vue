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
            NS-CAPS 회원가입
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?
            <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              로그인하기
            </NuxtLink>
          </p>
        </div>
      </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 사용자 타입 선택 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                가입 유형을 선택해주세요
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="form.userType = 'customer'"
                  class="p-4 border-2 rounded-lg text-center transition-colors"
                  :class="form.userType === 'customer' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  <Icon name="heroicons:user" class="h-6 w-6 mx-auto mb-2" />
                  <div class="font-medium">고객</div>
                  <div class="text-xs text-gray-500">누수 수리가 필요한 분</div>
                </button>
                
                <button
                  type="button"
                  @click="form.userType = 'contractor'"
                  class="p-4 border-2 rounded-lg text-center transition-colors"
                  :class="form.userType === 'contractor' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  <Icon name="heroicons:wrench-screwdriver" class="h-6 w-6 mx-auto mb-2" />
                  <div class="font-medium">업체</div>
                  <div class="text-xs text-gray-500">누수 수리 전문가</div>
                </button>
              </div>
              <p v-if="errors.userType" class="mt-1 text-sm text-red-600">
                {{ errors.userType }}
              </p>
            </div>

            <!-- 이름 -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                {{ form.userType === 'contractor' ? '업체명/대표자명' : '이름' }}
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.name }"
                  :placeholder="form.userType === 'contractor' ? '업체명 또는 대표자명' : '홍길동'"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                  {{ errors.name }}
                </p>
              </div>
            </div>

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

            <!-- 전화번호 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                전화번호
              </label>
              <div class="mt-1">
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.phone }"
                  placeholder="010-1234-5678"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- 업체 추가 정보 -->
            <div v-if="form.userType === 'contractor'" class="space-y-4">
              <!-- 사업자 등록번호 -->
              <div>
                <label for="businessNumber" class="block text-sm font-medium text-gray-700">
                  사업자 등록번호
                </label>
                <div class="mt-1">
                  <input
                    id="businessNumber"
                    v-model="form.businessNumber"
                    type="text"
                    class="input"
                    :class="{ 'border-red-500': errors.businessNumber }"
                    placeholder="123-45-67890"
                  />
                  <p v-if="errors.businessNumber" class="mt-1 text-sm text-red-600">
                    {{ errors.businessNumber }}
                  </p>
                </div>
              </div>

              <!-- 서비스 지역 -->
              <div>
                <label for="serviceArea" class="block text-sm font-medium text-gray-700">
                  주요 서비스 지역
                </label>
                <div class="mt-1">
                  <input
                    id="serviceArea"
                    v-model="form.serviceArea"
                    type="text"
                    class="input"
                    :class="{ 'border-red-500': errors.serviceArea }"
                    placeholder="서울시 강남구, 서초구 등"
                  />
                  <p v-if="errors.serviceArea" class="mt-1 text-sm text-red-600">
                    {{ errors.serviceArea }}
                  </p>
                </div>
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
                  placeholder="8자 이상, 영문+숫자 조합"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                  {{ errors.password }}
                </p>
              </div>
            </div>

            <!-- 비밀번호 확인 -->
            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <div class="mt-1">
                <input
                  id="passwordConfirm"
                  v-model="form.passwordConfirm"
                  type="password"
                  required
                  class="input"
                  :class="{ 'border-red-500': errors.passwordConfirm }"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                <p v-if="errors.passwordConfirm" class="mt-1 text-sm text-red-600">
                  {{ errors.passwordConfirm }}
                </p>
              </div>
            </div>

            <!-- 약관 동의 -->
            <div class="space-y-3">
              <div class="flex items-start">
                <input
                  id="agreeTerms"
                  v-model="form.agreeTerms"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <label for="agreeTerms" class="ml-2 text-sm text-gray-900">
                  <span class="text-red-500">*</span>
                  <NuxtLink to="/terms" class="text-blue-600 hover:text-blue-500">이용약관</NuxtLink>에 동의합니다
                </label>
              </div>
              
              <div class="flex items-start">
                <input
                  id="agreePrivacy"
                  v-model="form.agreePrivacy"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <label for="agreePrivacy" class="ml-2 text-sm text-gray-900">
                  <span class="text-red-500">*</span>
                  <NuxtLink to="/privacy" class="text-blue-600 hover:text-blue-500">개인정보처리방침</NuxtLink>에 동의합니다
                </label>
              </div>

              <div class="flex items-start">
                <input
                  id="agreeMarketing"
                  v-model="form.agreeMarketing"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <label for="agreeMarketing" class="ml-2 text-sm text-gray-900">
                  마케팅 정보 수신에 동의합니다 (선택)
                </label>
              </div>

              <p v-if="errors.agreements" class="text-sm text-red-600">
                {{ errors.agreements }}
              </p>
            </div>

            <!-- 전체 에러 메시지 -->
            <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-600">{{ errors.general }}</p>
            </div>

            <!-- 가입 버튼 -->
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full btn btn-primary"
                :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              >
                <Icon v-if="isLoading" name="heroicons:arrow-path" class="h-4 w-4 mr-2 animate-spin" />
                {{ isLoading ? '가입 중...' : '회원가입' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

definePageMeta({
  layout: false
})

// URL 쿼리에서 사용자 타입 가져오기
const route = useRoute()

// 반응형 상태
const isLoading = ref(false)

const form = reactive({
  userType: route.query.type || 'customer',
  name: '',
  email: '',
  phone: '',
  businessNumber: '',
  serviceArea: '',
  password: '',
  passwordConfirm: '',
  agreeTerms: false,
  agreePrivacy: false,
  agreeMarketing: false
})

const errors = reactive({
  userType: '',
  name: '',
  email: '',
  phone: '',
  businessNumber: '',
  serviceArea: '',
  password: '',
  passwordConfirm: '',
  agreements: '',
  general: ''
})

// 폼 검증
const validateForm = () => {
  // 에러 초기화
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!form.userType) {
    errors.userType = '가입 유형을 선택해주세요.'
    isValid = false
  }

  if (!form.name) {
    errors.name = form.userType === 'contractor' ? '업체명 또는 대표자명을 입력해주세요.' : '이름을 입력해주세요.'
    isValid = false
  }

  if (!form.email) {
    errors.email = '이메일을 입력해주세요.'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '올바른 이메일 형식을 입력해주세요.'
    isValid = false
  }

  if (!form.phone) {
    errors.phone = '전화번호를 입력해주세요.'
    isValid = false
  } else if (!/^010-\d{4}-\d{4}$/.test(form.phone)) {
    errors.phone = '올바른 전화번호 형식을 입력해주세요. (010-0000-0000)'
    isValid = false
  }

  if (form.userType === 'contractor') {
    if (!form.businessNumber) {
      errors.businessNumber = '사업자 등록번호를 입력해주세요.'
      isValid = false
    }
    if (!form.serviceArea) {
      errors.serviceArea = '주요 서비스 지역을 입력해주세요.'
      isValid = false
    }
  }

  if (!form.password) {
    errors.password = '비밀번호를 입력해주세요.'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
    isValid = false
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(form.password)) {
    errors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.'
    isValid = false
  }

  if (!form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해주세요.'
    isValid = false
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    isValid = false
  }

  if (!form.agreeTerms || !form.agreePrivacy) {
    errors.agreements = '필수 약관에 동의해주세요.'
    isValid = false
  }

  return isValid
}

// 회원가입 처리
const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // TODO: 실제 회원가입 API 호출
    await new Promise(resolve => setTimeout(resolve, 1500)) // 임시 딜레이

    // 회원가입 성공 시 로그인 페이지로 이동
    await navigateTo('/auth/login?message=회원가입이 완료되었습니다. 로그인해주세요.')

  } catch (error) {
    errors.general = '회원가입에 실패했습니다. 다시 시도해주세요.'
  } finally {
    isLoading.value = false
  }
}

// 메타 태그 설정
useHead({
  title: '회원가입 - 누수케어',
  meta: [
    { name: 'description', content: '누수케어 회원가입 페이지입니다.' }
  ]
})
</script>
