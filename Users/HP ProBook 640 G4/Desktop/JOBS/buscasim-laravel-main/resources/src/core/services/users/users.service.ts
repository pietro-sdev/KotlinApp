import api from "@/core/config/axios";
import { UserListQuery, UserListResponse, UserRequest } from ".";

export default {
  async list(query?: UserListQuery): Promise<UserListResponse> {
    return api.get("/api/users", { params: { ...query } });
  },

  async create(data: UserRequest): Promise<any> {
    return api.post("/api/users", data);
  },

  async update(data: UserRequest): Promise<any> {
    return api.put(`/api/users/${data.id}`, data);
  },

  async remove(data: UserRequest): Promise<any> {
    return api.delete(`/api/users/${data.id}`);
  },
};
