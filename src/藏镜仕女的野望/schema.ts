export const Schema = z.object({
  当前国度: z.object({
    国名: z.enum(['蒙德', '璃月', '稻妻', '须弥', '枫丹', '至冬', '纳塔', '瑶宫']).prefault('蒙德'),
    当前场景: z.string().prefault(''),
  }).prefault({}),

  当前时间: z.string().prefault(''),

  暴露风险: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),

  激活对象: z.object({
    仕女团: z.record(
      z.string().describe('仕女姓名'),
      z.object({
        姓名: z.string().prefault(''),
        所属阵营: z.string().prefault(''),
        当前状态: z.enum(['伪装态', '仕女态', '正常态']).prefault('正常态'),
        当前装扮: z.object({
          整体: z.string().prefault(''),
          上身: z.string().prefault(''),
          下身: z.string().prefault(''),
          内衣: z.string().prefault(''),
          配件: z.object({
            鞋履: z.string().prefault(''),
            腿部: z.string().prefault(''),
            手部: z.string().prefault(''),
          }).prefault({}),
          其他: z.string().prefault(''),
        }).prefault({}),
      }),
    ),

    目标对象: z.record(
      z.string().describe('目标姓名'),
      z.object({
        姓名: z.string().prefault(''),
        所属阵营: z.string().prefault(''),
        当前状态: z.enum(['伪装态', '仕女态', '正常态']).prefault('正常态'),
        忠诚度: z.coerce.number().transform(v => _.clamp(v, -50, 50)).prefault(0),
        欲望值: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
        身体感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
        当前装扮: z.object({
          整体: z.string().prefault(''),
          上身: z.string().prefault(''),
          下身: z.string().prefault(''),
          内衣: z.string().prefault(''),
          配件: z.object({
            鞋履: z.string().prefault(''),
            腿部: z.string().prefault(''),
            手部: z.string().prefault(''),
          }).prefault({}),
          其他: z.string().prefault(''),
        }).prefault({}),
        称号: z.record(
          z.string().describe('称号名'),
          z.object({
            描述: z.string().prefault(''),
          }),
        ),
      }).transform(data => {
        const $忠诚阶段 =
          data.忠诚度 >= 30 ? '死忠原主' :
          data.忠诚度 >= 10 ? '立场稳固' :
          data.忠诚度 >= -9 ? '矛盾动摇' :
          data.忠诚度 >= -29 ? '暗中转向' : '效忠至冬';
        const $欲望阶段 =
          data.欲望值 <= 20 ? '冷淡' :
          data.欲望值 <= 40 ? '暗涌' :
          data.欲望值 <= 60 ? '觉醒' :
          data.欲望值 <= 80 ? '渴求' : '沉溺';
        const $感度阶段 =
          data.身体感度 <= 20 ? '迟钝' :
          data.身体感度 <= 40 ? '微感' :
          data.身体感度 <= 60 ? '敏感' :
          data.身体感度 <= 80 ? '易触' : '过载';
        const $恶堕进度 = _.clamp(
          (1 - data.忠诚度 / 50) * 40 + (data.欲望值 / 100) * 30 + (data.身体感度 / 100) * 30,
          0,
          100,
        );
        const $当前状态标签 = data.当前状态;
        return { ...data, $忠诚阶段, $欲望阶段, $感度阶段, $恶堕进度, $当前状态标签 };
      }),
    ),
  }).prefault({ 仕女团: {}, 目标对象: {} }),
}).transform(data => {
  const $风险等级 =
    data.暴露风险 <= 20 ? '安全' :
    data.暴露风险 <= 40 ? '留意' :
    data.暴露风险 <= 60 ? '可疑' :
    data.暴露风险 <= 80 ? '危险' : '暴露';
  const firstTarget = _(data.激活对象.目标对象).values().first();
  const $故事阶段 = firstTarget ? `${firstTarget.姓名}篇` : '';
  return { ...data, $风险等级, $故事阶段 };
});

export type Schema = z.output<typeof Schema>;
