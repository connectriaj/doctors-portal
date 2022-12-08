import { useEffect } from "react";
import { useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setISAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/users/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setISAdmin(data.isAdmin);
        setIsAdminLoading(false);
      });
  }, [email]);
  return [useAdmin, isAdminLoading];
};

export default useAdmin;
