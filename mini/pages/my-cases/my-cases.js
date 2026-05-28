const app = getApp();

Page({
  data: {
    currentTab: 'in_progress',
    stats: {
      casesStudied: 0,
      learningDays: 0,
      totalHours: 0
    },
    learningCases: []
  },

  onLoad() {
    this.loadLearningData();
  },

  onShow() {
    this.loadLearningData();
  },

  loadLearningData() {
    const studiedCases = wx.getStorageSync('studiedCases') || [];
    const studyRecords = wx.getStorageSync('studyRecords') || [];
    const allCases = app.globalData.mockCases || [];
    
    const completedCases = studiedCases.map(id => {
      const caseData = allCases.find(c => c.id === id);
      if (!caseData) return null;
      const record = studyRecords.find(r => r.caseId === id);
      return {
        ...caseData,
        progress: 100,
        lastLearnTime: record ? this.formatTime(record.lastStudyTime) : '最近'
      };
    }).filter(c => c);

    const inProgressCases = studiedCases.slice(0, Math.min(3, studiedCases.length)).map(id => {
      const caseData = allCases.find(c => c.id === id);
      if (!caseData) return null;
      const record = studyRecords.find(r => r.caseId === id);
      const progress = record ? (record.progress || Math.floor(Math.random() * 40) + 60) : Math.floor(Math.random() * 40) + 60;
      return {
        ...caseData,
        progress: Math.min(99, progress),
        lastLearnTime: record ? this.formatTime(record.lastStudyTime) : '今天'
      };
    }).filter(c => c);

    const learningDays = this.calculateLearningDays(studyRecords);

    this.setData({
      stats: {
        casesStudied: studiedCases.length,
        learningDays: learningDays,
        totalHours: studiedCases.length * 2.5
      },
      learningCases: this.data.currentTab === 'in_progress' ? inProgressCases : 
                     this.data.currentTab === 'completed' ? completedCases : []
    });
  },

  calculateLearningDays(studyRecords) {
    if (!studyRecords || studyRecords.length === 0) {
      const firstStudyDate = wx.getStorageSync('firstStudyDate');
      if (firstStudyDate) {
        const days = this.getDaysBetween(new Date(firstStudyDate), new Date());
        return Math.max(1, days);
      }
      return 0;
    }

    const dates = studyRecords.map(r => new Date(r.lastStudyTime)).filter(d => !isNaN(d.getTime()));
    if (dates.length === 0) {
      const firstStudyDate = wx.getStorageSync('firstStudyDate');
      if (firstStudyDate) {
        return this.getDaysBetween(new Date(firstStudyDate), new Date());
      }
      return 1;
    }

    dates.sort((a, b) => a - b);
    const firstDate = dates[0];
    const uniqueDays = new Set();
    
    dates.forEach(date => {
      const dateStr = date.toISOString().split('T')[0];
      uniqueDays.add(dateStr);
    });

    if (uniqueDays.size === 1) {
      return 1;
    }

    return this.getDaysBetween(firstDate, new Date()) + 1;
  },

  getDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  formatTime(timestamp) {
    if (!timestamp) return '未知';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    this.loadLearningData();
  },

  goToCase(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  goToCases() {
    wx.switchTab({
      url: '/pages/cases/cases'
    });
  }
});