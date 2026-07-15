$(async () => {
  const renderChoiceButtons = () => {
    $('.choice-group').each(function (this: HTMLElement) {
      const $el = $(this);
      const raw = $el.attr('data-choice-raw');
      if (!raw || $el.hasClass('choice-rendered')) return;

      const choices = raw.split('|').map((s: string) => s.trim()).filter(Boolean);
      if (choices.length === 0) return;

      $el.addClass('choice-rendered');
      choices.forEach((text: string) => {
        $('<button>')
          .addClass('choice-btn')
          .text(text)
          .on('click', async function () {
            const $msg = $el.closest('.mes');
            $msg.find('.choice-btn').prop('disabled', true).css('opacity', '0.4');
            $(this).css('opacity', '1').addClass('chosen');
            await triggerSlash(`/send ${text}`);
            await triggerSlash('/trigger');
          })
          .appendTo($el);
      });
    });
  };

  // 注入按钮样式
  $('<style>').text(`
    .choice-group {
      display: flex; flex-wrap: wrap; gap: 6px;
      margin: 6px 0; padding: 4px 0;
    }
    .choice-btn {
      font-size: 12px; font-family: inherit;
      padding: 4px 10px; cursor: pointer;
      border: 1.5px solid #d4a853; border-radius: 3px;
      background: rgba(212, 168, 83, 0.08);
      color: #d4a853; line-height: 1.4;
      transition: background 0.15s;
    }
    .choice-btn:hover { background: rgba(212, 168, 83, 0.2); }
    .choice-btn:disabled { cursor: not-allowed; }
    .choice-btn.chosen { background: rgba(212, 168, 83, 0.3); font-weight: bold; }
  `).appendTo('head');

  renderChoiceButtons();

  const observer = new MutationObserver(() => renderChoiceButtons());
  observer.observe(document.body, { childList: true, subtree: true });
});
