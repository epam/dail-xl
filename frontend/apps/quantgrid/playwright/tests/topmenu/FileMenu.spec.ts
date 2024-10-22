/* eslint-disable playwright/expect-expect */
import { expect, test } from '@playwright/test';

import { DeleteProjectForm } from '../../components/DeleteProjectForm';
import { OpenProjectForm } from '../../components/OpenProjectForm';
import { ProjectCreationForm } from '../../components/ProjectCreationForm';
import { ProjectTree } from '../../components/ProjectTree';
import { SheetCreationForm } from '../../components/SheetCreationForm';
import { FileMenuItems } from '../../enums/FileMenuItems';
import { MenuItems } from '../../enums/MenuItems';
import { ProjectPage } from '../../pages/ProjectPage';
import { ProjectSelection } from '../../pages/ProjectSelection';
import { TestFixtures } from '../TestFixtures';

const projectName = TestFixtures.addGuid('autotest_filemenu');

const additionalProj = TestFixtures.addGuid('autotest_switch');

const deleteProj = TestFixtures.addGuid('autotest_for_delete');

test.beforeAll(async ({ browser }) => {
  await TestFixtures.createEmptyProject(browser, projectName);
  await TestFixtures.createEmptyProject(browser, additionalProj);
  await TestFixtures.createEmptyProject(browser, deleteProj);
});

test.beforeEach(async ({ page }) => {
  await TestFixtures.openProject(page, projectName);
});

test.afterAll(async ({ browser }) => {
  await TestFixtures.deleteProject(browser, projectName);
  await TestFixtures.deleteProject(browser, additionalProj);
});

test.describe('file menu', () => {
  //create project
  test('create new project', async ({ page }) => {
    const projectPage = await ProjectPage.createInstance(page);
    await projectPage.performMenuCommand(
      MenuItems.File,
      FileMenuItems.CreateProject
    );
    const projectCreationForm = new ProjectCreationForm(page);
    const projName = TestFixtures.addGuid('autotest_newTestProject');

    const pagePromise = page.context().waitForEvent('page');
    await projectCreationForm.fillForm(projName);
    const newPage = await pagePromise;
    const secondProjectPage = await ProjectPage.createInstance(newPage);
    await secondProjectPage.titleShouldContainProjectName(projName);
    await TestFixtures.deleteProjectFromPage(secondProjectPage);
    await newPage.close();
  });
  //create project hotkey
  test('create new project by hotkey', async ({ page }) => {
    await ProjectPage.createInstance(page);
    page.keyboard.press('Alt+P');
    const projectCreationForm = new ProjectCreationForm(page);
    const projName = TestFixtures.addGuid('autotest_newTestProjectHotKey');
    const pagePromise = page.context().waitForEvent('page');
    await projectCreationForm.fillForm(projName);
    const newPage = await pagePromise;
    const secondProjectPage = await ProjectPage.createInstance(newPage);
    await secondProjectPage.titleShouldContainProjectName(projName);
    await TestFixtures.deleteProjectFromPage(secondProjectPage);
    await newPage.close();
  });
  //create sheet
  test('create new worksheet', async ({ page }) => {
    const projectPage = await ProjectPage.createInstance(page);
    await projectPage.performMenuCommand(
      MenuItems.File,
      FileMenuItems.CreateWorkSheet
    );
    const createWorkSheetForm = new SheetCreationForm(page);
    const newSheetName = 'newSheet12';
    createWorkSheetForm.fillForm(newSheetName);
    const projectTree = new ProjectTree(page);
    await expect(projectTree.getTreeNode(newSheetName)).toBeVisible();
  });
  //delete project
  test('delete project', async ({ page }) => {
    const projectPage = await ProjectPage.createInstance(page);
    await projectPage.performMenuCommand(
      MenuItems.File,
      FileMenuItems.CloseProject
    );
    await TestFixtures.openProject(page, deleteProj);
    await projectPage.titleShouldContainProjectName(deleteProj);
    await projectPage.performMenuCommand(
      MenuItems.File,
      FileMenuItems.DeleteProject
    );
    const deleteProjectForm = new DeleteProjectForm(page);
    await deleteProjectForm.confirmDelete();
    const startPage = new ProjectSelection(page);
    await expect(startPage.getWelcomeElement()).toBeVisible();
    await startPage.switchToAllProjects();
    await expect(startPage.getProjectInList(deleteProj)).toBeHidden();
  });
  //close project
  test('close project', async ({ page }) => {
    const projectPage = await ProjectPage.createInstance(page);
    await projectPage.performMenuCommand(
      MenuItems.File,
      FileMenuItems.CloseProject
    );
    const startPage = new ProjectSelection(page);
    const folderName = TestFixtures.getFolderName();
    await expect(startPage.getWelcomeElement()).toBeVisible();
    await startPage.openFolders(folderName);
    await expect(startPage.getProjectInList(projectName)).toBeVisible();
  });
});
