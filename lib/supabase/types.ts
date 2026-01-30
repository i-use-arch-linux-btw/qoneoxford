export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          slug: string;
          name: string;
          college: string;
          subject: string;
          one_thing: string;
          photo_url: string;
          video_clip_url: string | null;
          other_info: string | null;
          involvements: string | null;
          created_at: string;
          approved: boolean;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          college: string;
          subject: string;
          one_thing: string;
          photo_url: string;
          video_clip_url?: string | null;
          other_info?: string | null;
          involvements?: string | null;
          created_at?: string;
          approved?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      colleges: {
        Row: {
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["colleges"]["Insert"]>;
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type College = Database["public"]["Tables"]["colleges"]["Row"];
