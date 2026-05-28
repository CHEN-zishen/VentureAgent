const app = getApp();

Page({
  data: {
    currentCategory: 'all',
    categories: [],
    cases: [],
    filteredCases: [],
    hasMore: true,
    page: 1,
    pageSize: 10,
    showFilterModal: false,
    sortBy: 'default',
    sortOptions: [
      { id: 'default', name: '默认排序' },
      { id: 'rating', name: '评分最高' },
      { id: 'participants', name: '学习最多' },
      { id: 'newest', name: '最新' }
    ],
    filterOptions: {
      difficulty: [],
      duration: []
    }
  },

  onLoad() {
    this.setData({
      categories: app.globalData.caseCategories,
      cases: app.globalData.mockCases,
      filteredCases: app.globalData.mockCases
    });
    this.renderCases();
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      hasMore: true
    });
    this.renderCases();
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    }, 1000);
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      page: 1
    });
    this.renderCases();
  },

  renderCases() {
    const { cases, currentCategory, page, pageSize, sortBy } = this.data;
    let filtered = [...cases];

    if (currentCategory !== 'all') {
      const categoryObj = this.data.categories.find(c => c.id === currentCategory);
      if (categoryObj) {
        filtered = filtered.filter(c => c.category === categoryObj.name);
      }
    }

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'participants') {
      filtered.sort((a, b) => b.participants - a.participants);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }

    const start = 0;
    const end = page * pageSize;
    const showCases = filtered.slice(start, end);

    this.setData({
      filteredCases: showCases,
      hasMore: end < filtered.length
    });
  },

  loadMore() {
    if (!this.data.hasMore) return;

    this.setData({
      page: this.data.page + 1
    });
    this.renderCases();
  },

  goToCaseDetail(e) {
    const id = e.currentTarget.dataset.id;
    const caseItem = this.data.cases.find(c => c.id === id);
    if (caseItem) {
      const studiedCases = wx.getStorageSync('studiedCases') || [];
      if (!studiedCases.includes(id)) {
        studiedCases.push(id);
        wx.setStorageSync('studiedCases', studiedCases);
      }
    }

    wx.navigateTo({
      url: `/pages/case-detail/case-detail?id=${id}`
    });
  },

  showFilter() {
    this.setData({ showFilterModal: true });
  },

  hideFilter() {
    this.setData({ showFilterModal: false });
  },

  selectSort(e) {
    const sortBy = e.currentTarget.dataset.sort;
    this.setData({
      sortBy,
      page: 1
    });
    this.renderCases();
    this.hideFilter();
  },

  toggleDifficulty(e) {
    const difficulty = e.currentTarget.dataset.difficulty;
    const { filterOptions } = this.data;
    const difficulties = filterOptions.difficulty;

    if (difficulties.includes(difficulty)) {
      filterOptions.difficulty = difficulties.filter(d => d !== difficulty);
    } else {
      filterOptions.difficulty = [...difficulties, difficulty];
    }

    this.setData({ filterOptions });
  },

  applyFilter() {
    const { filterOptions, cases, sortBy, page } = this.data;
    let filtered = [...cases];

    if (filterOptions.difficulty.length > 0) {
      filtered = filtered.filter(c => filterOptions.difficulty.includes(c.difficulty));
    }

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'participants') {
      filtered.sort((a, b) => b.participants - a.participants);
    }

    this.setData({
      filteredCases: filtered.slice(0, page * this.data.pageSize),
      hasMore: filtered.length > page * this.data.pageSize,
      showFilterModal: false
    });

    wx.showToast({
      title: `筛选出${filtered.length}个案例`,
      icon: 'none'
    });
  },

  resetFilter() {
    this.setData({
      filterOptions: {
        difficulty: [],
        duration: []
      },
      sortBy: 'default',
      page: 1,
      filteredCases: this.data.cases
    });
    this.renderCases();
    this.hideFilter();
  },

  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }
});