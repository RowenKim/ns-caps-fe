<template>
  <div class="p-6">
    <!-- 페이지 헤더 -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">내 견적 관리</h1>
      <p class="mt-1 text-gray-600">제출한 견적들의 상태를 확인하고 관리하세요</p>
    </div>

    <!-- 요약 카드들 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <Icon name="heroicons:clock" class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">대기 중</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <Icon name="heroicons:check-circle" class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">선택됨</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.accepted }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-full">
              <Icon name="heroicons:x-circle" class="h-6 w-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">미선택</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.rejected }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <Icon name="heroicons:calculator" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">총 견적</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 필터 및 정렬 -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="flex gap-3">
        <select v-model="filterStatus" class="input w-auto">
          <option value="">전체 상태</option>
          <option value="pending">대기 중</option>
          <option value="accepted">선택됨</option>
          <option value="rejected">미선택</option>
          <option value="expired">만료됨</option>
        </select>
      </div>

      <NuxtLink to="/contractor/requests" class="btn btn-primary">
        <Icon name="heroicons:plus" class="h-4 w-4 mr-2" />
        새 견적 제출
      </NuxtLink>
    </div>

    <!-- 견적 목록 -->
    <div class="space-y-4">
      <div
        v-for="quote in filteredQuotes"
        :key="quote.id"
        class="card hover:shadow-md transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="heroicons:calculator" class="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">
                      {{ quote.requestTitle }}
                    </h3>
                    <span class="badge" :class="getStatusBadgeClass(quote.status)">
                      {{ getStatusText(quote.status) }}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 mb-2">{{ quote.address }}</p>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>제출일: {{ formatDate(quote.submittedAt) }}</span>
                    <span>•</span>
                    <span>총 {{ quote.competitorCount }}개 견적</span>
                    <span v-if="quote.expiresAt">•</span>
                    <span v-if="quote.expiresAt" class="text-orange-600">
                      {{ formatTimeRemaining(quote.expiresAt) }}
                    </span>
                  </div>

                  <!-- 견적 내용 미리보기 -->
                  <div class="bg-gray-50 rounded-lg p-3 mb-3">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-sm text-gray-600">견적 금액</span>
                      <span class="text-lg font-bold text-gray-900">{{ formatPrice(quote.price) }}</span>
                    </div>
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-sm text-gray-600">작업 시간</span>
                      <span class="text-sm text-gray-900">{{ quote.estimatedTime }}</span>
                    </div>
                    <p class="text-sm text-gray-700 line-clamp-2">{{ quote.description }}</p>
                  </div>

                  <!-- 경쟁 견적 정보 -->
                  <div v-if="quote.status === 'pending' && quote.priceComparison" class="flex items-center text-sm">
                    <Icon name="heroicons:chart-bar" class="h-4 w-4 text-gray-500 mr-1" />
                    <span class="text-gray-600">
                      경쟁 견적 범위: {{ formatPriceRange(quote.priceComparison) }}
                    </span>
                    <span 
                      class="ml-2 px-2 py-1 rounded text-xs"
                      :class="getPricePositionClass(quote.pricePosition)"
                    >
                      {{ getPricePositionText(quote.pricePosition) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end space-y-3 ml-4">
              <!-- 상태별 정보 -->
              <div v-if="quote.status === 'accepted'" class="text-right">
                <div class="text-sm text-green-600 font-medium">계약 성사!</div>
                <div class="text-xs text-gray-500">예상 수익: {{ formatPrice(quote.price * 0.85) }}</div>
              </div>
              
              <div v-else-if="quote.status === 'rejected'" class="text-right">
                <div class="text-sm text-red-600">미선택</div>
                <div v-if="quote.selectedPrice" class="text-xs text-gray-500">
                  선택된 금액: {{ formatPrice(quote.selectedPrice) }}
                </div>
              </div>

              <!-- 액션 버튼들 -->
              <div class="flex space-x-2">
                <button
                  @click="viewDetails(quote.id)"
                  class="btn btn-secondary btn-sm"
                >
                  <Icon name="heroicons:eye" class="h-4 w-4 mr-1" />
                  상세보기
                </button>
                
                <button
                  v-if="quote.status === 'pending'"
                  @click="editQuote(quote.id)"
                  class="btn btn-warning btn-sm"
                >
                  <Icon name="heroicons:pencil" class="h-4 w-4 mr-1" />
                  수정
                </button>
                
                <button
                  v-if="quote.status === 'accepted'"
                  @click="startWork(quote.id)"
                  class="btn btn-success btn-sm"
                >
                  <Icon name="heroicons:play" class="h-4 w-4 mr-1" />
                  작업 시작
                </button>
                
                <button
                  v-if="quote.status === 'pending'"
                  @click="withdrawQuote(quote.id)"
                  class="btn btn-danger btn-sm"
                >
                  <Icon name="heroicons:trash" class="h-4 w-4 mr-1" />
                  철회
                </button>
              </div>
            </div>
          </div>

          <!-- 피드백 섹션 (미선택된 견적의 경우) -->
          <div v-if="quote.status === 'rejected' && quote.feedback" class="mt-4 pt-4 border-t border-gray-200">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div class="flex items-start">
                <Icon name="heroicons:light-bulb" class="h-5 w-5 text-yellow-600 mt-0.5" />
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-yellow-800">고객 피드백</h4>
                  <p class="text-sm text-yellow-700 mt-1">{{ quote.feedback }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 빈 상태 -->
      <div v-if="filteredQuotes.length === 0" class="card">
        <div class="card-body text-center py-12">
          <Icon name="heroicons:calculator" class="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ filterStatus ? '해당 조건의 견적이 없습니다' : '아직 제출한 견적이 없습니다' }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{ filterStatus ? '다른 필터를 선택해보세요' : '새로운 요청에 견적을 제출해보세요' }}
          </p>
          <NuxtLink to="/contractor/requests" class="btn btn-primary">
            견적 제출하기
          </NuxtLink>
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

// 필터 상태
const filterStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// 통계 데이터
const stats = ref({
  pending: 3,
  accepted: 2,
  rejected: 5,
  total: 10
})

// 샘플 견적 데이터
const quotes = ref([
  {
    id: 1,
    requestTitle: '화장실 변기 누수',
    address: '서울시 강남구 역삼동',
    price: 120000,
    estimatedTime: '1-2시간',
    description: '변기 플러시 밸브 교체 및 배관 점검. 기존 부품 제거 후 새 부품으로 교체하고 누수 방지를 위한 실링 작업을 포함합니다.',
    submittedAt: new Date('2024-01-15'),
    status: 'accepted',
    competitorCount: 4,
    expiresAt: null
  },
  {
    id: 2,
    requestTitle: '주방 싱크대 하부 누수',
    address: '서울시 강남구 삼성동',
    price: 85000,
    estimatedTime: '1시간',
    description: '하부 배수관 연결부 교체 및 실링 작업',
    submittedAt: new Date('2024-01-14'),
    status: 'pending',
    competitorCount: 3,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12시간 후
    priceComparison: { min: 70000, max: 150000 },
    pricePosition: 'middle'
  },
  {
    id: 3,
    requestTitle: '베란다 배수관 누수',
    address: '서울시 강남구 청담동',
    price: 150000,
    estimatedTime: '2-3시간',
    description: '배수관 전체 교체 작업',
    submittedAt: new Date('2024-01-12'),
    status: 'rejected',
    competitorCount: 5,
    selectedPrice: 90000,
    feedback: '견적이 다소 높아서 다른 업체를 선택했습니다. 다음에는 더 경쟁력 있는 가격으로 제출해보세요.'
  }
])

// 필터링된 견적 목록
const filteredQuotes = computed(() => {
  let filtered = quotes.value
  
  if (filterStatus.value) {
    filtered = filtered.filter(quote => quote.status === filterStatus.value)
  }
  
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredQuotes.value.length / itemsPerPage)
})

// 유틸리티 함수들
const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

const formatPriceRange = (range) => {
  const min = new Intl.NumberFormat('ko-KR').format(range.min)
  const max = new Intl.NumberFormat('ko-KR').format(range.max)
  return `${min}원 ~ ${max}원`
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatTimeRemaining = (date) => {
  const now = new Date()
  const diffMs = date - now
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMs <= 0) {
    return '만료됨'
  } else if (diffDays > 0) {
    return `${diffDays}일 남음`
  } else if (diffHours > 0) {
    return `${diffHours}시간 남음`
  } else {
    return '곧 만료'
  }
}

const getStatusText = (status) => {
  const statusMap = {
    pending: '대기 중',
    accepted: '선택됨',
    rejected: '미선택',
    expired: '만료됨'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    pending: 'badge-pending',
    accepted: 'badge-approved',
    rejected: 'badge-rejected',
    expired: 'badge-rejected'
  }
  return classMap[status] || 'badge-pending'
}

const getPricePositionText = (position) => {
  const positionMap = {
    lowest: '최저가',
    middle: '중간가',
    highest: '최고가'
  }
  return positionMap[position] || position
}

const getPricePositionClass = (position) => {
  const classMap = {
    lowest: 'bg-green-100 text-green-800',
    middle: 'bg-yellow-100 text-yellow-800',
    highest: 'bg-red-100 text-red-800'
  }
  return classMap[position] || 'bg-gray-100 text-gray-800'
}

// 액션 함수들
const viewDetails = (quoteId) => {
  navigateTo(`/contractor/quote/${quoteId}`)
}

const editQuote = (quoteId) => {
  navigateTo(`/contractor/quote/${quoteId}/edit`)
}

const startWork = (quoteId) => {
  navigateTo(`/contractor/work/${quoteId}`)
}

const withdrawQuote = async (quoteId) => {
  if (confirm('정말로 이 견적을 철회하시겠습니까?')) {
    // TODO: 견적 철회 API 호출
    const quote = quotes.value.find(q => q.id === quoteId)
    if (quote) {
      quotes.value = quotes.value.filter(q => q.id !== quoteId)
    }
  }
}

// 레이아웃 지정
definePageMeta({
  layout: 'contractor'
})

// 메타 태그 설정
useHead({
  title: '내 견적 관리 - NS-CAPS',
  meta: [
    { name: 'description', content: '제출한 견적들의 상태를 확인하고 관리하세요' }
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
