const app = getApp();

Page({
  data: {
    collections: []
  },

  onLoad() {
    this.loadCollections();
  },

  onShow() {
    this.loadCollections();
  },

  loadCollections() {
    const collectedIds = wx.getStorageSync('collectedCases') || [];
    const allCases = app.globalData.mockCases || [];
    
    const collections = allCases.filter(c => collectedIds.includes(c.id));
    this.setData({ collections });
  },

  goToCase(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  removeCollect(e) {
    const id = e.currentTarget.dataset.id;
    let collectedIds = wx.getStorageSync('collectedCases') || [];
    collectedIds = collectedIds.filter(cid => cid !== id);
    wx.setStorageSync('collectedCases', collectedIds);
    
    this.loadCollections();
    wx.showToast({
      title: '已取消收藏',
      icon: 'none'
    });
  },

  goToCases() {
    wx.switchTab({
      url: '/pages/cases/cases'
    });
  }
});