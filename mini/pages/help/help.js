Page({
  data: {
    currentTab: 'faq',
    feedbackType: 'suggestion',
    feedbackContent: '',
    contact: '',
    faqList: [
      { question: '如何使用AI评估功能？', answer: '在首页点击AI评估入口，填写项目信息并上传相关文件，系统会自动分析并生成评估报告。支持上传图片和文档格式。', expanded: false },
      { question: '案例库的内容来源是什么？', answer: '案例库收录了国内外知名企业的经典商业案例，涵盖多个行业，由专业团队整理和审核。', expanded: false },
      { question: '如何收藏案例？', answer: '在案例详情页点击收藏按钮即可收藏，收藏的案例会保存在"我的收藏"中，方便随时查看。', expanded: false },
      { question: '学习进度如何记录？', answer: '系统会自动记录您的学习历史，包括浏览过的案例、完成的评估等，数据保存在本地存储中。', expanded: false },
      { question: '如何联系客服？', answer: '您可以通过微信公众号"蟹鱼梦想屋"或发送邮件至support@xieyu.com联系我们，我们会尽快回复。', expanded: false }
    ]
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
  },

  toggleFaq(e) {
    const index = e.currentTarget.dataset.index;
    const faqList = [...this.data.faqList];
    faqList[index].expanded = !faqList[index].expanded;
    this.setData({ faqList });
  },

  selectFeedbackType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ feedbackType: type });
  },

  onContentChange(e) {
    this.setData({ feedbackContent: e.detail.value });
  },

  onContactChange(e) {
    this.setData({ contact: e.detail.value });
  },

  submitFeedback() {
    if (!this.data.feedbackContent.trim()) {
      wx.showToast({ title: '请输入问题描述', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '提交成功', icon: 'success' });
      this.setData({ feedbackContent: '', contact: '', feedbackType: 'suggestion' });
    }, 1000);
  },

  copyWechat() {
    wx.setClipboardData({
      data: '创业体验官',
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' });
      }
    });
  },

  sendEmail() {
    wx.setClipboardData({
      data: 'support@xieyu.com',
      success: () => {
        wx.showToast({ title: '已复制邮箱', icon: 'success' });
      }
    });
  }
});