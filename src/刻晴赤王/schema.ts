export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    在场人物: z.record(z.string().describe('人物名'), z.string().describe('人物状态描述')),
  }),

  核心意识: z
    .object({
      堕落度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      意识清醒度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      抵抗意识: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      内心独白: z.string(),
    })
    .transform(data => {
      const $堕落阶段 =
        data.堕落度 < 14
          ? '霆霓未黯'
          : data.堕落度 < 27
            ? '心刃交争'
            : data.堕落度 < 41
              ? '躯壳易主'
              : data.堕落度 < 53
                ? '神瞳囚笼'
                : data.堕落度 < 65
                  ? '残识旁观'
                  : data.堕落度 < 77
                    ? '黄沙浸魂'
                    : data.堕落度 < 89
                      ? '紫电染赤'
                      : '赤王新娘';
      return { ...data, $堕落阶段 };
    }),

  身体状态: z.object({
    开发度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    异常状态: z.string(),
    当前行为: z.string(),
    观感: z.record(
      z.enum(['整体', '乳房', '臀部', '股间', '面部']),
      z.string().describe('当前部位状态描述'),
    ),
  }),

  服饰: z.object({
    整体: z.string(),
    内衣: z.string(),
    配件: z.object({
      手部: z.string(),
      腿部与鞋履: z.string(),
      饰品: z.string(),
      神之眼: z.string(),
      身体改造物: z.string(),
    }),
  }),
});

export type Schema = z.output<typeof Schema>;
