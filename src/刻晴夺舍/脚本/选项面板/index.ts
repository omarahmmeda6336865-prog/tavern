$(async () => {
<<<<<<< HEAD
  const renderChoiceButtons = () => {
    $('.choice-group').each(function (this: HTMLElement) {
      const $el = $(this);
      const raw = $el.attr('data-choice-raw');
      if (!raw) return;
      $el.removeAttr('data-choice-raw');

      const choices = raw.split('|').map((s: string) => s.trim()).filter(Boolean);
      if (choices.length === 0) return;

      $el.addClass('choice-rendered');
      choices.forEach((text: string) => {
        $('<button>')
          .addClass('choice-btn')
          .text(text)
          .on('click', async function () {
            const $msg = $el.closest('.mes');
            // 禁用该消息中所有选项按钮
            $msg.find('.choice-btn').prop('disabled', true).css('opacity', '0.4');
            // 高亮当前选中的
            $(this).css('opacity', '1').addClass('chosen');

            // 发送并触发
            await triggerSlash(`/send ${text}`);
            await triggerSlash('/trigger');
          })
          .appendTo($el);
      });
    });
  };

  renderChoiceButtons();

  // 观察 DOM 以捕获流式到来的新选项
  const observer = new MutationObserver(() => renderChoiceButtons());
=======
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
>>>>>>> d01d230
  observer.observe(document.body, { childList: true, subtree: true });
});
