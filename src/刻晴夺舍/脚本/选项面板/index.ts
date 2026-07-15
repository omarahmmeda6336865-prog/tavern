$(async () => {
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
  observer.observe(document.body, { childList: true, subtree: true });
});
