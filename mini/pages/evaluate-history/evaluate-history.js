const app = getApp();

Page({
  data: {
    records: [],
    filteredRecords: [],
    currentFilter: 'all',
    showDetail: false,
    selectedRecord: null
  },

  onLoad() {
    this.loadRecords();
  },

  onShow() {
    this.loadRecords();
  },

  loadRecords() {
    const history = wx.getStorageSync('evaluationHistory') || [];
    this.setData({
      records: history,
      filteredRecords: history
    });
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ currentFilter: filter });
    
    if (filter === 'all') {
      this.setData({ filteredRecords: this.data.records });
    } else {
      const filtered = this.data.records.filter(r => r.type === filter);
      this.setData({ filteredRecords: filtered });
    }
  },

  getTypeName(type) {
    const typeNames = {
      'business_plan': '商业计划书评估',
      'investment': '投资项目评估',
      'market': '市场分析报告',
      'risk': '风险评估报告'
    };
    return typeNames[type] || '评估报告';
  },

  getGradeColor(grade) {
    const colors = {
      'A+': '#4CAF50',
      'A': '#2196F3',
      'B+': '#FF9800',
      'B': '#FFC107',
      'C': '#F44336'
    };
    return colors[grade] || '#9E9E9E';
  },

  getGradeBgColor(grade) {
    const colors = {
      'A+': '#4CAF50',
      'A': '#2196F3',
      'B+': '#FF9800',
      'B': '#FFC107',
      'C': '#F44336'
    };
    return colors[grade] || '#9E9E9E';
  },

  getScoreColor(score) {
    if (score >= 80) return '#4CAF50';
    if (score >= 70) return '#2196F3';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  },

  viewDetail(e) {
    const record = e.currentTarget.dataset.record;
    this.setData({
      selectedRecord: record,
      showDetail: true
    });
  },

  closeDetail() {
    this.setData({
      showDetail: false,
      selectedRecord: null
    });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  deleteRecord() {
    if (!this.data.selectedRecord) return;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条评估记录吗？',
      success: (res) => {
        if (res.confirm) {
          const recordId = this.data.selectedRecord.id;
          let history = wx.getStorageSync('evaluationHistory') || [];
          history = history.filter(r => r.id !== recordId);
          wx.setStorageSync('evaluationHistory', history);
          
          this.setData({
            records: history,
            filteredRecords: this.data.currentFilter === 'all' ? history : history.filter(r => r.type === this.data.currentFilter),
            showDetail: false,
            selectedRecord: null
          });
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  goToEvaluate() {
    wx.switchTab({
      url: '/pages/evaluate/evaluate'
    });
  }
});