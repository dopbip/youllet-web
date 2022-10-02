import React, { 
    useContext, 
    useState 
} from "react";
import { FetchContext } from "../context/FetchContext";
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
    email: Yup.string().email('must be a valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    Nrc: Yup.string().required('NRC is required')
});

const AddCompanyUser = () => {
    const fetchContext = useContext(FetchContext);
    const [addCompanyUserLoading, setAddCompanyUserLoading] = useState(false);
    const [addCompanyUserSuccess, setAddCompanyUserSuccess] = useState();
    const [addCompanyUserError, setAddCompanyUserError] = useState();
    const [redirectAddCompanyUser, setRedirectAddCompanyUser] = useState(false);

    const onSubmit = async (values, resetForm) => {
        const getEmployerName = localStorage.getItem('companyName');
        const getEmployerId= localStorage.getItem('companyId');
        const employeeDetails = Object.assign({}, values, 
                {  employerName: getEmployerName },
                { employerId: getEmployerId }
            );
        try {
            setAddCompanyUserLoading(true)
            const res = await fetchContext.authAxios.post(
                'addCompanyUser',
                employeeDetails
            );
            if (res.statusCode === 300){
                setAddCompanyUserError(res.data.message);
                setRedirectAddCompanyUser(false);
            }
            resetForm();
            localStorage.removeItem('companyName');
            localStorage.removeItem('companyId');
            setAddCompanyUserSuccess(res.data.message);
            setAddCompanyUserError(null);
            setTimeout(() => {
                setRedirectAddCompanyUser(true);
            },700);
        } catch (err) {
            const res = err.response;
            setAddCompanyUserLoading(false)
            setAddCompanyUserSuccess(null);
            setAddCompanyUserError(res.data.message);
        }
    };
    return (
        <>
            {redirectAddCompanyUser && <Redirect to="/companyUsers" />}
            <PageTitle title="Add New Employee" /> 
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    Nrc: ""
                }}
                onSubmit={(values, { resetForm })=> 
                    onSubmit(values, resetForm)
                }
                validationSchema={CompanyUserDetailSchima}
                validateOnBlur={false}
            >
                {() => (
                    <Form>
                        {addCompanyUserSuccess && (
                            <FormSuccess text={addCompanyUserSuccess} />
                        )}
                        {addCompanyUserError && (
                            <FormError text={addCompanyUserError} />
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
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="NRC" />
                                </div>
                                <FormInput
                                    ariaLabel="NRC"
                                    name="Nrc"
                                    type="text"
                                    placeholder="NRC"
                                />
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-full sm:w-1/4 mt-4">
                                <GradientButton 
                                    type="submit" 
                                    text="Submit" 
                                    loading={addCompanyUserLoading}
                                />
                            </div>
                            <div className="flex items-center">
                                <GradientLink 
                                    to='companyUsers'
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

export default AddCompanyUser;
