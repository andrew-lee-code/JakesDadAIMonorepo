"""Sync league data from external sources to Supabase."""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv


def get_supabase_client() -> Client:
    """Initialize and return Supabase client."""
    load_dotenv()

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_KEY")

    if not supabase_url or not supabase_key:
        raise ValueError("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables")

    return create_client(supabase_url, supabase_key)


def sync_league_data() -> None:
    """Sync league data from external API to Supabase."""
    print("Starting league data sync...")

    try:
        supabase = get_supabase_client()

        # Placeholder for league data sync logic
        # This would typically:
        # 1. Fetch data from an external API (ESPN, Yahoo, Sleeper, etc.)
        # 2. Transform the data to match your schema
        # 3. Update the Supabase database

        # Example:
        # response = supabase.table('teams').select('*').execute()
        # print(f"Current teams: {len(response.data)}")

        print("League data sync completed successfully")

    except Exception as e:
        print(f"Error syncing league data: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    """Main entry point for the script."""
    sync_league_data()


if __name__ == "__main__":
    main()
