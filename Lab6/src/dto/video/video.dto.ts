export interface VideoDto {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  preview_url: string;
  file_url: string;
  duration: number;
  published_at: Date;
}
