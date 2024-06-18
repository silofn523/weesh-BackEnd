/* eslint-disable prettier/prettier */
import { Injectable, Req, Res } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from './entities/event.entity'
import { Repository } from 'typeorm'
import * as AWS from 'aws-sdk'
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3'
import * as multer from 'multer';

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY
})
// 사진 업로드
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly event: Repository<Event>
  ) {}

  async fileupload(@Req() req, @Res() res) {
    this.upload(req, res, async function (error) {
      if (error) {
        console.log(error)
        return res.status(404).json(`이미지 업로드에 실패했습니다: ${error}`)
      }

      res.status(201).json(req.files[0].location)
    })
  }

  upload = multer({
    storage: multerS3({
      s3: new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
          secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
        },
        region: 'ap-northeast-2'
      }),
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (_request, file, cb) {
        cb(null, `image/main/${Date.now().toString()}-${file.originalname}`)
      }
    })
  }).array('upload', 1)

  public async uploadImg(image: string): Promise<void> {
    await this.event.insert({ image })
  }

  public findAll(): Promise<Event[]> {
    return this.event.find()
  }

  public async findOne(id: number): Promise<Event> {
    return await this.event.findOneBy({ id })
  }

  public async removeImg(id: number): Promise<void> {
    await this.event.delete({ id })
  }
}
