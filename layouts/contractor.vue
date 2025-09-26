<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 업자 전용 헤더 -->
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- 좌측: 로고 -->
          <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <div class="text-white font-bold text-lg">NS</div>
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="heroicons:magnifying-glass" class="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div>
              <span class="text-xl font-bold text-gray-900">NS-CAPS</span>
              <div class="text-xs text-gray-500 -mt-1">업자 관리 패널</div>
            </div>
          </NuxtLink>

          <!-- 우측: 프로필 -->
          <div class="relative">
            <button @click="showProfileMenu = !showProfileMenu" 
              class="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitial }}</span>
              </div>
              <Icon name="heroicons:chevron-down" class="h-4 w-4" />
            </button>
            
            <!-- 드롭다운 메뉴 -->
            <div v-if="showProfileMenu" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div class="py-1">
                <NuxtLink to="/contractor/profile" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  프로필 관리
                </NuxtLink>
                <NuxtLink to="/contractor/settings" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  설정
                </NuxtLink>
                <hr class="my-1">
                <button @click="logout" 
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- 사이드바 -->
      <aside 
        :class="[
          'bg-white shadow-sm border-r border-gray-200 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'w-16' : 'w-64',
          'lg:relative lg:translate-x-0',
          showMobileSidebar ? 'fixed inset-y-0 left-0 z-40 translate-x-0' : 'fixed inset-y-0 left-0 z-40 -translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- 모바일 오버레이 -->
        <div 
          v-if="showMobileSidebar" 
          @click="showMobileSidebar = false"
          class="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
        ></div>
        <div class="p-4">
          <!-- 사이드바 접기/펼치기 버튼 (데스크톱) -->
          <div class="hidden lg:flex justify-end mb-4">
            <button 
              @click="sidebarCollapsed = !sidebarCollapsed"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon :name="sidebarCollapsed ? 'heroicons:chevron-right' : 'heroicons:chevron-left'" class="h-4 w-4" />
            </button>
          </div>

          <!-- 사용자 정보 -->
          <div v-if="!sidebarCollapsed" class="mb-8">
            <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
              <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold">{{ userInitial }}</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ userName }}</p>
                <p class="text-sm text-blue-600">누수 전문가</p>
              </div>
            </div>
          </div>

          <!-- 축약된 사용자 정보 (접힌 상태) -->
          <div v-else class="mb-8 flex justify-center">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold">{{ userInitial }}</span>
            </div>
          </div>

          <!-- 메뉴 -->
          <nav class="space-y-2">
            <!-- 대시보드 -->
            <NuxtLink 
              to="/contractor/dashboard" 
              :class="[
                'flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors',
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              ]"
              active-class="bg-blue-100 text-blue-700"
              :title="sidebarCollapsed ? '대시보드' : ''"
            >
              <Icon name="heroicons:home" class="h-5 w-5" />
              <span v-if="!sidebarCollapsed" class="font-medium">대시보드</span>
            </NuxtLink>

            <!-- 요청 관리 -->
            <div class="space-y-1">
              <div v-if="!sidebarCollapsed" class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                요청 관리
              </div>
              <NuxtLink 
                to="/contractor/requests" 
                :class="[
                  'flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors relative',
                  sidebarCollapsed ? 'justify-center' : 'space-x-3'
                ]"
                active-class="bg-blue-100 text-blue-700"
                :title="sidebarCollapsed ? '신규 요청' : ''"
              >
                <Icon name="heroicons:clipboard-document-list" class="h-5 w-5" />
                <div v-if="!sidebarCollapsed" class="flex items-center justify-between w-full">
                  <span class="font-medium">신규 요청</span>
                  <span v-if="newRequestsCount > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {{ newRequestsCount }}
                  </span>
                </div>
                <!-- 접힌 상태일 때 알림 배지 -->
                <span v-if="sidebarCollapsed && newRequestsCount > 0" 
                  class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ newRequestsCount }}
                </span>
              </NuxtLink>
              
              <NuxtLink 
                to="/contractor/quotes" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:document-text" class="h-5 w-5" />
                <span class="font-medium">내 견적</span>
              </NuxtLink>

              <NuxtLink 
                to="/contractor/works" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:wrench-screwdriver" class="h-5 w-5" />
                <span class="font-medium">진행 중인 작업</span>
              </NuxtLink>
            </div>

            <!-- 고객 관리 -->
            <div class="space-y-1">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                고객 관리
              </div>
              <NuxtLink 
                to="/contractor/customers" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:users" class="h-5 w-5" />
                <span class="font-medium">고객 목록</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/contractor/reviews" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:star" class="h-5 w-5" />
                <span class="font-medium">리뷰 관리</span>
              </NuxtLink>

              <NuxtLink 
                to="/contractor/chat" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:chat-bubble-left-right" class="h-5 w-5" />
                <div class="flex items-center justify-between w-full">
                  <span class="font-medium">채팅</span>
                  <span v-if="unreadMessagesCount > 0" class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {{ unreadMessagesCount }}
                  </span>
                </div>
              </NuxtLink>
            </div>

            <!-- 수익 관리 -->
            <div class="space-y-1">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                수익 관리
              </div>
              <NuxtLink 
                to="/contractor/earnings" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:currency-dollar" class="h-5 w-5" />
                <span class="font-medium">수익 현황</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/contractor/payments" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:credit-card" class="h-5 w-5" />
                <span class="font-medium">결제 내역</span>
              </NuxtLink>
            </div>

            <!-- 계정 관리 -->
            <div class="space-y-1">
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                계정 관리
              </div>
              <NuxtLink 
                to="/contractor/profile" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:user-circle" class="h-5 w-5" />
                <span class="font-medium">프로필 관리</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/contractor/settings" 
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                active-class="bg-blue-100 text-blue-700"
              >
                <Icon name="heroicons:cog-6-tooth" class="h-5 w-5" />
                <span class="font-medium">설정</span>
              </NuxtLink>
            </div>
          </nav>
        </div>
      </aside>

      <!-- 메인 콘텐츠 -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 반응형 상태
const showProfileMenu = ref(false)
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)
const notificationCount = ref(3)
const newRequestsCount = ref(5)
const unreadMessagesCount = ref(2)

// 임시 사용자 상태
const userName = ref('김수리')
const experience = ref(15)
const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0) : 'U'
})

// 메서드
const toggleSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

// 메서드
const logout = () => {
  // TODO: 실제 로그아웃 로직 구현
  showProfileMenu.value = false
  navigateTo('/login')
}

// 외부 클릭 시 메뉴 닫기
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
