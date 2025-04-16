const fs = require("fs");

// Configuration constants
const TABLE_NAME = "posts";
const ADMIN_UUID = "66fb4b84-51a7-4619-a054-cb3f9b1e2ac1";

// /*
// Policy templates
const policies = [
  `create policy "Allow read for all users"
on "${TABLE_NAME}"
for SELECT
to public
using (true);`,

  `create policy "Allow insert for user ${ADMIN_UUID}"
on "${TABLE_NAME}"
for INSERT
to authenticated
with check (auth.uid() = '${ADMIN_UUID}');`,

  `create policy "Allow update for user ${ADMIN_UUID}"
on "${TABLE_NAME}"
for UPDATE
to authenticated
using (auth.uid() = '${ADMIN_UUID}')
with check (auth.uid() = '${ADMIN_UUID}');`,

  `create policy "Allow delete for user ${ADMIN_UUID}"
on "${TABLE_NAME}"
for DELETE
to authenticated
using (auth.uid() = '${ADMIN_UUID}');`,
];
// */
/*
// Storage Bucket Policies
const policies = [
  `create policy "Allow public read from ${TABLE_NAME}"
on storage.objects
for SELECT
to public
using (bucket_id = '${TABLE_NAME}');`,

  `create policy "Allow admin upload to ${TABLE_NAME}"
on storage.objects
for INSERT
to authenticated
with check (
  bucket_id = '${TABLE_NAME}' and
  auth.uid() = '${ADMIN_UUID}'
);`,

  `create policy "Allow admin update in ${TABLE_NAME}"
on storage.objects
for UPDATE
to authenticated
using (
  bucket_id = '${TABLE_NAME}' and
  auth.uid() = '${ADMIN_UUID}'
)
with check (
  bucket_id = '${TABLE_NAME}' and
  auth.uid() = '${ADMIN_UUID}'
);`,

  `create policy "Allow admin delete from ${TABLE_NAME}"
on storage.objects
for DELETE
to authenticated
using (
  bucket_id = '${TABLE_NAME}' and
  auth.uid() = '${ADMIN_UUID}'
);`,
];
*/

// Generate SQL content
const sqlContent = policies.join("\n\n");

// Write to file
fs.writeFileSync("supabase-policies.txt", sqlContent);

console.log("SQL policies file generated successfully!");
