import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database
export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          created_at: string;
          owner_id: string;
        };
        Insert: Omit<Database['public']['Tables']['organizations']['Row'], 'id' | 'created_at'>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          organization_id: string;
          role_id: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
      };
      roles: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          description: string | null;
          permissions: string[];
          is_system_role: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['roles']['Row'], 'id' | 'created_at'>;
      };
      locations: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          address: string;
          city: string;
          country: string;
          phone: string;
          email: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['locations']['Row'], 'id' | 'created_at'>;
      };
      room_types: {
        Row: {
          id: string;
          location_id: string;
          name: string;
          description: string | null;
          capacity: number;
          price_per_night_ngn: number;
          amenities: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['room_types']['Row'], 'id' | 'created_at'>;
      };
      rooms: {
        Row: {
          id: string;
          location_id: string;
          room_type_id: string;
          room_number: string;
          status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['rooms']['Row'], 'id' | 'created_at'>;
      };
      reservations: {
        Row: {
          id: string;
          location_id: string;
          guest_id: string;
          room_id: string;
          check_in_date: string;
          check_out_date: string;
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
          total_price_ngn: number;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reservations']['Row'], 'id' | 'created_at'>;
      };
      guests: {
        Row: {
          id: string;
          organization_id: string;
          email: string;
          phone: string;
          full_name: string;
          date_of_birth: string | null;
          country: string;
          preferences: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['guests']['Row'], 'id' | 'created_at'>;
      };
    };
  };
};
