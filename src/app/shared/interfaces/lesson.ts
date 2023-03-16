export interface ILesson {
  id: string,
  title: string,
  duration: number,
  order: number,
  type: 'video',
  status: 'unlocked' | 'locked',
  link: string,
  previewImageLink: string,
  meta: null
}