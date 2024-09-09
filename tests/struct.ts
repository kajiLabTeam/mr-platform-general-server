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

  lat = 35.174176;
  lon = 136.9166945;

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

  getLatString() {
    return this.lat.toString();
  }

  getLonString() {
    return this.lon.toString();
  }

  getContentWithLayerId() {
    this.tryCount++;
    return {
      layerId: this.layerId,
      contentType: 'html2d',
      location: {
        lat: this.lat,
        lon: this.lon,
        height: 0,
        scale: 'small',
      },
      content: {
        size: {
          width: `${300 + this.tryCount}px`,
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
      location: {
        lat: 35.4132159,
        lon: 136.7588979,
        height: 0,
        scale: 'small',
      },
      content: {
        size: {
          width: `${300 + this.tryCount}px`,
          height: '600px',
        },
        textType: 'markdown',
        textUrl: 'https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md',
        styleUrl: 'https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css',
      },
    };
  }

  getContentWithContentIdReset() {
    this.tryCount++;
    return {
      contentId: this.contentId,
      contentType: 'html2d',
      location: {
        lat: this.lat,
        lon: this.lon,
        height: 0,
        scale: 'small',
      },
      content: {
        size: {
          width: `${300 + this.tryCount}px`,
          height: '600px',
        },
        textType: 'markdown',
        textUrl: 'https://raw.githubusercontent.com/kajiLabTeam/mr-platform-general-server/main/README.md',
        styleUrl: 'https://raw.githubusercontent.com/sindresorhus/github-markdown-css/main/github-markdown.css',
      },
    };
  }
}
