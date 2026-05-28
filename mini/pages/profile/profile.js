const app = getApp();

Page({
  data: {
    userInfo: {},
    stats: {
      learningDays: 28,
      casesStudied: 15,
      evaluations: 8
    }
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo || {}
    });
    this.loadStats();
  },

  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo || {}
    });
    this.loadStats();
  },

  loadStats() {
    const studiedIds = wx.getStorageSync('studiedCases') || [];
    const history = wx.getStorageSync('evaluationHistory') || [];
    this.setData({
      stats: {
        learningDays: Math.floor(Math.random() * 30) + 1,
        casesStudied: studiedIds.length || 5,
        evaluations: history.length || 0
      }
    });
  },

  getUserInfo() {
    if (this.data.userInfo.nickName) return;

    app.getUserInfo().then(userInfo => {
      this.setData({ userInfo });
    }).catch(() => {
      wx.showToast({
        title: '请允许授权以获得完整体验',
        icon: 'none'
      });
    });
  },

  goToMyCases() {
    wx.navigateTo({
      url: '/pages/my-cases/my-cases'
    });
  },

  goToMyEvaluations() {
    wx.navigateTo({
      url: '/pages/evaluate-history/evaluate-history'
    });
  },

  goToCollections() {
    wx.navigateTo({
      url: '/pages/collections/collections'
    });
  },

  goToHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  goToHelp() {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },

  goToAbout() {
    wx.showModal({
      title: '关于创业体验官',
      content: '创业体验官是一款基于AI技术的商业学习平台，提供商业案例分析、AI项目评估、商业知识图谱等功能，帮助用户提升商业洞察力和决策能力。\n\n版本：v1.0.0',
      showCancel: false
    });
  }
});