/* eslint-disable playwright/expect-expect */
import { expect, test } from '@playwright/test';

import { ProjectPage } from '../../pages/ProjectPage';
import { TestFixtures } from '../TestFixtures';

const projectName = TestFixtures.addGuid('autotest_settingsmenu');

test.beforeAll(async ({ browser }) => {
  await TestFixtures.createEmptyProject(browser, projectName);
});

test.beforeEach(async ({ page }) => {
  await TestFixtures.openProject(page, projectName);
});

test.afterAll(async ({ browser }) => {
  await TestFixtures.deleteProject(browser, projectName);
});

test.describe('clear sheet history', () => {
  test('clear sheet history', async ({ page }) => {});
});
