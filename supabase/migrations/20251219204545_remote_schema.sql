

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."player_positions" AS ENUM (
    'QB',
    'RB',
    'WR',
    'TE',
    'FLEX',
    'K',
    'DEF'
);


ALTER TYPE "public"."player_positions" OWNER TO "postgres";


COMMENT ON TYPE "public"."player_positions" IS 'Fantasy Football player positions';



CREATE TYPE "public"."voter_type" AS ENUM (
    'owner',
    'nfl_fantasy'
);


ALTER TYPE "public"."voter_type" OWNER TO "postgres";


COMMENT ON TYPE "public"."voter_type" IS 'What type of voter is this (league site, owner)?';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."owners" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" NOT NULL,
    "years_active" smallint[] NOT NULL
);


ALTER TABLE "public"."owners" OWNER TO "postgres";


COMMENT ON TABLE "public"."owners" IS 'the owners of the league teams';



CREATE TABLE IF NOT EXISTS "public"."seasons" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "year" smallint,
    "playoff_champ_owner_id" bigint,
    "reg_szn_champ_owner_id" bigint,
    "ultimate_loser_owner_id" bigint,
    "reg_szn_loser_owner_id" bigint
);


ALTER TABLE "public"."seasons" OWNER TO "postgres";


COMMENT ON TABLE "public"."seasons" IS 'each season and a summary of winners/losers';



CREATE OR REPLACE VIEW "public"."hardware_by_owner" WITH ("security_invoker"='on') AS
 SELECT "o"."name" AS "owner_name",
    COALESCE("pc"."num_championships", (0)::bigint) AS "num_playoff_championships",
    COALESCE("rc"."num_reg_szn_championships", (0)::bigint) AS "num_reg_szn_championships"
   FROM ((( SELECT "seasons"."playoff_champ_owner_id" AS "owner_id",
            "count"(*) AS "num_championships"
           FROM "public"."seasons"
          GROUP BY "seasons"."playoff_champ_owner_id") "pc"
     FULL JOIN ( SELECT "seasons"."reg_szn_champ_owner_id" AS "owner_id",
            "count"(*) AS "num_reg_szn_championships"
           FROM "public"."seasons"
          GROUP BY "seasons"."reg_szn_champ_owner_id") "rc" ON (("pc"."owner_id" = "rc"."owner_id")))
     LEFT JOIN "public"."owners" "o" ON ((COALESCE("pc"."owner_id", "rc"."owner_id") = "o"."id")))
  ORDER BY COALESCE("pc"."num_championships", (0)::bigint) DESC, COALESCE("rc"."num_reg_szn_championships", (0)::bigint) DESC, "o"."name";


ALTER VIEW "public"."hardware_by_owner" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."hardware_by_season" WITH ("security_invoker"='on') AS
 SELECT "s"."year",
    "o1"."name" AS "playoff_champ",
    "o2"."name" AS "reg_szn_champ",
    "o3"."name" AS "ultimate_loser",
    "o4"."name" AS "reg_szn_loser"
   FROM (((("public"."seasons" "s"
     JOIN "public"."owners" "o1" ON (("s"."playoff_champ_owner_id" = "o1"."id")))
     JOIN "public"."owners" "o2" ON (("s"."reg_szn_champ_owner_id" = "o2"."id")))
     JOIN "public"."owners" "o3" ON (("s"."ultimate_loser_owner_id" = "o3"."id")))
     JOIN "public"."owners" "o4" ON (("s"."reg_szn_loser_owner_id" = "o4"."id")));


ALTER VIEW "public"."hardware_by_season" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."losers_by_owner" WITH ("security_invoker"='on') AS
 SELECT "o"."name" AS "owner_name",
    COALESCE("ul"."num_ultimate_losers", (0)::bigint) AS "num_ultimate_losers",
    COALESCE("rl"."num_reg_szn_losers", (0)::bigint) AS "num_reg_szn_losers"
   FROM ((( SELECT "seasons"."ultimate_loser_owner_id" AS "owner_id",
            "count"(*) AS "num_ultimate_losers"
           FROM "public"."seasons"
          GROUP BY "seasons"."ultimate_loser_owner_id") "ul"
     FULL JOIN ( SELECT "seasons"."reg_szn_loser_owner_id" AS "owner_id",
            "count"(*) AS "num_reg_szn_losers"
           FROM "public"."seasons"
          GROUP BY "seasons"."reg_szn_loser_owner_id") "rl" ON (("ul"."owner_id" = "rl"."owner_id")))
     LEFT JOIN "public"."owners" "o" ON ((COALESCE("ul"."owner_id", "rl"."owner_id") = "o"."id")))
  ORDER BY COALESCE("ul"."num_ultimate_losers", (0)::bigint) DESC, COALESCE("rl"."num_reg_szn_losers", (0)::bigint) DESC, "o"."name";


ALTER VIEW "public"."losers_by_owner" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."matchups" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "year" smallint NOT NULL,
    "week" smallint NOT NULL,
    "winner_owner_id" bigint,
    "loser_owner_id" bigint,
    "winner_score" real,
    "loser_score" real,
    "playoffs" boolean
);


ALTER TABLE "public"."matchups" OWNER TO "postgres";


COMMENT ON TABLE "public"."matchups" IS 'each row represents a weekly matchup';



ALTER TABLE "public"."matchups" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."matchups_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."owners" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."owners_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."poll_votes" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "voter_owner_id" bigint,
    "vote_receiver_owner_id" bigint,
    "value" smallint,
    "voter_type" "public"."voter_type",
    "year" smallint
);


ALTER TABLE "public"."poll_votes" OWNER TO "postgres";


ALTER TABLE "public"."poll_votes" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."poll_votes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."records" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "year" smallint NOT NULL,
    "owner_id" bigint NOT NULL,
    "wins" smallint,
    "losses" smallint,
    "reg_szn_finish" smallint,
    "playoff_wins" smallint,
    "playoff_losses" smallint,
    "playoff_finish" smallint
);


ALTER TABLE "public"."records" OWNER TO "postgres";


COMMENT ON TABLE "public"."records" IS 'summarizes the records of each team each season';



ALTER TABLE "public"."records" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."records_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."seasons" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."seasons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."total_points_against_by_season" WITH ("security_invoker"='on') AS
 SELECT "o"."name" AS "owner_name",
    "m"."year",
    "sum"(
        CASE
            WHEN ("m"."winner_owner_id" = "o"."id") THEN "m"."loser_score"
            WHEN ("m"."loser_owner_id" = "o"."id") THEN "m"."winner_score"
            ELSE (0)::real
        END) AS "total_points_against"
   FROM ("public"."matchups" "m"
     JOIN "public"."owners" "o" ON ((("o"."id" = "m"."winner_owner_id") OR ("o"."id" = "m"."loser_owner_id"))))
  WHERE ("m"."playoffs" = false)
  GROUP BY "o"."name", "o"."id", "m"."year"
  ORDER BY "m"."year" DESC, ("sum"(
        CASE
            WHEN ("m"."winner_owner_id" = "o"."id") THEN "m"."loser_score"
            WHEN ("m"."loser_owner_id" = "o"."id") THEN "m"."winner_score"
            ELSE (0)::real
        END));


ALTER VIEW "public"."total_points_against_by_season" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."total_points_by_season" WITH ("security_invoker"='on') AS
 SELECT "o"."name" AS "owner_name",
    "m"."year",
    "sum"(
        CASE
            WHEN ("m"."winner_owner_id" = "o"."id") THEN "m"."winner_score"
            WHEN ("m"."loser_owner_id" = "o"."id") THEN "m"."loser_score"
            ELSE (0)::real
        END) AS "total_points_scored"
   FROM ("public"."matchups" "m"
     JOIN "public"."owners" "o" ON ((("o"."id" = "m"."winner_owner_id") OR ("o"."id" = "m"."loser_owner_id"))))
  WHERE ("m"."playoffs" = false)
  GROUP BY "o"."name", "o"."id", "m"."year"
  ORDER BY "m"."year" DESC, ("sum"(
        CASE
            WHEN ("m"."winner_owner_id" = "o"."id") THEN "m"."winner_score"
            WHEN ("m"."loser_owner_id" = "o"."id") THEN "m"."loser_score"
            ELSE (0)::real
        END)) DESC;


ALTER VIEW "public"."total_points_by_season" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."waiver_transactions" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owner_id" bigint NOT NULL,
    "player_claimed_name" character varying NOT NULL,
    "budget_spent" smallint NOT NULL,
    "year" smallint NOT NULL,
    "week" smallint NOT NULL,
    "was_successful" boolean NOT NULL,
    "player_claimed_position" "public"."player_positions" NOT NULL
);


ALTER TABLE "public"."waiver_transactions" OWNER TO "postgres";


COMMENT ON TABLE "public"."waiver_transactions" IS 'Successful claims on the waiver wire';



ALTER TABLE "public"."waiver_transactions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."waiver_transactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."matchups"
    ADD CONSTRAINT "matchups_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."owners"
    ADD CONSTRAINT "owners_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."owners"
    ADD CONSTRAINT "owners_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."poll_votes"
    ADD CONSTRAINT "poll_votes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."records"
    ADD CONSTRAINT "records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."waiver_transactions"
    ADD CONSTRAINT "waiver_transactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."matchups"
    ADD CONSTRAINT "matchups_loser_owner_id_fkey" FOREIGN KEY ("loser_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."matchups"
    ADD CONSTRAINT "matchups_winner_owner_id_fkey" FOREIGN KEY ("winner_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."poll_votes"
    ADD CONSTRAINT "poll_votes_vote_receiver_owner_id_fkey" FOREIGN KEY ("vote_receiver_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."poll_votes"
    ADD CONSTRAINT "poll_votes_voter_owner_id_fkey" FOREIGN KEY ("voter_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."records"
    ADD CONSTRAINT "records_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_playoff_champ_owner_id_fkey" FOREIGN KEY ("playoff_champ_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_reg_szn_champ_owner_id_fkey" FOREIGN KEY ("reg_szn_champ_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_reg_szn_loser_owner_id_fkey" FOREIGN KEY ("reg_szn_loser_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_ultimate_loser_owner_id_fkey" FOREIGN KEY ("ultimate_loser_owner_id") REFERENCES "public"."owners"("id");



ALTER TABLE ONLY "public"."waiver_transactions"
    ADD CONSTRAINT "waiver_transactions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id");



CREATE POLICY "Enable read access for all users" ON "public"."matchups" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."owners" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."poll_votes" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."records" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."waiver_transactions" FOR SELECT USING (true);



CREATE POLICY "Public read access" ON "public"."matchups" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public read access" ON "public"."owners" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public read access" ON "public"."poll_votes" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public read access" ON "public"."records" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Public read access" ON "public"."seasons" FOR SELECT TO "anon" USING (true);



ALTER TABLE "public"."matchups" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."owners" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."poll_votes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."records" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."seasons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."waiver_transactions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."owners" TO "anon";
GRANT ALL ON TABLE "public"."owners" TO "authenticated";
GRANT ALL ON TABLE "public"."owners" TO "service_role";



GRANT ALL ON TABLE "public"."seasons" TO "anon";
GRANT ALL ON TABLE "public"."seasons" TO "authenticated";
GRANT ALL ON TABLE "public"."seasons" TO "service_role";



GRANT ALL ON TABLE "public"."hardware_by_owner" TO "anon";
GRANT ALL ON TABLE "public"."hardware_by_owner" TO "authenticated";
GRANT ALL ON TABLE "public"."hardware_by_owner" TO "service_role";



GRANT ALL ON TABLE "public"."hardware_by_season" TO "anon";
GRANT ALL ON TABLE "public"."hardware_by_season" TO "authenticated";
GRANT ALL ON TABLE "public"."hardware_by_season" TO "service_role";



GRANT ALL ON TABLE "public"."losers_by_owner" TO "anon";
GRANT ALL ON TABLE "public"."losers_by_owner" TO "authenticated";
GRANT ALL ON TABLE "public"."losers_by_owner" TO "service_role";



GRANT ALL ON TABLE "public"."matchups" TO "anon";
GRANT ALL ON TABLE "public"."matchups" TO "authenticated";
GRANT ALL ON TABLE "public"."matchups" TO "service_role";



GRANT ALL ON SEQUENCE "public"."matchups_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."matchups_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."matchups_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."owners_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."owners_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."owners_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."poll_votes" TO "anon";
GRANT ALL ON TABLE "public"."poll_votes" TO "authenticated";
GRANT ALL ON TABLE "public"."poll_votes" TO "service_role";



GRANT ALL ON SEQUENCE "public"."poll_votes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."poll_votes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."poll_votes_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."records" TO "anon";
GRANT ALL ON TABLE "public"."records" TO "authenticated";
GRANT ALL ON TABLE "public"."records" TO "service_role";



GRANT ALL ON SEQUENCE "public"."records_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."records_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."records_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."total_points_against_by_season" TO "anon";
GRANT ALL ON TABLE "public"."total_points_against_by_season" TO "authenticated";
GRANT ALL ON TABLE "public"."total_points_against_by_season" TO "service_role";



GRANT ALL ON TABLE "public"."total_points_by_season" TO "anon";
GRANT ALL ON TABLE "public"."total_points_by_season" TO "authenticated";
GRANT ALL ON TABLE "public"."total_points_by_season" TO "service_role";



GRANT ALL ON TABLE "public"."waiver_transactions" TO "anon";
GRANT ALL ON TABLE "public"."waiver_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."waiver_transactions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."waiver_transactions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."waiver_transactions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."waiver_transactions_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
-- Storage triggers already exist in base Supabase setup, commenting out to avoid conflicts
-- CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();

-- CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();

-- CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();

-- CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();

-- CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();

-- CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();

-- CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


