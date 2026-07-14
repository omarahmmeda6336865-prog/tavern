export const Schema = z.object({
  世界: z.object({
    当前天数: z.coerce.number(),
    当前地点: z.string(),
    当前篇章: z.string(),
    小节记录: z.record(z.string().describe('小节名'), z.string().describe('小节描述')),
  }),

  仕女团: z.record(
    z.string().describe('激活的仕女名'),
    z.object({
      当前状态: z.string(),
      着装: z.record(z.enum(['上身', '下身', '腿部与鞋履', '手部', '内衣', '装饰']), z.string().describe('着装描述')),
      持有镜具: z
        .record(
          z.string().describe('镜具名'),
          z.object({ 描述: z.string(), 效果: z.string() }),
        )
        .transform(data => {
          // 邪眼不可剥离：无论何种情况都必须保留
          if (!data.邪眼) {
            data.邪眼 = { 描述: '冰之女皇授予的邪眼，仕女力量的根源', 效果: '水镜之力' };
          }
          return data;
        }),
    }),
  ),

  目标角色: z.record(
    z.string().describe('角色姓名'),
    z
      .object({
        堕落值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        依存值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        口唇开发度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        双乳开发度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        阴部开发度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        后庭开发度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        羞耻心: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        神之眼: z.string(),
        当前心境: z.string(),
        着装: z.record(z.enum(['上身', '下身', '腿部与鞋履', '手部', '内衣', '装饰']), z.string().describe('着装描述')),
        身体状态: z.record(z.coerce.number().describe('持续轮数'), z.string().describe('状态描述')),
        称号: z.record(
          z.string().describe('称号名'),
          z.object({
            效果: z.string(),
            自我评价: z.string(),
          }),
        ),
        社交可疑度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
        关键记忆: z.record(z.string().describe('记忆名'), z.string().describe('记忆描述')),
      })
      .transform(data => {
        const $堕落阶段 =
          data.堕落值 < 10
            ? '纯洁的骑士'
            : data.堕落值 < 30
              ? '困惑的涟漪'
              : data.堕落值 < 50
                ? '秘密的沦陷'
                : data.堕落值 < 70
                  ? '镜中的倒影'
                  : data.堕落值 < 90
                    ? '破碎的棱镜'
                    : '藏镜的仕女';
        data.称号 = _(data.称号)
          .entries()
          .takeRight(Math.max(1, Math.ceil(data.堕落值 / 10)))
          .fromPairs()
          .value();
        return { ...data, $堕落阶段 };
      }),
  ),
});

export type Schema = z.output<typeof Schema>;
