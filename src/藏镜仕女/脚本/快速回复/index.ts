import './style.css';

const PROMPT = dedent`
  根据当前对话语境，为{{user}}生成3个简明扼要的回复选项。
  要求：
  - 每个选项不超过25个字
  - 选项应直接以{{user}}的口吻说话，是第一人称的对话文本
  - 选项应当多样：可以包含顺从、挣扎、挑衅、沉默等多种方向
  - 用JSON数组格式返回，如["好的……","不，我拒绝","你究竟想从我这里得到什么？"]
  只返回JSON数组，不要任何其他内容。
`;

$(() => {
  let is_generating = false;

  eventOn(tavern_events.MESSAGE_RECEIVED, async (message_id: number) => {
    const msg = getChatMessages(message_id)[0];
    if (!msg || msg.role !== 'assistant') return;

    // 避免重复生成
    if (is_generating) return;
    is_generating = true;

    try {
      // 等待一小段时间确保 DOM 渲染完毕
      await new Promise(resolve => setTimeout(resolve, 500));

      const $mes = retrieveDisplayedMessage(message_id);
      if (!$mes.length) {
        is_generating = false;
        return;
      }

      // 先注入加载占位
      const placeholder_id = `quick-reply-placeholder-${message_id}`;
      $mes.append(`
        <div class="quick-reply-panel" id="${placeholder_id}">
          <div class="quick-reply-loading">
            <span class="quick-reply-dot"></span>
            <span class="quick-reply-dot"></span>
            <span class="quick-reply-dot"></span>
          </div>
        </div>
      `);

      // 调用 AI 生成选项
      const result = await generateRaw({
        user_input: PROMPT,
        should_silence: true,
        max_chat_history: 'all',
        json_schema: {
          name: 'quick_reply_options',
          description: 'Three quick reply options for the user',
          strict: true,
          value: {
            type: 'array',
            items: { type: 'string', maxLength: 30 },
            minItems: 3,
            maxItems: 3,
          },
        },
      });

      let options: string[];
      try {
        options = JSON.parse(result as string);
      } catch {
        // fallback
        options = ['……', '继续说下去', '等等'];
      }

      // 替换占位内容为实际按钮
      $(`#${placeholder_id}`).replaceWith(`
        <div class="quick-reply-panel">
          ${options
            .map(
              (opt, i) =>
                `<button class="quick-reply-btn" data-reply="${_.escape(opt)}" data-message-id="${message_id}">${_.escape(opt)}</button>`,
            )
            .join('')}
        </div>
      `);
    } catch (e) {
      console.error('[快速回复] 生成选项失败:', e);
      $(`.quick-reply-panel`).remove();
    } finally {
      is_generating = false;
    }
  });

  // 点击按钮的处理
  $(document).on('click', '.quick-reply-btn', async function (this: HTMLElement) {
    const $btn = $(this);
    const reply_text = $btn.attr('data-reply');
    if (!reply_text) return;

    // 禁用所有按钮防止重复点击
    $('.quick-reply-btn').prop('disabled', true).addClass('quick-reply-used');
    $btn.addClass('quick-reply-selected');

    try {
      // 创建用户消息
      await createChatMessages([{ role: 'user', message: reply_text }]);

      // 触发 AI 生成回复
      await generate({ should_silence: false });
    } catch (e) {
      console.error('[快速回复] 发送失败:', e);
      $('.quick-reply-btn').prop('disabled', false).removeClass('quick-reply-used quick-reply-selected');
    }
  });
});
