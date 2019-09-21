CREATE TABLE usuario(
    ID UUID PRIMARY KEY,
    email varchar(255) not null,
    username varchar(100) not null,
    senha varchar(100) not null,
    nomereal varchar(255) not null,
    biografia text,
    privacidade boolean not null
);

CREATE TABLE post(
    idPost UUID PRIMARY KEY,
    idUser UUID NOT NULL, urlFoto TEXT,
    texto VARCHAR(255) NOT NULL,
    time TIMESTAMP,
    CONSTRAINT post_idUser_fkey FOREIGN KEY (idUser) REFERENCES usuario(ID) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT post_urlFoto_fkey FOREIGN KEY (urlFoto) REFERENCES foto(urlFoto) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE seguindo(
    idUser UUID NOT NULL,
    idSeguido UUID NOT NULL,
    CONSTRAINT seguindo_idUser_fkey FOREIGN KEY (idUser) REFERENCES usuario(ID) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT seguindo_idSeguido_fkey FOREIGN KEY (idSeguido) REFERENCES usuario(ID) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE bloquear(
    idUser UUID NOT NULL,
    idBloqueado UUID NOT NULL,
    CONSTRAINT bloquear_idUser_fkey FOREIGN KEY (idUser) REFERENCES usuario(ID) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT bloquear_idBloqueado_fkey FOREIGN KEY (idBloqueado) REFERENCES usuario(ID) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE notificacao_post(
    idNot UUID PRIMARY KEY,
    idPost UUID NOT NULL,
    CONSTRAINT notificacao_post_idPost FOREIGN KEY (idPost) REFERENCES post(idPost) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT notificacao_post_idNot FOREIGN KEY (idNot) REFERENCES notificacao(idNot) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comentario(
    idComent UUID PRIMARY KEY,
    idPost UUID not null,
    idComentador UUID not null,
    texto TEXT not null,
    idUserPost UUID not null,
    CONSTRAINT comentario_idPost_fkey FOREIGN KEY (idPost) REFERENCES post(idPost) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT comentario_idComentador_fkey FOREIGN KEY (idComentador) REFERENCES usuario(ID) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT comentario_idUserPost_fkey FOREIGN KEY (idUserPost) REFERENCES usuario(ID) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notificacao(
    idNot UUID PRIMARY KEY,
    tipo TEXT not null,
    sujeito UUID not null,
    objeto UUID not null,
    time TIMESTAMP,
    CONSTRAINT notificacao_sujeito_fkey FOREIGN KEY (sujeito) REFERENCES usuario(ID) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT notificacao_objeto_fkey FOREIGN KEY (objeto) REFERENCES usuario(ID) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notificacao_post( 
    idNot UUID not null,
    idPost UUID NOT NULL,
    CONSTRAINT notificacao_comentario_idNot_fkey FOREIGN KEY (idNot) REFERENCES notificacao(idNot) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT notificacao_comentario_idPost_fkey FOREIGN KEY (idPost) REFERENCES post(idPost) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notificacao_comentario( 
    idNot UUID not null,
    idComent UUID NOT NULL,
    CONSTRAINT notificacao_comentario_idNot_fkey FOREIGN KEY (idNot) REFERENCES notificacao(idNot) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT notificacao_comentario_idComent_fkey FOREIGN KEY (idComent) REFERENCES comentario(idComent) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE topico(
    hashtag VARCHAR(255) PRIMARY KEY
);

CREATE TABLE foto(
    urlFoto UUID PRIMARY KEY,
    idPost UUID not null,
    CONSTRAINT foto_idPost_fkey FOREIGN KEY (idPost) REFERENCES post(idPost) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE topico_comentarios(
    idComent UUID not null,
    hastag varchar(255) not null,
    CONSTRAINT topico_comentarios_idComent_fkey FOREIGN KEY (idComent) REFERENCES comentario(idComent) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT topico_comentarios_hashtag_fkey FOREIGN KEY (hashtag) REFERENCES topico(hashtag) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE topico_post(
    idPost UUID not null,
    hastag varchar(255) not null,
    CONSTRAINT topico_post_idPost_fkey FOREIGN KEY (idPost) REFERENCES post(idPost) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT topico_post_hashtag_fkey FOREIGN KEY (hashtag) REFERENCES topico(hashtag) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE aviso(
    idNot UUID not null,
    idUser UUID not null,
    CONSTRAINT aviso_idNot_fkey FOREIGN KEY (idNot) REFERENCES notificacao(idNot) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT aviso_idUser_fkey FOREIGN KEY (idUser) REFERENCES usuario(ID) MATCH FULL ON DELETE CASCADE ON UPDATE CASCADE
);




