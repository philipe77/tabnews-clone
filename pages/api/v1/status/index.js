import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB ;
  const db = await database.query("SHOW server_version");
  const databaseMaxConnectionsResult = await database.query("SHOW max_connections")
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values:[databaseName]
  })
  const databaseOpenedConnections = databaseOpenedConnectionsResult.rows[0].count;
  const version = db.rows[0].server_version;
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;
  res
    .status(200)
    .json({ 
      updated_at: updatedAt, 
      dependencies: { 
        database: { 
          version, 
          max_connections: +databaseMaxConnectionsValue ,
          opened_connections: databaseOpenedConnections
        }
      } 
      });
}

export default status;
