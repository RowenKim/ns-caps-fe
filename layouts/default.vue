<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <header class="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- 로고 -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <!-- NS-CAPS Logo -->
              <div class="relative">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div class="text-white font-bold text-lg">NS</div>
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Icon name="streamline:water-drop-2" class="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <span class="text-xl font-bold text-gray-900">NS-CAPS</span>
                <div class="text-xs text-gray-500 -mt-1">누수케어 플랫폼</div>
              </div>
            </NuxtLink>
          </div>

          <!-- 네비게이션 (데스크톱) -->
          <nav class="hidden md:flex items-center space-x-8">
            <!-- 공통 메뉴 -->
            <NuxtLink to="/contractors" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              전문가 찾기
            </NuxtLink>
            <NuxtLink to="/customer/request" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              누수 신고
            </NuxtLink>
            <NuxtLink to="/about" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              서비스 소개
            </NuxtLink>
            
          </nav>

          <!-- 사용자 메뉴 -->
          <div class="flex items-center space-x-4">
            <!-- 로그인한 경우 -->
            <template v-if="isLoggedIn">
              <!-- 알림 -->
              <button class="relative p-2 text-gray-400 hover:text-gray-600">
                <Icon name="heroicons:bell" class="h-6 w-6" />
                <span v-if="notificationCount > 0" 
                  class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {{ notificationCount }}
                </span>
              </button>

              <!-- 프로필 드롭다운 -->
              <div class="relative">
                <button @click="showProfileMenu = !showProfileMenu" 
                  class="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">{{ userInitial }}</span>
                  </div>
                  <span class="hidden md:block text-sm font-medium">{{ userName }}</span>
                  <Icon name="heroicons:chevron-down" class="h-4 w-4" />
                </button>
                
                <!-- 드롭다운 메뉴 -->
                <div v-if="showProfileMenu" 
                  class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-2">
                  <!-- 사용자 정보 -->
                  <div class="px-4 py-3 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                    <p class="text-xs text-gray-500">{{ getUserTypeLabel() }}</p>
                  </div>
                  
                  <!-- 고객 메뉴 -->
                  <template v-if="userType === 'customer'">
                    <div class="py-1">
                      <NuxtLink to="/customer/dashboard" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:home" class="h-4 w-4 mr-3" />
                        대시보드
                      </NuxtLink>
                      <NuxtLink to="/customer/requests" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:clipboard-document-list" class="h-4 w-4 mr-3" />
                        내 요청
                      </NuxtLink>
                      <NuxtLink to="/customer/quotes" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:document-text" class="h-4 w-4 mr-3" />
                        받은 견적
                      </NuxtLink>
                      <NuxtLink to="/customer/chat" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:chat-bubble-left-right" class="h-4 w-4 mr-3" />
                        채팅
                      </NuxtLink>
                    </div>
                    <hr class="my-1">
                  </template>

                  <!-- 업자 메뉴 -->
                  <template v-if="userType === 'contractor'">
                    <div class="py-1">
                      <NuxtLink to="/contractor/dashboard" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:home" class="h-4 w-4 mr-3" />
                        대시보드
                      </NuxtLink>
                      <NuxtLink to="/contractor/requests" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:clipboard-document-list" class="h-4 w-4 mr-3" />
                        신규 요청
                      </NuxtLink>
                      <NuxtLink to="/contractor/quotes" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:document-text" class="h-4 w-4 mr-3" />
                        내 견적
                      </NuxtLink>
                    </div>
                    <hr class="my-1">
                  </template>

                  <!-- 관리자 메뉴 -->
                  <template v-if="userType === 'admin'">
                    <div class="py-1">
                      <NuxtLink to="/admin/dashboard" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Icon name="heroicons:home" class="h-4 w-4 mr-3" />
                        관리자 대시보드
                      </NuxtLink>
                    </div>
                    <hr class="my-1">
                  </template>

                  <!-- 공통 메뉴 -->
                  <div class="py-1">
                    <NuxtLink to="/profile" 
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Icon name="heroicons:user-circle" class="h-4 w-4 mr-3" />
                      프로필 설정
                    </NuxtLink>
                    <NuxtLink to="/settings" 
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Icon name="heroicons:cog-6-tooth" class="h-4 w-4 mr-3" />
                      계정 설정
                    </NuxtLink>
                    <button @click="logout" 
                      class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Icon name="heroicons:arrow-right-on-rectangle" class="h-4 w-4 mr-3" />
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            </template>

            <!-- 로그인/회원가입 버튼 -->
            <div v-else class="flex items-center space-x-3">
              <NuxtLink 
                to="/login" 
                class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                로그인
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                회원가입
              </NuxtLink>
              
              <!-- Mobile Menu Button -->
              <button class="md:hidden p-2 text-gray-600 hover:text-blue-600">
                <Icon name="heroicons:bars-3" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 모바일 하단 네비게이션 -->
    <nav v-if="isLoggedIn" class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div class="flex justify-around py-2">
        <!-- 고객용 네비게이션 -->
        <template v-if="userType === 'customer'">
          <NuxtLink to="/customer/dashboard" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:home" class="h-6 w-6 mb-1" />
            <span>홈</span>
          </NuxtLink>
          <NuxtLink to="/customer/request" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:plus-circle" class="h-6 w-6 mb-1" />
            <span>신고</span>
          </NuxtLink>
          <NuxtLink to="/customer/quotes" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:document-text" class="h-6 w-6 mb-1" />
            <span>견적</span>
          </NuxtLink>
          <NuxtLink to="/customer/chat" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:chat-bubble-left-right" class="h-6 w-6 mb-1" />
            <span>채팅</span>
          </NuxtLink>
        </template>

        <!-- 업체용 네비게이션 -->
        <template v-if="userType === 'contractor'">
          <NuxtLink to="/contractor/dashboard" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:home" class="h-6 w-6 mb-1" />
            <span>홈</span>
          </NuxtLink>
          <NuxtLink to="/contractor/requests" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:clipboard-document-list" class="h-6 w-6 mb-1" />
            <span>요청</span>
          </NuxtLink>
          <NuxtLink to="/contractor/works" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:wrench-screwdriver" class="h-6 w-6 mb-1" />
            <span>작업</span>
          </NuxtLink>
          <NuxtLink to="/contractor/chat" 
            class="flex flex-col items-center py-2 px-4 text-xs text-gray-600 hover:text-blue-600"
            active-class="text-blue-600">
            <Icon name="heroicons:chat-bubble-left-right" class="h-6 w-6 mb-1" />
            <span>채팅</span>
          </NuxtLink>
        </template>
      </div>
    </nav>

    <!-- 모바일 네비게이션을 위한 여백 -->
    <div v-if="isLoggedIn" class="h-16 md:hidden"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 반응형 상태
const showProfileMenu = ref(false)
const notificationCount = ref(0)

// 임시 사용자 상태 (실제로는 auth store에서 가져올 예정)
const isLoggedIn = ref(false) // 기본값은 false (로그인 안된 상태)
const userType = ref('customer') // 'customer', 'contractor', 'admin'
const userName = ref('홍길동')

// 계산된 속성
const userInitial = computed(() => {
  return userName.value ? userName.value.charAt(0) : 'U'
})

// 메서드
const getUserTypeLabel = () => {
  switch (userType.value) {
    case 'customer': return '고객'
    case 'contractor': return '누수 전문가'
    case 'admin': return '관리자'
    default: return '사용자'
  }
}

const logout = () => {
  // TODO: 실제 로그아웃 로직 구현
  isLoggedIn.value = false
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
