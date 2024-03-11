import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create (@Body() createUrlDto: CreateUrlDto) {
    const createdUrl = await this.urlService.create(createUrlDto);
    return createdUrl;
  }

  @Get(':shortUrl')
  @Redirect()
  async redirect(@Param('shortUrl') shortUrl: string) {
    const originalUrl = await this.urlService.findOriginalUrl(shortUrl);
    return { url: originalUrl };
  }
}
