import React, {
    useContext,
    useEffect,
    useState
} from "react";
import CompaniesHRTable from "../components/CompaniesHRTable";
import PageTitle from "../components/common/PageTitle"
import { Button, ButtonToolbar } from "rsuite";
import { FetchContext } from "../context/FetchContext";
import 'rsuite/dist/rsuite.css';
import { AuthContext } from "../context/AuthContext";

const CompaniesHR = () => {
    const auth = useContext(AuthContext);
    const { _id } = auth.authState.userInfo
    const fetchContext = useContext(FetchContext);
    const [companyHRArray, setCompanyHRArray] = useState([]);

    useEffect(() => { 

        const getCompaniesHR = async () => {
            console.log(_id)
            try {
               if ( auth.isAdmin()) {
                const { data } = await fetchContext.authAxios.post(
                    'allcompaniesHR'
                )
                console.log('%%%%%%%%%')
                console.log(data.companies)
                setCompanyHRArray(data.companies)
               } else if (auth.isClientAccess()){
                const { data } = await fetchContext.authAxios.post(
                    'allcompaniesHR',
                   { createdBy: _id}
                )
                setCompanyHRArray(data.companies)
               } 
                
            } catch (err) {
                console.log(err);
            }
        };
        getCompaniesHR();
    }, [fetchContext.autAxios]);

  return (
    <>
        <PageTitle title="Companies HR Management" />
        <CompaniesHRTable companyHRArray={companyHRArray}/>  
    </>
  );
};

export default CompaniesHR;
