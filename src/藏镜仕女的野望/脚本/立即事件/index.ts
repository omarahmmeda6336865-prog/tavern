import { waitUntil } from 'async-wait-until';

$(async () => {
  await waitGlobalInitialized('Mvu');

  // 身体状态的轮数自动衰减：每次AI回复后，所有身体状态轮数 -1
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (new_variables) => {
    const targets = _.get(new_variables, 'stat_data.目标角色');
    if (!targets) return;

    _.forEach(targets, (data: Record<string, any>) => {
      if (!data.身体状态 || _.isEmpty(data.身体状态)) return;

      const updated: Record<number, string> = {};
      _.forEach(data.身体状态, (desc: string, rounds: string) => {
        const r = Number(rounds) - 1;
        if (r > 0) {
          updated[r] = desc;
        }
        // 轮数归零则从记录中移除
      });
      data.身体状态 = updated;
    });
  });

  // 注入立即事件标记
  injectPrompts([
    {
      id: '堕落突破第一层',
      position: 'none',
      depth: 0,
      role: 'system',
      content: '【【第一层镜面，已碎】】',
      filter: () => {
        const targets = _.get(getAllVariables(), 'stat_data.目标角色');
        if (!targets) return false;
        return _.some(targets, (t: any) => t.堕落值 >= 10);
      },
      should_scan: true,
    },
    {
      id: '堕落突破第二层',
      position: 'none',
      depth: 0,
      role: 'system',
      content: '【【第二层镜面，已碎】】',
      filter: () => {
        const targets = _.get(getAllVariables(), 'stat_data.目标角色');
        if (!targets) return false;
        return _.some(targets, (t: any) => t.堕落值 >= 30);
      },
      should_scan: true,
    },
    {
      id: '堕落突破第三层',
      position: 'none',
      depth: 0,
      role: 'system',
      content: '【【第三层镜面，已碎】】',
      filter: () => {
        const targets = _.get(getAllVariables(), 'stat_data.目标角色');
        if (!targets) return false;
        return _.some(targets, (t: any) => t.堕落值 >= 50);
      },
      should_scan: true,
    },
    {
      id: '堕落突破第四层',
      position: 'none',
      depth: 0,
      role: 'system',
      content: '【【第四层镜面，已碎】】',
      filter: () => {
        const targets = _.get(getAllVariables(), 'stat_data.目标角色');
        if (!targets) return false;
        return _.some(targets, (t: any) => t.堕落值 >= 70);
      },
      should_scan: true,
    },
    {
      id: '堕落突破第五层',
      position: 'none',
      depth: 0,
      role: 'system',
      content: '【【第五层镜面，已碎——镜中人已不再是镜中人】】',
      filter: () => {
        const targets = _.get(getAllVariables(), 'stat_data.目标角色');
        if (!targets) return false;
        return _.some(targets, (t: any) => t.堕落值 >= 90);
      },
      should_scan: true,
    },
  ]);
});
