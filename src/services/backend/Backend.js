import { axiosInstanceBackend } from "../../apis";

const backendAPI = {
  getInvitations: () => axiosInstanceBackend().get("/invitations"),
  getInvitationsFilters: (filter) =>
    axiosInstanceBackend().get(`/invitations${filter}`),
  getInvitation: (id) => axiosInstanceBackend().get(`/invitations/${id}`),
  createInvitation: (data) => axiosInstanceBackend().post("/invitations", data),
  updateInvitation: (id, data) =>
    axiosInstanceBackend().put(`/invitations/${id}`, data),
};

export default backendAPI;