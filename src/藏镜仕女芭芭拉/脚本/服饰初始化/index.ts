import { getOutfitByID } from '../../服饰数据';

$(() => {
  (async () => {
    try {
      await waitGlobalInitialized('Mvu');

      // 1. 检查是否已初始化（使用聊天变量存储标记）
      const chatVars = getVariables({ type: 'chat' }) as Record<string, unknown>;
      const 服饰已初始化 = chatVars['服饰已初始化'] === true;

      if (服饰已初始化) {
        console.info('[服饰初始化] 已初始化，跳过');
        return;
      }

      // 2. 等待消息楼层变量就绪
      await waitUntil(() => {
        const messages = getChatMessages();
        if (messages.length === 0) return false;
        const firstMsg = messages[0];
        if (firstMsg.message_id == null) return false;
        const mvuData = Mvu.getMvuData({ type: 'message', message_id: firstMsg.message_id });
        return _.has(mvuData, 'stat_data');
      });

      const messages = getChatMessages();
      const firstMsg = messages[0];
      const firstMessageId = firstMsg.message_id;

      // 3. 随机选取服饰（0~19，等概率）
      const 芭芭拉服饰ID = Math.floor(Math.random() * 20); // 0~19
      const 荧服饰ID = Math.floor(Math.random() * 20);     // 0~19

      const 芭芭拉服饰 = getOutfitByID('芭芭拉', 芭芭拉服饰ID);
      const 荧服饰 = getOutfitByID('荧', 荧服饰ID);

      const 芭芭拉服饰名称 = 芭芭拉服饰.名称;
      const 荧服饰名称 = 荧服饰.名称;

      console.info(`[服饰初始化] 芭芭拉→${芭芭拉服饰名称}(ID:${芭芭拉服饰ID}), 荧→${荧服饰名称}(ID:${荧服饰ID})`);

      // 4. 获取 MVU 数据并修改服装状态
      const mvuData = Mvu.getMvuData({ type: 'message', message_id: firstMessageId });

      // 设置芭芭拉的服装状态
      _.set(mvuData, 'stat_data.芭芭拉.服装状态', {
        上身: 芭芭拉服饰.上身,
        下身: 芭芭拉服饰.下身,
        鞋履: 芭芭拉服饰.鞋履,
        饰品: 芭芭拉服饰.饰品,
        整体完整度: 芭芭拉服饰.整体完整度,
        暴露部位: 芭芭拉服饰.暴露部位,
        束缚状态: 芭芭拉服饰.束缚状态,
      });

      // 设置荧的服装状态
      _.set(mvuData, 'stat_data.荧.服装状态', {
        上身: 荧服饰.上身,
        下身: 荧服饰.下身,
        鞋履: 荧服饰.鞋履,
        饰品: 荧服饰.饰品,
        整体完整度: 荧服饰.整体完整度,
        暴露部位: 荧服饰.暴露部位,
        束缚状态: 荧服饰.束缚状态,
      });

      // 5. 写回 MVU 变量
      await Mvu.replaceMvuData(mvuData, { type: 'message', message_id: firstMessageId });

      // 6. 标记服饰已初始化（聊天变量）
      replaceVariables({ 服饰已初始化: true, 芭芭拉服饰ID, 荧服饰ID, 芭芭拉服饰名称, 荧服饰名称 }, { type: 'chat' });

      // ================================================================
      // 7. 注册持续注入：每次 AI 生成时均向上下文注入当前服饰描述
      //    以保证 AI 始终知道芭芭拉和荧穿着什么，不受关键词限制
      // ================================================================
      const 芭芭拉服饰描述 = [
        `【芭芭拉的当前服装：[${芭芭拉服饰名称}]】`,
        `上身：${芭芭拉服饰.上身}`,
        `下身：${芭芭拉服饰.下身}`,
        `鞋履：${芭芭拉服饰.鞋履}`,
        `饰品：${芭芭拉服饰.饰品.length > 0 ? 芭芭拉服饰.饰品.join('、') : '无'}`,
        `束缚状态：${芭芭拉服饰.束缚状态}`,
        `暴露部位：${芭芭拉服饰.暴露部位.length > 0 ? 芭芭拉服饰.暴露部位.join('、') : '无暴露'}`,
        `整体完整度：${芭芭拉服饰.整体完整度}%`,
      ].join('\n');

      const 荧服饰描述 = [
        `【荧的当前服装：[${荧服饰名称}]】`,
        `上身：${荧服饰.上身}`,
        `下身：${荧服饰.下身}`,
        `鞋履：${荧服饰.鞋履}`,
        `饰品：${荧服饰.饰品.length > 0 ? 荧服饰.饰品.join('、') : '无'}`,
        `束缚状态：${荧服饰.束缚状态}`,
        `暴露部位：${荧服饰.暴露部位.length > 0 ? 荧服饰.暴露部位.join('、') : '无暴露'}`,
        `整体完整度：${荧服饰.整体完整度}%`,
      ].join('\n');

      injectPrompts([
        {
          id: 'outfit_barbara',
          position: 'in_chat',
          role: 'system',
          depth: 1,
          content: 芭芭拉服饰描述,
          should_scan: true,
        },
        {
          id: 'outfit_ying',
          position: 'in_chat',
          role: 'system',
          depth: 1,
          content: 荧服饰描述,
          should_scan: true,
        },
      ]);

      console.info('[服饰初始化] 完成，持续注入已注册');
    } catch (err) {
      console.error('[服饰初始化] 失败:', err);
    }
  })();
});
