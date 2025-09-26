<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- 헤더 -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center space-x-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Icon name="heroicons:arrow-left" class="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">누수 신고하기 💧</h1>
            <p class="text-gray-600 mt-1">3단계로 간단하게 신고 완료!</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 진행 단계 표시 -->
      <div class="mb-8">
        <div class="flex items-center justify-center mb-6">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <!-- 단계 원형 아이콘 -->
            <div class="relative">
              <div
                class="flex items-center justify-center w-12 h-12 rounded-2xl text-sm font-bold transition-all duration-300"
                :class="currentStep >= index + 1 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-110' 
                  : 'bg-gray-200 text-gray-500'"
              >
                <Icon 
                  v-if="currentStep > index + 1"
                  name="heroicons:check" 
                  class="h-6 w-6" 
                />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div 
                v-if="currentStep === index + 1"
                class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-75 animate-pulse"
              ></div>
            </div>
            
            <!-- 단계 제목 -->
            <div class="ml-3 mr-8">
              <div
                class="text-sm font-semibold transition-colors"
                :class="currentStep >= index + 1 ? 'text-blue-600' : 'text-gray-500'"
              >
                {{ step }}
              </div>
              <div 
                v-if="currentStep === index + 1"
                class="text-xs text-blue-500 font-medium"
              >
                진행 중...
              </div>
            </div>
            
            <!-- 연결선 -->
            <div
              v-if="index < steps.length - 1"
              class="hidden sm:block w-16 h-1 rounded-full transition-all duration-500"
              :class="currentStep > index + 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gray-200'"
            ></div>
          </div>
        </div>
      </div>

      <!-- 메인 컨텐츠 카드 -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- 카드 헤더 -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <Icon :name="getStepIcon(currentStep)" class="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">
                {{ steps[currentStep - 1] }}
              </h2>
              <p class="text-gray-600 text-sm mt-1">
                {{ getStepDescription(currentStep) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 카드 본문 -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleNext">
            <!-- Step 1: 기본 정보 -->
            <div v-if="currentStep === 1" class="space-y-8">
              <!-- 누수 위치 -->
              <div>
                <label class="block text-lg font-semibold text-gray-900 mb-2">
                  🏠 어디서 누수가 발생했나요?
                </label>
                <p class="text-gray-600 mb-6">정확한 위치를 선택하면 더 정확한 견적을 받을 수 있어요</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    v-for="location in leakLocations"
                    :key="location.value"
                    type="button"
                    @click="form.location = location.value"
                    class="group relative p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg"
                    :class="form.location === location.value 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-blue-300 bg-white'"
                  >
                    <div class="flex items-center space-x-4">
                      <div 
                        class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
                        :class="form.location === location.value 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                          : 'bg-gray-100 group-hover:bg-blue-100'"
                      >
                        <Icon 
                          :name="location.icon" 
                          class="h-6 w-6 transition-colors" 
                          :class="form.location === location.value ? 'text-white' : 'text-gray-600'"
                        />
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-gray-900 mb-1">{{ location.label }}</div>
                        <div class="text-sm text-gray-500">{{ location.description }}</div>
                      </div>
                      <div 
                        v-if="form.location === location.value"
                        class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <Icon name="heroicons:check" class="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </button>
                </div>
                
                <div v-if="errors.location" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p class="text-sm text-red-600 flex items-center">
                    <Icon name="heroicons:exclamation-triangle" class="h-4 w-4 mr-2" />
                    {{ errors.location }}
                  </p>
                </div>
              </div>

            <!-- 누수 증상 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                어떤 증상인가요? <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <div
                  v-for="symptom in leakSymptoms"
                  :key="symptom.value"
                  class="flex items-center"
                >
                  <input
                    :id="symptom.value"
                    v-model="form.symptoms"
                    :value="symptom.value"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label :for="symptom.value" class="ml-2 text-sm text-gray-900">
                    {{ symptom.label }}
                  </label>
                </div>
              </div>
              <p v-if="errors.symptoms" class="mt-1 text-sm text-red-600">
                {{ errors.symptoms }}
              </p>
            </div>

            <!-- 긴급도 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                긴급도를 선택해주세요 <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="urgency in urgencyLevels"
                  :key="urgency.value"
                  type="button"
                  @click="form.urgency = urgency.value"
                  class="p-3 border-2 rounded-lg text-center transition-colors"
                  :class="form.urgency === urgency.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'"
                >
                  <div class="font-medium" :class="urgency.color">{{ urgency.label }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ urgency.description }}</div>
                </button>
              </div>
              <p v-if="errors.urgency" class="mt-1 text-sm text-red-600">
                {{ errors.urgency }}
              </p>
            </div>
          </div>

          <!-- Step 2: 주소 정보 -->
          <div v-if="currentStep === 2" class="space-y-6">
            <!-- 주소 검색 -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">
                주소 <span class="text-red-500">*</span>
              </label>
              <div class="mt-1 flex">
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  required
                  readonly
                  class="input flex-1"
                  placeholder="우편번호 검색 버튼을 클릭하세요"
                />
                <button
                  type="button"
                  @click="openAddressSearch"
                  class="ml-2 btn btn-secondary"
                >
                  우편번호 검색
                </button>
              </div>
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">
                {{ errors.address }}
              </p>
            </div>

            <!-- 상세 주소 -->
            <div>
              <label for="addressDetail" class="block text-sm font-medium text-gray-700">
                상세주소
              </label>
              <div class="mt-1">
                <input
                  id="addressDetail"
                  v-model="form.addressDetail"
                  type="text"
                  class="input"
                  placeholder="동, 호수 등 상세주소를 입력하세요"
                />
              </div>
            </div>

            <!-- 연락처 -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                연락처 <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="input"
                  placeholder="010-0000-0000"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                  {{ errors.phone }}
                </p>
              </div>
            </div>

            <!-- 방문 가능 시간 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                방문 가능 시간을 선택해주세요
              </label>
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="time in availableTimes"
                  :key="time.value"
                  class="flex items-center"
                >
                  <input
                    :id="time.value"
                    v-model="form.availableTimes"
                    :value="time.value"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label :for="time.value" class="ml-2 text-sm text-gray-900">
                    {{ time.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: 사진 업로드 및 추가 정보 -->
          <div v-if="currentStep === 3" class="space-y-6">
            <!-- 사진 업로드 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                누수 상황 사진 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-3">
                <div
                  class="upload-zone"
                  @drop="handleFileDrop"
                  @dragover.prevent
                  @dragenter.prevent
                  @click="$refs.fileInput.click()"
                >
                  <Icon name="heroicons:camera" class="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p class="text-gray-600">클릭하거나 파일을 드래그하여 사진을 업로드하세요</p>
                  <p class="text-xs text-gray-500 mt-2">최대 5장, JPG/PNG 파일만 가능</p>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
                
                <!-- 업로드된 이미지 미리보기 -->
                <div v-if="form.images.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div
                    v-for="(image, index) in form.images"
                    :key="index"
                    class="relative group"
                  >
                    <img
                      :src="image.preview"
                      :alt="`누수 사진 ${index + 1}`"
                      class="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <p v-if="errors.images" class="mt-1 text-sm text-red-600">
                {{ errors.images }}
              </p>
            </div>

            <!-- 추가 설명 -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">
                추가 설명
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="input"
                  placeholder="누수 상황에 대한 자세한 설명을 입력해주세요"
                ></textarea>
              </div>
            </div>

            <!-- 추가비용 발생 가능성 동의 -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start">
                <Icon name="heroicons:exclamation-triangle" class="h-5 w-5 text-yellow-600 mt-0.5" />
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">추가비용 발생 가능성 안내</h3>
                  <p class="text-sm text-yellow-700 mt-1">
                    현장 확인 후 예상보다 복잡한 작업이 필요할 경우 추가비용이 발생할 수 있습니다. 
                    추가비용은 반드시 고객님의 승인 후에만 진행됩니다.
                  </p>
                  <div class="mt-3">
                    <label class="flex items-center">
                      <input
                        v-model="form.agreeAdditionalCost"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span class="ml-2 text-sm text-yellow-800">
                        추가비용 발생 가능성에 대해 이해했으며 동의합니다 <span class="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <p v-if="errors.agreeAdditionalCost" class="mt-2 text-sm text-red-600">
                {{ errors.agreeAdditionalCost }}
              </p>
            </div>
          </div>

          <!-- 네비게이션 버튼 -->
          <div class="flex justify-between pt-6 border-t border-gray-200">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="btn btn-secondary"
            >
              이전
            </button>
            <div v-else></div>

            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              <Icon v-if="isLoading" name="heroicons:arrow-path" class="h-4 w-4 mr-2 animate-spin" />
              {{ currentStep === 3 ? '신고 완료' : '다음' }}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 단계 정보
const steps = ['기본 정보', '주소 정보', '사진 및 추가 정보']
const currentStep = ref(1)
const isLoading = ref(false)

// 폼 데이터
const form = reactive({
  location: '',
  symptoms: [],
  urgency: '',
  address: '',
  addressDetail: '',
  phone: '',
  availableTimes: [],
  images: [],
  description: '',
  agreeAdditionalCost: false
})

// 에러 상태
const errors = reactive({
  location: '',
  symptoms: '',
  urgency: '',
  address: '',
  phone: '',
  images: '',
  agreeAdditionalCost: ''
})

// 선택 옵션들
const leakLocations = [
  { value: 'bathroom', label: '화장실', description: '변기, 세면대, 샤워실', icon: 'heroicons:home' },
  { value: 'kitchen', label: '주방', description: '싱크대, 배수구', icon: 'heroicons:home-modern' },
  { value: 'balcony', label: '베란다', description: '배수관, 세탁기', icon: 'heroicons:building-office' },
  { value: 'living', label: '거실/방', description: '벽, 천장, 바닥', icon: 'heroicons:home' },
  { value: 'external', label: '외부', description: '옥상, 외벽', icon: 'heroicons:building-office-2' },
  { value: 'other', label: '기타', description: '기타 위치', icon: 'heroicons:ellipsis-horizontal' }
]

const leakSymptoms = [
  { value: 'dripping', label: '물이 뚝뚝 떨어져요' },
  { value: 'flowing', label: '물이 흘러나와요' },
  { value: 'wet_wall', label: '벽이 젖어있어요' },
  { value: 'wet_ceiling', label: '천장이 젖어있어요' },
  { value: 'mold', label: '곰팡이가 생겼어요' },
  { value: 'water_stain', label: '물얼룩이 생겼어요' },
  { value: 'pipe_visible', label: '배관이 보여요' },
  { value: 'noise', label: '물소리가 나요' }
]

const urgencyLevels = [
  { 
    value: 'low', 
    label: '여유있음', 
    description: '일주일 내', 
    color: 'text-green-600' 
  },
  { 
    value: 'medium', 
    label: '보통', 
    description: '2-3일 내', 
    color: 'text-yellow-600' 
  },
  { 
    value: 'high', 
    label: '긴급', 
    description: '당일/내일', 
    color: 'text-red-600' 
  }
]

const availableTimes = [
  { value: 'morning', label: '오전 (9:00-12:00)' },
  { value: 'afternoon', label: '오후 (13:00-17:00)' },
  { value: 'evening', label: '저녁 (18:00-21:00)' },
  { value: 'weekend', label: '주말' },
  { value: 'weekday', label: '주중' },
  { value: 'anytime', label: '언제든 가능' }
]

// 폼 검증
const validateCurrentStep = () => {
  // 에러 초기화
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (currentStep.value === 1) {
    if (!form.location) {
      errors.location = '누수 위치를 선택해주세요.'
      isValid = false
    }
    if (form.symptoms.length === 0) {
      errors.symptoms = '증상을 선택해주세요.'
      isValid = false
    }
    if (!form.urgency) {
      errors.urgency = '긴급도를 선택해주세요.'
      isValid = false
    }
  } else if (currentStep.value === 2) {
    if (!form.address) {
      errors.address = '주소를 입력해주세요.'
      isValid = false
    }
    if (!form.phone) {
      errors.phone = '연락처를 입력해주세요.'
      isValid = false
    }
  } else if (currentStep.value === 3) {
    if (form.images.length === 0) {
      errors.images = '누수 상황 사진을 업로드해주세요.'
      isValid = false
    }
    if (!form.agreeAdditionalCost) {
      errors.agreeAdditionalCost = '추가비용 발생 가능성에 동의해주세요.'
      isValid = false
    }
  }

  return isValid
}

// 다음 단계 처리
const handleNext = async () => {
  if (!validateCurrentStep()) {
    return
  }

  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    // 마지막 단계 - 신고 완료
    await submitRequest()
  }
}

// 신고 제출
const submitRequest = async () => {
  isLoading.value = true

  try {
    // TODO: 실제 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 성공 시 견적 대기 페이지로 이동
    await navigateTo('/customer/quotes?success=true')

  } catch (error) {
    alert('신고 제출에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isLoading.value = false
  }
}

// 주소 검색
const openAddressSearch = () => {
  // TODO: 카카오 주소 API 연동
  // 임시로 더미 주소 설정
  form.address = '서울특별시 강남구 역삼동 123-45'
}

// 파일 처리
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

const handleFileDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

const addFiles = (files) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  if (form.images.length + imageFiles.length > 5) {
    alert('최대 5장까지만 업로드 가능합니다.')
    return
  }

  imageFiles.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.images.push({
        file,
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.images.splice(index, 1)
}

// 단계별 아이콘 및 설명
const getStepIcon = (step) => {
  const iconMap = {
    1: 'heroicons:information-circle',
    2: 'heroicons:map-pin',
    3: 'heroicons:camera'
  }
  return iconMap[step] || 'heroicons:information-circle'
}

const getStepDescription = (step) => {
  const descriptionMap = {
    1: '누수 위치와 증상을 알려주세요',
    2: '정확한 주소와 연락처를 입력해주세요',
    3: '사진과 추가 정보를 입력해주세요'
  }
  return descriptionMap[step] || ''
}

// 메타 태그 설정
useHead({
  title: '누수 신고 - 누수케어',
  meta: [
    { name: 'description', content: '누수 상황을 신고하고 전문가의 도움을 받으세요' }
  ]
})
</script>
