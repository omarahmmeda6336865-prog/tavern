/**
 * 变量冻结脚本
 * 监听 MVU 变量更新结束事件，将 _初始设定 下的所有变量强制覆盖回旧值，
 * 确保 AI 无法修改初始设定变量。
 */
$(() => {
  waitGlobalInitialized('Mvu').then(() => {
    eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (new_variables, old_variables) => {
      const old_init = _.get(old_variables, 'stat_data._初始设定');
      if (old_init) {
        _.set(new_variables, 'stat_data._初始设定', old_init);
      }
    });
  });
});
