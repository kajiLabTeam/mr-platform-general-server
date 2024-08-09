import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const baseurls = {
  relay: process.env.RELAY_SERVER_URL_LOCAL,
  twin: process.env.DIGITAL_TWIN_SERVER_URL_LOCAL,
  recommend: process.env.RECOMMEND_CONTENTS_SERVER_URL_LOCAL,
  contents: process.env.CONTENTS_SERVER_URL_LOCAL,
  user: process.env.USER_SERVER_URL_LOCAL,
  organization: process.env.ORGANIZATION_SERVER_URL_LOCAL,
  city: process.env.CITY_BUILDING_SERVER_URL_LOCAL,
};

export class Content {
  layerId: string;
  userId: string;
  contentId: string;
  tryCount: number;
  constructor() {
    this.layerId = randomUUID();
    this.userId = randomUUID();
    this.contentId = randomUUID();
    this.tryCount = Math.floor(Math.random() * 10);
    this.print();
  }

  print() {
    console.log(this.layerId);
    console.log(this.userId);
    console.log(this.tryCount);
  }

  getLayerId() {
    return this.layerId;
  }

  getUserId() {
    return this.userId;
  }

  getContentId() {
    return this.contentId;
  }

  setContentId(contentId: string) {
    this.contentId = contentId;
  }

  getContentWithLayerId() {
    this.tryCount++;
    return {
      layerId: this.layerId,
      contentType: 'html2d',
      content: {
        location: {
          lat: this.tryCount,
          lon: 0,
          height: 0,
        },
        rotation: {
          roll: 0,
          pitch: 0,
          yaw: 0,
        },
        size: {
          width: '300px',
          height: '600px',
        },
        textType: 'markdown',
        textUrl: 'https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md',
        styleUrl: 'https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css',
      },
    };
  }

  getContentWithContentId() {
    this.tryCount++;
    return {
      contentId: this.contentId,
      contentType: 'html2d',
      content: {
        location: {
          lat: this.tryCount,
          lon: 0,
          height: 0,
        },
        rotation: {
          roll: 0,
          pitch: 0,
          yaw: 0,
        },
        size: {
          width: '300px',
          height: '600px',
        },
        textType: 'markdown',
        textUrl: 'https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md',
        styleUrl: 'https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css',
      },
    };
  }
}
