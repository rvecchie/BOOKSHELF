-- ============================================
-- db-init.sql
-- Script di inizializzazione del database BookShelf.
--
-- Eseguire una sola volta in MySQL Workbench
-- (o tramite riga di comando) per creare
-- le tabelle necessarie all'applicazione.
--
-- Ordine obbligatorio: prima utenti, poi libreria,
-- perché libreria ha una chiave esterna che
-- fa riferimento a utenti.
-- ============================================

CREATE DATABASE IF NOT EXISTS bookshelf
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bookshelf;

-- Tabella utenti
-- Contiene le credenziali di accesso.
-- password_hash: la password non viene mai salvata
-- in chiaro — solo l'hash prodotto da bcrypt.
CREATE TABLE IF NOT EXISTS utenti (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nome          VARCHAR(100) NOT NULL
);

-- Tabella libreria
-- Ogni riga è un libro salvato da un utente.
-- utente_id è la chiave esterna: collega ogni libro
-- all'utente proprietario nella tabella utenti.
-- ON DELETE CASCADE: se l'utente viene eliminato,
-- vengono eliminati automaticamente anche i suoi libri.
CREATE TABLE IF NOT EXISTS libreria (
  id        VARCHAR(100) NOT NULL,
  titolo    VARCHAR(255) NOT NULL,
  autore    VARCHAR(255) NOT NULL DEFAULT 'Autore sconosciuto',
  anno      VARCHAR(10)  NOT NULL DEFAULT '-',
  copertina VARCHAR(500),
  stato     ENUM('da-leggere', 'in-lettura', 'letto') NOT NULL DEFAULT 'da-leggere',
  utente_id INT          NOT NULL,
  PRIMARY KEY (id, utente_id),
  FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE
);

-- Inserimento utente di prova
-- La password è "password123" hashata con bcrypt (10 rounds)
-- Questo hash corrisponde esattamente a quello generato da bcryptjs
INSERT INTO utenti (username, password_hash, nome)
VALUES (
  'utente',
  '$2a$10$ccow4Iq2XVnvqu12FT9sfu/v5wqEWLY1RIIv37v4ga34c8nhrwkii',
  'Lettore'
);
