import {test, expect} from '@playwright/test';

import {FUDGE} from '../../util/constants';
import {getEntries} from '../../util/entries';

const PAGELOAD_DELAY = 200;
const IFRAME_DELAY = 500;

test.describe('TTVC', () => {
  test('a static document with an iframe', async ({page}) => {
    test.fail(); // TODO: iframe content is not accounted for
    await page.goto(`/test/iframe1?delay=${PAGELOAD_DELAY}`, {
      waitUntil: 'networkidle',
    });

    const entries = await getEntries(page);

    expect(entries.length).toBe(1);
    expect(entries[0].duration).toBeGreaterThanOrEqual(PAGELOAD_DELAY + IFRAME_DELAY);
    expect(entries[0].duration).toBeLessThanOrEqual(PAGELOAD_DELAY + IFRAME_DELAY + FUDGE);
  });
});
