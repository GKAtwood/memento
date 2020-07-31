DELETE FROM memento_entries WHERE eid = $1
RETURNING *;