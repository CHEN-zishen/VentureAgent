// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, data } = event;
  
  switch (action) {
    case 'getCases':
      return await getCases(data);
    case 'getTrends':
      return await getTrends(data);
    case 'addEvaluateHistory':
      return await addEvaluateHistory(data);
    case 'getEvaluateHistory':
      return await getEvaluateHistory(data);
    case 'toggleFavorite':
      return await toggleFavorite(data);
    case 'getFavorites':
      return await getFavorites(data);
    default:
      return { success: false, message: '未知操作' };
  }
};

// 获取案例列表
async function getCases(data) {
  try {
    const { category, page = 1, pageSize = 10 } = data;
    const skip = (page - 1) * pageSize;
    
    let query = db.collection('cases');
    if (category) {
      query = query.where({ category });
    }
    
    const result = await query
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    const total = await db.collection('cases').count();
    
    return {
      success: true,
      data: result.data,
      total: total.total,
      page,
      pageSize
    };
  } catch (err) {
    console.error('获取案例失败:', err);
    return { success: false, message: err.message };
  }
}

// 获取趋势列表
async function getTrends(data) {
  try {
    const { category, page = 1, pageSize = 10 } = data;
    const skip = (page - 1) * pageSize;
    
    let query = db.collection('trends');
    if (category) {
      query = query.where({ industry: category });
    }
    
    const result = await query
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    const total = await db.collection('trends').count();
    
    return {
      success: true,
      data: result.data,
      total: total.total,
      page,
      pageSize
    };
  } catch (err) {
    console.error('获取趋势失败:', err);
    return { success: false, message: err.message };
  }
}

// 添加评估历史
async function addEvaluateHistory(data) {
  try {
    const { userId, evaluateData } = data;
    
    const result = await db.collection('evaluateHistory').add({
      data: {
        userId,
        evaluateData,
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    });
    
    return {
      success: true,
      id: result._id,
      message: '评估记录已保存'
    };
  } catch (err) {
    console.error('添加评估历史失败:', err);
    return { success: false, message: err.message };
  }
}

// 获取评估历史
async function getEvaluateHistory(data) {
  try {
    const { userId, page = 1, pageSize = 20 } = data;
    const skip = (page - 1) * pageSize;
    
    const result = await db.collection('evaluateHistory')
      .where({ userId })
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    const total = await db.collection('evaluateHistory')
      .where({ userId })
      .count();
    
    return {
      success: true,
      data: result.data,
      total: total.total,
      page,
      pageSize
    };
  } catch (err) {
    console.error('获取评估历史失败:', err);
    return { success: false, message: err.message };
  }
}

// 切换收藏状态
async function toggleFavorite(data) {
  try {
    const { userId, targetType, targetId } = data;
    
    // 检查是否已收藏
    const existing = await db.collection('favorites')
      .where({
        userId,
        targetType,
        targetId
      })
      .get();
    
    if (existing.data.length > 0) {
      // 取消收藏
      await db.collection('favorites').doc(existing.data[0]._id).remove();
      return {
        success: true,
        action: 'remove',
        message: '已取消收藏'
      };
    } else {
      // 添加收藏
      await db.collection('favorites').add({
        data: {
          userId,
          targetType,
          targetId,
          createTime: db.serverDate()
        }
      });
      return {
        success: true,
        action: 'add',
        message: '已收藏'
      };
    }
  } catch (err) {
    console.error('切换收藏失败:', err);
    return { success: false, message: err.message };
  }
}

// 获取收藏列表
async function getFavorites(data) {
  try {
    const { userId, targetType, page = 1, pageSize = 20 } = data;
    const skip = (page - 1) * pageSize;
    
    let query = { userId };
    if (targetType) {
      query.targetType = targetType;
    }
    
    const result = await db.collection('favorites')
      .where(query)
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    const total = await db.collection('favorites')
      .where(query)
      .count();
    
    return {
      success: true,
      data: result.data,
      total: total.total,
      page,
      pageSize
    };
  } catch (err) {
    console.error('获取收藏失败:', err);
    return { success: false, message: err.message };
  }
}