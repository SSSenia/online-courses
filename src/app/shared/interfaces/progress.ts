export interface IProgress {
  url: string | null,
  seconds: number
}

export interface IProgressData {
  data: IProgress[]
}