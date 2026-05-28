const app = getApp();

Page({
  data: {
    hotCases: [],
    rotateAngle: 0,
    knowledgeNodes: [],
    lastTouchX: 0,
    lastTouchY: 0,
    isAutoRotate: true,
    autoRotateTimer: null,
    touchStartX: 0,
    touchStartY: 0,
    isDragging: false,
    nodeTapId: null
  },

  onLoad() {
    this.loadHotCases();
    this.initKnowledgeNodes();
    this.startAutoRotate();
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  onShow() {
    const userInfo = app.globalData.userInfo;
    this.setData({ userInfo });
  },

  loadHotCases() {
    const allCases = app.globalData.mockCases;
    const hotCases = allCases.slice(0, 5).map(caseItem => ({
      id: caseItem.id,
      title: caseItem.title,
      category: caseItem.category,
      rating: caseItem.rating,
      color: caseItem.color,
      emoji: caseItem.emoji,
      coverImage: caseItem.coverImage
    }));
    this.setData({ hotCases });
  },

  initKnowledgeNodes() {
    const knowledgeAreas = [
      { id: 1, name: '创业融资', icon: '💰', color: '#4a90e2', angle: 0 },
      { id: 2, name: '市场营销', icon: '📈', color: '#48b879', angle: 60 },
      { id: 3, name: '运营管理', icon: '⚙️', color: '#ff9900', angle: 120 },
      { id: 4, name: '投资并购', icon: '🤝', color: '#ff4d4f', angle: 180 },
      { id: 5, name: '战略规划', icon: '🎯', color: '#9c27b0', angle: 240 },
      { id: 6, name: '财务税务', icon: '📊', color: '#00bcd4', angle: 300 }
    ];
    this.updateNodes(knowledgeAreas);
  },

  updateNodes(areas) {
    const centerX = 160;
    const centerY = 160;
    const radiusX = 200;
    const radiusY = 80;
    const { rotateAngle } = this.data;
    
    const nodes = areas.map(area => {
      const angle = (area.angle + rotateAngle) * (Math.PI / 180);
      const depth = Math.cos(angle);
      const x = centerX + Math.sin(angle) * radiusX - 32;
      const y = centerY + depth * radiusY - 32;
      
      const opacity = 0.3 + (depth + 1) * 0.35;
      const scale = 0.5 + (depth + 1) * 0.3;
      const zIndex = Math.floor((depth + 1) * 10);
      const blur = depth < 0 ? Math.abs(depth) * 3 : 0;
      
      return {
        ...area,
        x: x,
        y: y,
        opacity: opacity,
        scale: scale,
        zIndex: zIndex,
        blur: blur
      };
    });
    nodes.sort((a, b) => a.zIndex - b.zIndex);
    this.setData({ knowledgeNodes: nodes });
  },

  startAutoRotate() {
    if (this.data.autoRotateTimer) return;
    this.data.autoRotateTimer = setInterval(() => {
      if (this.data.isAutoRotate) {
        this.data.rotateAngle += 0.5;
        if (this.data.rotateAngle >= 360) {
          this.data.rotateAngle = 0;
        }
        const knowledgeAreas = [
          { id: 1, name: '创业融资', icon: '💰', color: '#4a90e2', angle: 0 },
          { id: 2, name: '市场营销', icon: '📈', color: '#48b879', angle: 60 },
          { id: 3, name: '运营管理', icon: '⚙️', color: '#ff9900', angle: 120 },
          { id: 4, name: '投资并购', icon: '🤝', color: '#ff4d4f', angle: 180 },
          { id: 5, name: '战略规划', icon: '🎯', color: '#9c27b0', angle: 240 },
          { id: 6, name: '财务税务', icon: '📊', color: '#00bcd4', angle: 300 }
        ];
        this.updateNodes(knowledgeAreas);
      }
    }, 50);
  },

  stopAutoRotate() {
    if (this.data.autoRotateTimer) {
      clearInterval(this.data.autoRotateTimer);
      this.data.autoRotateTimer = null;
    }
  },

  onTouchStart(e) {
    this.setData({
      isAutoRotate: false,
      lastTouchX: e.touches[0].clientX,
      lastTouchY: e.touches[0].clientY,
      touchStartX: e.touches[0].clientX,
      touchStartY: e.touches[0].clientY,
      isDragging: false
    });
  },

  onTouchMove(e) {
    const deltaX = e.touches[0].clientX - this.data.lastTouchX;
    const deltaY = e.touches[0].clientY - this.data.lastTouchY;
    const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (moveDistance > 5) {
      this.setData({ isDragging: true });
    }
    
    this.data.rotateAngle += deltaX * 0.8;
    if (this.data.rotateAngle >= 360) {
      this.data.rotateAngle -= 360;
    } else if (this.data.rotateAngle < 0) {
      this.data.rotateAngle += 360;
    }
    const knowledgeAreas = [
      { id: 1, name: '创业融资', icon: '💰', color: '#4a90e2', angle: 0 },
      { id: 2, name: '市场营销', icon: '📈', color: '#48b879', angle: 60 },
      { id: 3, name: '运营管理', icon: '⚙️', color: '#ff9900', angle: 120 },
      { id: 4, name: '投资并购', icon: '🤝', color: '#ff4d4f', angle: 180 },
      { id: 5, name: '战略规划', icon: '🎯', color: '#9c27b0', angle: 240 },
      { id: 6, name: '财务税务', icon: '📊', color: '#00bcd4', angle: 300 }
    ];
    this.updateNodes(knowledgeAreas);
    this.setData({
      lastTouchX: e.touches[0].clientX,
      lastTouchY: e.touches[0].clientY
    });
  },

  onTouchEnd() {
    setTimeout(() => {
      this.setData({ isAutoRotate: true });
    }, 2000);
  },

  handleNodeTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge/knowledge?id=${id}`
    });
  },

  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  goToEvaluate() {
    wx.switchTab({
      url: '/pages/evaluate/evaluate'
    });
  },

  goToCases() {
    wx.switchTab({
      url: '/pages/cases/cases'
    });
  },

  goToTrend() {
    wx.navigateTo({
      url: '/pages/trend/trend'
    });
  },

  goToCaseDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  goToKnowledge(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge/knowledge?id=${id}`
    });
  },

  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    }, 1000);
  },

  onUnload() {
    this.stopAutoRotate();
  }
});