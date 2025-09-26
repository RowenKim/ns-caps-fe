<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- 뒤로가기 버튼 -->
    <div class="mb-6">
      <button @click="$router.back()" class="btn btn-secondary">
        <Icon name="heroicons:arrow-left" class="h-4 w-4 mr-2" />
        뒤로가기
      </button>
    </div>

    <!-- 요청 정보 카드 -->
    <div class="card mb-8">
      <div class="card-header">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-xl font-bold text-gray-900">{{ request.title }}</h1>
            <p class="text-gray-600 mt-1">요청 번호: #{{ request.id }}</p>
          </div>
          <span class="badge" :class="getStatusBadgeClass(request.status)">
            {{ getStatusText(request.status) }}
          </span>
        </div>
      </div>

      <div class="card-body">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- 기본 정보 -->
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">위치 정보</h3>
              <p class="text-gray-600">{{ request.address }}</p>
              <p v-if="request.addressDetail" class="text-gray-600">{{ request.addressDetail }}</p>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-2">연락처</h3>
              <p class="text-gray-600">{{ request.phone }}</p>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-2">긴급도</h3>
              <span class="px-2 py-1 rounded-full text-sm" :class="getUrgencyBadgeClass(request.urgency)">
                {{ getUrgencyText(request.urgency) }}
              </span>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-2">요청일</h3>
              <p class="text-gray-600">{{ formatDate(request.createdAt) }}</p>
            </div>
          </div>

          <!-- 상세 정보 -->
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">누수 위치</h3>
              <p class="text-gray-600">{{ getLocationText(request.location) }}</p>
            </div>

            <div v-if="request.symptoms?.length">
              <h3 class="font-medium text-gray-900 mb-2">증상</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="symptom in request.symptoms"
                  :key="symptom"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {{ getSymptomText(symptom) }}
                </span>
              </div>
            </div>

            <div v-if="request.description">
              <h3 class="font-medium text-gray-900 mb-2">추가 설명</h3>
              <p class="text-gray-600">{{ request.description }}</p>
            </div>

            <div v-if="request.availableTimes?.length">
              <h3 class="font-medium text-gray-900 mb-2">방문 가능 시간</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="time in request.availableTimes"
                  :key="time"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {{ getTimeText(time) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 업로드된 이미지들 -->
        <div v-if="request.images?.length" class="mt-6 pt-6 border-t border-gray-200">
          <h3 class="font-medium text-gray-900 mb-4">업로드된 사진</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="(image, index) in request.images"
              :key="index"
              class="relative group cursor-pointer"
              @click="openImageModal(image)"
            >
              <img
                :src="image"
                :alt="`누수 사진 ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg flex items-center justify-center">
                <Icon name="heroicons:magnifying-glass-plus" class="h-6 w-6 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 진행 상황 타임라인 -->
    <div class="card mb-8">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">진행 상황</h2>
      </div>
      <div class="card-body">
        <div class="flow-root">
          <ul class="-mb-8">
            <li
              v-for="(event, index) in timeline"
              :key="index"
              class="relative pb-8"
            >
              <div v-if="index !== timeline.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"></div>
              <div class="relative flex items-start space-x-3">
                <div class="relative">
                  <div class="h-10 w-10 rounded-full flex items-center justify-center" :class="event.iconBg">
                    <Icon :name="event.icon" class="h-5 w-5" :class="event.iconColor" />
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <span class="font-medium text-gray-900">{{ event.title }}</span>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">{{ formatDateTime(event.timestamp) }}</p>
                  </div>
                  <div v-if="event.description" class="mt-2 text-sm text-gray-700">
                    <p>{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 견적 정보 (견적이 있는 경우) -->
    <div v-if="request.selectedQuote" class="card mb-8">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">선택된 견적</h2>
      </div>
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="heroicons:user" class="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ request.selectedQuote.contractorName }}</h3>
              <div class="flex items-center space-x-2 mt-1">
                <div class="flex items-center">
                  <Icon name="heroicons:star-solid" class="h-4 w-4 text-yellow-400" />
                  <span class="text-sm text-gray-600 ml-1">{{ request.selectedQuote.rating }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">{{ formatPrice(request.selectedQuote.price) }}</div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-500">작업 예정일:</span>
            <span class="ml-2 text-gray-900">{{ request.selectedQuote.scheduledDate }}</span>
          </div>
          <div>
            <span class="text-gray-500">예상 작업시간:</span>
            <span class="ml-2 text-gray-900">{{ request.selectedQuote.estimatedTime }}</span>
          </div>
        </div>

        <div v-if="request.status === 'in_progress'" class="flex space-x-3 mt-4 pt-4 border-t border-gray-200">
          <NuxtLink 
            :to="`/customer/chat/${request.id}`"
            class="btn btn-primary"
          >
            <Icon name="heroicons:chat-bubble-left-right" class="h-4 w-4 mr-2" />
            실시간 채팅
          </NuxtLink>
          <button class="btn btn-secondary">
            <Icon name="heroicons:phone" class="h-4 w-4 mr-2" />
            전화하기
          </button>
        </div>
      </div>
    </div>

    <!-- 액션 버튼들 -->
    <div v-if="request.status === 'quote_received'" class="flex space-x-3">
      <NuxtLink :to="`/customer/quotes?requestId=${request.id}`" class="btn btn-primary">
        견적 비교하기
      </NuxtLink>
      <button @click="cancelRequest" class="btn btn-danger">
        요청 취소
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const route = useRoute()
const requestId = route.params.id

// 샘플 데이터 (실제로는 API에서 가져올 예정)
const request = ref({
  id: requestId,
  title: '화장실 변기 누수',
  address: '서울시 강남구 역삼동 123-45',
  addressDetail: '101동 502호',
  phone: '010-1234-5678',
  createdAt: new Date('2024-01-15'),
  status: 'in_progress',
  urgency: 'high',
  location: 'bathroom',
  symptoms: ['dripping', 'water_stain'],
  description: '변기 뒤쪽에서 지속적으로 물이 새고 있습니다. 바닥에 물이 고여있는 상태입니다.',
  availableTimes: ['morning', 'afternoon'],
  images: [
    '/images/leak1.jpg',
    '/images/leak2.jpg'
  ],
  selectedQuote: {
    contractorName: '김수리 기사',
    rating: 4.8,
    price: 120000,
    scheduledDate: '2024년 1월 16일 오후',
    estimatedTime: '1-2시간'
  }
})

const timeline = computed(() => [
  {
    title: '누수 신고 접수',
    description: '요청이 성공적으로 접수되었습니다.',
    timestamp: request.value.createdAt,
    icon: 'heroicons:document-plus',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: '견적 수신',
    description: '3개의 견적을 받았습니다.',
    timestamp: new Date('2024-01-15T10:30:00'),
    icon: 'heroicons:calculator',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: '견적 선택',
    description: '김수리 기사님의 견적을 선택했습니다.',
    timestamp: new Date('2024-01-15T14:00:00'),
    icon: 'heroicons:check-circle',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: '작업 시작',
    description: '현장 작업이 시작되었습니다.',
    timestamp: new Date('2024-01-16T13:00:00'),
    icon: 'heroicons:wrench-screwdriver',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
])

// 유틸리티 함수들
const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
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
    pending: 'badge-pending',
    quote_received: 'badge-approved',
    in_progress: 'badge-approved',
    completed: 'badge-completed',
    cancelled: 'badge-rejected'
  }
  return classMap[status] || 'badge-pending'
}

const getUrgencyText = (urgency) => {
  const urgencyMap = {
    low: '여유있음',
    medium: '보통',
    high: '긴급'
  }
  return urgencyMap[urgency] || urgency
}

const getUrgencyBadgeClass = (urgency) => {
  const classMap = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return classMap[urgency] || 'bg-gray-100 text-gray-800'
}

const getLocationText = (location) => {
  const locationMap = {
    bathroom: '화장실',
    kitchen: '주방',
    balcony: '베란다',
    living: '거실/방',
    external: '외부',
    other: '기타'
  }
  return locationMap[location] || location
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

const getTimeText = (time) => {
  const timeMap = {
    morning: '오전 (9:00-12:00)',
    afternoon: '오후 (13:00-17:00)',
    evening: '저녁 (18:00-21:00)',
    weekend: '주말',
    weekday: '주중',
    anytime: '언제든 가능'
  }
  return timeMap[time] || time
}

// 액션 함수들
const openImageModal = (image) => {
  // TODO: 이미지 모달 열기
  console.log('이미지 열기:', image)
}

const cancelRequest = async () => {
  if (confirm('정말로 이 요청을 취소하시겠습니까?')) {
    // TODO: 취소 API 호출
    request.value.status = 'cancelled'
    await navigateTo('/customer/requests')
  }
}

// 메타 태그 설정
useHead({
  title: `${request.value.title} - 누수케어`,
  meta: [
    { name: 'description', content: `누수 신고 요청 상세 정보: ${request.value.title}` }
  ]
})
</script>
