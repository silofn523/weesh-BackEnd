/* eslint-disable prettier/prettier */

import { join } from 'path'

//서버 프로잭트 루트 폴더
export const ROOT_PATH = process.cwd()

// 외부에서 접근가능한 파일들 모아둔 폴더 이름
export const PUBLIC_FOLDER_NAME = 'upload'

//위클 이벤트 사진들이 저장된 폴더 이름
export const EVENT_FOLDER_NAME = 'event'

//실제 공개폴더의 실제 위치
export const PUBLIC_FOLDER_PATH = join(
   ROOT_PATH, 
   PUBLIC_FOLDER_NAME
)

//위클 이미지를 저장할 폴더
export const EVENT_IMG_PATH = join(
   PUBLIC_FOLDER_PATH, 
   EVENT_FOLDER_NAME
)

// upload/event/이미지
export const EVENT_PUBLIC_IMG_PATH = join(
   PUBLIC_FOLDER_NAME, 
   EVENT_FOLDER_NAME
)
