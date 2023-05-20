create table plant (
	insert_ts timestamp not null default now(),
	modification_ts timestamp not null default now(),
	plant_id bigint not null,
	scientific_nm character varying not null,
	common_nm character varying,
	"family" character varying,
	genus character varying,
	tags character varying[],
	constraint plantxpk primary key (plant_id)
)

create table user_plant (
	insert_ts timestamp not null default now(),
	modification_ts timestamp not null default now(),
	user_plant_id uuid not null default gen_random_uuid(),
	user_id character varying not null,
	plant_id bigint not null,
	weight numeric not null,
	img_url character varying not null,
	constraint user_plant_xpk primary key (user_plant_id),
	constraint user_fk FOREIGN KEY (user_id) references "user"(user_id),
	constraint plant_fk foreign key (plant_id) references plant(plant_id)
)

create table "user" (
	insert_ts timestamp not null default now(),
	modification_ts timestamp not null default now(),
	user_id character varying not null,
	constraint userxpk primary key (user_id)
)