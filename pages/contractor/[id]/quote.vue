<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center">
          <button @click="$router.back()" class="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <Icon name="heroicons:arrow-left" class="h-6 w-6 text-gray-600" />
          </button>
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
              <Icon name="heroicons:user-circle" class="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ contractor?.name }}님에게 견적 요청</h1>
              <p class="text-gray-600">{{ contractor?.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Request Form -->
    <section class="py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="submitQuoteRequest" class="space-y-8">
          <!-- Step Indicator -->
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center">
              <div 
                v-for="(step, index) in steps" 
                :key="step.id"
                class="flex items-center"
              >
                <div 
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                    currentStep >= index + 1 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <span 
                  :class="[
                    'ml-3 font-medium text-sm',
                    currentStep >= index + 1 ? 'text-blue-600' : 'text-gray-500'
                  ]"
                >
                  {{ step.title }}
                </span>
                <div 
                  v-if="index < steps.length - 1"
                  :class="[
                    'w-16 h-0.5 mx-6',
                    currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                ></div>
              </div>
            </div>
          </div>

          <!-- Step 1: 누수 정보 -->
          <div v-if="currentStep === 1" class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">누수 정보를 알려주세요</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- 누수 종류 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">누수 종류 *</label>
                <div class="grid grid-cols-2 gap-3">
                  <label 
                    v-for="type in leakTypes" 
                    :key="type.value"
                    class="relative cursor-pointer"
                  >
                    <input 
                      v-model="quoteForm.leakType"
                      :value="type.value"
                      type="radio" 
                      class="sr-only"
                    />
                    <div 
                      :class="[
                        'p-4 border-2 rounded-xl text-center transition-all',
                        quoteForm.leakType === type.value 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      ]"
                    >
                      <Icon :name="type.icon" class="h-8 w-8 mx-auto mb-2" />
                      <p class="font-medium">{{ type.label }}</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- 긴급도 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">긴급도 *</label>
                <div class="space-y-3">
                  <label 
                    v-for="urgency in urgencyLevels" 
                    :key="urgency.value"
                    class="flex items-center cursor-pointer"
                  >
                    <input 
                      v-model="quoteForm.urgency"
                      :value="urgency.value"
                      type="radio" 
                      class="form-radio h-5 w-5 text-blue-600"
                    />
                    <div class="ml-3">
                      <p class="font-medium text-gray-900">{{ urgency.label }}</p>
                      <p class="text-sm text-gray-500">{{ urgency.description }}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- 상세 설명 -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">상세 설명</label>
              <textarea 
                v-model="quoteForm.description"
                rows="4"
                placeholder="누수 상황을 자세히 설명해주세요. (언제부터, 어느 부분에서, 어느 정도의 양 등)"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <!-- Step 2: 위치 및 연락처 -->
          <div v-if="currentStep === 2" class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">위치 및 연락처 정보</h2>
            
            <div class="space-y-6">
              <!-- 주소 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">주소 *</label>
                <div class="space-y-3">
                  <div class="flex gap-3">
                    <input 
                      v-model="quoteForm.address.zipcode"
                      type="text" 
                      placeholder="우편번호"
                      class="w-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readonly
                    />
                    <button 
                      type="button"
                      @click="searchAddress"
                      class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input 
                    v-model="quoteForm.address.street"
                    type="text" 
                    placeholder="기본 주소"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
                  />
                  <input 
                    v-model="quoteForm.address.detail"
                    type="text" 
                    placeholder="상세 주소 (동, 호수 등)"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <!-- 연락처 정보 -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">이름 *</label>
                  <input 
                    v-model="quoteForm.contact.name"
                    type="text" 
                    placeholder="실명을 입력해주세요"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">연락처 *</label>
                  <input 
                    v-model="quoteForm.contact.phone"
                    type="tel" 
                    placeholder="010-0000-0000"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <!-- 방문 희망 시간 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">방문 희망 시간</label>
                <div class="grid md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">희망 날짜</label>
                    <input 
                      v-model="quoteForm.preferredDate"
                      type="date" 
                      :min="today"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">시작 시간</label>
                    <select v-model="quoteForm.preferredTimeStart" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">선택</option>
                      <option value="09:00">오전 9시</option>
                      <option value="10:00">오전 10시</option>
                      <option value="11:00">오전 11시</option>
                      <option value="14:00">오후 2시</option>
                      <option value="15:00">오후 3시</option>
                      <option value="16:00">오후 4시</option>
                      <option value="17:00">오후 5시</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">종료 시간</label>
                    <select v-model="quoteForm.preferredTimeEnd" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">선택</option>
                      <option value="12:00">오후 12시</option>
                      <option value="13:00">오후 1시</option>
                      <option value="15:00">오후 3시</option>
                      <option value="16:00">오후 4시</option>
                      <option value="17:00">오후 5시</option>
                      <option value="18:00">오후 6시</option>
                      <option value="19:00">오후 7시</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: 사진 업로드 -->
          <div v-if="currentStep === 3" class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">누수 사진 업로드</h2>
            
            <!-- 업로드 영역 -->
            <div class="space-y-6">
              <div 
                @drop="handleDrop"
                @dragover.prevent
                @dragenter.prevent
                class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors"
              >
                <Icon name="heroicons:cloud-arrow-up" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p class="text-lg font-medium text-gray-900 mb-2">사진을 업로드해주세요</p>
                <p class="text-gray-500 mb-4">파일을 드래그하거나 클릭하여 업로드</p>
                <input 
                  ref="fileInput"
                  type="file" 
                  multiple 
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />
                <button 
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  파일 선택
                </button>
                <p class="text-xs text-gray-500 mt-2">JPG, PNG 파일만 업로드 가능 (최대 5MB, 10장)</p>
              </div>

              <!-- 업로드된 이미지 미리보기 -->
              <div v-if="quoteForm.images.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                  v-for="(image, index) in quoteForm.images" 
                  :key="index"
                  class="relative group"
                >
                  <img 
                    :src="image.preview" 
                    :alt="`업로드된 이미지 ${index + 1}`"
                    class="w-full h-32 object-cover rounded-xl"
                  />
                  <button 
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="heroicons:x-mark" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- 추가 요청사항 -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">추가 요청사항</label>
              <textarea 
                v-model="quoteForm.additionalRequests"
                rows="3"
                placeholder="작업 시 주의사항이나 특별한 요청사항이 있다면 알려주세요"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Step 4: 확인 및 제출 -->
          <div v-if="currentStep === 4" class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">견적 요청 확인</h2>
            
            <!-- 요청 내용 요약 -->
            <div class="space-y-6">
              <!-- 누수 정보 -->
              <div class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">누수 정보</h3>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">누수 종류:</span>
                    <span class="ml-2 font-medium">{{ getLeakTypeLabel(quoteForm.leakType) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">긴급도:</span>
                    <span class="ml-2 font-medium">{{ getUrgencyLabel(quoteForm.urgency) }}</span>
                  </div>
                </div>
                <div v-if="quoteForm.description" class="mt-3">
                  <span class="text-gray-500">상세 설명:</span>
                  <p class="mt-1 text-gray-900">{{ quoteForm.description }}</p>
                </div>
              </div>

              <!-- 연락처 정보 -->
              <div class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">연락처 정보</h3>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">이름:</span>
                    <span class="ml-2 font-medium">{{ quoteForm.contact.name }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">연락처:</span>
                    <span class="ml-2 font-medium">{{ quoteForm.contact.phone }}</span>
                  </div>
                </div>
                <div class="mt-3">
                  <span class="text-gray-500">주소:</span>
                  <p class="mt-1 text-gray-900">
                    {{ quoteForm.address.street }} {{ quoteForm.address.detail }}
                  </p>
                </div>
              </div>

              <!-- 방문 희망 시간 -->
              <div v-if="quoteForm.preferredDate" class="border-b border-gray-200 pb-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">방문 희망 시간</h3>
                <p class="text-gray-900">
                  {{ formatDate(quoteForm.preferredDate) }}
                  <span v-if="quoteForm.preferredTimeStart && quoteForm.preferredTimeEnd">
                    {{ quoteForm.preferredTimeStart }} ~ {{ quoteForm.preferredTimeEnd }}
                  </span>
                </p>
              </div>

              <!-- 업로드된 사진 -->
              <div v-if="quoteForm.images.length">
                <h3 class="text-lg font-bold text-gray-900 mb-3">업로드된 사진 ({{ quoteForm.images.length }}장)</h3>
                <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
                  <img 
                    v-for="(image, index) in quoteForm.images" 
                    :key="index"
                    :src="image.preview" 
                    :alt="`사진 ${index + 1}`"
                    class="w-full h-20 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <!-- 개인정보 동의 -->
            <div class="mt-8 p-4 bg-gray-50 rounded-xl">
              <label class="flex items-start cursor-pointer">
                <input 
                  v-model="quoteForm.privacyAgreed"
                  type="checkbox" 
                  class="form-checkbox h-5 w-5 text-blue-600 mt-0.5"
                />
                <div class="ml-3">
                  <p class="font-medium text-gray-900">개인정보 수집 및 이용 동의 (필수)</p>
                  <p class="text-sm text-gray-600 mt-1">
                    견적 제공을 위한 개인정보 수집 및 이용에 동의합니다. 
                    <button type="button" class="text-blue-600 underline">자세히 보기</button>
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between pt-6">
            <button 
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              이전
            </button>
            <div v-else></div>

            <button 
              v-if="currentStep < 4"
              type="button"
              @click="nextStep"
              :disabled="!isCurrentStepValid"
              :class="[
                'px-6 py-3 rounded-xl font-medium transition-colors',
                isCurrentStepValid 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              다음
            </button>
            <button 
              v-else
              type="submit"
              :disabled="!quoteForm.privacyAgreed"
              :class="[
                'px-8 py-3 rounded-xl font-bold transition-colors',
                quoteForm.privacyAgreed 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              견적 요청 제출
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Route params
const route = useRoute()
const contractorId = route.params.id

// SEO
useHead({
  title: 'NS-CAPS - 견적 요청',
  meta: [
    { name: 'description', content: '전문가에게 누수 수리 견적을 요청하세요.' }
  ]
})

// 반응형 데이터
const currentStep = ref(1)
const today = new Date().toISOString().split('T')[0]

// 더미 업자 정보
const contractor = ref({
  id: 1,
  name: '김수리',
  location: '서울 강남구'
})

// 단계 정의
const steps = [
  { id: 1, title: '누수 정보' },
  { id: 2, title: '위치/연락처' },
  { id: 3, title: '사진 업로드' },
  { id: 4, title: '확인/제출' }
]

// 누수 종류 옵션
const leakTypes = [
  { value: 'bathroom', label: '화장실', icon: 'heroicons:home' },
  { value: 'kitchen', label: '주방', icon: 'heroicons:beaker' },
  { value: 'roof', label: '지붕/옥상', icon: 'heroicons:building-office' },
  { value: 'pipe', label: '배관', icon: 'heroicons:wrench-screwdriver' },
  { value: 'wall', label: '벽체', icon: 'heroicons:squares-2x2' },
  { value: 'floor', label: '바닥', icon: 'heroicons:rectangle-stack' }
]

// 긴급도 옵션
const urgencyLevels = [
  { value: 'emergency', label: '응급', description: '지금 당장 수리가 필요함' },
  { value: 'urgent', label: '긴급', description: '24시간 내 수리 필요' },
  { value: 'normal', label: '일반', description: '일주일 내 수리 희망' },
  { value: 'flexible', label: '여유', description: '시간 여유 있음' }
]

// 폼 데이터
const quoteForm = ref({
  leakType: '',
  urgency: '',
  description: '',
  address: {
    zipcode: '',
    street: '',
    detail: ''
  },
  contact: {
    name: '',
    phone: ''
  },
  preferredDate: '',
  preferredTimeStart: '',
  preferredTimeEnd: '',
  images: [],
  additionalRequests: '',
  privacyAgreed: false
})

// 계산된 속성
const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return quoteForm.value.leakType && quoteForm.value.urgency
    case 2:
      return quoteForm.value.address.street && 
             quoteForm.value.contact.name && 
             quoteForm.value.contact.phone
    case 3:
      return true // 사진 업로드는 선택사항
    case 4:
      return quoteForm.value.privacyAgreed
    default:
      return false
  }
})

// 메서드
const nextStep = () => {
  if (isCurrentStepValid.value && currentStep.value < 4) {
    currentStep.value++
  }
}

const searchAddress = () => {
  // TODO: 주소 검색 API 연동
  alert('주소 검색 기능은 구현 예정입니다.')
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

const addFiles = (files) => {
  files.forEach(file => {
    if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      if (quoteForm.value.images.length < 10) {
        const reader = new FileReader()
        reader.onload = (e) => {
          quoteForm.value.images.push({
            file: file,
            preview: e.target.result
          })
        }
        reader.readAsDataURL(file)
      }
    }
  })
}

const removeImage = (index) => {
  quoteForm.value.images.splice(index, 1)
}

const getLeakTypeLabel = (value) => {
  const type = leakTypes.find(t => t.value === value)
  return type ? type.label : value
}

const getUrgencyLabel = (value) => {
  const urgency = urgencyLevels.find(u => u.value === value)
  return urgency ? urgency.label : value
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

const submitQuoteRequest = () => {
  // TODO: 견적 요청 API 호출
  console.log('견적 요청 제출:', {
    contractorId: contractorId,
    ...quoteForm.value
  })
  
  alert('견적 요청이 성공적으로 전송되었습니다!')
  
  // 완료 후 리다이렉트
  navigateTo('/customer/quotes')
}

onMounted(() => {
  // 실제로는 API에서 contractor 데이터를 가져올 예정
  console.log('Loading contractor for quote:', contractorId)
})
</script>
