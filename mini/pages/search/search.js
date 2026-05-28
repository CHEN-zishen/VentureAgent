const app = getApp();

Page({
  data: {
    searchKey: '',
    history: [],
    hotSearch: ['瑞幸咖啡', '小米生态链', '私域流量', '投资并购', '商业模式', '数字化转型', '字节跳动', '新零售'],
    showResults: false,
    results: [],
    caseResults: [],
    knowledgeResults: []
  },

  onLoad() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ history });
  },

  onInputChange(e) {
    const value = e.detail.value;
    this.setData({ searchKey: value });
    
    if (!value) {
      this.setData({ showResults: false });
    }
  },

  doSearch() {
    const key = this.data.searchKey.trim();
    if (!key) return;

    this.saveHistory(key);
    this.performSearch(key);
  },

  hotSearchTap(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ searchKey: key });
    this.doSearch();
  },

  historyTap(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ searchKey: key });
    this.doSearch();
  },

  clearHistory() {
    wx.removeStorageSync('searchHistory');
    this.setData({ history: [] });
  },

  clearSearch() {
    this.setData({
      searchKey: '',
      showResults: false,
      results: []
    });
  },

  saveHistory(key) {
    let history = this.data.history;
    history = history.filter(item => item !== key);
    history.unshift(key);
    history = history.slice(0, 10);
    this.setData({ history });
    wx.setStorageSync('searchHistory', history);
  },

  performSearch(key) {
    const cases = app.globalData.mockCases || [];
    const allKnowledge = app.globalData.knowledgeBase || [];

    const caseResults = cases.filter(c => 
      c.title.includes(key) || 
      c.description.includes(key) || 
      c.tags.some(tag => tag.includes(key)) ||
      c.category.includes(key)
    );

    const knowledgeResults = allKnowledge.filter(k =>
      k.title.includes(key) ||
      k.summary.includes(key) ||
      k.tags.some(tag => tag.includes(key))
    );

    this.setData({
      showResults: true,
      results: [...caseResults, ...knowledgeResults],
      caseResults,
      knowledgeResults
    });
  },

  goToCase(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  goToKnowledge(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '知识详情开发中',
      icon: 'none'
    });
  },

  goBack() {
    wx.navigateBack();
  }
});