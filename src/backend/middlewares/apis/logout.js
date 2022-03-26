
export default function logoutAPIS(req,res){


  return async () => {

    req.session.destroy();

    return {}
  }
}