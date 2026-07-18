/**
 * Stage变量随机推进脚本
 * 当 性爱激活 === true 时，每轮随机推进 性爱阶段：
 *   - 30%概率 +1（达到7时触发收尾）
 *   - 50%概率 不变
 *   - 20%概率 -1（Stage=0时等同于不变）
 *
 * 性爱阶段表示激烈程度：0=调情/前戏初期, 1~2=轻度, 3~4=中度, 5~6=激烈, 7=高潮/收尾
 */
$(() => {
  waitGlobalInitialized('Mvu').then(() => {
    eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (new_variables) => {
      const burst = _.get(new_variables, 'stat_data.性爱激活');
      if (!burst) return;

      const stage = _.get(new_variables, 'stat_data.性爱阶段') ?? 0;

      // Stage已达到7 → 高潮收尾，关闭激活并终止本轮
      if (stage >= 7) {
        _.set(new_variables, 'stat_data.性爱激活', false);
        return;
      }

      const roll = Math.random();

      let change = 0;
      if (roll < 0.30) {
        // 30% +1
        change = 1;
      } else if (roll < 0.50 && stage > 0) {
        // 20% -1（仅当stage>0，否则并入50%不变）
        change = -1;
      }
      // else: 50% 不变（roll >= 0.50 或 stage=0时-1被跳过）

      if (change !== 0) {
        const new_stage = stage + change;
        _.set(new_variables, 'stat_data.性爱阶段', new_stage);

        // Stage达到7 → 高潮收尾，关闭激活
        if (new_stage >= 7) {
          _.set(new_variables, 'stat_data.性爱激活', false);
        }
      }
    });
  });
});
