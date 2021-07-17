import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PasteService } from './paste.service';
import { CreatePasteDto } from './dto/create-paste.dto';
import { ApikeyGuard } from 'src/apikey.guard';

@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Post()
  create(@Body() createPasteDto: CreatePasteDto) {
    return this.pasteService.create(createPasteDto);
  }

  @Get()
  @UseGuards(ApikeyGuard)
  findAll() {
    return this.pasteService.findAll();
  }

  @Get(':name')
  findOne(@Param('name', ParseUUIDPipe) name: string) {
    return this.pasteService.findOne(name);
  }
}
