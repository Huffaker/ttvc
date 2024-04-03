import {test, expect} from '@playwright/test';

import {FUDGE} from '../../util/constants';
import {getEntriesAndErrors} from '../../util/entries';

const PAGELOAD_DELAY = 200;
const AJAX_DELAY = 500;
const CPU_DELAY = 200;
const SCRIPT_DELAY = 500;

test.describe('TTVC', () => {
  test('script load > ajax request > CPU work > script load > mutation + background lazyloaded script', async ({
    page,
  }) => {
    await page.goto(`/test/composition2?delay=${PAGELOAD_DELAY}`, {
      waitUntil: 'networkidle',
    });

    const {entries} = await getEntriesAndErrors(page);
    expect(entries.length).toBe(1);

    const expectedTtvc = PAGELOAD_DELAY + SCRIPT_DELAY + AJAX_DELAY + CPU_DELAY + SCRIPT_DELAY;
    expect(entries[0].duration).toBeGreaterThanOrEqual(expectedTtvc);
    expect(entries[0].duration).toBeLessThanOrEqual(expectedTtvc + FUDGE);
  });
});
