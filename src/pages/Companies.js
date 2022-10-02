import React, {
    useContext,
    useEffect,
    useState
} from "react";
import CompaniesTable from "../components/CompaniesTable";
import { Button, ButtonToolbar } from "rsuite";
import { FetchContext } from "../context/FetchContext";
import 'rsuite/dist/rsuite.css';
import { AuthContext } from "../context/AuthContext";



const Companies = () => {
    const auth = useContext(AuthContext);
    const { _id } = auth.authState.userInfo
    const fetchContext = useContext(FetchContext);
    const [companyArray, setCompanyArray] = useState([]);

    useEffect(() => { 

        const getCompanies = async () => {
            
            try {
               if ( auth.isAdmin()) {
                const { data } = await fetchContext.authAxios.post(
                    'allcompanies'
                )
                console.log('))))))')
                console.log(data.companies)
                setCompanyArray(data.companies)
               } else if (auth.isClientAccess()){
                console.log(_id)
                const { data } = await fetchContext.authAxios.post(
                    'allcompanies',
                   { createdBy: _id}
                )
                console.log(data.companies)
                setCompanyArray(data.companies)
               } 
                
            } catch (err) {
                console.log(err);
            }
        };
        getCompanies();
    }, [fetchContext.autAxios]);
    return (
        <>
          {/* <PageTitle title="Companies" /> */}
          <div>
            <ButtonToolbar>
                <Button color="blue" appearance="primary" href="addCompany"> Add Company </Button>
            </ButtonToolbar>
            </div>
          <CompaniesTable companyArray={companyArray}/>  
        </>
    )
}

export default Companies

