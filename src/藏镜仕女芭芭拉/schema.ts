export const Schema = z.object({
  芭芭拉: z.object({
    支配欲: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    愉悦度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    兴奋度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前模式: z.enum(['温柔诱导', '挑逗试探', '强硬调教', '彻底支配']),
    耐心: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    对荧的评价: z.string(),
    服装状态: z.object({
      上身: z.string(),
      下身: z.string(),
      鞋履: z.string(),
      饰品: z.array(z.string()).prefault([]),
      整体完整度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      暴露部位: z.array(z.string()).prefault([]),
      束缚状态: z.enum(['无', '轻度束缚', '中度束缚', '重度束缚']),
    }),
  }),

  荧: z.object({
    堕落度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    服从度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    羞耻心: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    色欲: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    理性值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    兴奋度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    身体开发度: z
      .record(
        z.string().describe('部位名'),
        z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      )
      .prefault({}),
    状态: z.object({
      标准: z.enum(['正常', '情动', '发情', '高潮余韵', '失神', '恍惚', '昏睡']),
      异常: z.array(z.string()).prefault([]),
    }),
    已历玩法: z
      .record(
        z.string().describe('玩法名称'),
        z.object({
          首次: z.string(),
          角色: z.enum(['荧受', '芭芭拉施']),
        }),
      )
      .prefault({}),
    服装状态: z.object({
      上身: z.string(),
      下身: z.string(),
      鞋履: z.string(),
      饰品: z.array(z.string()).prefault([]),
      整体完整度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      暴露部位: z.array(z.string()).prefault([]),
      束缚状态: z.enum(['无', '轻度束缚', '中度束缚', '重度束缚']),
    }),
  }),

  环境: z.object({
    当前场景: z.enum([
      '风起地',
      '果酒湖岸边',
      '天使的馈赠',
      '猎鹿人餐馆',
      '西风大教堂',
      '低语森林深处',
      '清泉镇温泉',
      '教堂地下室',
      '西风图书馆禁书区',
      '摘星崖顶峰',
      '血肉洞穴',
      '水镜之间',
      '愚人众的据点',
      '丘丘人的部落',
      '审讯室',
    ]),
    私密等级: z.coerce
      .number()
      .transform(v => _.clamp(Math.round(v), 1, 5)),
    当前道具: z.string().nullable().prefault(null),
    剧情阶段: z.enum(['初遇期', '试探期', '调教期', '沉溺期', '奴役期']),
    时间: z.enum(['黎明', '午后', '傍晚', '子夜']),
  }),
});
export type Schema = z.output<typeof Schema>;
