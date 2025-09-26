<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Profile Header -->
    <section class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Profile Image -->
          <div class="md:col-span-1">
            <div class="relative">
              <div class="w-full aspect-square bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl overflow-hidden">
                <img 
                  v-if="contractor?.profileImage" 
                  :src="contractor.profileImage" 
                  :alt="contractor.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex items-center justify-center h-full">
                  <Icon name="heroicons:user-circle" class="h-32 w-32 text-white/70" />
                </div>
              </div>
              
              <!-- Online Status -->
              <div 
                v-if="contractor?.isOnline"
                class="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-medium"
              >
                온라인
              </div>
            </div>
          </div>

          <!-- Profile Info -->
          <div class="md:col-span-2">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ contractor?.name }}</h1>
                <p class="text-lg text-gray-600 mb-4">{{ contractor?.location }}</p>
                
                <!-- Rating -->
                <div class="flex items-center mb-4">
                  <div class="flex items-center mr-4">
                    <Icon name="heroicons:star-solid" class="h-6 w-6 text-yellow-400 mr-1" />
                    <span class="text-xl font-bold text-gray-900">{{ contractor?.rating }}</span>
                    <span class="text-gray-500 ml-2">({{ contractor?.reviewCount }}개 리뷰)</span>
                  </div>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div class="bg-blue-50 p-4 rounded-xl">
                    <p class="text-sm text-blue-600 font-medium">경력</p>
                    <p class="text-xl font-bold text-blue-900">{{ contractor?.experience }}년</p>
                  </div>
                  <div class="bg-green-50 p-4 rounded-xl">
                    <p class="text-sm text-green-600 font-medium">완료 건수</p>
                    <p class="text-xl font-bold text-green-900">{{ contractor?.completedJobs }}건</p>
                  </div>
                  <div class="bg-purple-50 p-4 rounded-xl">
                    <p class="text-sm text-purple-600 font-medium">평균 견적</p>
                    <p class="text-xl font-bold text-purple-900">{{ contractor?.averagePrice }}만원</p>
                  </div>
                  <div class="bg-orange-50 p-4 rounded-xl">
                    <p class="text-sm text-orange-600 font-medium">응답 시간</p>
                    <p class="text-xl font-bold text-orange-900">{{ contractor?.responseTime }}분</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <NuxtLink 
                :to="`/contractor/${contractor?.id}/quote`"
                class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-center"
              >
                견적 요청하기
              </NuxtLink>
              <button class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Tabs -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-8">
          <nav class="flex space-x-8">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'">
              <!-- Specialties -->
              <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">전문 분야</h3>
                <div class="flex flex-wrap gap-3">
                  <span 
                    v-for="specialty in contractor?.specialties" 
                    :key="specialty"
                    class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                  >
                    {{ specialty }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">소개</h3>
                <p class="text-gray-700 leading-relaxed">{{ contractor?.description }}</p>
              </div>

              <!-- Service Areas -->
              <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">서비스 지역</h3>
                <div class="grid md:grid-cols-3 gap-3">
                  <span 
                    v-for="area in contractor?.serviceAreas" 
                    :key="area"
                    class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-center"
                  >
                    {{ area }}
                  </span>
                </div>
              </div>

              <!-- Certifications -->
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <h3 class="text-xl font-bold text-gray-900 mb-4">보유 자격증</h3>
                <div class="space-y-3">
                  <div 
                    v-for="cert in contractor?.certifications" 
                    :key="cert.name"
                    class="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <span class="font-medium text-green-900">{{ cert.name }}</span>
                    <span class="text-sm text-green-600">{{ cert.year }}년 취득</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'">
              <div class="space-y-6">
                <div 
                  v-for="review in contractor?.reviews" 
                  :key="review.id"
                  class="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <!-- Review Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                      <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span class="font-bold text-gray-600">{{ review.customerName.charAt(0) }}</span>
                      </div>
                      <div class="ml-3">
                        <p class="font-bold text-gray-900">{{ review.customerName }}</p>
                        <p class="text-sm text-gray-500">{{ review.date }}</p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="heroicons:star-solid" class="h-5 w-5 text-yellow-400 mr-1" />
                      <span class="font-bold">{{ review.rating }}</span>
                    </div>
                  </div>

                  <!-- Review Content -->
                  <p class="text-gray-700 mb-4">{{ review.content }}</p>

                  <!-- Review Images -->
                  <div v-if="review.images?.length" class="grid grid-cols-3 gap-2">
                    <img 
                      v-for="image in review.images" 
                      :key="image"
                      :src="image" 
                      class="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Portfolio Tab -->
            <div v-if="activeTab === 'portfolio'">
              <div class="grid md:grid-cols-2 gap-6">
                <div 
                  v-for="project in contractor?.portfolio" 
                  :key="project.id"
                  class="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-48 object-cover"
                  />
                  <div class="p-4">
                    <h4 class="font-bold text-gray-900 mb-2">{{ project.title }}</h4>
                    <p class="text-gray-600 text-sm mb-3">{{ project.description }}</p>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">{{ project.location }}</span>
                      <span class="text-blue-600 font-medium">{{ project.price }}만원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Quick Quote Form -->
            <div class="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 class="text-xl font-bold text-gray-900 mb-4">빠른 견적 요청</h3>
              
              <form @submit.prevent="submitQuickQuote" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">누수 종류</label>
                  <select v-model="quickQuote.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">선택해주세요</option>
                    <option value="bathroom">화장실 누수</option>
                    <option value="kitchen">주방 누수</option>
                    <option value="roof">지붕 누수</option>
                    <option value="pipe">배관 누수</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                  <input 
                    v-model="quickQuote.phone"
                    type="tel" 
                    placeholder="010-0000-0000"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">간단한 설명</label>
                  <textarea 
                    v-model="quickQuote.description"
                    rows="3"
                    placeholder="누수 상황을 간단히 설명해주세요"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  견적 요청하기
                </button>
              </form>

              <!-- Contact Info -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="font-bold text-gray-900 mb-3">연락처 정보</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center">
                    <Icon name="heroicons:phone" class="h-4 w-4 text-gray-400 mr-2" />
                    <span>{{ contractor?.phone }}</span>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:envelope" class="h-4 w-4 text-gray-400 mr-2" />
                    <span>{{ contractor?.email }}</span>
                  </div>
                  <div class="flex items-center">
                    <Icon name="heroicons:map-pin" class="h-4 w-4 text-gray-400 mr-2" />
                    <span>{{ contractor?.address }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  title: 'NS-CAPS - 전문가 프로필',
  meta: [
    { name: 'description', content: '누수 수리 전문가의 상세 프로필과 포트폴리오를 확인하세요.' }
  ]
})

// 반응형 데이터
const activeTab = ref('overview')
const quickQuote = ref({
  type: '',
  phone: '',
  description: ''
})

// 탭 정의
const tabs = [
  { id: 'overview', name: '개요' },
  { id: 'reviews', name: '리뷰' },
  { id: 'portfolio', name: '포트폴리오' }
]

// 더미 데이터 (실제로는 API에서 가져올 예정)
const contractor = ref({
  id: 1,
  name: '김수리',
  location: '서울 강남구',
  rating: 4.8,
  reviewCount: 127,
  experience: 15,
  completedJobs: 324,
  averagePrice: 25,
  responseTime: 30,
  isOnline: true,
  profileImage: null,
  description: '15년간 누수 수리 전문가로 활동하며 다양한 누수 문제를 해결해왔습니다. 정확한 진단과 신속한 수리로 고객 만족도 98%를 유지하고 있습니다. 사후 관리까지 책임지는 전문가입니다.',
  specialties: ['화장실 누수', '싱크대 누수', '배관 교체', '방수 공사'],
  serviceAreas: ['서울 강남구', '서울 서초구', '서울 송파구', '경기 성남시'],
  certifications: [
    { name: '배관기능사', year: 2008 },
    { name: '건물설비기능사', year: 2010 },
    { name: '방수기능사', year: 2012 }
  ],
  phone: '010-1234-5678',
  email: 'kimsoori@example.com',
  address: '서울특별시 강남구 테헤란로',
  reviews: [
    {
      id: 1,
      customerName: '홍길동',
      rating: 5,
      date: '2024.01.15',
      content: '신속하고 정확한 진단으로 누수 문제를 말끔히 해결해주셨습니다. 사후관리까지 완벽했어요!',
      images: []
    },
    {
      id: 2,
      customerName: '김영희',
      rating: 4,
      date: '2024.01.10',
      content: '친절하게 설명해주시고 깔끔하게 작업해주셨습니다. 가격도 합리적이었어요.',
      images: []
    }
  ],
  portfolio: [
    {
      id: 1,
      title: '아파트 화장실 누수 수리',
      description: '변기 뒤쪽 배관 누수 완전 해결',
      location: '강남구 대치동',
      price: 18,
      image: '/images/portfolio1.jpg'
    },
    {
      id: 2,
      title: '주방 싱크대 누수 보수',
      description: '싱크대 하부 배관 교체 및 방수 처리',
      location: '서초구 반포동',
      price: 25,
      image: '/images/portfolio2.jpg'
    }
  ]
})

// 메서드
const submitQuickQuote = () => {
  // TODO: 견적 요청 API 호출
  console.log('견적 요청:', quickQuote.value)
  alert('견적 요청이 전송되었습니다!')
  
  // 폼 초기화
  quickQuote.value = {
    type: '',
    phone: '',
    description: ''
  }
}

onMounted(() => {
  // 실제로는 API에서 contractor 데이터를 가져올 예정
  console.log('Loading contractor:', contractorId)
})
</script>
