import api from "./api"; 

// GET user
export async function getUserById(userId) {
    return api.get(`/user/${userId}`);
}

// PATCH user
export async function updateUserById(userId, requestBody) {
    return api.patch(`/user/update/${userId}`, requestBody);
}

// DELETE user
export async function deleteUserById(userId){
    return api.delete(`/user/delete/${userId}`);
}


