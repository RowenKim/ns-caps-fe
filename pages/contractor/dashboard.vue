<template>
  <div class="p-6">
    <!-- 페이지 헤더 -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">업자 대시보드</h1>
      <p class="mt-1 text-gray-600">새로운 요청과 진행 중인 작업을 확인하세요</p>
    </div>

    <!-- 요약 카드들 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <Icon name="heroicons:document-text" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">새 요청</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.newRequests }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <Icon name="heroicons:clock" class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">진행 중</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
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
              <p class="text-sm font-medium text-gray-600">이번 달 완료</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-full">
              <Icon name="heroicons:currency-dollar" class="h-6 w-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">이번 달 수익</p>
              <p class="text-2xl font-bold text-gray-900">{{ formatPrice(stats.monthlyEarnings) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 새로운 요청 -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">새로운 요청</h3>
            <NuxtLink to="/contractor/requests" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              전체 보기 →
            </NuxtLink>
          </div>
        </div>
        <div class="card-body p-0">
          <div v-if="newRequests.length === 0" class="p-6 text-center text-gray-500">
            <Icon name="heroicons:inbox" class="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>새로운 요청이 없습니다</p>
          </div>
          
          <div v-else class="divide-y divide-gray-200">
            <div
              v-for="request in newRequests.slice(0, 3)"
              :key="request.id"
              class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="navigateTo(`/contractor/request/${request.id}`)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <Icon name="streamline:water-drop-2" class="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">{{ request.title }}</h4>
                      <p class="text-sm text-gray-600">{{ request.address }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatTimeAgo(request.createdAt) }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span class="badge" :class="getUrgencyBadgeClass(request.urgency)">
                    {{ getUrgencyText(request.urgency) }}
                  </span>
                  <button
                    @click.stop="submitQuote(request.id)"
                    class="btn btn-primary btn-sm"
                  >
                    견적 제출
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 진행 중인 작업 -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">진행 중인 작업</h3>
            <NuxtLink to="/contractor/quotes" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              전체 보기 →
            </NuxtLink>
          </div>
        </div>
        <div class="card-body p-0">
          <div v-if="activeJobs.length === 0" class="p-6 text-center text-gray-500">
            <Icon name="heroicons:wrench-screwdriver" class="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>진행 중인 작업이 없습니다</p>
          </div>
          
          <div v-else class="divide-y divide-gray-200">
            <div
              v-for="job in activeJobs"
              :key="job.id"
              class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              @click="navigateTo(`/contractor/job/${job.id}`)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon name="heroicons:wrench-screwdriver" class="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">{{ job.title }}</h4>
                      <p class="text-sm text-gray-600">{{ job.address }}</p>
                      <p class="text-xs text-gray-500 mt-1">예정: {{ job.scheduledDate }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">{{ formatPrice(job.amount) }}</p>
                  </div>
                  <button
                    @click.stop="openChat(job.id)"
                    class="btn btn-success btn-sm"
                  >
                    채팅
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 수익 차트 (간단한 버전) -->
    <div class="card mt-8">
      <div class="card-header">
        <h3 class="text-lg font-semibold text-gray-900">월별 수익 현황</h3>
      </div>
      <div class="card-body">
        <div class="grid grid-cols-6 gap-4 h-32">
          <div
            v-for="(month, index) in monthlyData"
            :key="index"
            class="flex flex-col justify-end"
          >
            <div
              class="bg-blue-500 rounded-t"
              :style="{ height: `${(month.amount / maxAmount) * 100}%` }"
            ></div>
            <div class="text-xs text-gray-600 text-center mt-2">{{ month.name }}</div>
          </div>
        </div>
        <div class="flex justify-between text-sm text-gray-500 mt-4">
          <span>0원</span>
          <span>{{ formatPrice(maxAmount) }}</span>
        </div>
      </div>
    </div>

    <!-- 빠른 액션 버튼들 -->
    <div class="fixed bottom-6 right-6 space-y-3">
      <button
        @click="navigateTo('/contractor/requests')"
        class="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Icon name="heroicons:document-text" class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 통계 데이터
const stats = ref({
  newRequests: 5,
  inProgress: 3,
  completed: 24,
  monthlyEarnings: 2850000
})

// 새로운 요청 데이터
const newRequests = ref([
  {
    id: 1,
    title: '화장실 변기 누수',
    address: '서울시 강남구 역삼동',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
    urgency: 'high'
  },
  {
    id: 2,
    title: '주방 싱크대 누수',
    address: '서울시 강남구 삼성동',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4시간 전
    urgency: 'medium'
  },
  {
    id: 3,
    title: '베란다 배수관 누수',
    address: '서울시 강남구 청담동',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
    urgency: 'low'
  }
])

// 진행 중인 작업 데이터
const activeJobs = ref([
  {
    id: 1,
    title: '거실 천장 누수 수리',
    address: '서울시 강남구 논현동',
    scheduledDate: '오늘 오후 2시',
    amount: 150000
  },
  {
    id: 2,
    title: '욕실 배관 교체',
    address: '서울시 강남구 신사동',
    scheduledDate: '내일 오전 10시',
    amount: 200000
  }
])

// 월별 수익 데이터
const monthlyData = ref([
  { name: '7월', amount: 1800000 },
  { name: '8월', amount: 2200000 },
  { name: '9월', amount: 2500000 },
  { name: '10월', amount: 2800000 },
  { name: '11월', amount: 3200000 },
  { name: '12월', amount: 2850000 }
])

const maxAmount = computed(() => {
  return Math.max(...monthlyData.value.map(m => m.amount))
})

// 유틸리티 함수들
const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
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

// 액션 함수들
const submitQuote = (requestId) => {
  navigateTo(`/contractor/request/${requestId}/quote`)
}

const openChat = (jobId) => {
  navigateTo(`/contractor/chat/${jobId}`)
}

// 레이아웃 지정
definePageMeta({
  layout: 'contractor'
})

// 메타 태그 설정
useHead({
  title: '업자 대시보드 - NS-CAPS',
  meta: [
    { name: 'description', content: '새로운 요청과 진행 중인 작업을 확인하세요' }
  ]
})
</script>
