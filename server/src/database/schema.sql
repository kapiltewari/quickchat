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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: mst_room; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mst_room (
    room_id integer NOT NULL,
    name character varying NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: mst_room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mst_room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mst_room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mst_room_room_id_seq OWNED BY public.mst_room.room_id;


--
-- Name: mst_user_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mst_user_type (
    user_type_id integer NOT NULL,
    role character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: mst_user_type_user_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mst_user_type_user_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mst_user_type_user_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mst_user_type_user_type_id_seq OWNED BY public.mst_user_type.user_type_id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: tbl_room_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_room_message (
    message_id integer NOT NULL,
    text character varying NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tbl_room_message_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tbl_room_message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_room_message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tbl_room_message_message_id_seq OWNED BY public.tbl_room_message.message_id;


--
-- Name: tbl_room_participant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_room_participant (
    participant_id integer NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tbl_room_participant_participant_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tbl_room_participant_participant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_room_participant_participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tbl_room_participant_participant_id_seq OWNED BY public.tbl_room_participant.participant_id;


--
-- Name: tbl_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbl_user (
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    user_type_id integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tbl_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tbl_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tbl_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tbl_user_user_id_seq OWNED BY public.tbl_user.user_id;


--
-- Name: mst_room room_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_room ALTER COLUMN room_id SET DEFAULT nextval('public.mst_room_room_id_seq'::regclass);


--
-- Name: mst_user_type user_type_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_user_type ALTER COLUMN user_type_id SET DEFAULT nextval('public.mst_user_type_user_type_id_seq'::regclass);


--
-- Name: tbl_room_message message_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_message ALTER COLUMN message_id SET DEFAULT nextval('public.tbl_room_message_message_id_seq'::regclass);


--
-- Name: tbl_room_participant participant_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_participant ALTER COLUMN participant_id SET DEFAULT nextval('public.tbl_room_participant_participant_id_seq'::regclass);


--
-- Name: tbl_user user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_user ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_user_user_id_seq'::regclass);


--
-- Name: mst_room mst_room_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_room
    ADD CONSTRAINT mst_room_pkey PRIMARY KEY (room_id);


--
-- Name: mst_user_type mst_user_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_user_type
    ADD CONSTRAINT mst_user_type_pkey PRIMARY KEY (user_type_id);


--
-- Name: mst_user_type mst_user_type_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_user_type
    ADD CONSTRAINT mst_user_type_role_key UNIQUE (role);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tbl_room_message tbl_room_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_message
    ADD CONSTRAINT tbl_room_message_pkey PRIMARY KEY (message_id);


--
-- Name: tbl_room_participant tbl_room_participant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_participant
    ADD CONSTRAINT tbl_room_participant_pkey PRIMARY KEY (participant_id);


--
-- Name: tbl_user tbl_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_email_key UNIQUE (email);


--
-- Name: tbl_user tbl_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_pkey PRIMARY KEY (user_id);


--
-- Name: mst_room mst_room_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mst_room
    ADD CONSTRAINT mst_room_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.tbl_user(user_id);


--
-- Name: tbl_room_message tbl_room_message_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_message
    ADD CONSTRAINT tbl_room_message_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.mst_room(room_id);


--
-- Name: tbl_room_message tbl_room_message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_message
    ADD CONSTRAINT tbl_room_message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.tbl_user(user_id);


--
-- Name: tbl_room_participant tbl_room_participant_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_participant
    ADD CONSTRAINT tbl_room_participant_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.mst_room(room_id);


--
-- Name: tbl_room_participant tbl_room_participant_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_room_participant
    ADD CONSTRAINT tbl_room_participant_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.tbl_user(user_id);


--
-- Name: tbl_user tbl_user_user_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.mst_user_type(user_type_id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20210728165815'),
    ('20210728171206'),
    ('20210728172329'),
    ('20210728172648'),
    ('20210728173041');
