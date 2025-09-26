<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- 헤더 섹션 -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">견적 비교하기 💰</h1>
            <p class="mt-2 text-gray-600">전문가들의 견적을 비교하고 가장 좋은 조건을 선택하세요</p>
          </div>
          <div class="hidden md:flex items-center space-x-3">
            <div class="text-right text-sm text-gray-500">
              <div>{{ quotes.length }}개 견적 도착</div>
              <div>평균 2시간 내 완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 성공 알림 -->
      <div v-if="$route.query.success" class="mb-8">
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Icon name="heroicons:check-circle" class="h-6 w-6 text-white" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-green-800 mb-2">🎉 신고가 완료되었습니다!</h3>
              <p class="text-green-700 mb-4">
                전문가들이 견적을 준비하고 있어요. 보통 2-4시간 내에 첫 번째 견적을 받아보실 수 있습니다.
              </p>
              <div class="flex items-center space-x-4 text-sm text-green-600">
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:clock" class="h-4 w-4" />
                  <span>평균 2시간</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:users" class="h-4 w-4" />
                  <span>3-5명 전문가</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="heroicons:shield-check" class="h-4 w-4" />
                  <span>품질 보장</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 요청 정보 카드 -->
      <div class="bg-white rounded-3xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-900">요청 정보</h2>
        </div>
        <div class="px-8 py-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">화장실 변기 누수</h3>
              <p class="text-gray-600 mb-4">서울시 강남구 역삼동 123-45</p>
              <div class="space-y-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">견적 대기</span>
                <p class="text-sm text-gray-500">요청일: 2024년 1월 15일</p>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">증상</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• 물이 뚝뚝 떨어져요</li>
                <li>• 물얼룩이 생겼어요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 견적 목록 -->
      <div class="space-y-6">
        <!-- 견적 없음 상태 -->
        <div v-if="quotes.length === 0" class="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="px-8 py-12 text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:clock" class="h-10 w-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">견적 대기 중...</h3>
            <p class="text-gray-600 mb-4">전문가들이 견적을 준비하고 있습니다.</p>
            <p class="text-sm text-gray-500">보통 2-4시간 내에 첫 번째 견적을 받으실 수 있습니다.</p>
          </div>
        </div>

        <!-- 견적 카드들 -->
        <div
          v-for="quote in quotes"
          :key="quote.id"
          class="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
          :class="{ 'ring-2 ring-blue-500 border-blue-500': selectedQuote?.id === quote.id }"
          @click="selectQuote(quote)"
        >
          <div class="p-8">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Icon name="heroicons:user" class="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ quote.contractorName }}</h3>
                  <div class="flex items-center space-x-3 mt-2">
                    <div class="flex items-center">
                      <Icon name="heroicons:star-solid" class="h-5 w-5 text-yellow-400" />
                      <span class="text-sm text-gray-600 ml-1 font-medium">{{ quote.rating }}</span>
                    </div>
                    <span class="text-gray-300">•</span>
                    <span class="text-sm text-gray-600">{{ quote.completedJobs }}건 완료</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-gray-900">{{ formatPrice(quote.price) }}</div>
                <div class="text-sm text-gray-500">부가세 포함</div>
              </div>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">작업 내용</h4>
                <p class="text-gray-600">{{ quote.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:clock" class="h-4 w-4 text-gray-400" />
                  <span class="text-gray-500">예상 작업시간:</span>
                  <span class="font-medium text-gray-900">{{ quote.estimatedTime }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:calendar" class="h-4 w-4 text-gray-400" />
                  <span class="text-gray-500">방문 가능일:</span>
                  <span class="font-medium text-gray-900">{{ quote.availableDate }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center pt-6 border-t border-gray-200">
              <div class="flex items-center space-x-4">
                <button
                  @click.stop="viewProfile(quote.contractorId)"
                  class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  프로필 보기
                </button>
                <button
                  @click.stop="startChat(quote.contractorId)"
                  class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  문의하기
                </button>
              </div>
              
              <button
                v-if="selectedQuote?.id === quote.id"
                @click.stop="confirmQuote(quote)"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                이 견적으로 진행하기 →
              </button>
              <div
                v-else
                class="px-6 py-3 border-2 border-gray-200 text-gray-500 rounded-2xl font-medium"
              >
                선택하려면 클릭
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 샘플 견적 데이터
const quotes = ref([
  {
    id: 1,
    contractorId: 'contractor1',
    contractorName: '김수리 기사',
    rating: 4.8,
    completedJobs: 127,
    price: 120000,
    description: '변기 플러시 밸브 교체 및 배관 점검. 기존 부품 제거 후 새 부품으로 교체하고 누수 방지를 위한 실링 작업을 포함합니다.',
    estimatedTime: '1-2시간',
    availableDate: '내일 오후'
  },
  {
    id: 2,
    contractorId: 'contractor2',
    contractorName: '박배관 전문가',
    rating: 4.9,
    completedJobs: 89,
    price: 95000,
    description: '변기 내부 부품 교체 및 배수관 연결부 점검. A/S 1년 보장합니다.',
    estimatedTime: '1시간',
    availableDate: '오늘 저녁'
  }
])

const selectedQuote = ref(null)

// 유틸리티 함수
const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}

const selectQuote = (quote) => {
  selectedQuote.value = quote
}

const confirmQuote = async (quote) => {
  if (confirm(`${quote.contractorName}님의 견적으로 진행하시겠습니까?`)) {
    // TODO: 견적 선택 API 호출
    await navigateTo(`/customer/request/${quote.id}`)
  }
}

const viewProfile = (contractorId) => {
  // TODO: 업자 프로필 페이지로 이동
  console.log('프로필 보기:', contractorId)
}

const startChat = (contractorId) => {
  // TODO: 채팅 시작
  console.log('채팅 시작:', contractorId)
}

// 메타 태그 설정
useHead({
  title: '견적 비교 - 누수케어',
  meta: [
    { name: 'description', content: '받은 견적들을 비교하고 최적의 업자를 선택하세요' }
  ]
})
</script>