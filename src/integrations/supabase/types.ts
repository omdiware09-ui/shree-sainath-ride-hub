export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Relationships: []
      }
      bikes: {
        Row: {
          accessories_price: number | null
          category: string
          colors: Json | null
          created_at: string
          engine_cc: number | null
          ex_showroom_price: number
          features: Json | null
          fuel_tank_l: number | null
          gallery: Json | null
          id: string
          image_url: string | null
          insurance_price: number | null
          is_active: boolean | null
          is_featured: boolean | null
          mileage_kmpl: number | null
          name: string
          power_bhp: number | null
          rto_price: number | null
          seat_height_mm: number | null
          slug: string
          sort_order: number | null
          specs: Json | null
          tagline: string | null
          torque_nm: number | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          accessories_price?: number | null
          category?: string
          colors?: Json | null
          created_at?: string
          engine_cc?: number | null
          ex_showroom_price: number
          features?: Json | null
          fuel_tank_l?: number | null
          gallery?: Json | null
          id?: string
          image_url?: string | null
          insurance_price?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          mileage_kmpl?: number | null
          name: string
          power_bhp?: number | null
          rto_price?: number | null
          seat_height_mm?: number | null
          slug: string
          sort_order?: number | null
          specs?: Json | null
          tagline?: string | null
          torque_nm?: number | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          accessories_price?: number | null
          category?: string
          colors?: Json | null
          created_at?: string
          engine_cc?: number | null
          ex_showroom_price?: number
          features?: Json | null
          fuel_tank_l?: number | null
          gallery?: Json | null
          id?: string
          image_url?: string | null
          insurance_price?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          mileage_kmpl?: number | null
          name?: string
          power_bhp?: number | null
          rto_price?: number | null
          seat_height_mm?: number | null
          slug?: string
          sort_order?: number | null
          specs?: Json | null
          tagline?: string | null
          torque_nm?: number | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          messages: Json
          recaptcha_score: number | null
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          messages?: Json
          recaptcha_score?: number | null
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          messages?: Json
          recaptcha_score?: number | null
          session_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          bike_purchased_slug: string | null
          created_at: string
          email: string | null
          id: string
          insurance_expiry: string | null
          last_service_date: string | null
          name: string
          next_service_due: string | null
          notes: string | null
          phone: string
          purchase_date: string | null
          updated_at: string
        }
        Insert: {
          bike_purchased_slug?: string | null
          created_at?: string
          email?: string | null
          id?: string
          insurance_expiry?: string | null
          last_service_date?: string | null
          name: string
          next_service_due?: string | null
          notes?: string | null
          phone: string
          purchase_date?: string | null
          updated_at?: string
        }
        Update: {
          bike_purchased_slug?: string | null
          created_at?: string
          email?: string | null
          id?: string
          insurance_expiry?: string | null
          last_service_date?: string | null
          name?: string
          next_service_due?: string | null
          notes?: string | null
          phone?: string
          purchase_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_bike_purchased_slug_fkey"
            columns: ["bike_purchased_slug"]
            isOneToOne: false
            referencedRelation: "bikes"
            referencedColumns: ["slug"]
          },
        ]
      }
      email_log: {
        Row: {
          body: string | null
          error_message: string | null
          id: string
          recipient: string
          reminder_id: string | null
          sent_at: string
          status: string
          subject: string
        }
        Insert: {
          body?: string | null
          error_message?: string | null
          id?: string
          recipient: string
          reminder_id?: string | null
          sent_at?: string
          status?: string
          subject: string
        }
        Update: {
          body?: string | null
          error_message?: string | null
          id?: string
          recipient?: string
          reminder_id?: string | null
          sent_at?: string
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_log_reminder_id_fkey"
            columns: ["reminder_id"]
            isOneToOne: false
            referencedRelation: "reminders"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          bike_slug: string | null
          created_at: string
          email: string | null
          id: string
          interest: string | null
          ip_address: string | null
          message: string | null
          name: string
          notes: string | null
          phone: string
          preferred_date: string | null
          preferred_time: string | null
          recaptcha_score: number | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          bike_slug?: string | null
          created_at?: string
          email?: string | null
          id?: string
          interest?: string | null
          ip_address?: string | null
          message?: string | null
          name: string
          notes?: string | null
          phone: string
          preferred_date?: string | null
          preferred_time?: string | null
          recaptcha_score?: number | null
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          bike_slug?: string | null
          created_at?: string
          email?: string | null
          id?: string
          interest?: string | null
          ip_address?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string
          preferred_date?: string | null
          preferred_time?: string | null
          recaptcha_score?: number | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_bike_slug_fkey"
            columns: ["bike_slug"]
            isOneToOne: false
            referencedRelation: "bikes"
            referencedColumns: ["slug"]
          },
        ]
      }
      failed_submissions: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          payload: Json | null
          reason: string
          source: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          payload?: Json | null
          reason: string
          source: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          payload?: Json | null
          reason?: string
          source?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string
          customer_id: string
          due_date: string
          email_body: string | null
          email_subject: string | null
          id: string
          reminder_type: string
          sent_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          due_date: string
          email_body?: string | null
          email_subject?: string | null
          id?: string
          reminder_type?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          due_date?: string
          email_body?: string | null
          email_subject?: string | null
          id?: string
          reminder_type?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_records: {
        Row: {
          cost: number | null
          created_at: string
          customer_id: string
          description: string | null
          id: string
          next_service_due: string | null
          service_date: string
          service_type: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          customer_id: string
          description?: string | null
          id?: string
          next_service_due?: string | null
          service_date: string
          service_type?: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          customer_id?: string
          description?: string | null
          id?: string
          next_service_due?: string | null
          service_date?: string
          service_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_records_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
    },
  },
} as const
