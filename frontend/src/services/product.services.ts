import axios from "axios";

export class ProductServices {
    static BASE_URL = process.env.NEXT_PUBLIC_SEEK_BASE_URL as string;

    static async SearchProductService(payload: {product: string}) {
        try {
            const response = await axios.post(`${this.BASE_URL}/WaitList`, 
              payload, {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            
            return response.data;
          } catch (error) {
            console.error("Error getting product:", error);
            throw error;
          }
    }
}