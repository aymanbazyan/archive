# Enviorment Variables:

- SUPABASE_URL=AAAA
- SUPABASE_ANON_KEY=AAAA
- NEXT_PUBLIC_SITE_URL=http://localhost:3000
- NODE_ENV=development

# Schema
```
create table public.postsB (
id bigint not null,
author text not null,
titles jsonb not null,
bodies jsonb not null,
constraint postsB_pkey primary key (id),
constraint postsB_id_key unique (id)
) TABLESPACE pg_default;
```

---

you can check [this](https://github.com/aymanbazyan/archive/tree/main) old version for more context about this small project

