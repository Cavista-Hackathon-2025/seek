import axios from "axios";

export class AuthServices {
    static BASE_URL = "https://linnked-e4c8bhdgcydec9hp.eastus-01.azurewebsites.net/api";

    static async SignupService(payload: {firstName: string, email: string}) {
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
            console.error("Error registering user:", error);
            throw error;
          }
    }
}