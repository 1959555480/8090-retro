// 路由控制
const router = {
  currentPage: 'home',
  
  go(page, params = {}) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    this.currentPage = page;
    
    // 更新底部导航
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });
    
    // 页面切换时渲染对应内容
    if (page === 'favorite') {
      renderFavoriteList();
    }
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
  },
  
  showTopic(topicId) {
    const topic = starsData.topics.find(t => t.id === topicId);
    if (!topic) return;
    
    const topicStars = topic.stars.map(id => findStar(id)).filter(Boolean);
    
    document.getElementById('topic-content').innerHTML = `
      <h2 style="text-align:center; color:#ffd700; margin-bottom:20px;">${topic.title}</h2>
      <p style="color:rgba(255,255,255,0.6); margin-bottom:20px;">${topic.desc}</p>
      <div class="star-grid">
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
    
    this.go('topic');
  }
};

// 查找明星
function findStar(id) {
  const all = [...starsData.singers, ...starsData.actors];
  return all.find(s => s.id === id);
}

// 渲染明星列表
function renderStars(type = 'all') {
  const container = document.getElementById('star-list');
  let stars = [];
  
  if (type === 'all') {
    stars = [...starsData.singers, ...starsData.actors];
  } else if (type === 'singer') {
    stars = starsData.singers;
  } else if (type === 'actor') {
    stars = starsData.actors;
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
}

// 渲染收藏列表
function renderFavoriteList() {
  const container = document.getElementById('favorite-list');
  
  if (favorites.length === 0) {
    container.innerHTML = '<div class="empty-tip">还没有收藏哦~</div>';
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

// 切换收藏
function toggleFavorite(starId) {
  const index = favorites.indexOf(starId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(starId);
  }
  localStorage.setItem('retro-favorites', JSON.stringify(favorites));
  
  // 更新按钮状态
  const btn = document.querySelector('.favorite-btn');
  btn.classList.toggle('active', favorites.includes(starId));
  btn.textContent = favorites.includes(starId) ? '❤️ 已收藏' : '🤍 收藏';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 渲染初始列表
  renderStars();
  
  // 标签切换
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStars(tab.dataset.type);
    });
  });
  
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      router.go(btn.dataset.page);
    });
  });
  
  // 渲染专题列表（专题页面）
  renderTopics();
});

// 渲染专题
function renderTopics() {
  const container = document.getElementById('topic-content');
  if (!container) return;
  
  container.innerHTML = starsData.topics.map(topic => `
    <div class="topic-card" onclick="router.showTopic(${topic.id})">
      <h3 class="topic-title">${topic.title}</h3>
      <p class="topic-desc">${topic.desc}</p>
    </div>
  `).join('');
}