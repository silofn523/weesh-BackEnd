/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './entities/event.entity'
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path'
// import * as multer from 'multer'
// import { EVENT_IMG_PATH } from './path.const'
// import { v4 as uuid } from 'uuid'
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3'

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    MulterModule.register({
      fileFilter: (_req, file, cb) => {
        extname(file.originalname)

        return cb(null, true)
      },

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
          cb(null, `image/main/${Date.now().toString()}-${file.originalname}`);
        }
      })
    })
  ],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
