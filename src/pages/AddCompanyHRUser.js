
import React, { 
    useContext, 
    useState 
} from "react";
import { FetchContext } from "../context/FetchContext";
import { AuthContext } from "../context/AuthContext";
import { Form, Formik} from "formik";
import * as Yup from "yup";
import Label from "../components/common/Label";
import FormInput from "../components/FormInput";
import GradientButton from "../components/common/GradientButton";
import GradientLink from "../components/common/GradientLink";
import PageTitle from "../components/common/PageTitle";
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { Redirect } from "react-router-dom";

const CompanyUserDetailSchima = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    role: Yup.string()
});
const AddCompanyHRUser = () => {

    const fetchContext = useContext(FetchContext);
    const auth = useContext(AuthContext)
    const [addHRUserLoading, setAddHRUserLoading] = useState(false);
    const [addHRUserSuccess, setAddHRUserSuccess] = useState();
    const [addHRUserError, setAddHRUserError] = useState();
    const [redirectAddHRUser, setRedirectAddHRUser] = useState(false);
    const getEmployerName = localStorage.getItem('companyName');
    const getEmployerId= localStorage.getItem('companyId');

    const onSubmit = async (values, resetForm) => {
            const { authState } = auth;

            const allValues = Object.assign(values,{createdBy: authState.userInfo._id},{companyId: getEmployerId}, {companyName: getEmployerName});
            console.log(allValues)
        try {
            setAddHRUserLoading(true)
            const res = await fetchContext.authAxios.post(
                'addHRUser',
                allValues
            );
            if (res.statusCode === 300){
                setAddHRUserError(res.data.message);
                setRedirectAddHRUser(false);
            }
            resetForm();
            setAddHRUserSuccess(res.data.message);
            setAddHRUserError(null);
            setTimeout(() => {
                setRedirectAddHRUser(true);
            },700);
        } catch (err) {
            const res = err.response;
            setAddHRUserLoading(false)
            setAddHRUserSuccess(null);
            setAddHRUserError(res.data.message);
        }
    };


    return (
        <>
            {redirectAddHRUser && <Redirect to="/companiesHR" />}
            <PageTitle title={`Add HR User for ${getEmployerName}`} /> 
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    role: "HRUser"
                }}
                onSubmit={(values, { resetForm })=> 
                    onSubmit(values, resetForm)
                }
                validationSchema={CompanyUserDetailSchima}
                validateOnBlur={false}
            >
                {() => (
                    <Form>
                        {addHRUserSuccess && (
                            <FormSuccess text={addHRUserSuccess} />
                        )}
                        {addHRUserError && (
                            <FormError text={addHRUserError} />
                        )}
                        <div className="flex flex-col md:flex-col mt-8">
                            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="First Name" />
                                </div>
                                <FormInput
                                    ariaLabel="First Name"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Last Name" />
                                </div>
                                <FormInput
                                    ariaLabel="Last Name"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Phone Number" />
                                </div>
                                <FormInput
                                    ariaLabel="Phone Number"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Email" />
                                </div>
                                <FormInput
                                    ariaLabel="Email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            
                            {/* <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Role" />
                                </div>
                                <div className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5">
                                <select                                
                                onChange={e => setUserRole(e.target.value)}
                                >
                                <option name='role' value="clientAccess">Client Access</option>
                                <option name='role' value="admin">Admin</option>
                                </select>
                                
                            </div>
                        </div> */}
                        </div>
                            <div className="flex mt-5">
                                <div className="w-full sm:w-1/4 mt-4">
                                    <GradientButton 
                                        type="submit" 
                                        text="Submit" 
                                        loading={addHRUserLoading}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <GradientLink 
                                        to='companiesHR'
                                        text='Cancel'                    
                                    />
                                </div>
                            </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AddCompanyHRUser