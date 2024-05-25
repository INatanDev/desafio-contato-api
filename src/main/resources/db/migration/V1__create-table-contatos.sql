create table desafio.contato(
    contato_id serial primary key,
    contato_nome varchar(100),
    contato_email varchar(255),
    contato_celular varchar(11),
    contato_telefone varchar(10),
    contato_sn_favorito character(1),
    contato_sn_ativo character(1),
    contato_dh_cad timestamp without time zone

)