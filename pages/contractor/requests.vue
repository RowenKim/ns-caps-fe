<template>
  <div class="p-6">
    <!-- 페이지 헤더 -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">신규 요청 목록</h1>
      <p class="mt-1 text-gray-600">새로운 누수 신고 요청에 견적을 제출하세요</p>
    </div>

    <!-- 필터 및 정렬 -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="flex gap-3">
        <select v-model="filterUrgency" class="input w-auto">
          <option value="">전체 긴급도</option>
          <option value="high">긴급</option>
          <option value="medium">보통</option>
          <option value="low">여유있음</option>
        </select>
        
        <select v-model="filterLocation" class="input w-auto">
          <option value="">전체 위치</option>
          <option value="bathroom">화장실</option>
          <option value="kitchen">주방</option>
          <option value="balcony">베란다</option>
          <option value="living">거실/방</option>
          <option value="external">외부</option>
        </select>
      </div>

      <div class="flex gap-3">
        <select v-model="sortBy" class="input w-auto">
          <option value="newest">최신순</option>
          <option value="urgency">긴급도순</option>
          <option value="distance">거리순</option>
        </select>
      </div>
    </div>

    <!-- 요청 목록 -->
    <div class="space-y-4">
      <div
        v-for="request in filteredRequests"
        :key="request.id"
        class="card hover:shadow-md transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="streamline:water-drop-2" class="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">
                      {{ request.title }}
                    </h3>
                    <span class="badge" :class="getUrgencyBadgeClass(request.urgency)">
                      {{ getUrgencyText(request.urgency) }}
                    </span>
                    <span v-if="request.quotesCount > 0" class="text-sm text-gray-500">
                      {{ request.quotesCount }}개 견적 제출됨
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-2 mb-2">
                    <Icon name="heroicons:map-pin" class="h-4 w-4 text-gray-500" />
                    <p class="text-gray-600">{{ request.address }}</p>
                    <span class="text-gray-400">•</span>
                    <span class="text-sm text-blue-600">{{ request.distance }}km</span>
                  </div>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>{{ formatTimeAgo(request.createdAt) }}</span>
                    <span>•</span>
                    <span>{{ getLocationText(request.location) }}</span>
                  </div>

                  <!-- 증상 태그들 -->
                  <div v-if="request.symptoms?.length" class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="symptom in request.symptoms"
                      :key="symptom"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {{ getSymptomText(symptom) }}
                    </span>
                  </div>

                  <!-- 설명 -->
                  <p v-if="request.description" class="text-gray-600 text-sm line-clamp-2">
                    {{ request.description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end space-y-3 ml-4">
              <!-- 예상 가격 범위 -->
              <div class="text-right">
                <div class="text-sm text-gray-500">예상 견적</div>
                <div class="text-lg font-bold text-gray-900">
                  {{ formatPriceRange(request.estimatedPriceRange) }}
                </div>
              </div>

              <!-- 액션 버튼들 -->
              <div class="flex space-x-2">
                <button
                  @click="viewDetails(request.id)"
                  class="btn btn-secondary btn-sm"
                >
                  <Icon name="heroicons:eye" class="h-4 w-4 mr-1" />
                  상세보기
                </button>
                <button
                  @click="submitQuote(request.id)"
                  class="btn btn-primary btn-sm"
                  :disabled="request.hasMyQuote"
                >
                  <Icon name="heroicons:calculator" class="h-4 w-4 mr-1" />
                  {{ request.hasMyQuote ? '견적 제출됨' : '견적 제출' }}
                </button>
              </div>

              <!-- 고객 정보 (간단히) -->
              <div class="text-right text-xs text-gray-500">
                <div class="flex items-center">
                  <Icon name="heroicons:star-solid" class="h-3 w-3 text-yellow-400 mr-1" />
                  <span>고객 평점 {{ request.customerRating }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 추가 정보 섹션 (접힌 상태) -->
          <div v-if="expandedRequest === request.id" class="mt-4 pt-4 border-t border-gray-200">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-gray-900 mb-2">방문 가능 시간</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="time in request.availableTimes"
                    :key="time"
                    class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {{ getTimeText(time) }}
                  </span>
                </div>
              </div>
              
              <div v-if="request.images?.length">
                <h4 class="font-medium text-gray-900 mb-2">첨부 사진</h4>
                <div class="flex space-x-2">
                  <img
                    v-for="(image, index) in request.images.slice(0, 3)"
                    :key="index"
                    :src="image"
                    :alt="`누수 사진 ${index + 1}`"
                    class="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                    @click="viewImage(image)"
                  />
                  <div
                    v-if="request.images.length > 3"
                    class="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600"
                  >
                    +{{ request.images.length - 3 }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 확장/축소 버튼 -->
          <div class="mt-3 pt-3 border-t border-gray-200">
            <button
              @click="toggleExpand(request.id)"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <Icon 
                :name="expandedRequest === request.id ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                class="h-4 w-4 mr-1" 
              />
              {{ expandedRequest === request.id ? '간단히 보기' : '자세히 보기' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-if="filteredRequests.length === 0" class="card">
        <div class="card-body text-center py-12">
          <Icon name="heroicons:inbox" class="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            조건에 맞는 요청이 없습니다
          </h3>
          <p class="text-gray-600 mb-4">필터를 조정하거나 잠시 후 다시 확인해보세요</p>
          <button @click="resetFilters" class="btn btn-primary">
            필터 초기화
          </button>
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="flex space-x-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="px-3 py-2 text-sm rounded-md transition-colors"
          :class="currentPage === page 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
        >
          {{ page }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 필터 및 정렬 상태
const filterUrgency = ref('')
const filterLocation = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const expandedRequest = ref(null)
const itemsPerPage = 10

// 샘플 데이터
const requests = ref([
  {
    id: 1,
    title: '화장실 변기 누수',
    address: '서울시 강남구 역삼동 123-45',
    distance: 2.5,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    urgency: 'high',
    location: 'bathroom',
    symptoms: ['dripping', 'water_stain'],
    description: '변기 뒤쪽에서 지속적으로 물이 새고 있습니다. 바닥에 물이 고여있는 상태입니다.',
    availableTimes: ['afternoon', 'evening'],
    images: ['/images/leak1.jpg', '/images/leak2.jpg'],
    quotesCount: 2,
    hasMyQuote: false,
    customerRating: 4.5,
    estimatedPriceRange: { min: 80000, max: 150000 }
  },
  {
    id: 2,
    title: '주방 싱크대 하부 누수',
    address: '서울시 강남구 삼성동 456-78',
    distance: 4.2,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    urgency: 'medium',
    location: 'kitchen',
    symptoms: ['flowing', 'wet_wall'],
    description: '싱크대 하부에서 물이 계속 흘러나오고 있습니다.',
    availableTimes: ['morning', 'afternoon'],
    images: ['/images/kitchen1.jpg'],
    quotesCount: 0,
    hasMyQuote: false,
    customerRating: 4.8,
    estimatedPriceRange: { min: 50000, max: 100000 }
  },
  {
    id: 3,
    title: '베란다 배수관 누수',
    address: '서울시 강남구 청담동 789-12',
    distance: 1.8,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    urgency: 'low',
    location: 'balcony',
    symptoms: ['dripping'],
    description: '베란다 배수관에서 간헐적으로 물이 떨어집니다.',
    availableTimes: ['weekend'],
    images: [],
    quotesCount: 1,
    hasMyQuote: true,
    customerRating: 4.2,
    estimatedPriceRange: { min: 30000, max: 80000 }
  }
])

// 필터링된 요청 목록
const filteredRequests = computed(() => {
  let filtered = requests.value

  if (filterUrgency.value) {
    filtered = filtered.filter(request => request.urgency === filterUrgency.value)
  }

  if (filterLocation.value) {
    filtered = filtered.filter(request => request.location === filterLocation.value)
  }

  // 정렬
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'urgency':
        const urgencyOrder = { high: 3, medium: 2, low: 1 }
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
      case 'distance':
        return a.distance - b.distance
      default: // newest
        return b.createdAt - a.createdAt
    }
  })

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredRequests.value.length / itemsPerPage)
})

// 유틸리티 함수들
const formatTimeAgo = (date) => {
  const now = new Date()
  const diffMs = now - date
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `${diffDays}일 전`
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`
  } else {
    return '방금 전'
  }
}

const formatPriceRange = (range) => {
  const min = new Intl.NumberFormat('ko-KR').format(range.min)
  const max = new Intl.NumberFormat('ko-KR').format(range.max)
  return `${min}원 ~ ${max}원`
}

const getUrgencyText = (urgency) => {
  const urgencyMap = {
    low: '여유',
    medium: '보통',
    high: '긴급'
  }
  return urgencyMap[urgency] || urgency
}

const getUrgencyBadgeClass = (urgency) => {
  const classMap = {
    low: 'badge-completed',
    medium: 'badge-pending',
    high: 'badge-rejected'
  }
  return classMap[urgency] || 'badge-pending'
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
const toggleExpand = (requestId) => {
  expandedRequest.value = expandedRequest.value === requestId ? null : requestId
}

const viewDetails = (requestId) => {
  navigateTo(`/contractor/request/${requestId}`)
}

const submitQuote = (requestId) => {
  navigateTo(`/contractor/request/${requestId}/quote`)
}

const viewImage = (imageUrl) => {
  // TODO: 이미지 모달 열기
  console.log('이미지 보기:', imageUrl)
}

const resetFilters = () => {
  filterUrgency.value = ''
  filterLocation.value = ''
  sortBy.value = 'newest'
}

// 레이아웃 지정
definePageMeta({
  layout: 'contractor'
})

// 메타 태그 설정
useHead({
  title: '신규 요청 목록 - NS-CAPS',
  meta: [
    { name: 'description', content: '새로운 누수 신고 요청에 견적을 제출하세요' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
