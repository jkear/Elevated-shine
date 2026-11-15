// The upshine theme. `astryx experimental theme editor` wrote this file once and never changes it again.
// The checked settings live in upshine.settings.json and the generated upshine.settings.ts;
// change them with `astryx experimental theme editor set upshine ...`. Add your own changes below: they win over the settings.
import {defineTheme} from '@astryxdesign/core/theme';
import {upshineSettings} from './upshine.settings';

export const upshineTheme = defineTheme({
  extends: upshineSettings,
  name: 'upshine',
});
