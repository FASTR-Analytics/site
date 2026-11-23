-- Deletes rows whose foreign key points at a row that no longer exists (left by
-- deletes made with triggers disabled), repeating until none remain. A dump with
-- such rows cannot be restored. Run by make_fixture.sh before dumping.
DO $$
DECLARE r record; total int; n int; pass int := 0;
BEGIN
  LOOP
    total := 0; pass := pass + 1;
    FOR r IN
      SELECT c.conrelid::regclass AS child, c.confrelid::regclass AS parent,
             (SELECT string_agg(format('c.%I', a.attname), ',' ORDER BY k.ord) FROM unnest(c.conkey) WITH ORDINALITY k(attnum, ord)
                JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = k.attnum) AS ccols,
             (SELECT string_agg(format('p.%I', a.attname), ',' ORDER BY k.ord) FROM unnest(c.confkey) WITH ORDINALITY k(attnum, ord)
                JOIN pg_attribute a ON a.attrelid = c.confrelid AND a.attnum = k.attnum) AS pcols
      FROM pg_constraint c JOIN pg_namespace ns ON ns.oid = c.connamespace
      WHERE c.contype = 'f' AND ns.nspname = 'public'
    LOOP
      EXECUTE format('DELETE FROM %s c WHERE (%s) IS NOT NULL AND NOT EXISTS (SELECT 1 FROM %s p WHERE (%s) = (%s))',
                     r.child, r.ccols, r.parent, r.pcols, r.ccols);
      GET DIAGNOSTICS n = ROW_COUNT;
      IF n > 0 THEN RAISE NOTICE 'removed % orphan rows from %', n, r.child; END IF;
      total := total + n;
    END LOOP;
    EXIT WHEN total = 0 OR pass > 5;
  END LOOP;
END $$;
