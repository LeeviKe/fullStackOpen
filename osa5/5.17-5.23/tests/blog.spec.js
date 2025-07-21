const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'testUser',
        username: 'testUser',
        password: 'testUser',
      },
    });

    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible();
    await expect(page.getByText('Username:')).toBeVisible();
    await expect(page.getByText('Password:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('testUser');
      await page.getByPlaceholder('Password').fill('testUser');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('testUser logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('wrongUser');
      await page.getByPlaceholder('Password').fill('wrongUser');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Wrong username or password')).toBeVisible();
    });
  });
});

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'testUser',
        username: 'testUser',
        password: 'testUser',
      },
    });
    await page.goto('http://localhost:5173');

    await page.getByPlaceholder('Username').fill('testUser');
    await page.getByPlaceholder('Password').fill('testUser');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('testUser logged in')).toBeVisible();
  });

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'New blog' }).click();

    await page.getByPlaceholder('title').fill('Cool test blog');
    await page.getByPlaceholder('author').fill('Test Author');
    await page.getByPlaceholder('url').fill('test.blogs.com');

    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText('Cool test blog Test Author')).toBeVisible();
  });

  test('a new blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'New blog' }).click();
    await page.getByPlaceholder('title').fill('Cool test blog');
    await page.getByPlaceholder('author').fill('Test Author');
    await page.getByPlaceholder('url').fill('test.blogs.com');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.getByRole('button', { name: 'View' }).first().click();
    await page.getByRole('button', { name: 'Like' }).click();

    await expect(page.getByText('Likes: 1')).toBeVisible();
  });

  test('user can delete the blog they added', async ({ page }) => {
    await page.getByRole('button', { name: 'New blog' }).click();
    await page.getByPlaceholder('title').fill('deletableBlog');
    await page.getByPlaceholder('author').fill('Test Author');
    await page.getByPlaceholder('url').fill('test.blogs.com');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.getByRole('button', { name: 'View' }).first().click();
    await page.getByRole('button', { name: 'Remove' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Remove blog');
      await dialog.accept();
    });

    await expect(page.getByText('deleteBlog Test Author')).not.toBeVisible();
  });

  test('only the blogs creator can see the delete button', async ({
    page,
    request,
  }) => {
    await page.getByRole('button', { name: 'New blog' }).click();
    await page.getByPlaceholder('title').fill('creatorOnlyBlog');
    await page.getByPlaceholder('author').fill('Author');
    await page.getByPlaceholder('url').fill('url.com');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test2User',
        username: 'test2User',
        password: 'test2User',
      },
    });
    await page.goto('http://localhost:5173');

    await page.getByPlaceholder('Username').fill('test2User');
    await page.getByPlaceholder('Password').fill('test2User');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('test2User logged in')).toBeVisible();

    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).not.toBeVisible();
  });

  test('blogs are in the like amount order', async ({ page }) => {
    await page.getByRole('button', { name: 'New blog' }).click();
    await page.getByPlaceholder('title').fill('testBlog');
    await page.getByPlaceholder('author').fill('Test Author');
    await page.getByPlaceholder('url').fill('test.blogs.com');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.getByRole('button', { name: 'New blog' }).click();
    await page.getByPlaceholder('title').fill('testBlog2');
    await page.getByPlaceholder('author').fill('Test Author2');
    await page.getByPlaceholder('url').fill('test.blogs.com2');
    await page.getByRole('button', { name: 'Create' }).click();

    await page.getByRole('button', { name: 'View' }).nth(1).click();
    await page.getByRole('button', { name: 'Like' }).click();

    const blogs = await page.locator('.blog');
    await expect(blogs.nth(0)).toContainText('testBlog2');
  });
});
