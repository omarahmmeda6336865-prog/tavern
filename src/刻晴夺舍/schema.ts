export const Schema = z.object({
  附身: z.object({
    主导意识: z.enum(['阿赫玛尔', '刻晴', '争夺中']).prefault('阿赫玛尔'),
    附身深度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(100),
  }).prefault({}),

  刻晴: z.object({
    意识清醒度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(100),
    抵抗意志: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(80),
    当前感受: z.string().prefault('被囚禁在神之眼中，眼睁睁看着自己的身体被赤王肆意摆布'),
  }).prefault({}),

  身体: z.object({
    快感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    异常状态: z.record(
      z.string().describe('状态名'),
      z.string().describe('效果描述'),
    ).prefault({}),
    当前行为: z.string().prefault(''),
  }).prefault({}),

  服饰: z.object({
    整体: z.string().prefault('刻晴的默认璃月服饰'),
    内衣: z.string().prefault(''),
    配件: z.record(
      z.enum(['手部', '腿部与鞋履', '饰品']),
      z.string().describe('穿戴描述'),
    ).prefault({}),
    其他: z.string().prefault('神之眼'),
  }).prefault({}),

  世界: z.object({
    当前地点: z.string().prefault('璃月港'),
    在场人物: z.string().prefault(''),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
