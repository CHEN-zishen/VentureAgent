const app = getApp();

Page({
  data: {
    trendData: {},
    isCollected: false
  },

  onLoad(options) {
    const trendId = parseInt(options.id);
    this.loadTrendData(trendId);
  },

  loadTrendData(trendId) {
    const trends = [
      {
        id: 1,
        title: 'AI大模型正在重塑企业服务市场格局',
        industry: '科技',
        icon: '🤖',
        color: '#4a90e2',
        time: '2小时前',
        trend: 'hot',
        trendText: '🔥 热门',
        summary: '随着ChatGPT、GPT-4、Claude等大语言模型的爆发式发展，企业服务市场正在经历前所未有的变革。AI正在从简单的工具演变为企业的核心能力，预计到2025年，AI企业服务市场规模将突破万亿。越来越多的企业开始将AI能力嵌入到其核心业务流程中，从智能客服、数字营销到研发设计、数据分析，AI正在全方位提升企业运营效率。\n\n这场AI革命不仅改变了人机交互的方式，更在深刻重塑各行各业的商业模式和竞争格局。大模型时代的到来，让AI从"工具"升级为"伙伴"，从执行简单任务到理解复杂意图，企业对AI的依赖程度正在指数级增长。',
        data: { value: '¥9200亿', label: '市场规模' },
        change: 156,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['人工智能', '企业服务', '大模型', '数字化转型'],
        sourceUrl: 'https://www.statista.com/topics/1137/artificial-intelligence-ai/',
        sourceName: 'Statista AI行业报告',
        reasons: [
          {
            title: '技术突破加速',
            desc: '大语言模型的出现使得AI能力实现跨越式提升，理解能力、推理能力、生成能力达到前所未有的水平。多模态技术的成熟更是让AI可以同时处理文本、图像、音频等多种信息'
          },
          {
            title: '企业需求爆发',
            desc: '数字化转型压力下，企业对AI工具的需求急剧增长。从降本增效到业务创新，AI正在成为企业核心竞争力的重要组成部分，愿意为提升效率买单的企业数量大幅增加'
          },
          {
            title: '生态日趋完善',
            desc: 'AI基础设施、开发平台、垂直应用形成完整生态。从底层算力到上层应用，从通用大模型到行业垂直模型，企业使用AI的门槛大幅降低'
          },
          {
            title: '投资持续加码',
            desc: '资本市场持续看好AI企业服务赛道，大量资金涌入推动行业快速发展。2023年全球AI领域融资规模创历史新高，估值百亿美金以上的AI独角兽不断涌现'
          }
        ],
        forecast: {
          marketSize: '¥2.5万亿',
          growthRate: '45%',
          timeframe: '未来3-5年'
        },
        companies: [
          { icon: '🦾', name: '商汤科技', desc: '计算机视觉与AI算法领军企业', status: 'leader' },
          { icon: '🧠', name: '科大讯飞', desc: '智能语音AI领域龙头', status: 'leader' },
          { icon: '🤖', name: '百度智能云', desc: '文心一言大模型服务商', status: 'growing' },
          { icon: '⚡', name: '智谱AI', desc: '国产大模型技术新锐', status: 'potential' },
          { icon: '🔮', name: '出门问问', desc: 'AI语音交互专家', status: 'growing' }
        ],
        images: [
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800'
        ]
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
        summary: '最新数据显示，新能源汽车在新车销售中的占比首次超过50%，标志着中国汽车市场正式进入新能源时代，具有里程碑式的历史意义。比亚迪、蔚来、理想、小鹏等造车新势力持续领跑，大众、丰田、通用等传统巨头也在加速转型。\n\n随着电池技术的持续突破、充电基础设施的日益完善，以及消费者心智的逐步成熟，新能源汽车的性价比优势正在不断扩大。从续航里程到充电速度，从智能座舱到自动驾驶，新能源汽车正在全方位重新定义汽车这一百年工业产品的未来。',
        data: { value: '52.3%', label: '新能源渗透率' },
        change: 23.5,
        investors: '⭐⭐⭐⭐☆',
        tags: ['新能源汽车', '智能汽车', '绿色经济', '电池技术'],
        sourceUrl: 'https://www.caam.org.cn/STATISTIC/Automotive/',
        sourceName: '中国汽车工业协会',
        reasons: [
          {
            title: '政策持续支持',
            desc: '双碳目标背景下，国家持续出台新能源汽车支持政策，包括购置税减免、牌照优惠、充电桩建设补贴等，有力推动行业快速发展'
          },
          {
            title: '产品力全面提升',
            desc: '新能源汽车在续航里程、充电速度、智能配置、驾驶体验等方面已全面超越同级别燃油车，消费者接受度大幅提升'
          },
          {
            title: '成本优势显现',
            desc: '随着电池技术进步和规模效应显现，电池成本持续下降，新能源汽车的购置成本和使用成本已具备与燃油车竞争的实力'
          },
          {
            title: '充电网络完善',
            desc: '公共充电桩、私人充电桩、换电站等基础设施快速增长，充电便利性大幅提升，用户里程焦虑得到有效缓解'
          }
        ],
        forecast: {
          marketSize: '¥3.8万亿',
          growthRate: '25%',
          timeframe: '未来5年'
        },
        companies: [
          { icon: '🔋', name: '比亚迪', desc: '全球新能源汽车销量冠军', status: 'leader' },
          { icon: '🔷', name: '蔚来汽车', desc: '高端智能电动车品牌', status: 'leader' },
          { icon: '⚡', name: '小鹏汽车', desc: '城市NGP智能驾驶先行者', status: 'growing' },
          { icon: '🚙', name: '理想汽车', desc: '增程式车型市场领导者', status: 'growing' },
          { icon: '🌟', name: '极氪汽车', desc: '吉利旗下高端新能源品牌', status: 'potential' }
        ],
        images: [
          'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
        ]
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
        summary: '随着人口老龄化进程加速，养老产业正在成为新的经济增长引擎。预计到2030年，我国养老产业规模将达到12万亿元，涵盖养老服务、健康管理、医疗康复、智能辅具、老年教育、老年旅游等多个细分领域。\n\n政策利好不断释放，社会资本加速涌入，一个十万亿级的蓝海市场正在形成。从"养老"到"享老"，老年群体的消费需求正在发生深刻变化，品质化、个性化、多元化成为新趋势。这不仅是一个商业机会，更是一项关乎社会福祉的事业。',
        data: { value: '¥7.2万亿', label: '当前产业规模' },
        change: 18.7,
        investors: '⭐⭐⭐⭐☆',
        tags: ['养老产业', '银发经济', '健康老龄化', '适老化改造'],
        sourceUrl: 'https://www.cncaprc.gov.cn/',
        sourceName: '中国老龄科学研究中心',
        reasons: [
          {
            title: '老龄化进程加速',
            desc: '我国60岁以上人口已超过2.8亿，老龄化率突破20%。预计到2035年，60岁以上人口将突破4亿，老龄化将成为长期社会特征'
          },
          {
            title: '政策红利集中释放',
            desc: '国家出台一系列支持政策，包括鼓励社会力量参与养老服务、推进居家社区养老、发展康养产业等，为行业发展创造良好政策环境'
          },
          {
            title: '消费能力显著提升',
            desc: '新一代老年人消费观念更加开放，愿意为品质生活和健康服务买单。60后、70后群体将成为养老消费的主力军'
          },
          {
            title: '科技赋能智慧养老',
            desc: '智能穿戴设备、健康监测系统、适老化智能产品、养老机器人等技术应用加速，科技正在深刻改变传统养老模式'
          }
        ],
        forecast: {
          marketSize: '¥12万亿',
          growthRate: '18%',
          timeframe: '未来5-10年'
        },
        companies: [
          { icon: '🏥', name: '泰康保险', desc: '医养结合模式领军者', status: 'leader' },
          { icon: '🏠', name: '万科随园', desc: '大型养老社区运营商', status: 'growing' },
          { icon: '📱', name: '颐讯信息', desc: '养老机构信息化专家', status: 'potential' },
          { icon: '💊', name: '九安医疗', desc: '家用医疗健康设备', status: 'growing' },
          { icon: '🧠', name: '翔宇医疗', desc: '康复医疗器械龙头', status: 'growing' }
        ],
        images: [
          'https://images.unsplash.com/photo-1516733968668-dbdce39c0651?w=800',
          'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800',
          'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=800'
        ]
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
        summary: '在全球化和数字化双轮驱动下，跨境电商已成为中国企业出海的重要渠道。SHEIN打破千亿估值、Temu席卷北美市场、速卖通布局欧洲电商，这些成功案例正在激励着更多中国企业加速全球化布局。\n\n从"中国制造"到"中国品牌"，从"产品出海"到"品牌出海"，中国跨境电商正在完成从量变到质变的跨越。随着全球电商渗透率的持续提升和物流基础设施的日益完善，中国品牌出海正迎来前所未有的战略机遇期。',
        data: { value: '¥2.1万亿', label: '跨境电商出口规模' },
        change: 28.3,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['跨境电商', '品牌出海', '全球化布局', '电商平台'],
        sourceUrl: 'https://www.customs.gov.cn/',
        sourceName: '中国海关总署',
        reasons: [
          {
            title: '全球电商渗透率持续提升',
            desc: '后疫情时代，海外消费者线上购物习惯已基本养成并持续强化。预计到2027年，全球电商市场规模将突破10万亿美元'
          },
          {
            title: '中国供应链全球领先',
            desc: '中国拥有世界上最完整的产业链配套和最高效的供应链体系，为跨境电商提供了无可比拟的制造优势'
          },
          {
            title: '平台模式创新引领全球',
            desc: 'SHEIN的快时尚模式、Temu的全托管模式、速卖通的多元化布局，证明了中国跨境电商平台模式的创新性和竞争力'
          },
          {
            title: '跨境物流基建日趋完善',
            desc: '海外仓、跨境物流专线、一体化通关服务的不断完善，大幅提升了跨境电商的时效性和成本效率'
          }
        ],
        forecast: {
          marketSize: '¥5万亿',
          growthRate: '30%',
          timeframe: '未来3-5年'
        },
        companies: [
          { icon: '👗', name: 'SHEIN', desc: '快时尚跨境电商巨头', status: 'leader' },
          { icon: '🛒', name: 'Temu', desc: '全托管模式开创者', status: 'leader' },
          { icon: '📦', name: '安克创新', desc: '消费电子出海标杆', status: 'growing' },
          { icon: '💡', name: '致欧科技', desc: '家居出海龙头', status: 'growing' },
          { icon: '🎧', name: '漫步者', desc: '音频设备出海品牌', status: 'potential' }
        ],
        images: [
          'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800'
        ]
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
        summary: '合成生物学正在医疗健康、食品农业、环境保护、材料科学等领域展现巨大变革潜力，被认为是继信息技术革命之后最重要的科技革命之一。麦肯锡研究院发布报告预测，未来60%的物理和生物产品将由合成生物学生产。\n\n从基因编辑到细胞工厂，从生物制造到DNA存储，合成生物学正在将科幻变为现实。CRISPR基因编辑技术的成熟、DNA合成成本的断崖式下降、AI与生物学的深度融合，正在加速推动这一领域从实验室走向产业化。',
        data: { value: '¥1800亿', label: '当前市场规模' },
        change: 45.2,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['合成生物学', '生物技术', '基因编辑', '生物制造'],
        sourceUrl: 'https://www.mckinsey.com/industries/life-sciences/our-insights/',
        sourceName: '麦肯锡生命科学报告',
        reasons: [
          {
            title: '底层技术重大突破',
            desc: 'CRISPR-Cas9基因编辑技术日趋成熟，DNA合成成本在过去20年下降了1000倍以上，技术瓶颈正在被不断突破'
          },
          {
            title: '应用场景持续拓展',
            desc: '从医药、农业到材料、能源、环保，合成生物学的应用边界不断扩展。每个月都有新的合成生物学应用场景被开发出来'
          },
          {
            title: '资本追捧热度不减',
            desc: '全球合成生物学领域融资持续火热，Zymergen、Ginkgo Bioworks等明星企业相继上市，资本市场对这一赛道保持高度热情'
          },
          {
            title: '各国政府战略布局',
            desc: '美国、中国、欧盟等主要经济体都将合成生物学列为国家战略性新兴产业给予重点支持，政策环境持续优化'
          }
        ],
        forecast: {
          marketSize: '¥1.2万亿',
          growthRate: '50%',
          timeframe: '未来5-10年'
        },
        companies: [
          { icon: '🧪', name: '华大基因', desc: '基因测序与合成生物学龙头', status: 'leader' },
          { icon: '💊', name: '药明康德', desc: '全球CRO/CDMO巨头', status: 'leader' },
          { icon: '🧬', name: '金斯瑞生物', desc: '基因合成与细胞疗法', status: 'growing' },
          { icon: '🌱', name: '蓝晶微生物', desc: '合成生物学平台新锐', status: 'potential' },
          { icon: '🦠', name: '弈柯莱生物', desc: '工业合成生物学专家', status: 'growing' }
        ],
        images: [
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
          'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800'
        ]
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
        summary: '在"双减"政策背景下，学科类培训机构受到严格限制，素质教育成为教培行业转型的主要方向。STEAM教育、编程思维培养、科学实验、艺术教育等细分赛道获得资本青睐，市场集中度逐步提升。\n\n随着80后、90后家长成为教育消费主力，他们更加注重孩子的综合能力培养和个性化发展，倾向于为孩子的素质教育投入更多资源。这一代家长的教育理念正在深刻改变中国教育市场的格局。',
        data: { value: '¥4500亿', label: '素质教育市场规模' },
        change: 12.8,
        investors: '⭐⭐⭐☆☆',
        tags: ['素质教育', 'STEAM教育', '少儿编程', '艺术教育'],
        sourceUrl: 'https://www.moe.gov.cn/',
        sourceName: '教育部官网',
        reasons: [
          {
            title: '政策明确支持',
            desc: '"双减"政策推动教育回归本质，素质教育获得政策鼓励和支持。教育部明确要求学校加强科学教育、艺术教育、体育教育'
          },
          {
            title: '家长理念升级',
            desc: '新一代家长更加注重培养孩子的创新能力、批判性思维和综合素质，而不仅仅是学业成绩，素质教育需求持续释放'
          },
          {
            title: '技术打破边界',
            desc: '在线教育技术的成熟打破了地域限制，优质素质教育资源可以覆盖更多地区用户，降低了学习成本'
          },
          {
            title: '市场空间广阔',
            desc: '相比发达国家，中国素质教育渗透率仍有较大提升空间。随着人均可支配收入增长，素质教育支出将持续增加'
          }
        ],
        forecast: {
          marketSize: '¥8000亿',
          growthRate: '15%',
          timeframe: '未来5年'
        },
        companies: [
          { icon: '💻', name: '编程猫', desc: '少儿编程教育领军者', status: 'leader' },
          { icon: '🎨', name: '美术宝', desc: '在线美术教育龙头', status: 'growing' },
          { icon: '🎵', name: 'VIP陪练', desc: '在线音乐教育平台', status: 'growing' },
          { icon: '⚽', name: '动因体育', desc: '青少年体育培训', status: 'potential' },
          { icon: '🔬', name: '科学队长', desc: '科学教育专家', status: 'potential' }
        ],
        images: [
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
          'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800',
          'https://images.unsplash.com/photo-1503676260728-1c8408f9f108?w=800'
        ]
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
        summary: '低空经济正在成为新的战略性新兴产业。随着政策松绑和技术成熟，无人机应用场景从消费娱乐拓展到物流配送、农业植保、城市治理、应急救援等广阔领域。\n\n顺丰、京东、美团等企业已在多地开展无人机配送试点，大疆创新占据全球消费级无人机70%以上市场份额。国家空域管理改革加速推进，低空经济有望成为下一个万亿级市场。',
        data: { value: '¥5000亿', label: '低空经济规模' },
        change: 68.5,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['低空经济', '无人机', '智慧城市', '物流配送'],
        sourceUrl: 'https://www.caac.gov.cn/',
        sourceName: '中国民用航空局',
        reasons: [
          {
            title: '政策红利密集释放',
            desc: '国家出台多项政策支持低空经济发展，包括空域管理改革、无人机适航标准制定、试点城市扩容等，行业进入发展快车道'
          },
          {
            title: '技术成熟度大幅提升',
            desc: '无人机续航能力、载重能力、自主飞行能力不断突破，5G、北斗定位、AI避障等技术的应用让无人机更加智能安全'
          },
          {
            title: '应用场景持续拓展',
            desc: '从航拍娱乐到物流配送、农业植保、电力巡检、城市治理，无人机应用边界不断扩展，市场需求旺盛'
          },
          {
            title: '产业链配套完善',
            desc: '中国拥有全球最完整的无人机产业链，从核心芯片到整机制造，从飞控系统到应用平台，产业生态日趋成熟'
          }
        ],
        forecast: {
          marketSize: '¥2万亿',
          growthRate: '60%',
          timeframe: '未来5年'
        },
        companies: [
          { icon: '🛸', name: '大疆创新', desc: '全球消费级无人机霸主', status: 'leader' },
          { icon: '📦', name: '顺丰科技', desc: '无人机物流配送先驱', status: 'growing' },
          { icon: '🚚', name: '京东物流', desc: '智能物流综合服务商', status: 'growing' },
          { icon: '🍔', name: '美团无人机', desc: '即时配送无人机', status: 'potential' },
          { icon: '🌾', name: '极飞科技', desc: '农业无人机领军者', status: 'growing' }
        ],
        images: [
          'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
          'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
          'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800'
        ]
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
        summary: '预制菜正在深刻改变中国人的餐桌和厨房。以B端餐饮企业为基本盘，C端家庭消费为增量市场，预制菜产业规模快速增长。味知香、国联水产、广州酒家等企业率先登陆资本市场，艾媒咨询预测2026年中国预制菜市场规模将突破万亿。\n\n疫情加速了预制菜的消费者教育，年轻一代对便捷、健康、多元化食品的需求持续增长。从"懒人厨房"到"品质生活"，预制菜正在重新定义都市人的饮食方式。',
        data: { value: '¥4200亿', label: '预制菜市场规模' },
        change: 35.2,
        investors: '⭐⭐⭐⭐☆',
        tags: ['预制菜', '食品工业', '餐饮供应链', '消费升级'],
        sourceUrl: 'https://www.mbtop10.com/',
        sourceName: '艾媒咨询',
        reasons: [
          {
            title: 'B端需求持续释放',
            desc: '连锁餐饮企业对标准化、降本增效的追求，推动预制菜在B端市场快速渗透。餐饮连锁化率提升加速预制菜替代进程'
          },
          {
            title: 'C端消费习惯养成',
            desc: '疫情培养了消费者对预制菜的认知和接受度，年轻白领、懒人经济、宅经济推动C端市场快速增长'
          },
          {
            title: '冷链物流配套完善',
            desc: '全国冷链物流网络日趋完善，冷藏车、冷库等基础设施投资增加，为预制菜全国化流通提供保障'
          },
          {
            title: '资本加速布局',
            desc: '预制菜赛道获得资本市场高度关注，多家企业获得融资，独角兽企业开始涌现，行业投融资热度高涨'
          }
        ],
        forecast: {
          marketSize: '¥1.2万亿',
          growthRate: '30%',
          timeframe: '未来3-5年'
        },
        companies: [
          { icon: '🍖', name: '味知香', desc: '预制菜行业第一股', status: 'leader' },
          { icon: '🦐', name: '国联水产', desc: '水产预制菜龙头', status: 'leader' },
          { icon: '🥮', name: '广州酒家', desc: '传统食品企业转型', status: 'growing' },
          { icon: '🍲', name: '珍味小梅园', desc: '新锐预制菜品牌', status: 'potential' },
          { icon: '🥘', name: '叮咚买菜', desc: '预制菜渠道新势力', status: 'growing' }
        ],
        images: [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
          'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
          'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800'
        ]
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
        summary: '储能是新能源产业发展的关键环节，也是实现"碳达峰、碳中和"目标的重要支撑。随着风电、光伏装机规模快速增长，储能作为解决新能源消纳问题、保障电网稳定运行的核心技术，正在迎来爆发式增长。\n\n从抽水蓄能到电化学储能，从大型储能电站到家庭分布式储能满足不同场景的需求。政策强制配储要求、电价峰谷差扩大、电池成本持续下降，多重因素共同推动储能产业进入黄金发展期。',
        data: { value: '¥3000亿', label: '储能市场规模' },
        change: 85.6,
        investors: '⭐⭐⭐⭐⭐',
        tags: ['储能', '新能源', '动力电池', '智能电网'],
        sourceUrl: 'https://www.nea.gov.cn/',
        sourceName: '国家能源局',
        reasons: [
          {
            title: '新能源强制配储',
            desc: '国家要求新建风电、光伏项目必须配套储能设施，强制配储政策直接拉动储能市场需求'
          },
          {
            title: '电池成本大幅下降',
            desc: '锂电池成本过去十年下降85%以上，系统成本持续降低，储能经济性逐步显现，市场接受度提高'
          },
          {
            title: '峰谷电价差扩大',
            desc: '电力市场化改革推进，峰谷电价差持续拉大，储能峰谷套利商业模式可行性提升'
          },
          {
            title: '电网稳定性需求',
            desc: '新能源大规模并网对电网稳定性提出更高要求，储能在调峰调频、黑启动等方面的价值日益凸显'
          }
        ],
        forecast: {
          marketSize: '¥1万亿',
          growthRate: '70%',
          timeframe: '未来5年'
        },
        companies: [
          { icon: '🔋', name: '宁德时代', desc: '全球动力电池龙头', status: 'leader' },
          { icon: '⚡', name: '比亚迪', desc: '储能系统解决方案商', status: 'leader' },
          { icon: '🔌', name: '阳光电源', desc: '光伏逆变器与储能', status: 'growing' },
          { icon: '💡', name: '亿纬锂能', desc: '锂电池全布局企业', status: 'growing' },
          { icon: '🔩', name: '南都电源', desc: '储能系统集成商', status: 'potential' }
        ],
        images: [
          'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800',
          'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800'
        ]
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
        summary: 'Web3.0代表互联网的下一阶段演进，核心是通过区块链技术构建去中心化的信任网络，实现数据主权和价值互联。从NFT数字藏品到Web3游戏，从DeFi去中心化金融到DAO组织形态，Web3正在从概念走向落地。\n\n虽然加密货币市场波动剧烈，但区块链作为底层技术的价值正在得到更广泛认可。阿里、腾讯、京东等巨头纷纷布局区块链技术，国家也在积极推进NFT、Web3的合规发展路径。',
        data: { value: '¥2000亿', label: '区块链市场规模' },
        change: 28.5,
        investors: '⭐⭐⭐☆☆',
        tags: ['Web3.0', '区块链', 'NFT', 'DeFi'],
        sourceUrl: 'https://www.mct.gov.cn/',
        sourceName: '文化和旅游部',
        reasons: [
          {
            title: '数据要素战略',
            desc: '国家明确数据为新型生产要素，区块链作为数据确权、流转的技术基础设施，战略价值凸显'
          },
          {
            title: '企业级应用落地',
            desc: '区块链在供应链金融、商品溯源、电子票据、版权保护等领域已有成熟应用案例'
          },
          {
            title: '合规路径明晰',
            desc: '监管机构对NFT、数字藏品等概念给出明确界定和发展指引，合规发展路径逐步清晰'
          },
          {
            title: '技术演进加速',
            desc: '区块链性能、可扩展性等问题逐步解决，Layer2、跨链等技术成熟度提升'
          }
        ],
        forecast: {
          marketSize: '¥8000亿',
          growthRate: '45%',
          timeframe: '未来5-10年'
        },
        companies: [
          { icon: '🔷', name: '蚂蚁链', desc: '阿里巴巴区块链平台', status: 'leader' },
          { icon: '🔶', name: '腾讯区块链', desc: '腾讯区块链服务', status: 'leader' },
          { icon: '💙', name: '京东智臻链', desc: '京东区块链平台', status: 'growing' },
          { icon: '🏛️', name: '长安链', desc: '政务区块链平台', status: 'growing' },
          { icon: '📜', name: '中国区块链认证平台', desc: '官方区块链认证', status: 'potential' }
        ],
        images: [
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
          'https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=800',
          'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800'
        ]
      }
    ];

    const trendData = trends.find(t => t.id === trendId) || trends[0];
    this.setData({
      trendData,
      isCollected: this.isTrendCollected(trendId)
    });
  },

  isTrendCollected(trendId) {
    const favorites = wx.getStorageSync('trendFavorites') || [];
    return favorites.includes(trendId);
  },

  toggleCollect() {
    const trendId = this.data.trendData.id;
    const favorites = wx.getStorageSync('trendFavorites') || [];
    let newFavorites;
    
    if (this.data.isCollected) {
      newFavorites = favorites.filter(id => id !== trendId);
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      newFavorites = [...favorites, trendId];
      wx.showToast({ title: '已收藏', icon: 'success' });
    }
    
    wx.setStorageSync('trendFavorites', newFavorites);
    this.setData({ isCollected: !this.data.isCollected });
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    const urls = this.data.trendData.images;
    wx.previewImage({
      current: src,
      urls: urls
    });
  },

  copySource(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success: () => {
        wx.showToast({ title: '链接已复制', icon: 'success' });
      }
    });
  },

  goToEvaluate() {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate'
    });
  },

  shareTrend() {
    const trendData = this.data.trendData;
    const shareContent = `📈 ${trendData.title}\n\n${trendData.summary.substring(0, 50)}...\n\n——来自创业体验官`;
    
    wx.setClipboardData({
      data: shareContent,
      success: () => {
        wx.showToast({ title: '分享内容已复制', icon: 'success' });
      }
    });

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    const trendData = this.data.trendData;
    return {
      title: trendData.title,
      path: `/pages/trend-detail/trend-detail?id=${trendData.id}`,
      imageUrl: trendData.images[0]
    };
  }
});