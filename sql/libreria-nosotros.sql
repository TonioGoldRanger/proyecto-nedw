-- @Autor(es):              Arias Quintero Luis Antonio
--                          Canchola Cruz Fernando
--                          Villalpando Aguilar Jesica
-- @Fecha de creación:      08/05/2025
-- @Descripción:            Base de Datos de una Librería

-- CREA LA BD

DROP DATABASE IF EXISTS eq3libreria;
CREATE DATABASE eq3libreria;
USE eq3libreria;

-- USUARIO Y PRIVILEGIOS

DROP USER IF EXISTS 'admin_libreria'@'localhost';
CREATE USER 'admin_libreria'@'localhost' IDENTIFIED BY 'admin_libreria';
GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'admin_libreria'@'localhost';
FLUSH PRIVILEGES;

-- DDL

CREATE TABLE AUTOR(
    AUTOR_ID            SMALLINT        NOT NULL AUTO_INCREMENT,
    NOMBRE              VARCHAR(25)     NOT NULL,
    APELLIDO_PATERNO    VARCHAR(25)     NOT NULL,
    APELLIDO_MATERNO    VARCHAR(25)     NULL,
    PRIMARY KEY (AUTOR_ID)
);

CREATE TABLE EDITORIAL(
    EDITORIAL_ID    SMALLINT        NOT NULL AUTO_INCREMENT,
    NOMBRE          VARCHAR(25)     NOT NULL,
    PRIMARY KEY (EDITORIAL_ID),
    UNIQUE (NOMBRE)
);

CREATE TABLE LIBRO(
    LIBRO_ID               SMALLINT         NOT NULL AUTO_INCREMENT,
    TITULO                 VARCHAR(50)      NOT NULL,
    SINOPSIS               VARCHAR(100)     NOT NULL,
    GENERO                 VARCHAR(25)      NOT NULL,
    ANIO_PUBLICACION       INT(4)           NOT NULL,
    PRECIO                 DECIMAL(5,2)     NOT NULL,
    CANTIDAD_DISPONIBLE    INT              NOT NULL,
    RUTA_IMAGEN            VARCHAR(150)     NOT NULL,
    AUTOR_ID               SMALLINT         NOT NULL,
    EDITORIAL_ID           SMALLINT         NOT NULL,
    PRIMARY KEY (LIBRO_ID),
    FOREIGN KEY (AUTOR_ID) REFERENCES AUTOR(AUTOR_ID),
    FOREIGN KEY (EDITORIAL_ID) REFERENCES EDITORIAL(EDITORIAL_ID)
);

CREATE TABLE SOLICITUD_CONTACTO(
    SOLICITUD_CONTACTO_ID      BIGINT           NOT NULL AUTO_INCREMENT,
    TIPO_SOLICITUD             CHAR(1)          NOT NULL,
    NOMBRE                     VARCHAR(50)      NOT NULL,
    EMAIL                      VARCHAR(50)      NOT NULL,
    FECHA                      TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MENSAJE                    VARCHAR(1000)    NOT NULL,
    PRIMARY KEY (SOLICITUD_CONTACTO_ID),
    CHECK (TIPO_SOLICITUD IN('C', 'S', 'R', 'O'))
);

CREATE TABLE EVENTO(
    EVENTO_ID               BIGINT              NOT NULL AUTO_INCREMENT,
    NOMBRE                  VARCHAR(25)         NOT NULL,
    DESCRIPCION             VARCHAR(500)        NOT NULL,
    RUTA_IMAGEN             VARCHAR(150)        NOT NULL,
    FECHA_INICIO            TIMESTAMP           NOT NULL,
    FECHA_FIN               TIMESTAMP           NOT NULL,
    PRIMARY KEY (EVENTO_ID),
    CHECK (FECHA_INICIO < FECHA_FIN)

);

-- DML

INSERT INTO AUTOR(NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO) VALUES
    ('Gabriel', 'García', 'Márquez'),
    ('George', 'Orwell', NULL),
    ('Antoine', 'Saint', 'Exupéry'),
    ('Ray', 'Bradbury', NULL),
    ('William', 'Shakespeare', NULL),
    ('Michael', 'Ende', NULL);

INSERT INTO EDITORIAL(NOMBRE) VALUES
    ('Sudamericana'),
    ('Secker & Warburg'),
    ('Gallimard'),
    ('Ballantine Books'),
    ('Simon & Schuster'),
    ('Thienemann');

INSERT INTO LIBRO(TITULO, SINOPSIS, GENERO, ANIO_PUBLICACION, PRECIO, CANTIDAD_DISPONIBLE, RUTA_IMAGEN, AUTOR_ID, EDITORIAL_ID) VALUES
    ('Cien años de soledad', 'La historia de varias generaciones de la familia Buendía en el mítico pueblo de Macondo.', 'Realismo mágico', 1967, 199.99, 10, 'images/libros/cien-anios-soledad.jpg', 1, 1),
    ('1984', 'Distopía donde el Gran Hermano controla la vida de todos los ciudadanos.', 'Distopía', 1949, 149.99, 15, 'images/libros/1984.jpg', 2, 2),
    ('El Principito', 'Un niño proveniente de otro planeta enseña valiosas lecciones sobre la vida y el amor.', 'Fábula', 1943, 99.99, 12, 'images/libros/prince.jpg', 3, 3),
    ('Fahrenheit 451', 'En un mundo donde los libros están prohibidos, un bombero cuestiona su rol.', 'Ciencia ficción', 1953, 129.99, 8, 'images/libros/fahrenheit.jpg', 4, 4),
    ('Hamlet', 'La tragedia de un príncipe atormentado por la traición y la venganza.', 'Tragedia', 1603, 119.99, 5, 'images/libros/hamlet.jpg', 5, 5),
    ('Momo', 'Una niña enfrenta a los hombres grises que roban el tiempo a las personas.', 'Fantasía', 1973, 109.99, 7, 'images/libros/momo.jpeg', 6, 6);

INSERT INTO EVENTO (NOMBRE, DESCRIPCION, RUTA_IMAGEN, FECHA_INICIO, FECHA_FIN) VALUES
(
    'Lectura con Álex Grijelmo: Cazador de Estilemas',
    'El reconocido autor Álex Grijelmo nos visita para leer y comentar su obra "Cazador de Estilemas". Habrá firma de libros, charla abierta con el autor y un espacio de preguntas para el público. ¡Una oportunidad increible para amantes de su novela!',
    'images/eventos/cazador-estilemas.jpg',
    '2025-06-07',
    '2025-06-10'
),
(
    'Semana del Libro 2025',
    'Celebra el Día del Libro con nosotros en una semana llena de actividades: talleres de escritura, lecturas en voz alta, cuentacuentos para niños, descuentos especiales y más. Una fiesta literaria para toda la familia.',
    'images/eventos/dia-del-libro.jpg',
    '2025-06-16',
    '2025-06-22'
);
