export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      matchups: {
        Row: {
          created_at: string
          id: number
          loser_owner_id: number | null
          loser_score: number | null
          playoffs: boolean | null
          week: number
          winner_owner_id: number | null
          winner_score: number | null
          year: number
        }
        Insert: {
          created_at?: string
          id?: number
          loser_owner_id?: number | null
          loser_score?: number | null
          playoffs?: boolean | null
          week: number
          winner_owner_id?: number | null
          winner_score?: number | null
          year: number
        }
        Update: {
          created_at?: string
          id?: number
          loser_owner_id?: number | null
          loser_score?: number | null
          playoffs?: boolean | null
          week?: number
          winner_owner_id?: number | null
          winner_score?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "matchups_loser_owner_id_fkey"
            columns: ["loser_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matchups_winner_owner_id_fkey"
            columns: ["winner_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      owners: {
        Row: {
          created_at: string
          id: number
          name: string
          years_active: number[]
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          years_active: number[]
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          years_active?: number[]
        }
        Relationships: []
      }
      poll_votes: {
        Row: {
          created_at: string
          id: number
          value: number | null
          vote_receiver_owner_id: number | null
          voter_owner_id: number | null
          voter_type: Database["public"]["Enums"]["voter_type"] | null
          year: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          value?: number | null
          vote_receiver_owner_id?: number | null
          voter_owner_id?: number | null
          voter_type?: Database["public"]["Enums"]["voter_type"] | null
          year?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          value?: number | null
          vote_receiver_owner_id?: number | null
          voter_owner_id?: number | null
          voter_type?: Database["public"]["Enums"]["voter_type"] | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_vote_receiver_owner_id_fkey"
            columns: ["vote_receiver_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_votes_voter_owner_id_fkey"
            columns: ["voter_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      records: {
        Row: {
          created_at: string
          id: number
          losses: number | null
          owner_id: number
          playoff_finish: number | null
          playoff_losses: number | null
          playoff_wins: number | null
          reg_szn_finish: number | null
          wins: number | null
          year: number
        }
        Insert: {
          created_at?: string
          id?: number
          losses?: number | null
          owner_id: number
          playoff_finish?: number | null
          playoff_losses?: number | null
          playoff_wins?: number | null
          reg_szn_finish?: number | null
          wins?: number | null
          year: number
        }
        Update: {
          created_at?: string
          id?: number
          losses?: number | null
          owner_id?: number
          playoff_finish?: number | null
          playoff_losses?: number | null
          playoff_wins?: number | null
          reg_szn_finish?: number | null
          wins?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "records_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          created_at: string
          id: number
          playoff_champ_owner_id: number | null
          reg_szn_champ_owner_id: number | null
          reg_szn_loser_owner_id: number | null
          ultimate_loser_owner_id: number | null
          year: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          playoff_champ_owner_id?: number | null
          reg_szn_champ_owner_id?: number | null
          reg_szn_loser_owner_id?: number | null
          ultimate_loser_owner_id?: number | null
          year?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          playoff_champ_owner_id?: number | null
          reg_szn_champ_owner_id?: number | null
          reg_szn_loser_owner_id?: number | null
          ultimate_loser_owner_id?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seasons_playoff_champ_owner_id_fkey"
            columns: ["playoff_champ_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_reg_szn_champ_owner_id_fkey"
            columns: ["reg_szn_champ_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_reg_szn_loser_owner_id_fkey"
            columns: ["reg_szn_loser_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_ultimate_loser_owner_id_fkey"
            columns: ["ultimate_loser_owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
      waiver_transactions: {
        Row: {
          budget_spent: number
          created_at: string
          id: number
          owner_id: number
          player_claimed_name: string
          player_claimed_position: Database["public"]["Enums"]["player_positions"]
          was_successful: boolean
          week: number
          year: number
        }
        Insert: {
          budget_spent: number
          created_at?: string
          id?: number
          owner_id: number
          player_claimed_name: string
          player_claimed_position: Database["public"]["Enums"]["player_positions"]
          was_successful: boolean
          week: number
          year: number
        }
        Update: {
          budget_spent?: number
          created_at?: string
          id?: number
          owner_id?: number
          player_claimed_name?: string
          player_claimed_position?: Database["public"]["Enums"]["player_positions"]
          was_successful?: boolean
          week?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "waiver_transactions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      hardware_by_owner: {
        Row: {
          num_playoff_championships: number | null
          num_reg_szn_championships: number | null
          owner_name: string | null
        }
        Relationships: []
      }
      hardware_by_season: {
        Row: {
          playoff_champ: string | null
          reg_szn_champ: string | null
          reg_szn_loser: string | null
          ultimate_loser: string | null
          year: number | null
        }
        Relationships: []
      }
      losers_by_owner: {
        Row: {
          num_reg_szn_losers: number | null
          num_ultimate_losers: number | null
          owner_name: string | null
        }
        Relationships: []
      }
      total_points_against_by_season: {
        Row: {
          owner_name: string | null
          total_points_against: number | null
          year: number | null
        }
        Relationships: []
      }
      total_points_by_season: {
        Row: {
          owner_name: string | null
          total_points_scored: number | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      player_positions: "QB" | "RB" | "WR" | "TE" | "FLEX" | "K" | "DEF"
      voter_type: "owner" | "nfl_fantasy"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      player_positions: ["QB", "RB", "WR", "TE", "FLEX", "K", "DEF"],
      voter_type: ["owner", "nfl_fantasy"],
    },
  },
} as const

