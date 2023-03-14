import { ILesson } from "./lesson"
import { IMeta } from "./meta"

export interface ICourse {
  id: string,
  title: string,
  tags: string[],
  launchDate: Date,
  status: string,
  description: string,
  duration: number,
  lessonsCount: number,
  previewImageLink: string,
  rating: number,
  meta: IMeta,
  lessons: ILesson[]
}