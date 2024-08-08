import { test, expect } from '@playwright/test';
import { baseurls, Content } from './struct';
import type { ResponseCreateContent } from './type';

test('health', async ({ request }) => {
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
  const contentResponseJson: ResponseCreateContent = await contentResponse.json();
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

// {
//   "info": {
//     "_postman_id": "55b2b78e-8ef9-44ab-a1f9-e052d9589412",
//     "name": "MRPlatform",
//     "description": "relay-server-golang\n\ndigital-twin-golang\n\nrecommend-contents-golang\n\ncontents-golang\n\nuser-manegement-golang\n\norganization-management-golang\n\ncity-building-management-golang",
//     "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
//     "_exporter_id": "35356750"
//   },
//   "item": [
//     {
//       "name": "中継サーバー",
//       "item": [
//         {
//           "name": "表示コンテンツの取得",
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "formdata",
//               "formdata": [
//                 {
//                   "key": "rawData",
//                   "type": "file",
//                   "src": []
//                 },
//                 {
//                   "key": "lat",
//                   "value": "35.1705901",
//                   "type": "text"
//                 },
//                 {
//                   "key": "lon",
//                   "value": "136.8798116",
//                   "type": "text"
//                 }
//               ]
//             },
//             "url": {
//               "raw": "{{relay-server-golang}}/api/contents",
//               "host": [
//                 "{{relay-server-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "contents"
//               ]
//             },
//             "description": "``` json\n{\n    \"absoluteAddress\": {\n        \"x\": 15237635.6572,\n        \"y\": 4186802.62523,\n        \"z\": 13.234\n    },\n    \"ViewObjects\": [\n        {\n            \"contentId\": \"22b86d69-9340-4abf-a143-3976877035bf\",\n            \"contentType\": \"html2d\",\n            \"content\": {\n                \"location\": {\n                    \"x\": 0,\n                    \"y\": 0,\n                    \"z\": 0\n                },\n                \"rotation\": {\n                    \"row\": 0,\n                    \"pitch\": 0,\n                    \"yaw\": 0\n                },\n                \"size\": {\n                    \"width\": \"300px\",\n                    \"height\": \"600px\"\n                }\n                \"textType\": \"markdown\",\n                \"textUrl\": \"https://text-server.dev/README.md\",\n                \"styleUrl\": \"https://style-server.dev/api/css\"\n            }\n        }\n    ]\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{relay-server-golang}}/hello",
//               "host": [
//                 "{{relay-server-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "relay-server-golang\n\n{{relay-server-golang}}"
//     },
//     {
//       "name": "デジタルツインサーバー",
//       "item": [
//         {
//           "name": "表示コンテンツの取得",
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{digital-twin-golang}}/api/contents",
//               "host": [
//                 "{{digital-twin-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "contents"
//               ]
//             },
//             "description": "``` json\n[\n    {\n        \"contentId\": \"22b86d69-9340-4abf-a143-3976877035bf\",\n        \"contentType\": \"html2d\",\n        \"content\": {\n            \"location\": {\n                \"x\": 0,\n                \"y\": 0,\n                \"z\": 0\n            },\n            \"rotation\": {\n                \"row\": 0,\n                \"pitch\": 0,\n                \"yaw\": 0\n            },\n            \"size\": {\n                \"width\": \"300px\",\n                \"height\": \"600px\"\n            }\n            \"textType\": \"markdown\",\n            \"textUrl\": \"https://text-server.dev/README.md\",\n            \"styleUrl\": \"https://style-server.dev/api/css\"\n        }\n    }\n]\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{digital-twin-golang}}/hello",
//               "host": [
//                 "{{digital-twin-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "digital-twin-golang\n\n{{digital-twin-golang}}"
//     },
//     {
//       "name": "コンテンツ選定サーバー",
//       "item": [
//         {
//           "name": "コンテンツの選定",
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\",\n    \"locaition\": {\n        \"x\": 15237635.6572,\n        \"y\": 4186802.62523,\n        \"z\": 13.234\n    },\n    \"h3\": [\"hash\"]\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{recommend-contents-golang}}/api/content/recomend",
//               "host": [
//                 "{{recommend-contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "content",
//                 "recomend"
//               ]
//             },
//             "description": "#### **201 Created**"
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{recommend-contents-golang}}/hello",
//               "host": [
//                 "{{recommend-contents-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "recommend-contents-golang\n\n{{recommend-contents-golang}}"
//     },
//     {
//       "name": "コンテンツサーバー",
//       "item": [
//         {
//           "name": "コンテンツ内容の取得",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   ""
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"contentIds\": [\n        \"{{contentId}}\"\n    ]\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{contents-golang}}/api/contents",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "contents"
//               ]
//             },
//             "description": "``` json\n[\n    {\n        \"contentId\": \"22b86d69-9340-4abf-a143-3976877035bf\",\n        \"contentType\": \"html2d\",\n        \"content\": {\n            \"location\": {\n                \"x\": 0,\n                \"y\": 0,\n                \"z\": 0\n            },\n            \"rotation\": {\n                \"row\": 0,\n                \"pitch\": 0,\n                \"yaw\": 0\n            },\n            \"size\": {\n                \"width\": \"300px\",\n                \"height\": \"600px\"\n            }\n            \"textType\": \"markdown\",\n            \"textUrl\": \"https://text-server.dev/README.md\",\n            \"styleUrl\": \"https://style-server.dev/api/css\"\n        }\n    }\n]\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "コンテンツの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "pm.collectionVariables.set(\"contentId\", res.contentId)",
//                   "console.log(res)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             },
//             {
//               "listen": "prerequest",
//               "script": {
//                 "exec": [
//                   "const count = pm.collectionVariables.get(\"tryCount\") + 1",
//                   "pm.collectionVariables.set(\"tryCount\", count)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"layerId\": \"{{layerId}}\",\n    \"contentType\": \"html2d\",\n    \"content\": {\n        \"location\": {\n            \"x\": {{tryCount}},\n            \"y\": 0,\n            \"z\": 0\n        },\n        \"rotation\": {\n            \"roll\": 0,\n            \"pitch\": 0,\n            \"yaw\": 0\n        },\n        \"size\": {\n            \"width\": \"300px\",\n            \"height\": \"600px\"\n        },\n        \"textType\": \"markdown\",\n        \"textUrl\": \"https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md\",\n        \"styleUrl\": \"https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css\"\n    }\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{contents-golang}}/api/content/create",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "content",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"contentId\":　\"22b86d69-9340-4abf-a143-3976877035bf\",\n    \"contentType\": \"html2d\",\n    \"content\": {\n        \"location\": {\n            \"x\": 0,\n            \"y\": 0,\n            \"z\": 0\n        },\n        \"rotation\": {\n            \"roll\": 0,\n            \"pitch\": 0,\n            \"yaw\": 0\n        },\n        \"size\": {\n            \"width\": \"300px\",\n            \"height\": \"600px\"\n        },\n        \"textType\": \"markdown\",\n        \"textUrl\": \"https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md\",\n        \"styleUrl\": \"https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css\"\n    }\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "コンテンツの更新",
//           "event": [
//             {
//               "listen": "prerequest",
//               "script": {
//                 "exec": [
//                   ""
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             },
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "console.log(res)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "PUT",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"contentId\" : \"{{contentId}}\",\n    \"contentType\": \"html2d\",\n    \"content\": {\n        \"location\": {\n            \"x\": 0,\n            \"y\": 0,\n            \"z\": 0\n        },\n        \"rotation\": {\n            \"roll\": 1000,\n            \"pitch\": 0,\n            \"yaw\": 1000\n        },\n        \"size\": {\n            \"width\": \"300px\",\n            \"height\": \"600px\"\n        },\n        \"textType\": \"markdown\",\n        \"textUrl\": \"https://text-server.dev/README.md\",\n        \"styleUrl\": \"https://style-server.dev/api/css\"\n    }\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{contents-golang}}/api/content/update",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "content",
//                 "update"
//               ]
//             },
//             "description": "#### **201 Created**"
//           },
//           "response": []
//         },
//         {
//           "name": "レイヤーの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "console.log(res)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"layerId\": \"{{layerId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{contents-golang}}/api/layer/create",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "layer",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"publicSpaceId\": \"1ddf2490-b081-40c5-b2ec-a5a4751020fb\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "レイヤーに属するコンテンツIDの取得",
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"layerId\": \"{{layerId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{contents-golang}}/api/layer/content/ids",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "layer",
//                 "content",
//                 "ids"
//               ]
//             },
//             "description": "``` json\n{\n    \"contentIds\": [\"22b86d69-9340-4abf-a143-3976877035bf\"]\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{contents-golang}}/hello",
//               "host": [
//                 "{{contents-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "contents-golang\n\n{{contents-golang}}"
//     },
//     {
//       "name": "ユーザー管理サーバー",
//       "item": [
//         {
//           "name": "ユーザーの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "console.log(res.userId)",
//                   "pm.collectionVariables.set(\"userId\", res.userId)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             },
//             {
//               "listen": "prerequest",
//               "script": {
//                 "exec": [
//                   ""
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{user-manegement-golang}}/api/user/create",
//               "host": [
//                 "{{user-manegement-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "user",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"userId\": \"47e2be2b-abfa-025d-273b-e675810d6722\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "表示するコンテンツIDの取得",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "pm.collectionVariables.set(\"contentId\", res.contentId)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{user-manegement-golang}}/api/content/ids",
//               "host": [
//                 "{{user-manegement-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "content",
//                 "ids"
//               ]
//             },
//             "description": "``` json\n{\n    \"contentIds\": [\n        \"22b86d69-9340-4abf-a143-3976877035bf\"\n    ]\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "表示するコンテンツIDの登録",
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\",\n    \"contentIds\": [\n        \"{{contentId}}\"\n    ]\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{user-manegement-golang}}/api/content/set",
//               "host": [
//                 "{{user-manegement-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "content",
//                 "set"
//               ]
//             },
//             "description": "``` json\n{\n    \"message\": \"success!\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "CSSのIDの取得",
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"userId\": \"{{userId}}\"\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{user-manegement-golang}}/api/css/id",
//               "host": [
//                 "{{user-manegement-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "css",
//                 "id"
//               ]
//             },
//             "description": "```json\n{\n    \"styleId\": \"3CC8BFC2-4BDA-4CAB-AD7A-F03DC93D2AD7\"\n}\n```"
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{user-manegement-golang}}/hello",
//               "host": [
//                 "{{user-manegement-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "user-manegement-golang\n\n{{user-manegement-golang}}"
//     },
//     {
//       "name": "都市建物情報管理サーバー",
//       "item": [
//         {
//           "name": "api/building/tin",
//           "protocolProfileBehavior": {
//             "disableBodyPruning": true
//           },
//           "request": {
//             "method": "GET",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"locaition\": {\n        \"x\": 15237635.6572,\n        \"y\": 4186802.62523,\n        \"z\": 13.234\n    },\n    \"h3\": [\"hash\"]\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{city-building-management-golang}}/api/building/tin",
//               "host": [
//                 "{{city-building-management-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "building",
//                 "tin"
//               ]
//             }
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{city-building-management-golang}}/hello",
//               "host": [
//                 "{{city-building-management-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "city-building-management-golang\n\n{{city-building-management-golang}}"
//     },
//     {
//       "name": "オーガナイゼーション管理サーバー",
//       "item": [
//         {
//           "name": "オーガナイゼーションの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "pm.collectionVariables.set(\"organizationId\", res.organizationId)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "url": {
//               "raw": "{{organization-management-golang}}/api/organization/create",
//               "host": [
//                 "{{organization-management-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "organization",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"organizationId\": \"A18ffca2-c64b-7fef-9791-b4a3fdf06124\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "コンテンツの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "pm.collectionVariables.set(\"contentId\", res.contentId)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"layerId\": \"{{layerId}}\",\n    \"contentType\": \"html2d\",\n    \"content\": {\n        \"location\": {\n            \"x\": 0,\n            \"y\": 0,\n            \"z\": 0\n        },\n        \"rotation\": {\n            \"roll\": 0,\n            \"pitch\": 0,\n            \"yaw\": 0\n        },\n        \"size\": {\n            \"width\": \"300px\",\n            \"height\": \"600px\"\n        },\n        \"textType\": \"markdown\",\n        \"textUrl\": \"https://text-server.dev/README.md\",\n        \"styleUrl\": \"https://style-server.dev/api/css\"\n    }\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{organization-management-golang}}/api/organization/layer/content/create",
//               "host": [
//                 "{{organization-management-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "organization",
//                 "layer",
//                 "content",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"contentId\": \"22b86d69-9340-4abf-a143-3976877035bf\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "レイヤーの作成",
//           "event": [
//             {
//               "listen": "test",
//               "script": {
//                 "exec": [
//                   "const res = pm.response.json()",
//                   "pm.collectionVariables.set(\"layerId\", res.layerId)"
//                 ],
//                 "type": "text/javascript",
//                 "packages": {}
//               }
//             }
//           ],
//           "request": {
//             "method": "POST",
//             "header": [],
//             "url": {
//               "raw": "{{organization-management-golang}}/api/organization/layer/create",
//               "host": [
//                 "{{organization-management-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "organization",
//                 "layer",
//                 "create"
//               ]
//             },
//             "description": "``` json\n{\n    \"layerId\": \"1ddf2490-b081-40c5-b2ec-a5a4751020fb\"\n}\n\n ```"
//           },
//           "response": []
//         },
//         {
//           "name": "コンテンツの更新",
//           "request": {
//             "method": "PUT",
//             "header": [],
//             "body": {
//               "mode": "raw",
//               "raw": "{\n    \"contentId\" : \"{{contentId}}\",\n    \"contentType\": \"html2d\",\n    \"content\": {\n        \"location\": {\n            \"x\": 0,\n            \"y\": 0,\n            \"z\": 0\n        },\n        \"rotation\": {\n            \"roll\": 1000,\n            \"pitch\": 0,\n            \"yaw\": 1000\n        },\n        \"size\": {\n            \"width\": \"300px\",\n            \"height\": \"600px\"\n        },\n        \"textType\": \"markdown\",\n        \"textUrl\": \"https://text-server.dev/README.md\",\n        \"styleUrl\": \"https://style-server.dev/api/css\"\n    }\n}",
//               "options": {
//                 "raw": {
//                   "language": "json"
//                 }
//               }
//             },
//             "url": {
//               "raw": "{{organization-management-golang}}/api/organization/layer/content/update",
//               "host": [
//                 "{{organization-management-golang}}"
//               ],
//               "path": [
//                 "api",
//                 "organization",
//                 "layer",
//                 "content",
//                 "update"
//               ]
//             }
//           },
//           "response": []
//         },
//         {
//           "name": "health",
//           "request": {
//             "method": "GET",
//             "header": [],
//             "url": {
//               "raw": "{{organization-management-golang}}/hello",
//               "host": [
//                 "{{organization-management-golang}}"
//               ],
//               "path": [
//                 "hello"
//               ]
//             },
//             "description": "Hello World!!"
//           },
//           "response": []
//         }
//       ],
//       "description": "organization-management-golang\n\n{{organization-management-golang}}"
//     }
//   ],
//   "event": [
//     {
//       "listen": "prerequest",
//       "script": {
//         "type": "text/javascript",
//         "packages": {},
//         "exec": [
//           ""
//         ]
//       }
//     },
//     {
//       "listen": "test",
//       "script": {
//         "type": "text/javascript",
//         "packages": {},
//         "exec": [
//           ""
//         ]
//       }
//     }
//   ],
//   "variable": [
//     {
//       "key": "relay-server-golang",
//       "value": "http://localhost:8084"
//     },
//     {
//       "key": "digital-twin-golang",
//       "value": "http://localhost:8087"
//     },
//     {
//       "key": "recommend-contents-golang",
//       "value": "http://localhost:8086"
//     },
//     {
//       "key": "contents-golang",
//       "value": "http://localhost:8089"
//     },
//     {
//       "key": "user-manegement-golang",
//       "value": "http://localhost:8088",
//       "type": "string"
//     },
//     {
//       "key": "organization-management-golang",
//       "value": "http://localhost:8090",
//       "type": "string"
//     },
//     {
//       "key": "city-building-management-golang",
//       "value": "http://localhost:8091",
//       "type": "string"
//     },
//     {
//       "key": "layerId",
//       "value": "1ddf2490-b081-40c5-b2ec-a5a4751020fb",
//       "type": "string"
//     },
//     {
//       "key": "userId",
//       "value": "47e2be2b-abfa-025d-273b-e675810d6722",
//       "type": "string"
//     },
//     {
//       "key": "contentId",
//       "value": "22b86d69-9340-4abf-a143-3976877035bf",
//       "type": "string"
//     },
//     {
//       "key": "organizationId",
//       "value": "A18ffca2-c64b-7fef-9791-b4a3fdf06124",
//       "type": "string"
//     },
//     {
//       "key": "tryCount",
//       "value": "1",
//       "type": "string"
//     }
//   ]
// }
