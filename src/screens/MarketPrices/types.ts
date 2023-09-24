export enum Quality {
  Normal = '1',
  Good = '2',
  Outstanding = '3',
  Excelent = '4',
  Masterpiece = '5',
}

export type QualityName = keyof typeof Quality;
