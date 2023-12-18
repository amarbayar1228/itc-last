export default {
  data: {
    uploadUrl: "/api/v1/getFile?file=",
    localData() {
      const data = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
      return data;
    },
  },
};
