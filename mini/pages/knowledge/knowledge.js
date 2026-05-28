const app = getApp();

Page({
  data: {
    currentTab: 0,
    tabs: ['全部', '基础', '进阶', '高级'],
    learningPath: [
      { title: '商业基础', desc: '理解商业模式与市场', color: '#4a90e2' },
      { title: '运营管理', desc: '掌握企业运营核心', color: '#48b879' },
      { title: '战略规划', desc: '制定长期竞争优势', color: '#ff9900' },
      { title: '资本运作', desc: '融资并购与上市', color: '#9c27b0' }
    ],
    categories: [
      {
        id: 1,
        name: '创业融资',
        icon: '💰',
        color: '#4a90e2',
        count: 12,
        expanded: true,
        knowledgeList: [
          { id: 101, title: '商业计划书撰写', summary: '如何写一份打动投资人的BP', level: '基础', progress: 60 },
          { id: 102, title: '估值方法论', summary: '初创企业估值常见方法', level: '基础', progress: 30 },
          { id: 103, title: '股权分配设计', summary: '创始团队股权结构设计', level: '进阶', progress: 0 },
          { id: 104, title: '融资路演技巧', summary: '如何在路演中脱颖而出', level: '进阶', progress: 0 }
        ]
      },
      {
        id: 2,
        name: '市场营销',
        icon: '📈',
        color: '#48b879',
        count: 15,
        expanded: false,
        knowledgeList: [
          { id: 201, title: 'STP营销战略', summary: '市场细分、目标选择、定位', level: '基础', progress: 80 },
          { id: 202, title: '4P营销组合', summary: '产品、价格、渠道、促销', level: '基础', progress: 45 },
          { id: 203, title: '私域流量运营', summary: '从0到1搭建私域体系', level: '进阶', progress: 0 },
          { id: 204, title: '品牌策略规划', summary: '品牌定位与升级路径', level: '进阶', progress: 0 }
        ]
      },
      {
        id: 3,
        name: '运营管理',
        icon: '⚙️',
        color: '#ff9900',
        count: 10,
        expanded: false,
        knowledgeList: [
          { id: 301, title: 'OKR目标管理', summary: '如何有效落地OKR', level: '基础', progress: 20 },
          { id: 302, title: '精益创业方法', summary: 'MVP与快速迭代', level: '基础', progress: 50 },
          { id: 303, title: '组织架构设计', summary: '不同阶段组织演变', level: '进阶', progress: 0 },
          { id: 304, title: '供应链管理', summary: '从采购到交付全流程', level: '进阶', progress: 0 }
        ]
      },
      {
        id: 4,
        name: '投资并购',
        icon: '🤝',
        color: '#ff4d4f',
        count: 8,
        expanded: false,
        knowledgeList: [
          { id: 401, title: '尽职调查要点', summary: '投前全面评估框架', level: '进阶', progress: 0 },
          { id: 402, title: '并购整合策略', summary: '1+1>2的整合之道', level: '高级', progress: 0 },
          { id: 403, title: '财务建模基础', summary: 'DCF、LBO等模型入门', level: '进阶', progress: 0 },
          { id: 404, title: '退出路径选择', summary: 'IPO、并购、S基金等', level: '高级', progress: 0 }
        ]
      },
      {
        id: 5,
        name: '战略规划',
        icon: '🎯',
        color: '#9c27b0',
        count: 11,
        expanded: false,
        knowledgeList: [
          { id: 501, title: 'SWOT分析模型', summary: '战略分析经典工具', level: '基础', progress: 70 },
          { id: 502, title: '波特五力模型', summary: '行业竞争结构分析', level: '基础', progress: 40 },
          { id: 503, title: '商业模式画布', summary: '从9个维度理解商业', level: '基础', progress: 25 },
          { id: 504, title: '第二曲线创新', summary: '企业持续增长之道', level: '高级', progress: 0 }
        ]
      },
      {
        id: 6,
        name: '财务税务',
        icon: '📊',
        color: '#00bcd4',
        count: 9,
        expanded: false,
        knowledgeList: [
          { id: 601, title: '三张财务报表解读', summary: '资产负债表、利润表、现金流量表', level: '基础', progress: 55 },
          { id: 602, title: '财务比率分析', summary: '盈利能力、偿债能力等指标', level: '基础', progress: 0 },
          { id: 603, title: '税务筹划基础', summary: '企业常见税务优化方法', level: '进阶', progress: 0 },
          { id: 604, title: '成本核算方法', summary: '变动成本、固定成本分析', level: '进阶', progress: 0 }
        ]
      }
    ]
  },

  onLoad(options) {
    if (options.id) {
      const categoryId = parseInt(options.id);
      this.expandCategory(categoryId);
    }
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    
    const levelMap = ['全部', '基础', '进阶', '高级'];
    const level = levelMap[index];
    
    const categories = this.data.categories.map(cat => {
      if (level === '全部') {
        cat.expanded = true;
      } else {
        cat.expanded = cat.knowledgeList.some(k => k.level === level);
        cat.knowledgeList = cat.knowledgeList.filter(k => k.level === level);
        if (cat.knowledgeList.length === 0 && level !== '全部') {
          cat.expanded = false;
        }
      }
      return cat;
    });
    
    this.setData({ categories });
  },

  toggleCategory(e) {
    const id = e.currentTarget.dataset.id;
    const categories = this.data.categories.map(cat => {
      if (cat.id === id) {
        cat.expanded = !cat.expanded;
      }
      return cat;
    });
    this.setData({ categories });
  },

  expandCategory(id) {
    const categories = this.data.categories.map(cat => {
      if (cat.id === id) {
        cat.expanded = true;
      }
      return cat;
    });
    this.setData({ categories });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '知识详情',
      content: `正在学习知识点 ID: ${id}，该功能需要跳转到完整学习页面。`,
      showCancel: false
    });
  }
});