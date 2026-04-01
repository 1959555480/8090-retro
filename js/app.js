// 收藏功能
let favorites = JSON.parse(localStorage.getItem('retro-favorites') || '[]');

// 路由
const router = {
  go(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    
    if (page === 'favorite') renderFavoriteList();
  }
};

// 查找明星
function findStar(id) {
  const all = [...starsData.singers, ...starsData.actors];
  return all.find(s => s.id === id);
}

// 渲染今日推荐
function renderTodayRecommend() {
  const allStars = [...starsData.singers, ...starsData.actors];
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % allStars.length;
  const star = allStars[index];
  
  window.todayStar = star;
  
  const isFav = favorites.includes(star.id);
  
  document.getElementById('today-card').innerHTML = `
    <div class="star-card">
      <img class="star-img" src="${star.avatar}" alt="${star.name}">
      <div class="star-content">
        <h2 class="star-name">${star.name}</h2>
        <p class="star-title">${star.title}</p>
        
        <div class="star-section">
          <h3>📅 生平</h3>
          <p>${star.birthday}</p>
        </div>
        
        <div class="star-section">
          <h3>🎵 代表作品</h3>
          <p>${star.career.join('、')}</p>
        </div>
        
        <div class="star-section">
          <h3>📖 个人简介</h3>
          <p>${star.intro}</p>
        </div>
        
        <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${star.id})">
          ${isFav ? '❤️ 已收藏' : '🤍 收藏'}
        </button>
      </div>
    </div>
  `;
}

// 渲染收藏列表
function renderFavoriteList() {
  const container = document.getElementById('today-card');
  
  if (favorites.length === 0) {
    container.innerHTML = '<div class="empty-tip">还没有收藏哦~</div>';
    return;
  }
  
  const stars = favorites.map(id => findStar(id)).filter(Boolean);
  
  container.innerHTML = `
    <div class="star-list">
      ${stars.map(star => `
        <div class="star-card">
          <img class="star-img" src="${star.avatar}" alt="${star.name}">
          <div class="star-content">
            <h3 class="star-name">${star.name}</h3>
            <p class="star-title">${star.title}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
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
  
  const btn = document.querySelector('.favorite-btn');
  const isFav = favorites.includes(starId);
  btn.classList.toggle('active', isFav);
  btn.textContent = isFav ? '❤️ 已收藏' : '🤍 收藏';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderTodayRecommend();
});