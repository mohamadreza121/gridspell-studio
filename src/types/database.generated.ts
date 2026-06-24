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
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json
          organization_id: string | null
          project_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
          organization_id?: string | null
          project_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
          organization_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      app_user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      approvals: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          description: string | null
          id: string
          milestone_id: string | null
          project_id: string
          requested_by: string | null
          status: Database["public"]["Enums"]["item_status"]
          title: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          description?: string | null
          id?: string
          milestone_id?: string | null
          project_id: string
          requested_by?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          title: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          description?: string | null
          id?: string
          milestone_id?: string | null
          project_id?: string
          requested_by?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: Json
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          approach: string | null
          category: string | null
          challenge: string | null
          content: Json
          cover_image: string | null
          created_at: string
          featured: boolean
          id: string
          outcome: string | null
          published: boolean
          published_at: string | null
          slug: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          approach?: string | null
          category?: string | null
          challenge?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          outcome?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          approach?: string | null
          category?: string | null
          challenge?: string | null
          content?: Json
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          outcome?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_invitations: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          auth_user_id: string | null
          created_at: string
          email: string
          expires_at: string
          full_name: string | null
          id: string
          invited_by: string | null
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          status: Database["public"]["Enums"]["client_invitation_status"]
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          auth_user_id?: string | null
          created_at?: string
          email: string
          expires_at?: string
          full_name?: string | null
          id?: string
          invited_by?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["client_invitation_status"]
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          auth_user_id?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          full_name?: string | null
          id?: string
          invited_by?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["client_invitation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_invitations_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          bucket: string
          client_visible: boolean
          created_at: string
          file_name: string
          folder: string | null
          id: string
          mime_type: string | null
          organization_id: string | null
          project_id: string | null
          size_bytes: number | null
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          bucket?: string
          client_visible?: boolean
          created_at?: string
          file_name: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          project_id?: string | null
          size_bytes?: number | null
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          bucket?: string
          client_visible?: boolean
          created_at?: string
          file_name?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          organization_id?: string | null
          project_id?: string | null
          size_bytes?: number | null
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_due: number
          amount_paid: number
          created_at: string
          currency: string
          due_at: string | null
          id: string
          invoice_number: string
          issued_at: string | null
          notes: string | null
          organization_id: string | null
          paid_at: string | null
          project_id: string | null
          proposal_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id: string | null
          updated_at: string
        }
        Insert: {
          amount_due?: number
          amount_paid?: number
          created_at?: string
          currency?: string
          due_at?: string | null
          id?: string
          invoice_number: string
          issued_at?: string | null
          notes?: string | null
          organization_id?: string | null
          paid_at?: string | null
          project_id?: string | null
          proposal_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_due?: number
          amount_paid?: number
          created_at?: string
          currency?: string
          due_at?: string | null
          id?: string
          invoice_number?: string
          issued_at?: string | null
          notes?: string | null
          organization_id?: string | null
          paid_at?: string | null
          project_id?: string | null
          proposal_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_invoice_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_activities: {
        Row: {
          activity_type: string
          actor_id: string | null
          body: string | null
          created_at: string
          id: string
          lead_id: string
        }
        Insert: {
          activity_type: string
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          lead_id: string
        }
        Update: {
          activity_type?: string
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          budget_range: string
          company: string | null
          created_at: string
          email: string
          estimated_value: number | null
          id: string
          internal_notes: string | null
          message: string
          name: string
          next_follow_up_at: string | null
          phone: string | null
          project_type: string
          source: string
          status: Database["public"]["Enums"]["lead_status"]
          timeline: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          budget_range: string
          company?: string | null
          created_at?: string
          email: string
          estimated_value?: number | null
          id?: string
          internal_notes?: string | null
          message: string
          name: string
          next_follow_up_at?: string | null
          phone?: string | null
          project_type: string
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          budget_range?: string
          company?: string | null
          created_at?: string
          email?: string
          estimated_value?: number | null
          id?: string
          internal_notes?: string | null
          message?: string
          name?: string
          next_follow_up_at?: string | null
          phone?: string | null
          project_type?: string
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          edited_at: string | null
          id: string
          parent_id: string | null
          project_id: string
          sender_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          project_id: string
          sender_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          edited_at?: string | null
          id?: string
          parent_id?: string | null
          project_id?: string
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          phase_id: string | null
          project_id: string
          requires_approval: boolean
          status: Database["public"]["Enums"]["item_status"]
          title: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          phase_id?: string | null
          project_id: string
          requires_approval?: boolean
          status?: Database["public"]["Enums"]["item_status"]
          title: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          phase_id?: string | null
          project_id?: string
          requires_approval?: boolean
          status?: Database["public"]["Enums"]["item_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          href: string | null
          id: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          primary_contact_id: string | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          primary_contact_id?: string | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          primary_contact_id?: string | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          invoice_id: string | null
          paid_at: string | null
          project_id: string | null
          provider: string
          provider_payment_id: string | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          paid_at?: string | null
          project_id?: string | null
          provider?: string
          provider_payment_id?: string | null
          status: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          paid_at?: string | null
          project_id?: string | null
          provider?: string
          provider_payment_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          onboarding_completed_at: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          onboarding_completed_at?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          onboarding_completed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_members: {
        Row: {
          created_at: string
          project_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          project_id: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          project_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_phases: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          position: number
          project_id: string
          start_date: string | null
          status: Database["public"]["Enums"]["item_status"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          position?: number
          project_id: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["item_status"]
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          position?: number
          project_id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["item_status"]
        }
        Relationships: [
          {
            foreignKeyName: "project_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          launched_at: string | null
          name: string
          organization_id: string | null
          progress: number
          slug: string
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"]
          target_launch_date: string | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          launched_at?: string | null
          name: string
          organization_id?: string | null
          progress?: number
          slug: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          target_launch_date?: string | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          launched_at?: string | null
          name?: string
          organization_id?: string | null
          progress?: number
          slug?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          target_launch_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_items: {
        Row: {
          description: string | null
          id: string
          optional: boolean
          position: number
          proposal_id: string
          quantity: number
          selected: boolean
          title: string
          unit_price: number
        }
        Insert: {
          description?: string | null
          id?: string
          optional?: boolean
          position?: number
          proposal_id: string
          quantity?: number
          selected?: boolean
          title: string
          unit_price?: number
        }
        Update: {
          description?: string | null
          id?: string
          optional?: boolean
          position?: number
          proposal_id?: string
          quantity?: number
          selected?: boolean
          title?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposal_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          accepted_at: string | null
          created_at: string
          currency: string
          expires_at: string | null
          id: string
          lead_id: string | null
          organization_id: string | null
          project_id: string | null
          public_token: string
          status: string
          subtotal: number
          tax: number
          title: string
          total: number
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          currency?: string
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          public_token?: string
          status?: string
          subtotal?: number
          tax?: number
          title: string
          total?: number
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          currency?: string
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          public_token?: string
          status?: string
          subtotal?: number
          tax?: number
          title?: string
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          body: Json
          created_at: string
          id: string
          position: number
          published: boolean
          slug: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: Json
          created_at?: string
          id?: string
          position?: number
          published?: boolean
          slug: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: Json
          created_at?: string
          id?: string
          position?: number
          published?: boolean
          slug?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          body: string
          created_at: string
          created_by: string
          id: string
          organization_id: string
          priority: Database["public"]["Enums"]["support_ticket_priority"]
          project_id: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          body: string
          created_at?: string
          created_by: string
          id?: string
          organization_id: string
          priority?: Database["public"]["Enums"]["support_ticket_priority"]
          project_id?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          body?: string
          created_at?: string
          created_by?: string
          id?: string
          organization_id?: string
          priority?: Database["public"]["Enums"]["support_ticket_priority"]
          project_id?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["support_ticket_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          client_visible: boolean
          completed_at: string | null
          completed_by: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          milestone_id: string | null
          project_id: string
          status: Database["public"]["Enums"]["item_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          client_visible?: boolean
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          milestone_id?: string | null
          project_id: string
          status?: Database["public"]["Enums"]["item_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          client_visible?: boolean
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          milestone_id?: string | null
          project_id?: string
          status?: Database["public"]["Enums"]["item_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_name: string
          company: string | null
          created_at: string
          id: string
          position: number
          project_id: string | null
          published: boolean
          quote: string
        }
        Insert: {
          client_name: string
          company?: string | null
          created_at?: string
          id?: string
          position?: number
          project_id?: string | null
          published?: boolean
          quote: string
        }
        Update: {
          client_name?: string
          company?: string | null
          created_at?: string
          id?: string
          position?: number
          project_id?: string | null
          published?: boolean
          quote?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_client_invitation: {
        Args: { invitation_id: string; profile_full_name: string }
        Returns: string
      }
      can_contribute_to_org: { Args: { target: string }; Returns: boolean }
      can_contribute_to_project: { Args: { target: string }; Returns: boolean }
      is_app_admin: { Args: never; Returns: boolean }
      is_org_member: { Args: { target: string }; Returns: boolean }
      is_project_member: { Args: { target: string }; Returns: boolean }
      is_staff_member: { Args: never; Returns: boolean }
      recalculate_proposal_totals: {
        Args: { target_proposal_id: string }
        Returns: undefined
      }
      set_client_task_status: {
        Args: {
          target_status: Database["public"]["Enums"]["item_status"]
          target_task_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "owner" | "admin" | "team_member" | "client" | "client_viewer"
      client_invitation_status: "pending" | "accepted" | "revoked" | "expired"
      invoice_status: "draft" | "open" | "paid" | "overdue" | "void"
      item_status:
        | "not_started"
        | "in_progress"
        | "blocked"
        | "in_review"
        | "approved"
        | "completed"
      lead_status:
        | "new"
        | "qualified"
        | "discovery_booked"
        | "proposal_sent"
        | "negotiating"
        | "won"
        | "lost"
      project_status:
        | "planning"
        | "active"
        | "paused"
        | "review"
        | "launched"
        | "archived"
      support_ticket_priority: "normal" | "urgent"
      support_ticket_status:
        | "open"
        | "in_progress"
        | "waiting_on_client"
        | "resolved"
        | "closed"
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
      app_role: ["owner", "admin", "team_member", "client", "client_viewer"],
      client_invitation_status: ["pending", "accepted", "revoked", "expired"],
      invoice_status: ["draft", "open", "paid", "overdue", "void"],
      item_status: [
        "not_started",
        "in_progress",
        "blocked",
        "in_review",
        "approved",
        "completed",
      ],
      lead_status: [
        "new",
        "qualified",
        "discovery_booked",
        "proposal_sent",
        "negotiating",
        "won",
        "lost",
      ],
      project_status: [
        "planning",
        "active",
        "paused",
        "review",
        "launched",
        "archived",
      ],
      support_ticket_priority: ["normal", "urgent"],
      support_ticket_status: [
        "open",
        "in_progress",
        "waiting_on_client",
        "resolved",
        "closed",
      ],
    },
  },
} as const

