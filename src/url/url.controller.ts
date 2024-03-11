import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiBody({type: CreateUrlDto})
  async create (@Body() createUrlDto: CreateUrlDto) {
    const createdUrl = await this.urlService.create(createUrlDto);
    return createdUrl;
  }

  @Get()
  async all() {
    return this.urlService.findAll();
  }

  @Get(':shortUrl')
  @Redirect()
  async redirect(@Param('shortUrl') shortUrl: string) {
    const originalUrl = await this.urlService.redirect(shortUrl);
    return { url: originalUrl };
  }
}
