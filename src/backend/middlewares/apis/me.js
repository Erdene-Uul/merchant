export default function meAPIS(req, res) {
  return async () => {
    // return req.session.user;
    return {
      name: "name",
    };
  };
}
