const app = getApp();

Page({
  data: {
    currentTab: 0,
    categories: [
      { id: 0, name: '全部' },
      { id: 1, name: '科技' },
      { id: 2, name: '消费' },
      { id: 3, name: '医疗' },
      { id: 4, name: '教育' },
      { id: 5, name: '金融' }
    ],
    trends: [],
    allTrends: [
      {
        id: 1,
        title: 'AI大模型正在重塑企业服务市场格局',
        industry: '科技',
        icon: '🤖',
        color: '#4a90e2',
        time: '2小时前',
        trend: 'hot',
        trendText: '🔥 热门',
        summary: '随着ChatGPT、GPT-4、Claude等大语言模型的爆发式发展，企业服务市场正在经历前所未有的变革。AI正在从简单的工具演变为企业的核心能力，预计到2025年，AI企业服务市场规模将突破万亿。越来越多的企业开始将AI能力嵌入到其核心业务流程中，从智能客服、数字营销到研发设计、数据分析，AI正在全方位提升企业运营效率。',
        data: { value: '¥9200亿', label: '市场规模' },
        change: 156,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['人工智能', '企业服务', '大模型', '数字化转型'],
        collected: false
      },
      {
        id: 2,
        title: '新能源汽车渗透率首超50%，汽车行业百年变局已至',
        industry: '消费',
        icon: '🚗',
        color: '#48b879',
        time: '5小时前',
        trend: 'up',
        trendText: '📈 上升',
        summary: '最新数据显示，新能源汽车在新车销售中的占比首次超过50%，标志着中国汽车市场正式进入新能源时代。比亚迪、蔚来、理想、小鹏等造车新势力持续领跑，大众、丰田、通用等传统巨头也在加速转型。从续航里程到充电速度，从智能座舱到自动驾驶，新能源汽车正在全方位重新定义汽车这一百年工业产品的未来。',
        data: { value: '52.3%', label: '新能源渗透率' },
        change: 23.5,
        investors: '⭐⭐⭐⭐☆',
        tags: ['新能源汽车', '智能汽车', '绿色经济', '电池技术'],
        collected: false
      },
      {
        id: 3,
        title: '银发经济崛起，养老产业进入十万亿级黄金赛道',
        industry: '消费',
        icon: '👴',
        color: '#ff9900',
        time: '1天前',
        trend: 'up',
        trendText: '📈 上升',
        summary: '随着人口老龄化进程加速，养老产业正在成为新的经济增长引擎。预计到2030年，我国养老产业规模将达到12万亿元，涵盖养老服务、健康管理、医疗康复、智能辅具、老年教育、老年旅游等多个细分领域。政策利好不断释放，社会资本加速涌入，一个十万亿级的蓝海市场正在形成。',
        data: { value: '¥7.2万亿', label: '当前产业规模' },
        change: 18.7,
        investors: '⭐⭐⭐⭐☆',
        tags: ['养老产业', '银发经济', '健康老龄化', '适老化改造'],
        collected: false
      },
      {
        id: 4,
        title: '跨境电商新机遇：出海成为企业第二增长曲线',
        industry: '消费',
        icon: '🌐',
        color: '#9c27b0',
        time: '1天前',
        trend: 'hot',
        trendText: '🔥 热门',
        summary: '在全球化和数字化双轮驱动下，跨境电商已成为中国企业出海的重要渠道。SHEIN打破千亿估值、Temu席卷北美市场、速卖通布局欧洲电商，这些成功案例正在激励着更多中国企业加速全球化布局。从"中国制造"到"中国品牌"，从"产品出海"到"品牌出海"，中国跨境电商正在完成从量变到质变的跨越。',
        data: { value: '¥2.1万亿', label: '跨境电商出口规模' },
        change: 28.3,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['跨境电商', '品牌出海', '全球化布局', '电商平台'],
        collected: false
      },
      {
        id: 5,
        title: '合成生物学：引领下一代科技革命的战略高地',
        industry: '医疗',
        icon: '🧬',
        color: '#00bcd4',
        time: '2天前',
        trend: 'up',
        trendText: '📈 上升',
        summary: '合成生物学正在医疗健康、食品农业、环境保护、材料科学等领域展现巨大变革潜力，被认为是继信息技术革命之后最重要的科技革命之一。麦肯锡研究院发布报告预测，未来60%的物理和生物产品将由合成生物学生产。从基因编辑到细胞工厂，从生物制造到DNA存储，合成生物学正在将科幻变为现实。',
        data: { value: '¥1800亿', label: '当前市场规模' },
        change: 45.2,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['合成生物学', '生物技术', '基因编辑', '生物制造'],
        collected: false
      },
      {
        id: 6,
        title: '素质教育黄金时代：STEAM教育引领未来人才培养',
        industry: '教育',
        icon: '📚',
        color: '#ff4d4f',
        time: '3天前',
        trend: 'stable',
        trendText: '📊 平稳',
        summary: '在"双减"政策背景下，学科类培训机构受到严格限制，素质教育成为教培行业转型的主要方向。STEAM教育、编程思维培养、科学实验、艺术教育等细分赛道获得资本青睐，市场集中度逐步提升。随着80后、90后家长成为教育消费主力，他们更加注重孩子的综合能力培养和个性化发展。',
        data: { value: '¥4500亿', label: '素质教育市场规模' },
        change: 12.8,
        investors: '⭐⭐⭐☆☆',
        tags: ['素质教育', 'STEAM教育', '少儿编程', '艺术教育'],
        collected: false
      },
      {
        id: 7,
        title: '低空经济万亿蓝海：无人机产业进入爆发期',
        industry: '科技',
        icon: '🚁',
        color: '#3f51b5',
        time: '1天前',
        trend: 'hot',
        trendText: '🔥 热门',
        summary: '低空经济正在成为新的战略性新兴产业。随着政策松绑和技术成熟，无人机应用场景从消费娱乐拓展到物流配送、农业植保、城市治理、应急救援等广阔领域。顺丰、京东、美团等企业已在多地开展无人机配送试点，大疆创新占据全球消费级无人机70%以上市场份额。',
        data: { value: '¥5000亿', label: '低空经济规模' },
        change: 68.5,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['低空经济', '无人机', '智慧城市', '物流配送'],
        collected: false
      },
      {
        id: 8,
        title: '预制菜万亿新赛道：厨房革命重塑餐桌经济',
        industry: '消费',
        icon: '🍳',
        color: '#e91e63',
        time: '2天前',
        trend: 'up',
        trendText: '📈 上升',
        summary: '预制菜正在深刻改变中国人的餐桌和厨房。以B端餐饮企业为基本盘，C端家庭消费为增量市场，预制菜产业规模快速增长。味知香、国联水产、广州酒家等企业率先登陆资本市场，艾媒咨询预测2026年中国预制菜市场规模将突破万亿。',
        data: { value: '¥4200亿', label: '预制菜市场规模' },
        change: 35.2,
        investors: '⭐⭐⭐⭐☆',
        tags: ['预制菜', '食品工业', '餐饮供应链', '消费升级'],
        collected: false
      },
      {
        id: 9,
        title: '储能产业大爆发：新能源革命的最后一公里',
        industry: '科技',
        icon: '🔋',
        color: '#009688',
        time: '3天前',
        trend: 'up',
        trendText: '📈 上升',
        summary: '储能是新能源产业发展的关键环节，也是实现"碳达峰、碳中和"目标的重要支撑。随着风电、光伏装机规模快速增长，储能作为解决新能源消纳问题、保障电网稳定运行的核心技术，正在迎来爆发式增长。政策强制配储要求、电价峰谷差扩大、电池成本持续下降，多重因素共同推动储能产业进入黄金发展期。',
        data: { value: '¥3000亿', label: '储能市场规模' },
        change: 85.6,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['储能', '新能源', '动力电池', '智能电网'],
        collected: false
      },
      {
        id: 10,
        title: 'Web3.0时代来临：区块链重塑数字经济信任体系',
        industry: '科技',
        icon: '⛓️',
        color: '#673ab7',
        time: '5天前',
        trend: 'stable',
        trendText: '📊 平稳',
        summary: 'Web3.0代表互联网的下一阶段演进，核心是通过区块链技术构建去中心化的信任网络，实现数据主权和价值互联。从NFT数字藏品到Web3游戏，从DeFi去中心化金融到DAO组织形态，Web3正在从概念走向落地。虽然加密货币市场波动剧烈，但区块链作为底层技术的价值正在得到更广泛认可。',
        data: { value: '¥2000亿', label: '区块链市场规模' },
        change: 28.5,
        investors: '⭐⭐⭐☆☆',
        tags: ['Web3.0', '区块链', 'NFT', 'DeFi'],
        collected: false
      }
    ],
    hasMore: true
  },

  onLoad() {
    this.setData({ trends: this.data.allTrends });
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });

    if (index === 0) {
      this.setData({ trends: this.data.allTrends });
    } else {
      const category = this.data.categories[index].name;
      const filtered = this.data.allTrends.filter(t => t.industry === category);
      this.setData({ trends: filtered });
    }
  },

  toggleCollect(e) {
    const id = e.currentTarget.dataset.id;
    const trends = this.data.trends.map(t => {
      if (t.id === id) {
        t.collected = !t.collected;
      }
      return t;
    });
    this.setData({ trends });

    const trend = trends.find(t => t.id === id);
    wx.showToast({
      title: trend.collected ? '已收藏' : '取消收藏',
      icon: 'none'
    });
  },

  shareTrend(e) {
    const id = e.currentTarget.dataset.id;
    const trend = this.data.trends.find(t => t.id === id);
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trend-detail/trend-detail?id=${id}`
    });
  },

  readMore(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trend-detail/trend-detail?id=${id}`
    });
  },

  loadMore() {
    wx.showToast({
      title: '暂无更多趋势',
      icon: 'none'
    });
  },

  onShareAppMessage(res) {
    return {
      title: '行业趋势洞察 | 创业体验官',
      path: '/pages/trend/trend',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    };
  }
});