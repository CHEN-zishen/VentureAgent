const app = getApp();

Page({
  data: {
    notifyEnabled: true,
    soundEnabled: true,
    dailyGoal: 30,
    cacheSize: '0KB'
  },

  onLoad() {
    this.calculateCacheSize();
  },

  calculateCacheSize() {
    try {
      const info = wx.getStorageInfoSync();
      const sizeKB = info.currentSize;
      if (sizeKB > 1024) {
        this.setData({ cacheSize: (sizeKB / 1024).toFixed(1) + 'MB' });
      } else {
        this.setData({ cacheSize: sizeKB + 'KB' });
      }
    } catch (e) {
      this.setData({ cacheSize: '0KB' });
    }
  },

  onNotifyChange(e) {
    this.setData({ notifyEnabled: e.detail.value });
    wx.showToast({
      title: e.detail.value ? '已开启通知' : '已关闭通知',
      icon: 'none'
    });
  },

  onSoundChange(e) {
    this.setData({ soundEnabled: e.detail.value });
    wx.showToast({
      title: e.detail.value ? '已开启音效' : '已关闭音效',
      icon: 'none'
    });
  },

  goToProfile() {
    wx.showToast({
      title: '个人资料开发中',
      icon: 'none'
    });
  },

  selectGoal() {
    wx.showActionSheet({
      itemList: ['15分钟/天', '30分钟/天', '1小时/天', '2小时/天'],
      success: (res) => {
        const goals = [15, 30, 60, 120];
        this.setData({ dailyGoal: goals[res.tapIndex] });
        wx.showToast({
          title: '已设置学习目标',
          icon: 'success'
        });
      }
    });
  },

  clearCache() {
    wx.showModal({
      title: '确认清理',
      content: '确定要清理所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.clearStorageSync();
            this.calculateCacheSize();
            wx.showToast({
              title: '缓存已清理',
              icon: 'success'
            });
          } catch (e) {
            wx.showToast({
              title: '清理失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  checkUpdate() {
    wx.showToast({
      title: '已是最新版本',
      icon: 'success'
    });
  },

  goToAbout() {
    wx.showModal({
      title: '关于创业体验官',
      content: '创业体验官是一款基于AI技术的商业学习平台，帮助用户提升商业洞察力和决策能力。\n\n版本：v1.0.0',
      showCancel: false
    });
  },

  goToPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们非常重视您的隐私保护。创业体验官会收集您在使用过程中的学习行为数据，用于优化用户体验。所有数据都会经过加密处理，不会对外泄露。',
      showCancel: false
    });
  },

  goToTerms() {
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用创业体验官！在使用本应用之前，请仔细阅读以下条款：\n\n1. 本应用仅供个人学习使用\n2. 请尊重知识产权，不要传播内容\n3. 如有疑问请联系客服',
      showCancel: false
    });
  },

  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null;
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
});