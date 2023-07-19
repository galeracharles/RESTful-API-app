import { createReadStream } from "fs";
import csv from "csv-parser";
import { Product } from "../types/products.types";
import { PostgresClient } from "../db/products";

export class DataHandler {
  private readonly db;
  private isProcessing: boolean;

  constructor() {
    this.db = new PostgresClient();
    this.isProcessing = false;
  }

  private sendData = async (data: Product[]) => {
    await this.db.addDataToPg(data);
  };

  public getProductById = async (id: string) => {
    return await this.db.getProductByProductId(id);
  };

  public processFile = async (file: Express.Multer.File) => {
    const array: Product[] = [];

    const readStream = createReadStream(file.path).pipe(csv());

    readStream.on("data", async (line) => {
      const { product_id, name, price, currency, image, status } = line;

      if (
        !product_id ||
        !name ||
        !price ||
        !currency ||
        !image ||
        !status ||
        (status !== "available" && status !== "oos")
      ) {
        return;
      }

      const product: Product = {
        product_id,
        name,
        price,
        currency,
        image,
        status,
      };

      array.push(product);

      if (array.length === 2000 && !this.isProcessing) {
        this.isProcessing = true;
        readStream.pause();
        try {
          await this.sendData([...array]);
          array.length = 0;
          readStream.resume();
          this.isProcessing = false;
        } catch (error) {
          if (error instanceof Error) {
            readStream.destroy(error);
          }
        }
      }
    });

    readStream.on("end", async () => {
      if (array.length > 0 && !this.isProcessing) {
        this.isProcessing = true;
        try {
          await this.sendData([...array]);
          array.length = 0;
        } catch (error) {
          console.error(error);
        } finally {
          this.isProcessing = false;
        }
      }
    });

    readStream.on("error", (error) => {
      console.error(error);
    });
  };
}
