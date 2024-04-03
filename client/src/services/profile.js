import api from "@/utils/axios";

export const getProfile = async () => {
    return await api.get("profile/");
    };

export const updateProfile = async (data) => {
    return await api.put("profile/", data);
};

export const updatePassword = async (data) => {
    return await api.put("users/changePassword", data);
};

export const changeImage = async (data) => {
    return await api.post("profile/image", data,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};