$(async () => {
  const UPDATE_REMINDER_ID = 'keqing_var_update_reminder';

  const buildUpdateReminder = () => {
    const d = _.get(getAllVariables(), 'stat_data.核心意识.堕落度') || 0;
    const stage = _.get(getAllVariables(), 'stat_data.核心意识.$堕落阶段') || '霆霓未黯';

    return `【变量更新提醒 — 必须执行】
你必须在本次回复的末尾输出 <UpdateVariable> 块。这是强制要求，不可省略。

快速参考：
  数值用 delta  — 堕落度 / 意识清醒度 / 抵抗意识 / 开发度
  字符串用 replace — 内心独白 / 异常状态 / 当前行为 / 观感.＊ / 服饰.＊ / 世界.＊ / 在场人物.＊
  人物增删用 insert / remove — 在场人物

更新幅度：堕落度 +(1~3)，其余数值 ±(1~3)。
当前堕落阶段：${stage}（堕落度 ${d}）。

输出格式：
<UpdateVariable>
<Analysis>简要英文分析</Analysis>
<JSONPatch>
[
  { "op": "delta",   "path": "/核心意识/堕落度",     "value": 数值 },
  { "op": "replace", "path": "/核心意识/内心独白",     "value": "..." }
]
</JSONPatch>
</UpdateVariable>`;
  };

  // 每次 AI 生成前重新注入最新的提醒
  eventOn(tavern_events.GENERATION_BEFORE_COMMANDS, () => {
    try {
      uninjectPrompts([UPDATE_REMINDER_ID]);
    } catch (_) {
      /* first time */
    }
    injectPrompts(
      [
        {
          id: UPDATE_REMINDER_ID,
          position: 'in_chat',
          depth: 0,
          role: 'system',
          content: buildUpdateReminder(),
          should_scan: false,
        },
      ],
      { once: true },
    );
  });

  console.info('[刻晴] 变量更新强制提醒脚本已加载');
});
