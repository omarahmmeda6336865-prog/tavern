export const Schema = z.object({
  // ===== 初始设定（AI不可更新，以下划线前缀标记为只读）=====
  _初始设定: z.object({
    权力关系: z
      .enum(['User主导', '刻晴主导', '无主导'])
      .prefault('无主导'),
    刻晴真实身份: z
      .enum([
        '无特殊身份',
        '愚人众·雷萤术士',
        '盗宝团·药剂师',
        '愚人众·藏镜仕女',
        '镀金旅团·沙中净水',
        '愚人众·风役人',
        '霜夜之继灵者',
        '璃月青楼花魁',
        '愚人众秘密娼妓',
        '被俘的七星间谍',
      ])
      .prefault('无特殊身份'),
    User和刻晴关系: z
      .enum(['陌生人', '相识', '亲密', '至交'])
      .prefault('相识'),
    刻晴淫乱程度: z
      .enum(['贞洁', '羞怯', '放荡', '沉沦'])
      .prefault('贞洁'),
  }).prefault({}),

  // ===== 全局状态 =====
  全局: z.object({
    快感值: z.coerce.number()
      .transform(value => _.clamp(value, 0, 100))
      .prefault(0),
    高潮次数: z.coerce.number()
      .transform(value => Math.max(0, value))
      .prefault(0),
    当前体位: z.string()
      .prefault('未开始'),
    场景: z.string()
      .prefault('待定'),
  }).prefault({}),

  // ===== 刻晴身体状态 =====
  刻晴身体: z.object({
    胸部: z.object({
      敏感度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(50),
      开发度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      状态: z.string()
        .prefault('未被触碰'),
    }).prefault({}),
    阴部: z.object({
      敏感度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(50),
      开发度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      状态: z.string()
        .prefault('未被触碰'),
    }).prefault({}),
    后庭: z.object({
      敏感度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(50),
      开发度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      状态: z.string()
        .prefault('未被触碰'),
    }).prefault({}),
    口部: z.object({
      敏感度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(50),
      开发度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      状态: z.string()
        .prefault('未被触碰'),
    }).prefault({}),
  }).prefault({}),

  // ===== 刻晴外貌 =====
  外貌: z.object({
    体态: z.string()
      .prefault('待定'),
    上身: z.string()
      .prefault('待定'),
    下身: z.string()
      .prefault('待定'),
    内衣: z.string()
      .prefault('待定'),
    配饰: z.object({
      装饰: z.string()
        .prefault('无'),
      手部: z.string()
        .prefault('无'),
      裤袜与鞋履: z.string()
        .prefault('无'),
    }).prefault({}),
    面部: z.string()
      .prefault('待定'),
  }).prefault({}),

  // ===== User状态 =====
  User: z.object({
    阴茎: z.object({
      勃起程度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(0),
      敏感度: z.coerce.number()
        .transform(value => _.clamp(value, 0, 100))
        .prefault(50),
      状态: z.string()
        .prefault('未被触碰'),
    }).prefault({}),
    射精次数: z.coerce.number()
      .transform(value => Math.max(0, value))
      .prefault(0),
  }).prefault({}),
}).prefault({});
export type Schema = z.output<typeof Schema>;
