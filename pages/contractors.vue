<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            믿을 수 있는 <span class="text-yellow-300">누수 전문가</span>를 찾아보세요
          </h1>
          <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            검증된 전문가들이 안전하고 투명한 누수 수리 서비스를 제공합니다
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="flex-1 max-w-md">
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="지역이나 전문가 이름으로 검색"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex gap-4 items-center">
            <!-- Location Filter -->
            <select v-model="selectedLocation" class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">전체 지역</option>
              <option value="서울">서울특별시</option>
              <option value="경기">경기도</option>
              <option value="인천">인천광역시</option>
              <option value="부산">부산광역시</option>
              <option value="대구">대구광역시</option>
            </select>

            <!-- Rating Filter -->
            <select v-model="selectedRating" class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">전체 평점</option>
              <option value="4.5">4.5점 이상</option>
              <option value="4.0">4.0점 이상</option>
              <option value="3.5">3.5점 이상</option>
            </select>

            <!-- Sort -->
            <select v-model="sortBy" class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="rating">평점순</option>
              <option value="reviews">리뷰순</option>
              <option value="distance">거리순</option>
              <option value="price">가격순</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Contractors List -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-gray-600">
            총 <span class="font-semibold text-blue-600">{{ filteredContractors.length }}명</span>의 전문가를 찾았습니다
          </p>
        </div>

        <!-- Contractors Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="contractor in filteredContractors" 
            :key="contractor.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <!-- Profile Image -->
            <div class="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600">
              <img 
                v-if="contractor.profileImage" 
                :src="contractor.profileImage" 
                :alt="contractor.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex items-center justify-center h-full">
                <Icon name="heroicons:user-circle" class="h-20 w-20 text-white/70" />
              </div>
              
              <!-- Online Status -->
              <div 
                v-if="contractor.isOnline"
                class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                온라인
              </div>
            </div>

            <!-- Profile Info -->
            <div class="p-6">
              <!-- Name and Rating -->
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">{{ contractor.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ contractor.location }}</p>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:star-solid" class="h-5 w-5 text-yellow-400 mr-1" />
                  <span class="font-semibold text-gray-900">{{ contractor.rating }}</span>
                  <span class="text-gray-500 text-sm ml-1">({{ contractor.reviewCount }})</span>
                </div>
              </div>

              <!-- Specialties -->
              <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="specialty in contractor.specialties" 
                    :key="specialty"
                    class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {{ specialty }}
                  </span>
                </div>
              </div>

              <!-- Experience and Price -->
              <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p class="text-gray-500">경력</p>
                  <p class="font-semibold">{{ contractor.experience }}년</p>
                </div>
                <div>
                  <p class="text-gray-500">평균 견적</p>
                  <p class="font-semibold text-blue-600">{{ contractor.averagePrice }}만원</p>
                </div>
              </div>

              <!-- Quick Info -->
              <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div class="flex items-center">
                  <Icon name="heroicons:clock" class="h-4 w-4 mr-1" />
                  <span>평균 {{ contractor.responseTime }}분 응답</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:shield-check" class="h-4 w-4 mr-1" />
                  <span>보험 가입</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <NuxtLink 
                  :to="`/contractor/${contractor.id}`"
                  class="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  프로필 보기
                </NuxtLink>
                <NuxtLink 
                  :to="`/contractor/${contractor.id}/quote`"
                  class="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  견적 요청
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredContractors.length === 0" class="text-center py-16">
          <Icon name="heroicons:users" class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p class="text-gray-600 mb-6">다른 검색 조건을 시도해보세요</p>
          <button 
            @click="resetFilters"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            필터 초기화
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredContractors.length > 0" class="flex justify-center mt-12">
          <div class="flex space-x-2">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          원하는 전문가를 찾지 못하셨나요?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          누수 신고를 하시면 주변 전문가들이 직접 견적을 제출해드립니다
        </p>
        <NuxtLink 
          to="/customer/request"
          class="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
        >
          <Icon name="heroicons:magnifying-glass" class="h-6 w-6 mr-3" />
          누수 신고하기
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// SEO
useHead({
  title: 'NS-CAPS - 누수 전문가 찾기',
  meta: [
    { name: 'description', content: '검증된 누수 수리 전문가들을 찾아보세요. 투명한 가격과 안전한 서비스를 제공합니다.' }
  ]
})

// 반응형 데이터
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedRating = ref('')
const sortBy = ref('rating')
const currentPage = ref(1)
const itemsPerPage = 9

// 더미 데이터 (실제로는 API에서 가져올 예정)
const contractors = ref([
  {
    id: 1,
    name: '김수리',
    location: '서울 강남구',
    rating: 4.8,
    reviewCount: 127,
    specialties: ['화장실 누수', '싱크대 누수', '배관 교체'],
    experience: 15,
    averagePrice: 25,
    responseTime: 30,
    isOnline: true,
    profileImage: null
  },
  {
    id: 2,
    name: '박전문',
    location: '서울 서초구',
    rating: 4.9,
    reviewCount: 89,
    specialties: ['보일러 누수', '바닥 난방', '급수관 수리'],
    experience: 12,
    averagePrice: 30,
    responseTime: 45,
    isOnline: true,
    profileImage: null
  },
  {
    id: 3,
    name: '이누수',
    location: '경기 성남시',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['옥상 방수', '외벽 누수', '베란다 누수'],
    experience: 20,
    averagePrice: 35,
    responseTime: 25,
    isOnline: false,
    profileImage: null
  },
  {
    id: 4,
    name: '최마스터',
    location: '서울 송파구',
    rating: 4.6,
    reviewCount: 203,
    specialties: ['타일 누수', '실리콘 보수', '방수 작업'],
    experience: 18,
    averagePrice: 28,
    responseTime: 40,
    isOnline: true,
    profileImage: null
  },
  {
    id: 5,
    name: '장기술',
    location: '인천 연수구',
    rating: 4.5,
    reviewCount: 94,
    specialties: ['상수도 누수', '하수도 막힘', '배관 청소'],
    experience: 10,
    averagePrice: 22,
    responseTime: 35,
    isOnline: true,
    profileImage: null
  },
  {
    id: 6,
    name: '한전문가',
    location: '경기 수원시',
    rating: 4.8,
    reviewCount: 112,
    specialties: ['지하 누수', '벽체 누수', '구조 보강'],
    experience: 22,
    averagePrice: 40,
    responseTime: 50,
    isOnline: false,
    profileImage: null
  }
])

// 계산된 속성
const filteredContractors = computed(() => {
  let filtered = contractors.value

  // 검색 필터
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contractor => 
      contractor.name.toLowerCase().includes(query) ||
      contractor.location.toLowerCase().includes(query)
    )
  }

  // 지역 필터
  if (selectedLocation.value) {
    filtered = filtered.filter(contractor => 
      contractor.location.includes(selectedLocation.value)
    )
  }

  // 평점 필터
  if (selectedRating.value) {
    const minRating = parseFloat(selectedRating.value)
    filtered = filtered.filter(contractor => contractor.rating >= minRating)
  }

  // 정렬
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviewCount - a.reviewCount
      case 'distance':
        // 실제로는 사용자 위치 기반으로 계산
        return a.id - b.id
      case 'price':
        return a.averagePrice - b.averagePrice
      default:
        return 0
    }
  })

  // 페이지네이션
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(contractors.value.length / itemsPerPage)
})

// 메서드
const resetFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  selectedRating.value = ''
  sortBy.value = 'rating'
  currentPage.value = 1
}

onMounted(() => {
  // 컴포넌트 마운트 시 실행할 로직
})
</script>
