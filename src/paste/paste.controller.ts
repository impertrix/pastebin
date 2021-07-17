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
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('paste')
export class PasteController {
  constructor(private readonly pasteService: PasteService) {}

  @Post()
  @ApiBody({ type: [CreatePasteDto] })
  create(@Body() createPasteDto: CreatePasteDto) {
    return this.pasteService.create(createPasteDto);
  }

  @Get()
  @UseGuards(ApikeyGuard)
  @ApiBearerAuth()
  findAll() {
    return this.pasteService.findAll();
  }

  @Get(':name')
  findOne(@Param('name', ParseUUIDPipe) name: string) {
    return this.pasteService.findOne(name);
  }
}
