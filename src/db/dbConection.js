class DbService {
  constructor(client) {
    this.client = client;
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      try {
        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
      }
    }
    return this.db;
  }

  getDb() {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.db = null;
      console.log("MongoDB connection closed");
    }
  }
}

module.exports = DbService
