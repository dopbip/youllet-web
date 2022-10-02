import React, {
    useContext,
    useEffect,
    useState
} from "react";
import { Button } from "rsuite";
import ButtonToolbar from 'rsuite/ButtonToolbar';
import CompanyUsersTable from "../components/CompanyUsersTable";
import { FetchContext } from "../context/FetchContext";
import { AuthContext } from "../context/AuthContext";
import 'rsuite/dist/rsuite.css';

const CompanyUsers = () => {
    const auth = useContext(AuthContext);
    const { authState } = auth;
    const fetchContext = useContext(FetchContext);
    const [userArray, setUserArray] = useState([]);
    const companyName = localStorage.getItem('companyName');
    const { role } = authState.userInfo
    useEffect(() => {
        (async () => {
          try {
            if (role !== "HRUser") {
                const companyId = localStorage.getItem("companyId");
                const { data } = await fetchContext.authAxios.post(
                "companyUsers",
                {
                  companyId: companyId,
                  role: role,
                }
              );
              setUserArray(data.companyUsers);
            } else {
                const { companyId } = authState.userInfo;
                const { data } = await fetchContext.authAxios.post(
                    "companyUsers",
                    {
                    companyId: companyId,
                    role: role,
                    }
                );
              setUserArray(data.companyUsers);
            }
          } catch (err) {
            console.log(err);
          }
        })();
        
    }, [fetchContext.autAxios]);

    return (
        <>
          
            <div>
            <ButtonToolbar>
                {role!=='HRUser'? (<Button color="blue" appearance="primary" href="addCompanyUser"> Add user </Button>) : 
                <Button color="blue" appearance="primary" href="addCompanyUser"> Export </Button> }
                
            </ButtonToolbar>
                <h3>{companyName} employees</h3>
            </div>
            <CompanyUsersTable userArray={userArray} loginUserRole={role} />
        </>
        
    )
}

export default CompanyUsers
