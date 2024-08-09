import { test, expect } from '@playwright/test';
import { baseurls, Content } from './struct';
import type { ResponseCreateContent } from './type';

test('health', async ({ request }) => {
  console.log(baseurls);
  // 中継サーバー
  const relayHealthResponse = await request.fetch(`${baseurls.relay}/hello`, {
    method: 'get',
  });
  console.log(await relayHealthResponse.text());
  expect(relayHealthResponse.status()).toBe(200);

  const userHealthResponse = await request.fetch(`${baseurls.user}/hello`, {
    method: 'get',
  });
  console.log(await userHealthResponse.text());
  expect(userHealthResponse.status()).toBe(200);

  const twinResponse = await request.fetch(`${baseurls.twin}/hello`, {
    method: 'get',
  });
  console.log(await twinResponse.text());
  expect(twinResponse.status()).toBe(200);

  const recommendResponse = await request.fetch(`${baseurls.recommend}/hello`, {
    method: 'get',
  });
  console.log(await recommendResponse.text());
  expect(recommendResponse.status()).toBe(200);

  const contentsResponse = await request.fetch(`${baseurls.contents}/hello`, {
    method: 'get',
  });
  console.log(await contentsResponse.text());
  expect(contentsResponse.status()).toBe(200);

  const organizationResponse = await request.fetch(`${baseurls.organization}/hello`, {
    method: 'get',
  });
  console.log(await organizationResponse.text());
  expect(organizationResponse.status()).toBe(200);

  const cityResponse = await request.fetch(`${baseurls.city}/hello`, {
    method: 'get',
  });
  console.log(await cityResponse.text());
  expect(cityResponse.status()).toBe(200);

  const content = new Content();

  // レイヤーの作成、コンテンツの追加、コンテンツの取得、コンテンツの更新
  const layerResponse = await request.fetch(`${baseurls.contents}/api/layer/create`, {
    method: 'post',
    data: {
      layerId: content.getLayerId(),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await layerResponse.text());
  expect(layerResponse.status()).toBe(201);

  const contentResponse = await request.fetch(`${baseurls.contents}/api/content/create`, {
    method: 'post',
    data: content.getContentWithLayerId(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await contentResponse.text());
  expect(contentResponse.status()).toBe(201);
  const contentResponseJson = (await contentResponse.json()) as ResponseCreateContent;
  content.setContentId(contentResponseJson.contentId);

  const getContentResponse = await request.fetch(`${baseurls.contents}/api/contents`, {
    method: 'get',
    data: {
      contentIds: [content.contentId],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await getContentResponse.text());
  expect(getContentResponse.status()).toBe(200);

  const updateContentResponse = await request.fetch(`${baseurls.contents}/api/content/update`, {
    method: 'put',
    data: content.getContentWithContentId(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await updateContentResponse.text());
  expect(updateContentResponse.status()).toBe(201);

  // ユーザーの作成、ユーザーコンテンツの登録、ユーザーコンテンツの取得
  const userResponse = await request.fetch(`${baseurls.user}/api/user/create`, {
    method: 'post',
    data: {
      userId: content.getUserId(),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await userResponse.text());
  expect(userResponse.status()).toBe(201);

  const setContentResponse = await request.fetch(`${baseurls.user}/api/content/set`, {
    method: 'post',
    data: {
      userId: content.getUserId(),
      contentIds: [content.getContentId()],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await setContentResponse.text());
  expect(setContentResponse.status()).toBe(201);

  const contentIdsResponse = await request.fetch(`${baseurls.user}/api/content/ids`, {
    method: 'get',
    data: {
      userId: content.getUserId(),
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(await contentIdsResponse.text());
  expect(contentIdsResponse.status()).toBe(200);
});
