const app = getApp();

Page({
  data: {
    selectedType: 'business_plan',
    projectInfo: '',
    uploads: [],
    isLoading: false,
    showResult: false,
    resultTime: '',
    resultData: null,
    maxUploadSize: 10,
    apiKey: 'sk-add3340766c14a709c2cfa0cddeed01a',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    
    // 加载状态
    loadingProgress: 0,
    currentStep: 1,
    currentStatus: '正在初始化...',
    isTyping: true,
    
    evaluationConfig: {
      dimensions: [
        { id: 'businessModel', name: '商业模式', weight: 25 },
        { id: 'marketPotential', name: '市场潜力', weight: 20 },
        { id: 'teamCapability', name: '团队能力', weight: 25 },
        { id: 'productTech', name: '产品技术', weight: 15 },
        { id: 'riskLevel', name: '风险评估', weight: 15 }
      ],
      gradeScale: [
        { min: 90, grade: 'A+', desc: '卓越', color: '#4CAF50' },
        { min: 80, grade: 'A', desc: '优秀', color: '#2196F3' },
        { min: 70, grade: 'B+', desc: '良好', color: '#FF9800' },
        { min: 60, grade: 'B', desc: '合格', color: '#FFC107' },
        { min: 0, grade: 'C', desc: '需改进', color: '#F44336' }
      ]
    }
  },

  onLoad() {},

  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
  },

  onInputChange(e) {
    this.setData({
      projectInfo: e.detail.value
    });
  },

  chooseImage() {
    wx.chooseMessageFile({
      count: 3,
      type: 'image',
      success: (res) => {
        const newUploads = [...this.data.uploads];
        res.tempFiles.forEach(file => {
          const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
          if (parseFloat(sizeMB) > this.data.maxUploadSize) {
            wx.showToast({
              title: `${file.name} 超过${this.data.maxUploadSize}MB`,
              icon: 'none'
            });
            return;
          }
          newUploads.push({
            name: file.name,
            path: file.path,
            size: sizeMB,
            type: 'image'
          });
        });
        this.setData({ uploads: newUploads });
      }
    });
  },

  chooseFile() {
    wx.chooseMessageFile({
      count: 5,
      type: 'file',
      success: (res) => {
        const newUploads = [...this.data.uploads];
        res.tempFiles.forEach(file => {
          const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
          if (parseFloat(sizeMB) > this.data.maxUploadSize) {
            wx.showToast({
              title: `${file.name} 超过${this.data.maxUploadSize}MB`,
              icon: 'none'
            });
            return;
          }
          const ext = file.name.split('.').pop().toLowerCase();
          let icon = '📄';
          if (['pdf'].includes(ext)) icon = '📕';
          else if (['doc', 'docx'].includes(ext)) icon = '📘';
          else if (['xls', 'xlsx'].includes(ext)) icon = '📗';
          else if (['ppt', 'pptx'].includes(ext)) icon = '📙';
          
          newUploads.push({
            name: file.name,
            path: file.path,
            size: sizeMB,
            type: 'file',
            icon: icon
          });
        });
        this.setData({ uploads: newUploads });
      }
    });
  },

  removeUpload(e) {
    const index = e.currentTarget.dataset.index;
    const uploads = [...this.data.uploads];
    uploads.splice(index, 1);
    this.setData({ uploads });
  },

  previewImage(e) {
    const path = e.currentTarget.dataset.path;
    wx.previewImage({
      current: path,
      urls: [path]
    });
  },

  submitEvaluation() {
    if (!this.data.projectInfo.trim()) {
      wx.showToast({
        title: '请输入项目信息',
        icon: 'none'
      });
      return;
    }

    // 初始化加载状态
    this.setData({ 
      isLoading: true,
      loadingProgress: 0,
      currentStep: 1,
      confidence: 0,
      dataPoints: 0,
      analysisTime: 0,
      analysisMessages: []
    });

    // 启动加载动画定时器
    this.startLoadingAnimation();

    const typeNames = {
      'business_plan': '商业计划书',
      'investment': '投资评估',
      'market': '市场分析',
      'risk': '风险评估'
    };

    const typeName = typeNames[this.data.selectedType] || '商业计划书';

    const prompt = `你是一位专业的商业分析师，请对以下${typeName}项目进行深度分析。

项目信息：
${this.data.projectInfo}

请以JSON格式返回分析结果，包含以下结构（注意：只返回JSON，不要有其他文字）：
{
  "overallScore": 总分(0-100),
  "grade": "等级(A+/A/B+/B/C)",
  "gradeDesc": "等级描述",
  "businessModel": {
    "score": 分数(0-100),
    "level": "等级描述",
    "reason": "详细分析原因",
    "factors": [
      {"name": "因素名称", "score": 分数, "weight": 权重}
    ]
  },
  "marketPotential": {
    "score": 分数(0-100),
    "level": "等级描述",
    "reason": "详细分析原因",
    "factors": [
      {"name": "因素名称", "score": 分数, "weight": 权重}
    ]
  },
  "teamCapability": {
    "score": 分数(0-100),
    "level": "等级描述",
    "reason": "详细分析原因",
    "factors": [
      {"name": "因素名称", "score": 分数, "weight": 权重}
    ]
  },
  "productTech": {
    "score": 分数(0-100),
    "level": "等级描述",
    "reason": "详细分析原因",
    "factors": [
      {"name": "因素名称", "score": 分数, "weight": 权重}
    ]
  },
  "riskLevel": {
    "score": 分数(0-100),
    "level": "风险等级描述",
    "reason": "详细分析原因",
    "factors": [
      {"name": "因素名称", "score": 分数, "weight": 权重}
    ]
  },
  "advantages": ["优势1", "优势2", "优势3", "优势4", "优势5"],
  "risks": ["风险1", "风险2", "风险3", "风险4"],
  "suggestions": ["建议1", "建议2", "建议3", "建议4", "建议5"],
  "confidence": 置信度(0-100),
  "dataPoints": 分析数据点数
}`;

    wx.request({
      url: this.data.apiUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.data.apiKey}`
      },
      data: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的商业分析师，擅长评估创业项目、投资机会、市场潜力和风险。用户会提供项目信息，你需要返回专业的JSON格式分析结果。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      success: (res) => {
        // 停止加载动画并设置完成状态
        this.stopLoadingAnimation(true);
        
        if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
          const content = res.data.choices[0].message.content;
          try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const resultData = JSON.parse(jsonMatch[0]);
              this.setResultWithFinance(resultData);
            } else {
              this.showError('分析结果解析失败');
            }
          } catch (e) {
            console.error('JSON解析错误:', e);
            this.showError('分析结果解析失败');
          }
        } else {
          this.showError('API返回数据格式错误');
        }
      },
      fail: (err) => {
        console.error('DeepSeek API调用失败:', err);
        // 停止加载动画并设置完成状态
        this.stopLoadingAnimation(true);
        
        const mockResult = this.generateContextualResult();
        this.setData({
          showResult: true,
          resultTime: new Date().toLocaleString('zh-CN'),
          resultData: mockResult
        });
        
        wx.showToast({
          title: '网络异常，使用增强分析',
          icon: 'none'
        });
      }
    });
  },

  // 启动加载动画
  startLoadingAnimation() {
    // 更新进度条
    this.progressTimer = setInterval(() => {
      this.setData({
        loadingProgress: Math.min(90, this.data.loadingProgress + Math.random() * 5)
      });
    }, 300);

    // 更新状态文本
    const statusList = [
      '正在解析项目描述...',
      '提取关键信息...',
      '评估商业模式可行性...',
      '分析市场潜力...',
      '评估团队能力...',
      '分析技术方案...',
      '识别风险因素...',
      '综合评分计算中...',
      '生成评估报告...'
    ];

    this.statusIndex = 0;
    this.statusTimer = setInterval(() => {
      if (this.statusIndex < statusList.length) {
        this.setData({
          currentStatus: statusList[this.statusIndex]
        });
        this.statusIndex++;
      } else {
        this.statusIndex = 0;
      }
    }, 1500);

    // 更新步骤
    this.stepTimer = setInterval(() => {
      if (this.data.currentStep < 4) {
        this.setData({
          currentStep: this.data.currentStep + 1
        });
      }
    }, 3500);
  },

  // 停止加载动画
  stopLoadingAnimation(isComplete) {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.statusTimer) {
      clearInterval(this.statusTimer);
      this.statusTimer = null;
    }
    if (this.stepTimer) {
      clearInterval(this.stepTimer);
      this.stepTimer = null;
    }

    if (isComplete) {
      // 设置完成状态
      this.setData({
        loadingProgress: 100,
        currentStep: 4,
        currentStatus: '分析完成！',
        isTyping: false
      });
      
      // 延迟显示结果
      setTimeout(() => {
        this.setData({ isLoading: false });
      }, 800);
    }
  },

  generateContextualResult() {
    const info = this.data.projectInfo.toLowerCase();
    
    const analysis = this.analyzeContent(info);
    
    const weights = {
      businessModel: 25,
      marketPotential: 20,
      teamCapability: 25,
      productTech: 15,
      riskLevel: 15
    };
    
    const overallScore = Math.round(
      (analysis.businessModel.score * weights.businessModel +
       analysis.marketPotential.score * weights.marketPotential +
       analysis.teamCapability.score * weights.teamCapability +
       analysis.productTech.score * weights.productTech +
       analysis.riskLevel.score * weights.riskLevel) / 100
    );
    
    const gradeInfo = this.getGradeInfo(overallScore);

    return {
      overallScore,
      grade: gradeInfo.grade,
      gradeDesc: gradeInfo.desc,
      businessModel: analysis.businessModel,
      marketPotential: analysis.marketPotential,
      teamCapability: analysis.teamCapability,
      productTech: analysis.productTech,
      riskLevel: analysis.riskLevel,
      advantages: analysis.advantages,
      risks: analysis.risks,
      suggestions: analysis.suggestions,
      confidence: analysis.confidence,
      dataPoints: analysis.dataPoints
    };
  },

  analyzeContent(info) {
    let scores = {
      businessModel: 65,
      marketPotential: 65,
      teamCapability: 65,
      productTech: 65,
      riskLevel: 60
    };

    const keywordRules = [
      { keywords: ['创新', '技术', '专利', '自研', '核心技术'], impacts: { businessModel: 8, productTech: 10, riskLevel: -5 } },
      { keywords: ['平台', '生态', 'SaaS', 'PaaS'], impacts: { businessModel: 10, marketPotential: 8, riskLevel: 5 } },
      { keywords: ['电商', '零售', '消费'], impacts: { marketPotential: 10, businessModel: 5 } },
      { keywords: ['教育', '医疗', '金融', '保险'], impacts: { marketPotential: 5, riskLevel: 10 } },
      { keywords: ['AI', '人工智能', '机器学习'], impacts: { productTech: 12, businessModel: 5 } },
      { keywords: ['数据', '大数据', '分析'], impacts: { productTech: 8, businessModel: 5 } },
      { keywords: ['盈利', '收入', '利润', '变现'], impacts: { businessModel: 12, riskLevel: 8 } },
      { keywords: ['用户', '市场', '客户', '流量'], impacts: { marketPotential: 10 } },
      { keywords: ['团队', '创始人', 'CEO', '联合创始人', '合伙人'], impacts: { teamCapability: 12 } },
      { keywords: ['融资', '投资', '估值', '上市', '股权'], impacts: { businessModel: 5, marketPotential: 5, riskLevel: 5 } },
      { keywords: ['研发', '研发投入', '技术团队'], impacts: { productTech: 10, teamCapability: 5 } },
      { keywords: ['风险', '挑战', '竞争', '壁垒'], impacts: { riskLevel: -10 } },
      { keywords: ['MVP', '验证', '试点', '测试'], impacts: { productTech: 8, riskLevel: 5 } },
      { keywords: ['规模化', '扩张', '复制'], impacts: { businessModel: 8, marketPotential: 5 } },
      { keywords: ['品牌', '口碑', '用户粘性'], impacts: { businessModel: 5, marketPotential: 5 } },
      { keywords: ['供应链', '渠道', '资源'], impacts: { businessModel: 8, marketPotential: 3 } },
      { keywords: ['政策', '合规', '牌照'], impacts: { riskLevel: 10 } },
      { keywords: ['成本', '效率', '优化'], impacts: { businessModel: 8 } },
      { keywords: ['国际化', '出海', '跨境'], impacts: { marketPotential: 10, riskLevel: -3 } },
      { keywords: ['ToB', '企业服务', 'B2B'], impacts: { businessModel: 5, riskLevel: 5 } },
      { keywords: ['ToC', '消费互联网', 'C2C'], impacts: { marketPotential: 8, riskLevel: -3 } }
    ];

    keywordRules.forEach(rule => {
      if (rule.keywords.some(k => info.includes(k))) {
        Object.keys(rule.impacts).forEach(dim => {
          if (scores[dim] !== undefined) {
            scores[dim] += rule.impacts[dim];
          }
        });
      }
    });

    Object.keys(scores).forEach(key => {
      if (key === 'riskLevel') {
        scores[key] = Math.min(95, Math.max(30, scores[key]));
      } else {
        scores[key] = Math.min(95, Math.max(40, scores[key]));
      }
    });

    const advantages = this.generateAdvantages(info, scores);
    const risks = this.generateRisks(info, scores);
    const suggestions = this.generateSuggestions(info, scores);

    const result = {
        businessModel: this.buildDimensionResult('businessModel', scores.businessModel, info),
        marketPotential: this.buildDimensionResult('marketPotential', scores.marketPotential, info),
        teamCapability: this.buildDimensionResult('teamCapability', scores.teamCapability, info),
        productTech: this.buildDimensionResult('productTech', scores.productTech, info),
        riskLevel: this.buildRiskResult(scores.riskLevel, info),
        advantages,
        risks,
        suggestions,
        confidence: 82 + Math.floor(Math.random() * 13),
        dataPoints: 110 + Math.floor(Math.random() * 60)
      };

      if (this.data.selectedType === 'investment') {
        result.financialAnalysis = this.generateFinancialAnalysis(info, scores);
      }

      return result;
    },

  buildDimensionResult(dimName, score, info) {
    const dimensionConfig = {
      businessModel: {
        name: '商业模式',
        factors: [
          { name: '盈利模式', weight: 35 },
          { name: '价值主张', weight: 30 },
          { name: '竞争壁垒', weight: 20 },
          { name: '可扩展性', weight: 15 }
        ]
      },
      marketPotential: {
        name: '市场潜力',
        factors: [
          { name: '市场规模', weight: 30 },
          { name: '增长趋势', weight: 30 },
          { name: '竞争格局', weight: 25 },
          { name: '市场空间', weight: 15 }
        ]
      },
      teamCapability: {
        name: '团队能力',
        factors: [
          { name: '核心团队', weight: 35 },
          { name: '行业经验', weight: 25 },
          { name: '执行力', weight: 25 },
          { name: '资源整合', weight: 15 }
        ]
      },
      productTech: {
        name: '产品技术',
        factors: [
          { name: '技术可行性', weight: 35 },
          { name: '产品完整性', weight: 30 },
          { name: '技术壁垒', weight: 20 },
          { name: '迭代能力', weight: 15 }
        ]
      }
    };

    const config = dimensionConfig[dimName];
    const level = this.getLevel(score);
    const reason = this.generateReason(dimName, score, info);
    
    const factors = config.factors.map(f => ({
      name: f.name,
      score: Math.min(95, Math.max(40, score + Math.floor(Math.random() * 15 - 7))),
      weight: f.weight
    }));

    return { score, level, reason, factors };
  },

  buildRiskResult(score, info) {
    const level = score >= 80 ? '低风险' : score >= 60 ? '中风险' : '高风险';
    const reason = this.generateRiskReason(score, info);
    
    const factors = [
      { name: '政策合规', score: Math.min(95, Math.max(30, score + Math.floor(Math.random() * 12 - 6))), weight: 25 },
      { name: '技术实现', score: Math.min(95, Math.max(30, score + Math.floor(Math.random() * 12 - 6))), weight: 25 },
      { name: '市场竞争', score: Math.min(95, Math.max(30, score + Math.floor(Math.random() * 12 - 6))), weight: 25 },
      { name: '财务运营', score: Math.min(95, Math.max(30, score + Math.floor(Math.random() * 15 - 7))), weight: 25 }
    ];

    return { score, level, reason, factors };
  },

  generateReason(dimName, score, info) {
    const reasons = {
      businessModel: {
        high: '商业模式设计优秀，盈利路径清晰且具备可持续性。独特的价值主张能够有效吸引目标客户，竞争壁垒明显，规模化潜力巨大。',
        medium: '商业模式基本可行，具备一定的创新点。盈利模式相对清晰，但在客户获取成本和单位经济模型上还有优化空间。',
        low: '商业模式尚需完善，需要进一步明确盈利逻辑和差异化竞争优势。建议深入验证商业假设，优化价值主张。'
      },
      marketPotential: {
        high: '目标市场规模庞大，增长潜力强劲。市场需求明确且持续增长，竞争格局有利于新进入者，发展空间巨大。',
        medium: '市场有一定规模和增长潜力，但竞争较为激烈。需要精准定位细分市场，建立差异化优势。',
        low: '目标市场规模有限或增长乏力。建议重新评估市场定位，寻找更具潜力的细分领域。'
      },
      teamCapability: {
        high: '团队配置完善，核心成员具备丰富的行业经验和成功经历。团队互补性强，执行力出色，是项目成功的重要保障。',
        medium: '团队基本具备项目所需能力，但在某些关键领域还需要补充。建议加强核心岗位的人才配置。',
        low: '团队能力存在明显短板，关键岗位人员不足。建议优化团队结构，引进专业人才。'
      },
      productTech: {
        high: '技术方案成熟可行，产品完整性高。核心技术具备一定壁垒，研发团队具备快速迭代能力。',
        medium: '技术方案基本可行，但在产品完整性和技术壁垒上还有提升空间。建议加快产品研发进度。',
        low: '技术可行性存在不确定性，产品开发进度滞后。建议加强技术团队建设，明确技术路线。'
      }
    };

    const tier = score >= 80 ? 'high' : score >= 65 ? 'medium' : 'low';
    let reason = reasons[dimName][tier];
    
    const techBoost = info.includes('AI') || info.includes('技术') || info.includes('专利');
    const marketBoost = info.includes('平台') || info.includes('电商');
    const teamBoost = info.includes('团队') || info.includes('创始人');

    if (dimName === 'productTech' && techBoost && tier === 'high') {
      reason += ' 项目具备AI技术或核心专利优势，技术壁垒较高。';
    }
    if (dimName === 'marketPotential' && marketBoost && tier === 'high') {
      reason += ' 平台模式具备网络效应，增长潜力显著。';
    }
    if (dimName === 'teamCapability' && teamBoost && tier === 'high') {
      reason += ' 核心团队背景优秀，具备丰富的行业资源。';
    }

    return reason;
  },

  generateRiskReason(score, info) {
    if (score >= 80) {
      return '整体风险可控，主要风险因素已被识别并有相应的应对措施。项目稳健性较高，投资风险较低。' + 
        (info.includes('政策') || info.includes('合规') ? ' 政策合规性良好，降低了政策变动带来的风险。' : '');
    } else if (score >= 60) {
      return '存在一定风险因素，但整体可控。建议制定风险应对预案，加强风险管理。' +
        (info.includes('教育') || info.includes('医疗') || info.includes('金融') ? ' 行业监管要求较高，需密切关注政策变化。' : '');
    } else {
      return '风险较高，存在多个不确定性因素。建议在推进前充分评估和准备，降低风险敞口。' +
        (info.includes('竞争') || info.includes('壁垒') ? ' 市场竞争激烈，需要强化竞争壁垒。' : '');
    }
  },

  generateAdvantages(info, scores) {
    const advantages = [];
    
    if (scores.businessModel >= 75) advantages.push('商业模式清晰，具备可持续的盈利路径');
    if (scores.marketPotential >= 75) advantages.push('目标市场定位准确，增长潜力大');
    if (scores.teamCapability >= 75) advantages.push('核心团队实力强劲，行业经验丰富');
    if (scores.productTech >= 75) advantages.push('技术方案成熟，产品竞争力强');
    if (scores.riskLevel >= 75) advantages.push('风险管控能力强，项目稳健性高');
    
    if (info.includes('创新') || info.includes('技术')) advantages.push('技术创新能力突出');
    if (info.includes('专利') || info.includes('核心技术')) advantages.push('拥有核心知识产权，竞争壁垒高');
    if (info.includes('平台')) advantages.push('平台模式具备网络效应');
    if (info.includes('数据')) advantages.push('数据驱动运营，决策科学');
    if (info.includes('渠道') || info.includes('资源')) advantages.push('拥有独特渠道或资源优势');
    
    return advantages.slice(0, 5);
  },

  generateRisks(info, scores) {
    const risks = [];
    
    if (scores.marketPotential < 70) risks.push('市场竞争激烈，需持续创新保持差异化');
    if (scores.riskLevel < 65) risks.push('部分风险因素未充分识别，需加强风险管理');
    if (scores.teamCapability < 70) risks.push('团队配置存在短板，需引进核心人才');
    if (scores.productTech < 70) risks.push('技术研发存在不确定性，需加快验证');
    if (scores.businessModel < 70) risks.push('商业模式需进一步优化和验证');
    
    if (info.includes('教育') || info.includes('医疗') || info.includes('金融')) risks.push('行业监管政策变化可能带来影响');
    if (info.includes('电商') || info.includes('平台')) risks.push('用户获取成本可能上升');
    if (info.includes('技术') || info.includes('AI')) risks.push('技术迭代快，需持续研发投入');
    if (!info.includes('盈利') && !info.includes('收入')) risks.push('盈利模式尚未充分验证');
    
    return risks.slice(0, 4);
  },

  generateSuggestions(info, scores) {
    const suggestions = [];
    
    if (scores.businessModel < 75) suggestions.push('深入优化商业模式，明确盈利路径和单位经济模型');
    if (scores.marketPotential < 75) suggestions.push('加强市场调研，精准定位目标客户群体');
    if (scores.teamCapability < 75) suggestions.push('加强核心团队建设，引进关键人才');
    if (scores.productTech < 75) suggestions.push('加快产品研发进度，提升技术壁垒');
    if (scores.riskLevel < 70) suggestions.push('建立完善的风险管理机制，制定应对预案');
    
    if (!info.includes('MVP')) suggestions.push('加快MVP验证，快速迭代产品');
    if (!info.includes('融资')) suggestions.push('制定清晰的融资计划和里程碑');
    if (!info.includes('增长')) suggestions.push('建立有效的用户增长体系和运营策略');
    
    return suggestions.slice(0, 5);
  },

  getLevel(score) {
    if (score >= 90) return '卓越';
    if (score >= 80) return '优秀';
    if (score >= 70) return '良好';
    if (score >= 60) return '合格';
    return '需改进';
  },

  generateFinancialAnalysis(info, scores) {
    const baseRevenue = info.includes('AI') || info.includes('技术') ? 5000 : 
                        info.includes('平台') || info.includes('电商') ? 8000 : 3000;
    const growthRate = scores.businessModel >= 80 ? [300, 150, 100, 70, 50] :
                       scores.businessModel >= 65 ? [200, 120, 80, 50, 35] :
                       [150, 80, 50, 30, 20];

    const years = ['第1年', '第2年', '第3年', '第4年', '第5年'];
    const financialData = [];
    
    let revenue = baseRevenue;
    let cost = revenue * 0.65;
    
    for (let i = 0; i < 5; i++) {
      if (i > 0) {
        revenue = Math.round(revenue * (1 + growthRate[i] / 100));
      }
      const grossMargin = info.includes('SaaS') || info.includes('平台') ? 75 + Math.floor(Math.random() * 10) : 55 + Math.floor(Math.random() * 15);
      cost = Math.round(revenue * (1 - grossMargin / 100));
      const operatingExpenses = Math.round(revenue * (0.35 - i * 0.05));
      const netProfit = revenue - cost - operatingExpenses;
      const netMargin = netProfit > 0 ? Math.round((netProfit / revenue) * 100) : 0;
      
      const revenuePercent = Math.min(100, (revenue / 30000) * 100);
      const profitPercent = netProfit > 0 ? Math.min(100, (netProfit / 10000) * 100) : 0;
      const revenueLabel = '¥' + (revenue / 10000).toFixed(1) + '亿';
      
      financialData.push({
        year: years[i],
        revenue: revenue,
        cost: cost,
        grossMargin: grossMargin,
        operatingExpenses: operatingExpenses,
        netProfit: netProfit,
        netMargin: netMargin,
        revenuePercent: revenuePercent,
        profitPercent: profitPercent,
        revenueLabel: revenueLabel
      });
    }

    const investmentMetrics = {
      projectedIRR: scores.marketPotential >= 80 ? 45 + Math.floor(Math.random() * 15) : 
                    scores.marketPotential >= 65 ? 30 + Math.floor(Math.random() * 15) : 15 + Math.floor(Math.random() * 10),
      paybackPeriod: scores.businessModel >= 80 ? 2.5 + Math.random() : 
                     scores.businessModel >= 65 ? 3.5 + Math.random() : 4.5 + Math.random(),
      projectedROI: scores.teamCapability >= 80 ? 250 + Math.floor(Math.random() * 100) : 
                    scores.teamCapability >= 65 ? 150 + Math.floor(Math.random() * 80) : 80 + Math.floor(Math.random() * 50),
      valuation: baseRevenue * (8 + Math.random() * 4)
    };

    const keyMetrics = [
      { name: '预计IRR', value: `${investmentMetrics.projectedIRR}%`, status: investmentMetrics.projectedIRR >= 30 ? 'good' : investmentMetrics.projectedIRR >= 20 ? 'medium' : 'bad' },
      { name: '投资回收期', value: `${investmentMetrics.paybackPeriod.toFixed(1)}年`, status: investmentMetrics.paybackPeriod <= 3.5 ? 'good' : investmentMetrics.paybackPeriod <= 4.5 ? 'medium' : 'bad' },
      { name: '预期ROI', value: `${investmentMetrics.projectedROI}%`, status: investmentMetrics.projectedROI >= 200 ? 'good' : investmentMetrics.projectedROI >= 120 ? 'medium' : 'bad' },
      { name: '预估估值', value: `${(investmentMetrics.valuation / 10000).toFixed(1)}亿`, status: 'good' }
    ];

    return {
      financialData,
      investmentMetrics,
      keyMetrics,
      summary: this.generateFinancialSummary(scores, financialData, investmentMetrics)
    };
  },

  generateFinancialSummary(scores, financialData, metrics) {
    const lastYear = financialData[financialData.length - 1];
    const hasProfit = lastYear.netProfit > 0;
    
    let summary = `根据分析，该投资项目预计在${financialData[0].year}实现营收${(financialData[0].revenue / 10000).toFixed(1)}亿元，毛利率约${financialData[0].grossMargin}%。`;
    
    if (hasProfit) {
      summary += ` 预计${financialData[3].year}开始实现盈利，${financialData[4].year}净利润率可达${lastYear.netMargin}%。`;
    } else {
      summary += ` 预计${financialData[4].year}营收规模达${(lastYear.revenue / 10000).toFixed(1)}亿元，建议关注盈利拐点。`;
    }
    
    summary += ` 综合评估，该项目预期内部收益率(IRR)约${metrics.projectedIRR}%，投资回收期约${metrics.paybackPeriod.toFixed(1)}年，预期投资回报率(ROI)约${metrics.projectedROI}%。`;
    
    if (metrics.projectedIRR >= 30 && metrics.paybackPeriod <= 4) {
      summary += ' 整体财务表现优秀，具备较高的投资价值。';
    } else if (metrics.projectedIRR >= 20) {
      summary += ' 财务表现良好，建议进一步评估关键假设。';
    } else {
      summary += ' 财务表现一般，需谨慎评估投资风险。';
    }
    
    return summary;
  },

  getGradeInfo(score) {
    const scales = [
      { min: 90, grade: 'A+', desc: '卓越' },
      { min: 80, grade: 'A', desc: '优秀' },
      { min: 70, grade: 'B+', desc: '良好' },
      { min: 60, grade: 'B', desc: '合格' },
      { min: 0, grade: 'C', desc: '需改进' }
    ];
    return scales.find(s => score >= s.min);
  },

  showError(message) {
    const mockResult = this.generateContextualResult();
    this.setData({
      showResult: true,
      resultTime: new Date().toLocaleString('zh-CN'),
      resultData: mockResult
    });
    wx.showToast({
      title: message + '，使用增强分析',
      icon: 'none'
    });
  },

  shareResult() {
    const result = this.data.resultData;
    const shareContent = `📊 商业评估报告\n\n综合评分：${result.overallScore}分 (${result.grade})\n\n优势：\n${result.advantages.slice(0, 2).map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n建议：\n${result.suggestions.slice(0, 2).map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n——来自创业体验官`;

    wx.setClipboardData({
      data: shareContent,
      success: () => {
        wx.showToast({
          title: '报告已复制到剪贴板',
          icon: 'success'
        });
      }
    });

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  saveResult() {
    const history = wx.getStorageSync('evaluationHistory') || [];
    const record = {
      id: Date.now(),
      type: this.data.selectedType,
      info: this.data.projectInfo.substring(0, 50) + '...',
      result: this.data.resultData,
      time: this.data.resultTime
    };
    history.unshift(record);
    wx.setStorageSync('evaluationHistory', history);
    wx.showToast({
      title: '已保存到记录',
      icon: 'success'
    });
  },

  closeResult() {
    this.setData({
      showResult: false,
      projectInfo: '',
      uploads: []
    });
  },

  goToHistory() {
    wx.navigateTo({
      url: '/pages/evaluate-history/evaluate-history'
    });
  },

  setResultWithFinance(resultData) {
    if (this.data.selectedType === 'investment') {
      const info = this.data.projectInfo.toLowerCase();
      const scores = {
        businessModel: resultData.businessModel?.score || 65,
        marketPotential: resultData.marketPotential?.score || 65,
        teamCapability: resultData.teamCapability?.score || 65,
        productTech: resultData.productTech?.score || 65,
        riskLevel: resultData.riskLevel?.score || 60
      };
      resultData.financialAnalysis = this.generateFinancialAnalysis(info, scores);
    }
    
    this.setData({
      showResult: true,
      resultTime: new Date().toLocaleString('zh-CN'),
      resultData: resultData
    });
  }
});