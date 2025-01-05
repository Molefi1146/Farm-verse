export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          avatar_url: string | null;
          organization: string | null;
          experience: number | null;
          location: string | null;
          bio: string | null;
          role: 'investor' | 'project_creator' | 'vendor';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          avatar_url?: string | null;
          organization?: string | null;
          experience?: number | null;
          location?: string | null;
          bio?: string | null;
          role: 'investor' | 'project_creator' | 'vendor';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          avatar_url?: string | null;
          organization?: string | null;
          experience?: number | null;
          location?: string | null;
          bio?: string | null;
          role?: 'investor' | 'project_creator' | 'vendor';
          created_at?: string;
          updated_at?: string;
        };
      };
      // Add other table types as needed
    };
  };
}