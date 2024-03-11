import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}
  
  async create(dto: CreateUrlDto) {
    const shortUrl = await this.generateUniqueShortUrl();

    const createdUrl = await this.prisma.url.create({
      data: {
        original: dto.original,
        short: shortUrl
      }
    });

    return createdUrl;
  }

  async findOriginalUrl(shortUrl: string) {
    const url = await this.prisma.url.findFirst({
      where: {
        short: shortUrl
      }
    });

    if(!url) {
      throw new Error("URL not found!");
    }

    return url.original;
  }

  // Generates a unique short url
  async generateUniqueShortUrl(): Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const base = characters.length;
    const length = 7;

    let shortUrl = '';
    let isUnique = false;

    while (!isUnique) {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * base);
        shortUrl += characters.charAt(randomIndex);
      }

      const existingUrl = await this.prisma.url.findFirst({
        where: {
          short: shortUrl
        }
      });

      if (!existingUrl) {
        isUnique = true;
      }
    }

    return shortUrl;
  }
}
