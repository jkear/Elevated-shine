import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import {Theme} from '@astryxdesign/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';
import './index.css';

// Two designs share the same content, theme and quote form.
// Option 2 is the live design; option 1 is kept and reachable with ?design=1.
const DESIGNS = {
  '1': lazy(() => import('./designs/Option1')),
  '2': lazy(() => import('./designs/Option2')),
};
const requested = new URLSearchParams(window.location.search).get('design');
const Design = DESIGNS[requested === '1' ? '1' : '2'];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={themes[defaultThemeSlug]} mode="light">
      <Suspense fallback={null}>
        <Design />
      </Suspense>
    </Theme>
  </StrictMode>,
);
