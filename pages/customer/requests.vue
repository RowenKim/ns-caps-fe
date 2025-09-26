<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">내 요청 히스토리 📋</h1>
            <p class="mt-2 text-gray-600">지금까지 신고하신 모든 누수 문제들을 한눈에 확인하세요</p>
          </div>
          <div class="hidden md:flex items-center space-x-3">
            <div class="text-right text-sm text-gray-500">
              <div>총 {{ filteredRequests.length }}개 요청</div>
              <div>{{ completedCount }}개 완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 필터 및 액션 바 -->
      <div class="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div class="flex flex-wrap gap-3">
            <div class="relative">
              <select 
                v-model="filterStatus" 
                class="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-medium hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">전체 상태 ✨</option>
                <option value="pending">⏳ 견적 대기</option>
                <option value="quote_received">📋 견적 도착</option>
                <option value="in_progress">🔧 작업 중</option>
                <option value="completed">✅ 완료</option>
                <option value="cancelled">❌ 취소됨</option>
              </select>
              <Icon name="heroicons:chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button 
              @click="resetFilters" 
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <Icon name="heroicons:arrow-path" class="h-4 w-4 mr-1 inline" />
              필터 초기화
            </button>
          </div>

          <NuxtLink 
            to="/customer/request" 
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
            새 누수 신고하기
          </NuxtLink>
        </div>
      </div>

      <!-- 요청 목록 -->
      <div v-if="filteredRequests.length > 0" class="space-y-6">
        <div
          v-for="request in filteredRequests"
          :key="request.id"
          class="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
          @click="navigateTo(`/customer/request/${request.id}`)"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4 flex-1">
                <!-- 상태 표시 아이콘 -->
                <div class="relative">
                  <div class="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" :class="getStatusIconBg(request.status)">
                    <Icon name="streamline:water-drop-2" class="h-8 w-8 text-white" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    {{ getStatusEmoji(request.status) }}
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <!-- 제목과 상태 -->
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {{ request.title }}
                      </h3>
                      <div class="flex items-center space-x-2 mt-1">
                        <Icon name="heroicons:map-pin" class="h-4 w-4 text-gray-400" />
                        <p class="text-gray-600 text-sm truncate">{{ request.address }}</p>
                      </div>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusBadgeClass(request.status)">
                      {{ getStatusText(request.status) }}
                    </span>
                  </div>
                  
                  <!-- 메타 정보 -->
                  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <div class="flex items-center space-x-1">
                      <Icon name="heroicons:clock" class="h-4 w-4" />
                      <span>{{ formatTimeAgo(request.createdAt) }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <Icon name="heroicons:calculator" class="h-4 w-4" />
                      <span>{{ request.quotesCount }}개 견적</span>
                    </div>
                    <div v-if="request.urgency" class="flex items-center space-x-1" :class="getUrgencyColor(request.urgency)">
                      <Icon name="heroicons:exclamation-triangle" class="h-4 w-4" />
                      <span class="font-medium">{{ getUrgencyText(request.urgency) }}</span>
                    </div>
                  </div>

                  <!-- 증상 태그들 -->
                  <div v-if="request.symptoms?.length" class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="symptom in request.symptoms.slice(0, 3)"
                      :key="symptom"
                      class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                    >
                      {{ getSymptomText(symptom) }}
                    </span>
                    <span 
                      v-if="request.symptoms.length > 3"
                      class="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
                    >
                      +{{ request.symptoms.length - 3 }}개 더
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end space-y-2 ml-4">
                <div v-if="request.selectedQuote" class="text-right">
                  <div class="text-lg font-bold text-gray-900">
                    {{ formatPrice(request.selectedQuote.price) }}
                  </div>
                  <p class="text-xs text-gray-500">선택된 견적</p>
                </div>
                <div v-else-if="request.quotesCount > 0" class="text-right">
                  <p class="text-sm font-semibold text-blue-600">{{ request.quotesCount }}개 견적 도착!</p>
                  <p class="text-xs text-gray-500">비교해보세요</p>
                </div>
                <div v-else class="text-right">
                  <p class="text-sm text-gray-500">견적 대기중</p>
                  <div class="flex justify-end space-x-1 mt-1">
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                </div>
                <Icon name="heroicons:chevron-right" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 요청이 없을 때 -->
      <div v-if="filteredRequests.length === 0" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:document-magnifying-glass" class="h-10 w-10 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">아직 요청 내역이 없어요</h3>
        <p class="text-gray-500 mb-6">누수 문제가 생기면 지금 바로 신고해보세요!</p>
        <NuxtLink
          to="/customer/request"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
          첫 번째 신고하기
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 임시 데이터 (실제로는 API에서 가져올 예정)
const requests = ref([
  {
    id: 1,
    title: '화장실 변기 누수',
    address: '서울시 강남구 역삼동 123-45',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    status: 'in_progress',
    quotesCount: 3,
    selectedQuote: { price: 120000 },
    symptoms: ['dripping', 'water_stain'],
    urgency: 'high'
  },
  {
    id: 2,
    title: '주방 싱크대 하부 누수',
    address: '서울시 강남구 삼성동 678-90',
    createdAt: new Date('2024-01-10T14:30:00Z'),
    status: 'completed',
    quotesCount: 5,
    selectedQuote: { price: 85000 },
    symptoms: ['flowing', 'wet_wall'],
    urgency: 'medium'
  },
  {
    id: 3,
    title: '베란다 배수관 누수',
    address: '서울시 강남구 청담동 111-22',
    createdAt: new Date('2024-01-08T09:15:00Z'),
    status: 'pending',
    quotesCount: 2,
    selectedQuote: null,
    symptoms: ['wet_ceiling'],
    urgency: 'low'
  },
  {
    id: 4,
    title: '안방 천장 누수',
    address: '서울시 서초구 반포동 333-44',
    createdAt: new Date('2024-01-05T18:00:00Z'),
    status: 'quote_received',
    quotesCount: 4,
    selectedQuote: null,
    symptoms: ['mold', 'water_stain'],
    urgency: 'high'
  },
  {
    id: 5,
    title: '외부 벽면 누수',
    address: '서울시 송파구 잠실동 555-66',
    createdAt: new Date('2023-12-20T11:00:00Z'),
    status: 'cancelled',
    quotesCount: 1,
    selectedQuote: null,
    symptoms: ['wet_wall'],
    urgency: 'medium'
  }
])

const filterStatus = ref('')

const filteredRequests = computed(() => {
  let filtered = requests.value

  if (filterStatus.value) {
    filtered = filtered.filter(request => request.status === filterStatus.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredRequests.value.length / 10) // Assuming 10 items per page for now
})

const completedCount = computed(() => {
  return requests.value.filter(r => r.status === 'completed').length
})

// 유틸리티 함수들
const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const diffMs = now - date
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)

  if (diffYears > 0) return `${diffYears}년 전`
  if (diffMonths > 0) return `${diffMonths}개월 전`
  if (diffDays > 0) return `${diffDays}일 전`
  if (diffHours > 0) return `${diffHours}시간 전`
  if (diffMinutes > 0) return `${diffMinutes}분 전`
  return '방금 전'
}

const getStatusText = (status) => {
  const statusMap = {
    pending: '견적 대기',
    quote_received: '견적 도착',
    in_progress: '작업 중',
    completed: '완료',
    cancelled: '취소됨'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    quote_received: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIconBg = (status) => {
  const classMap = {
    pending: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    quote_received: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    in_progress: 'bg-gradient-to-r from-green-500 to-emerald-500',
    completed: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    cancelled: 'bg-gradient-to-r from-red-500 to-pink-500'
  }
  return classMap[status] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

const getStatusEmoji = (status) => {
  const emojiMap = {
    pending: '⏳',
    quote_received: '📋',
    in_progress: '🔧',
    completed: '✅',
    cancelled: '❌'
  }
  return emojiMap[status] || '⏳'
}

const resetFilters = () => {
  filterStatus.value = ''
}

const getUrgencyText = (urgency) => {
  const urgencyMap = {
    low: '여유있음',
    medium: '보통',
    high: '긴급'
  }
  return urgencyMap[urgency] || urgency
}

const getUrgencyColor = (urgency) => {
  const colorMap = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  }
  return colorMap[urgency] || 'text-gray-600'
}

const getSymptomText = (symptom) => {
  const symptomMap = {
    dripping: '물이 뚝뚝 떨어져요',
    flowing: '물이 흘러나와요',
    wet_wall: '벽이 젖어있어요',
    wet_ceiling: '천장이 젖어있어요',
    mold: '곰팡이가 생겼어요',
    water_stain: '물얼룩이 생겼어요',
    pipe_visible: '배관이 보여요',
    noise: '물소리가 나요'
  }
  return symptomMap[symptom] || symptom
}

// 메타 태그 설정
useHead({
  title: '내 요청 히스토리 - 누수케어',
  meta: [
    { name: 'description', content: '누수 수리 요청 히스토리를 확인하고 관리하세요' }
  ]
})
</script>