DELETE FROM memento_entries WHERE eid = ${eid}
RETURNING *;