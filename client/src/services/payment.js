import api from "@/utils/axios";

export const checkout = async () => {
    return await api.post("payment/checkout");
};

export const success = async (session_id) => {
    return await api.get(`payment/success?session_id=${session_id}`);
};
    