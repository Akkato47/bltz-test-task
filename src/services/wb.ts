import env from "#config/env/env.js";
import { getCurrentDateISO } from "#utils/dateISO.js";
import axios from "axios";

const wbApi = axios.create({
    baseURL: env.WB_BASE_URI,
    params: {
        date: getCurrentDateISO(),
    },
    headers: {
        Authorization: `Bearer ${env.WB_TOKEN}`,
        "Content-Type": "application/json",
    },
});

export async function getBoxTariffs() {
    try {
        const response = await wbApi.get("/tariffs/box");
        console.log(response.data?.response?.data.warehouseList);
        return response.data?.response?.data;
    } catch (error) {
        console.error("Неудалось", error);
        throw error;
    }
}
