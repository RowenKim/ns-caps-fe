<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div class="w-72 h-72 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div class="w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div class="text-center">
          <!-- Main heading -->
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            누수 고민, <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3분만에</span><br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">해결하세요</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            전문가가 직접 방문하여 안전하고 투명한 누수 수리 서비스를 제공합니다
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <NuxtLink 
              to="/customer/request" 
              class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center">
                <Icon name="heroicons:magnifying-glass" class="h-6 w-6 mr-3" />
                지금 바로 누수 신고
                <Icon name="heroicons:arrow-right" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </NuxtLink>
            
            <NuxtLink 
              to="/contractors" 
              class="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex items-center">
                <Icon name="heroicons:users" class="h-6 w-6 mr-3" />
                전문가 찾기
                <Icon name="heroicons:arrow-right" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </NuxtLink>
            
            <button class="flex items-center px-6 py-4 text-gray-700 font-semibold hover:text-blue-600 transition-colors">
              <Icon name="heroicons:play-circle" class="h-6 w-6 mr-2" />
              서비스 소개 영상
            </button>
          </div>

          <!-- Trust indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div class="flex items-center">
              <Icon name="heroicons:star-solid" class="h-5 w-5 text-yellow-400 mr-1" />
              <span>평균 4.8점 만족도</span>
            </div>
            <div class="flex items-center">
              <Icon name="heroicons:clock" class="h-5 w-5 text-green-500 mr-1" />
              <span>평균 2시간 내 방문</span>
            </div>
            <div class="flex items-center">
              <Icon name="heroicons:shield-check" class="h-5 w-5 text-blue-500 mr-1" />
              <span>100% 보험 보장</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3단계</span>로 간단하게
          </h2>
          <p class="text-xl text-gray-600">복잡한 절차 없이, 누수 문제를 빠르게 해결하세요</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="relative group">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 h-full border border-blue-100 group-hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Icon name="heroicons:camera" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">1. 사진으로 신고</h3>
              <p class="text-gray-600 leading-relaxed">
                누수 상황을 사진으로 찍어 업로드하고 간단한 정보만 입력하세요. 
                전문가가 정확한 상황 판단을 위해 도와드릴게요.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative group">
            <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 h-full border border-indigo-100 group-hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Icon name="heroicons:calculator" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">2. 견적 비교</h3>
              <p class="text-gray-600 leading-relaxed">
                주변 전문 업체들이 경쟁적으로 견적을 제출합니다. 
                가격, 후기, 경력을 비교해서 최적의 업체를 선택하세요.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative group">
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 h-full border border-purple-100 group-hover:shadow-xl transition-all duration-300">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Icon name="heroicons:wrench-screwdriver" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">3. 안전한 수리</h3>
              <p class="text-gray-600 leading-relaxed">
                선택한 전문가가 방문하여 수리를 진행합니다. 
                에스크로 결제로 작업 완료 후 안전하게 결제됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            왜 <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">NS-CAPS</span>일까요?
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:shield-check" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">100% 보험 보장</h3>
            <p class="text-gray-600">만약의 사고에 대비해 모든 작업에 보험이 적용됩니다.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:currency-dollar" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">투명한 가격</h3>
            <p class="text-gray-600">숨겨진 비용 없이, 처음 제시된 견적 그대로 진행됩니다.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:clock" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">빠른 대응</h3>
            <p class="text-gray-600">긴급 상황에도 평균 2시간 내 전문가가 출동합니다.</p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:star" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">검증된 전문가</h3>
            <p class="text-gray-600">자격증과 경력을 검증받은 전문가들만 등록되어 있습니다.</p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:chat-bubble-left-right" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">실시간 소통</h3>
            <p class="text-gray-600">작업 전후 실시간 채팅으로 궁금한 점을 바로 해결하세요.</p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Icon name="heroicons:document-text" class="h-6 w-6 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">완벽한 기록</h3>
            <p class="text-gray-600">작업 전후 사진과 상세 내역이 모두 기록으로 남습니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          누수 문제, 더 이상 혼자 고민하지 마세요
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          지금 신고하면 2시간 내에 전문가가 찾아갑니다
        </p>
        


        <!-- Quick access for professionals -->
        <div class="mt-12 pt-8 border-t border-blue-500/30">
          <p class="text-blue-100 mb-4">전문가이신가요?</p>
          <NuxtLink 
            to="/contractor/dashboard" 
            class="inline-flex items-center text-blue-200 hover:text-white font-semibold transition-colors"
          >
            <Icon name="heroicons:wrench-screwdriver" class="h-5 w-5 mr-2" />
            전문가 대시보드 →
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'NS-CAPS - 안전한 누수 수리 플랫폼',
  meta: [
    { name: 'description', content: '누수업자와 고객을 안전하게 연결하는 투명한 플랫폼' }
  ]
})
</script>