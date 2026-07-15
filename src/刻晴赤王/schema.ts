export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('璃月历·某日 深夜'),
    当前地点: z.string().prefault('璃月港·刻晴的私人宅邸·卧房内'),
    在场人物: z.record(z.string().describe('人物名'), z.string().describe('人物状态描述')).prefault({}),
  }).prefault({}),

  核心意识: z
    .object({
      堕落度: z.coerce.number().prefault(5).transform(v => _.clamp(v, 0, 100)),
      意识清醒度: z.coerce.number().prefault(100).transform(v => _.clamp(v, 0, 100)),
      抵抗意识: z.coerce.number().prefault(80).transform(v => _.clamp(v, 0, 100)),
      内心独白: z.string().prefault(''),
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
    开发度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    异常状态: z.string().prefault(''),
    当前行为: z.string().prefault(''),
    观感: z.record(
      z.enum(['整体', '乳房', '臀部', '股间', '面部']),
      z.string().prefault('').describe('当前部位状态描述'),
    ).prefault({}),
  }).prefault({}),

  服饰: z.object({
    整体: z.string().prefault(''),
    内衣: z.string().prefault(''),
    配件: z.object({
      手部: z.string().prefault(''),
      腿部与鞋履: z.string().prefault(''),
      饰品: z.string().prefault(''),
      神之眼: z.string().prefault(''),
      身体改造物: z.string().prefault(''),
    }).prefault({}),
  }).prefault({}),
});

export type Schema = z.output<typeof Schema>;
