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
      cms_pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          status: "draft" | "published";
          blocks: Json;
          seo_title: string | null;
          seo_description: string | null;
          og_image_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          status?: "draft" | "published";
          blocks?: Json;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          status?: "draft" | "published";
          blocks?: Json;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          cover_image_path: string | null;
          content: Json;
          tags: string[];
          status: "draft" | "published";
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          cover_image_path?: string | null;
          content?: Json;
          tags?: string[];
          status?: "draft" | "published";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          cover_image_path?: string | null;
          content?: Json;
          tags?: string[];
          status?: "draft" | "published";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      case_studies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client_name: string | null;
          one_liner: string | null;
          industry: string | null;
          tags: string[];
          hero_media_path: string | null;
          sections: Json;
          metrics: Json;
          status: "draft" | "published";
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client_name?: string | null;
          one_liner?: string | null;
          industry?: string | null;
          tags?: string[];
          hero_media_path?: string | null;
          sections?: Json;
          metrics?: Json;
          status?: "draft" | "published";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          client_name?: string | null;
          one_liner?: string | null;
          industry?: string | null;
          tags?: string[];
          hero_media_path?: string | null;
          sections?: Json;
          metrics?: Json;
          status?: "draft" | "published";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      people_consultant_applications: {
        Row: {
          id: string;
          name: string;
          email: string;
          linkedin: string | null;
          current_company: string | null;
          role: string | null;
          expertise_tags: string[];
          availability: string | null;
          hourly_rate_range: string | null;
          visibility_preference: "anonymous" | "first-name-only" | "public";
          compliance_confirmed: boolean | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          linkedin?: string | null;
          current_company?: string | null;
          role?: string | null;
          expertise_tags?: string[];
          availability?: string | null;
          hourly_rate_range?: string | null;
          visibility_preference?: "anonymous" | "first-name-only" | "public";
          compliance_confirmed?: boolean | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          linkedin?: string | null;
          current_company?: string | null;
          role?: string | null;
          expertise_tags?: string[];
          availability?: string | null;
          hourly_rate_range?: string | null;
          visibility_preference?: "anonymous" | "first-name-only" | "public";
          compliance_confirmed?: boolean | null;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
