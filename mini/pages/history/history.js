const app = getApp();

Page({
  data: {
    history: []
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const studiedIds = wx.getStorageSync('studiedCases') || [];
    const allCases = app.globalData.mockCases || [];
    
    const history = studiedIds.map((id, index) => {
      const caseItem = allCases.find(c => c.id === id);
      if (caseItem) {
        return {
          id: caseItem.id,
          title: caseItem.title,
          category: caseItem.category,
          emoji: caseItem.emoji,
          color: caseItem.color,
          time: this.formatTime(Date.now() - index * 86400000)
        };
      }
      return null;
    }).filter(item => item !== null);

    this.setData({ history });
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  },

  goToCase(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  clearHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有学习历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('studiedCases');
          this.setData({ history: [] });
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  },

  goToCases() {
    wx.switchTab({
      url: '/pages/cases/cases'
    });
  }
});