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
          year: string;
          one_thing: string | null;
          photo_url: string | null;
          video_clip_url: string | null;
          other_info: string | null;
          involvements: string | null;
          instagram_handle: string | null;
          linkedin_url: string | null;
          created_at: string;
          approved: boolean;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          college: string;
          subject: string;
          year: string;
          one_thing?: string | null;
          photo_url?: string | null;
          video_clip_url?: string | null;
          other_info?: string | null;
          involvements?: string | null;
          instagram_handle?: string | null;
          linkedin_url?: string | null;
          created_at?: string;
          approved?: boolean;
          user_id?: string | null;
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
