const app = getApp();

Page({
  data: {
    caseData: {},
    isCollected: false
  },

  onLoad(options) {
    const caseId = parseInt(options.id);
    this.loadCaseData(caseId);
  },

  loadCaseData(caseId) {
    const cases = app.globalData.mockCases;
    
    let caseData = cases.find(c => c.id === caseId);
    
    if (!caseData) {
      caseData = cases[0];
    }
    
    const caseInfo = this.buildCaseDetail(caseData);
    
    this.setData({
      caseData: caseInfo,
      isCollected: this.isCaseCollected(caseId)
    });
  },

  buildCaseDetail(baseCase) {
    return {
      id: baseCase.id,
      title: baseCase.title,
      emoji: baseCase.emoji,
      category: baseCase.category,
      rating: baseCase.rating,
      difficulty: baseCase.difficulty,
      difficultyText: baseCase.difficultyText,
      coverImage: baseCase.coverImage,
      summary: `${baseCase.description}\n\n${baseCase.insights}`,
      problems: [
        `如何在${baseCase.category}领域建立竞争优势`,
        `如何应对市场变化和竞争挑战`,
        `如何实现可持续发展`,
        `如何平衡增长和风险控制`
      ],
      solutions: baseCase.keyStrategies.map((strategy, index) => ({
        icon: ['💡', '🎯', '📈', '🚀'][index] || '💡',
        title: strategy.title,
        desc: strategy.desc
      })),
      stats: [
        { name: '参与学习', value: baseCase.participants.toLocaleString() },
        { name: '评分', value: baseCase.rating.toString() },
        { name: '难度', value: baseCase.difficultyText },
        { name: '分类', value: baseCase.category }
      ],
      images: [
        baseCase.coverImage,
        baseCase.coverImage,
        baseCase.coverImage
      ],
      tags: baseCase.tags,
      sourceUrl: baseCase.source,
      sourceName: baseCase.sourceName,
      background: baseCase.background,
      businessModel: baseCase.businessModel,
      successFactors: baseCase.successFactors,
      challenges: baseCase.challenges,
      milestones: baseCase.milestones,
      insights: baseCase.insights
    };
  },

  isCaseCollected(caseId) {
    const favorites = wx.getStorageSync('favorites') || [];
    return favorites.includes(caseId);
  },

  toggleCollect() {
    const caseId = this.data.caseData.id;
    const favorites = wx.getStorageSync('favorites') || [];
    let newFavorites;

    if (this.data.isCollected) {
      newFavorites = favorites.filter(id => id !== caseId);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      newFavorites = [...favorites, caseId];
      wx.showToast({ title: '已收藏', icon: 'success' });
    }

    wx.setStorageSync('favorites', newFavorites);
    this.setData({ isCollected: !this.data.isCollected });
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    const urls = this.data.caseData.images;
    wx.previewImage({
      current: src,
      urls: urls
    });
  },

  copySource(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success: () => {
        wx.showToast({ title: '链接已复制', icon: 'success' });
      }
    });
  },

  goToEvaluate() {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate'
    });
  },

  shareCase() {
    const caseData = this.data.caseData;
    const shareContent = `📚 ${caseData.title}\n\n${caseData.summary.substring(0, 50)}...\n\n——来自创业体验官`;

    wx.setClipboardData({
      data: shareContent,
      success: () => {
        wx.showToast({ title: '分享内容已复制', icon: 'success' });
      }
    });

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    const caseData = this.data.caseData;
    return {
      title: caseData.title,
      path: `/pages/case-detail/case-detail?id=${caseData.id}`,
      imageUrl: caseData.coverImage
    };
  }
});