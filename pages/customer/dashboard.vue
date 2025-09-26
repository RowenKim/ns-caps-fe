<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">안녕하세요! 👋</h1>
            <p class="text-gray-600 mt-1">오늘도 안전한 하루 되세요</p>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <div class="text-sm text-gray-500">마지막 로그인</div>
            <div class="text-sm font-medium text-gray-900">2시간 전</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 빠른 액션 카드 -->
      <div class="mb-8">
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 rounded-3xl p-8 shadow-xl">
          <!-- 배경 장식 -->
          <div class="absolute top-0 right-0 -translate-y-4 translate-x-4">
            <div class="w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          <div class="absolute bottom-0 left-0 translate-y-4 -translate-x-4">
            <div class="w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>

          <div class="relative">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">💧 누수 문제가 있으신가요?</h2>
                <p class="text-blue-100 mb-6 text-lg">전문가가 2시간 내에 찾아가서 해결해드릴게요!</p>
                <NuxtLink
                  to="/customer/request"
                  class="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <Icon name="streamline:water-drop-2" class="h-5 w-5 mr-2" />
                  지금 바로 신고하기
                  <Icon name="heroicons:arrow-right" class="h-4 w-4 ml-2" />
                </NuxtLink>
              </div>
              <div class="hidden lg:block">
                <div class="text-6xl opacity-20">🔧</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 현황 카드들 -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <p class="text-sm font-medium text-gray-600">견적 대기중</p>
              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.pending }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stats.pending > 0 ? '곧 견적이 도착해요' : '새 요청을 해보세요' }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
              <Icon name="heroicons:clock" class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <p class="text-sm font-medium text-gray-600">작업 진행중</p>
              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.inProgress }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stats.inProgress > 0 ? '전문가가 열심히 작업중' : '진행 중인 작업 없음' }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <Icon name="heroicons:wrench-screwdriver" class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                <p class="text-sm font-medium text-gray-600">완료됨</p>
              </div>
              <p class="text-3xl font-bold text-gray-900">{{ stats.completed }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stats.completed > 0 ? '성공적으로 해결!' : '아직 완료된 작업 없음' }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Icon name="heroicons:check-circle" class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
                <p class="text-sm font-medium text-gray-600">총 지출</p>
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ formatPrice(stats.totalSpent) }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stats.totalSpent > 0 ? '투명한 비용 관리' : '아직 지출 없음' }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Icon name="heroicons:currency-dollar" class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- 최근 요청 섹션 -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900">최근 요청 내역</h3>
              <p class="text-gray-500 text-sm mt-1">최근에 신고하신 누수 문제들을 확인하세요</p>
            </div>
            <NuxtLink
              to="/customer/requests"
              class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              전체 보기
              <Icon name="heroicons:arrow-right" class="h-4 w-4 ml-1" />
            </NuxtLink>
          </div>
        </div>

        <div v-if="recentRequests.length === 0" class="p-12 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="streamline:water-drop-2" class="h-10 w-10 text-gray-400" />
          </div>
          <h4 class="text-lg font-semibold text-gray-900 mb-2">아직 요청이 없어요</h4>
          <p class="text-gray-500 mb-6">누수 문제가 생기면 언제든 편하게 신고해주세요</p>
          <NuxtLink
            to="/customer/request"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
            첫 번째 신고하기
          </NuxtLink>
        </div>

        <div v-else class="divide-y divide-gray-50">
          <div
            v-for="request in recentRequests"
            :key="request.id"
            class="p-6 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
            @click="navigateTo(`/customer/request/${request.id}`)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 flex-1">
                <div class="relative">
                  <div class="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="streamline:water-drop-2" class="h-7 w-7 text-white" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" :class="getStatusIndicatorClass(request.status)">
                    {{ getStatusEmoji(request.status) }}
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <h4 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {{ request.title }}
                  </h4>
                  <div class="flex items-center space-x-2 mt-1">
                    <Icon name="heroicons:map-pin" class="h-4 w-4 text-gray-400" />
                    <p class="text-gray-600 truncate">{{ request.address }}</p>
                  </div>
                  <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div class="flex items-center space-x-1">
                      <Icon name="heroicons:clock" class="h-4 w-4" />
                      <span>{{ formatTimeAgo(request.createdAt) }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <Icon name="heroicons:calculator" class="h-4 w-4" />
                      <span>{{ request.quotesCount }}개 견적</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <div v-if="request.selectedQuote" class="space-y-1">
                    <p class="text-lg font-bold text-gray-900">{{ formatPrice(request.selectedQuote.price) }}</p>
                    <p class="text-xs text-gray-500">선택된 견적</p>
                  </div>
                  <div v-else-if="request.quotesCount > 0" class="space-y-1">
                    <p class="text-sm font-semibold text-blue-600">{{ request.quotesCount }}개 견적 도착!</p>
                    <p class="text-xs text-gray-500">비교해보세요</p>
                  </div>
                  <div v-else class="space-y-1">
                    <p class="text-sm text-gray-500">견적 대기중</p>
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-center space-y-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="getStatusBadgeClass(request.status)">
                    {{ getStatusText(request.status) }}
                  </span>
                  <Icon name="heroicons:chevron-right" class="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 진행 중인 작업 알림 -->
      <div v-if="activeWork" class="mt-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start">
            <Icon name="heroicons:information-circle" class="h-5 w-5 text-blue-600 mt-0.5" />
            <div class="ml-3 flex-1">
              <h3 class="text-sm font-medium text-blue-800">진행 중인 작업이 있습니다</h3>
              <p class="text-sm text-blue-700 mt-1">
                {{ activeWork.contractorName }}님이 작업을 진행 중입니다.
              </p>
              <div class="mt-3 flex space-x-3">
                <NuxtLink
                  :to="`/customer/chat/${activeWork.id}`"
                  class="btn btn-primary btn-sm"
                >
                  채팅하기
                </NuxtLink>
                <NuxtLink
                  :to="`/customer/request/${activeWork.id}`"
                  class="btn btn-secondary btn-sm"
                >
                  상세보기
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 임시 데이터 (실제로는 API에서 가져올 예정)
const stats = ref({
  pending: 1,
  inProgress: 2,
  completed: 8,
  totalSpent: 850000
})

const recentRequests = ref([
  {
    id: 1,
    title: '화장실 변기 누수',
    address: '서울시 강남구 역삼동',
    createdAt: new Date('2024-01-15'),
    status: 'in_progress',
    quotesCount: 3,
    selectedQuote: { price: 120000 }
  },
  {
    id: 2,
    title: '주방 싱크대 하부 누수',
    address: '서울시 강남구 삼성동',
    createdAt: new Date('2024-01-10'),
    status: 'completed',
    quotesCount: 5,
    selectedQuote: { price: 85000 }
  },
  {
    id: 3,
    title: '베란다 배수관 누수',
    address: '서울시 강남구 청담동',
    createdAt: new Date('2024-01-08'),
    status: 'pending',
    quotesCount: 2,
    selectedQuote: null
  }
])

const activeWork = ref({
  id: 1,
  contractorName: '김수리'
})

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

const getStatusIndicatorClass = (status) => {
  const classMap = {
    pending: 'bg-yellow-400',
    quote_received: 'bg-blue-400',
    in_progress: 'bg-green-400',
    completed: 'bg-emerald-400',
    cancelled: 'bg-red-400'
  }
  return classMap[status] || 'bg-gray-400'
}

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

// 메타 태그 설정
useHead({
  title: '내 요청 현황 - 누수케어',
  meta: [
    { name: 'description', content: '누수 수리 요청 현황과 진행 상황을 확인하세요' }
  ]
})
</script>