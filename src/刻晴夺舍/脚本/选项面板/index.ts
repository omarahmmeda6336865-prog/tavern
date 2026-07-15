$(async () => {
  // 监听聊天区域的 DOM 变化，为新增的选项按钮绑定点击事件
  const bindChoiceButtons = () => {
    $(document).off('click', '.choice-btn').on('click', '.choice-btn', async function (this: HTMLElement) {
      const text = $(this).data('choice-text') as string;
      if (!text) return;

      // 将当前消息中的选项区域替换为已选中的选项文本
      const $msg = $(this).closest('.mes');
      $msg.find('.choice-group').replaceWith(`<div class="choice-chosen"><em>已选择：${text}</em></div>`);

      // 发送用户消息并触发生成
      await triggerSlash(`/send ${text}`);
      await triggerSlash('/trigger');
    });
  };

  bindChoiceButtons();

  // 观察聊天区域以捕获后续新增的按钮
  const observer = new MutationObserver(() => bindChoiceButtons());
  observer.observe(document.body, { childList: true, subtree: true });
});
