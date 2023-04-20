export interface FolderInterface {
  id: string;
  name: string;
  type: FolderType;
  userId: string;
}

export type FolderType = 'chat' | 'prompt';
