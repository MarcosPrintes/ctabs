# PostgreSQL - Guia Rápido de Comandos

## Conectar ao PostgreSQL

### Conectar como usuário padrão

```bash
psql -U postgres
```

### Conectar a um banco específico

```bash
psql -U usuario -d nome_do_banco
```

### Conectar com host e porta

```bash
psql -h localhost -p 5432 -U usuario -d nome_do_banco
```

## Comandos Meta (\d commands)

### Listar todos os databases

```sql
\l
-- ou
\list
```

### Conectar/Selecionar um database

```sql
\c nome_do_banco
-- ou
\connect nome_do_banco
```

### Listar todas as tabelas

```sql
\dt
```

### Listar todas as tabelas com schema

```sql
\dt *.*
```

### Ver estrutura de uma tabela

```sql
\d nome_da_tabela
```

### Listar todos os schemas

```sql
\dn
```

### Listar usuários/roles

```sql
\du
```

### Ver comandos executados anteriormente

```sql
\s
```

### Limpar a tela

```sql
\! clear
-- ou no Windows
\! cls
```

### Sair do psql

```sql
\q
-- ou
exit
```

## Consultas SQL Rápidas

### Listar databases (via SQL)

```sql
SELECT datname FROM pg_database;
```

### Mostrar database atual

```sql
SELECT current_database();
```

### Listar todas as tabelas do schema public

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public';
```

### Ver tamanho dos databases

```sql
SELECT
    datname as database,
    pg_size_pretty(pg_database_size(datname)) as size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;
```

### Ver conexões ativas

```sql
SELECT count(*) as total_conexoes
FROM pg_stat_activity;
```

### Ver conexões por database

```sql
SELECT
    datname,
    count(*) as conexoes
FROM pg_stat_activity
GROUP BY datname
ORDER BY conexoes DESC;
```

### Ver informações detalhadas das conexões

```sql
SELECT
    pid,
    usename,
    datname,
    application_name,
    client_addr,
    state,
    query_start
FROM pg_stat_activity
WHERE state = 'active';
```

### Ver versão do PostgreSQL

```sql
SELECT version();
```

### Ver configurações do servidor

```sql
SHOW ALL;
-- ou configuração específica
SHOW max_connections;
```

## Executar SQL de um arquivo

### Via linha de comando

```bash
psql -U usuario -d banco -f script.sql
```

### Dentro do psql

```sql
\i /caminho/para/script.sql
```

## Exportar e Importar

### Exportar resultado de query para CSV

```sql
\copy (SELECT * FROM tabela) TO '/tmp/output.csv' CSV HEADER;
```

### Importar CSV para tabela

```sql
\copy tabela FROM '/tmp/input.csv' CSV HEADER;
```

### Backup de um database

```bash
pg_dump -U usuario nome_do_banco > backup.sql
```

### Restaurar backup

```bash
psql -U usuario nome_do_banco < backup.sql
```

## Dicas Úteis

### Habilitar timing de queries

```sql
\timing on
```

### Mudar formato de saída

```sql
\x          -- modo expandido (vertical)
\x auto     -- auto detectar melhor formato
```

### Ver query atual sendo executada

```sql
\watch      -- repete última query a cada 2 segundos
\watch 5    -- repete a cada 5 segundos
```

### Editar query no editor

```sql
\e          -- abre último comando no editor
\ef         -- edita função
```

### Configurar variáveis

```sql
\set AUTOCOMMIT off
\set HISTSIZE 5000
```

## Consultas Úteis de Monitoramento

### Tabelas maiores

```sql
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
```

### Queries mais lentas em execução

```sql
SELECT
    pid,
    now() - query_start as duration,
    query,
    state
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;
```

### Matar uma conexão específica

```sql
SELECT pg_terminate_backend(pid);
-- onde pid é o número do processo
```
