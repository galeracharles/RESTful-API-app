import pgPromise, { IMain, IDatabase } from "pg-promise";
import { Product } from "types/products.types";

export class PostgresClient {
  private readonly pgp: IMain<unknown>;

  private readonly db: IDatabase<unknown>;

  constructor() {
    this.pgp = pgPromise();
    this.db = this.pgp({
      user: "postgres",
      password: "backend1",
      host: "localhost",
      database: "products",
    });
  }

  public dbConnect = async () => {
    try {
      await this.db.query("SELECT * FROM products");
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  public addDataToPg = async (data: Product[]) => {
    const inputColumns = [
      "product_id",
      "name",
      "price",
      "currency",
      "image",
      "status",
    ];

    const onConflict = "ON CONFLICT DO NOTHING";

    try {
      const query =
        this.pgp.helpers.insert(data, inputColumns, "products") + onConflict;
      await this.db.none(query);
      return console.log("It works");
    } catch (error) {
      return console.error(error);
    }
  };

  public getProductByProductId = async (id: string) => {
    try {
      const product = await this.db.oneOrNone(
        "SELECT * FROM products WHERE product_id = $1",
        [id]
      );
      return product;
    } catch (error) {
      console.error("Error getting product by product ID:", error);
      return null;
    }
  };
}
