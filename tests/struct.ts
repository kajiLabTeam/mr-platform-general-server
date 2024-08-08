import { randomUUID } from 'crypto';

export const baseurls = {
  relay: 'http://localhost:8084',
  twin: 'http://localhost:8087',
  recommend: 'http://localhost:8086',
  contents: 'http://localhost:8089',
  user: 'http://localhost:8088',
  organization: 'http://localhost:8090',
  city: 'http://localhost:8091',
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
          x: this.tryCount,
          y: 0,
          z: 0,
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
          x: this.tryCount,
          y: 0,
          z: 0,
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
