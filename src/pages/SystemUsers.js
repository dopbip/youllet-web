import React, {
    useContext,
    useEffect,
    useState
} from "react";
import { Button } from "rsuite";
import ButtonToolbar from 'rsuite/ButtonToolbar';
import SystemUsersTable from "../components/SystemUsersTable";
import { FetchContext } from "../context/FetchContext";
import { AuthContext } from "../context/AuthContext"
import 'rsuite/dist/rsuite.css';

const SystemUsers = () => {
    const fetchContext = useContext(FetchContext);
    const auth = useContext(AuthContext);
    const { authState } = auth;
    const [userArray, setUserArray] = useState([]);

    useEffect(() => {
      const getSystemUsers = async() => {
        try {
            const { data } = await fetchContext.authAxios.post(
              'getSystemUsers',
              {userId: authState.userInfo._id}
            );
            setUserArray(data.SystemUsers);
        } catch (err) {
          console.log(err);
        }
      };
      getSystemUsers();
    }, [fetchContext.authAxios]);
  return (
    <>
      <div>
        <ButtonToolbar>
            <Button color="blue" appearance="primary" href="addSystemUser"> Add user </Button>
        </ButtonToolbar>
            <h3>Add Systeme user</h3>
        </div>
        <SystemUsersTable userArray={userArray} />
    </>
  );
};

export default SystemUsers;
