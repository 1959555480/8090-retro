// 收藏功能
let favorites = JSON.parse(localStorage.getItem('retro-favorites') || '[]');

// 路由控制
const router = {
  go(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    
    // 更新底部导航
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });
    
    // 页面切换时渲染对应内容
    if (page === 'list') renderStars();
    if (page === 'favorite') renderFavoriteList();
    if (page === 'topic') renderTopics();
    if (page === 'today') renderTodayDetail();
  },
  
  back() {
    this.go('home');
  },
  
  showDetail(starId) {
    const star = findStar(starId);
    if (!star) return;
    
    const isFav = favorites.includes(starId);
    
    document.getElementById('detail-content').innerHTML = `
      <img class="detail-avatar" src="${star.avatar}" alt="${star.name}">
      <h2 class="detail-name">${star.name}</h2>
      <p class="detail-title">${star.title}</p>
      
      <div class="detail-section">
        <h3>📅 生平</h3>
        <p>${star.birthday}</p>
      </div>
      
      <div class="detail-section">
        <h3>🎵 代表作品</h3>
        <p>${star.career.join('、')}</p>
      </div>
      
      <div class="detail-section">
        <h3>📖 个人简介</h3>
        <p>${star.intro}</p>
      </div>
      
      <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${star.id})">
        ${isFav ? '❤️ 已收藏' : '🤍 收藏'}
      </button>
    `;
    
    this.go('detail');
  }
};

// 查找明星
function findStar(id) {
  const all = [...starsData.singers, ...starsData.actors];
  return all.find(s => s.id === id);
}

// 渲染明星列表
function renderStars(type = 'all', searchText = '') {
  const container = document.getElementById('star-list');
  let stars = [];
  
  if (type === 'all') {
    stars = [...starsData.singers, ...starsData.actors];
  } else if (type === 'singer') {
    stars = starsData.singers;
  } else if (type === 'actor') {
    stars = starsData.actors;
  }
  
  // 搜索过滤
  if (searchText) {
    stars = stars.filter(s => s.name.includes(searchText));
  }
  
  container.innerHTML = stars.map(star => `
    <div class="star-card" onclick="router.showDetail(${star.id})">
      <img class="star-avatar" src="${star.avatar}" alt="${star.name}">
      <div class="star-info">
        <div class="star-name">${star.name}</div>
        <div class="star-title">${star.title}</div>
      </div>
    </div>
  `).join('');
  
  if (stars.length === 0) {
    container.innerHTML = '<div class="empty-tip">没有找到匹配的明星~</div>';
  }
}

// 渲染收藏列表
function renderFavoriteList() {
  const container = document.getElementById('favorite-list');
  
  if (favorites.length === 0) {
    container.innerHTML = '<div class="empty-tip">还没有收藏哦~<br>点击明星页面的收藏按钮</div>';
    return;
  }
  
  const stars = favorites.map(id => findStar(id)).filter(Boolean);
  
  container.innerHTML = stars.map(star => `
    <div class="star-card" onclick="router.showDetail(${star.id})">
      <img class="star-avatar" src="${star.avatar}" alt="${star.name}">
      <div class="star-info">
        <div class="star-name">${star.name}</div>
        <div class="star-title">${star.title}</div>
      </div>
    </div>
  `).join('');
}

// 渲染专题
function renderTopics() {
  const container = document.getElementById('topic-content');
  if (!container) return;
  
  const topicNames = {
    1: '四大天王',
    2: '港台女神',
    3: '80年代巨星'
  };
  
  container.innerHTML = starsData.topics.map(topic => `
    <div class="topic-card" onclick="showTopicDetail(${topic.id})">
      <h3 class="topic-title">${topicNames[topic.id] || topic.title}</h3>
      <p class="topic-desc">${topic.desc}</p>
    </div>
  `).join('');
}

// 专题详情
function showTopicDetail(topicId) {
  const topic = starsData.topics.find(t => t.id === topicId);
  if (!topic) return;
  
  const topicNames = {
    1: '四大天王',
    2: '港台女神',
    3: '80年代巨星'
  };
  
  const topicStars = topic.stars.map(id => findStar(id)).filter(Boolean);
  
  const content = `
    <div style="padding:16px;">
      <h2 style="text-align:center; font-size:26px; color:#667eea; margin-bottom:8px;">${topicNames[topic.id]}</h2>
      <p style="text-align:center; color:#666; margin-bottom:20px;">${topic.desc}</p>
      ${topicStars.map(star => `
        <div class="star-card" onclick="router.showDetail(${star.id})">
          <img class="star-avatar" src="${star.avatar}" alt="${star.name}">
          <div class="star-info">
            <div class="star-name">${star.name}</div>
            <div class="star-title">${star.title}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  // 在列表页显示专题内容
  document.getElementById('page-list').innerHTML = `
    <div class="detail-header">
      <button class="back-btn" onclick="location.reload()">← 返回</button>
    </div>
    <div style="padding:16px;">${content}</div>
  `;
  
  router.go('list');
}

// 今日推荐
function renderTodayRecommend() {
  const container = document.getElementById('today-recommend');
  const allStars = [...starsData.singers, ...starsData.actors];
  
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % allStars.length;
  const star = allStars[index];
  
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  
  window.todayStar = star; // 保存今日推荐
  
  container.innerHTML = `
    <div class="recommend-card" onclick="renderTodayDetail()">
      <img class="recommend-avatar" src="${star.avatar}" alt="${star.name}">
      <div class="recommend-info">
        <div class="recommend-label">📅 ${dateStr} 今日推荐</div>
        <div class="recommend-name">${star.name}</div>
        <div class="recommend-desc">${star.career[0]}</div>
      </div>
    </div>
  `;
}

// 渲染今日推荐详情
function renderTodayDetail() {
  const star = window.todayStar;
  if (!star) return;
  
  const isFav = favorites.includes(star.id);
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  
  document.getElementById('today-content').innerHTML = `
    <img class="detail-avatar" src="${star.avatar}" alt="${star.name}">
    <h2 class="detail-name">${star.name}</h2>
    <p class="detail-title">${star.title}</p>
    <p style="text-align:center; color:#667eea; margin-bottom:20px;">${dateStr} 今日推荐</p>
    
    <div class="detail-section">
      <h3>📅 生平</h3>
      <p>${star.birthday}</p>
    </div>
    
    <div class="detail-section">
      <h3>🎵 代表作品</h3>
      <p>${star.career.join('、')}</p>
    </div>
    
    <div class="detail-section">
      <h3>📖 个人简介</h3>
      <p>${star.intro}</p>
    </div>
    
    <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${star.id})">
      ${isFav ? '❤️ 已收藏' : '🤍 收藏'}
    </button>
  `;
  
  router.go('today');
}

// 切换收藏
function toggleFavorite(starId) {
  const index = favorites.indexOf(starId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(starId);
  }
  localStorage.setItem('retro-favorites', JSON.stringify(favorites));
  
  // 更新当前页面的按钮
  const btns = document.querySelectorAll('.favorite-btn');
  btns.forEach(btn => {
    const isFav = favorites.includes(starId);
    btn.classList.toggle('active', isFav);
    btn.textContent = isFav ? '❤️ 已收藏' : '🤍 收藏';
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderTodayRecommend();
  
  // 搜索功能
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const type = document.querySelector('.tab.active')?.dataset.type || 'all';
      renderStars(type, e.target.value);
    });
  }
  
  // 标签切换
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const searchText = document.getElementById('search-input')?.value || '';
      renderStars(tab.dataset.type, searchText);
    });
  });
  
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      router.go(btn.dataset.page);
    });
  });
});