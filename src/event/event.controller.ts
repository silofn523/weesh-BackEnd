/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Delete, UploadedFile, UseInterceptors, UseGuards, Res, Req } from '@nestjs/common'
import { EventService } from './event.service'
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Event } from './entities/event.entity'
import { Guard } from 'src/auth/guard/auth.guard'

@ApiTags('이미지 업로드')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'S3 이미지 업로드', description: '위클래스 이미지를 업로드.' })
  @Post('/img')
  async create(@Req() request, @Res() response) {
    try {
      await this.eventService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'DB 이미지 업로드', description: '위클래스 이미지를 업로드.' })
  @UseInterceptors(FileInterceptor('img'))
  @ApiBearerAuth('JWT')
  @UseGuards(Guard)
  @Post()
  public async uploadImg(@UploadedFile() image: Express.Multer.File): Promise<{ success: boolean }> {
    await this.eventService.uploadImg(image.filename)

    return {
      success: true
    }
  }

  @ApiOperation({ summary: '모든 이미지 정보 불러오기', description: '이미지 전체 조회.' })
  @Get()
  public findAll(): Promise<Event[]> {
    return this.eventService.findAll()
  }

  @ApiOperation({ summary: '이미지 정보 하나만 조회', description: '이미지 하나만 조회.' })
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Event> {
    return await this.eventService.findOne(id)
  }

  @ApiOperation({ summary: '이미지 내리기', description: '이미지 제거.' })
  @UseGuards(Guard)
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    await this.eventService.removeImg(id)

    return {
      success: true
    }
  }
}
