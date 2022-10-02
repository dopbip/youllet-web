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

const CompanyDetailSchima = Yup.object().shape({
    companyName: Yup.string().required('Name is required'),
    contact: Yup.string().required('Contact is required'),
    email: Yup.string().required('Email is required'),
    address: Yup.string().required('Address is required'),
    town: Yup.string().required('Town is required')
});

const AddCompany = () => {
    const fetchContext = useContext(FetchContext);
    const [addCompanyLoading, setAddCompanyLoading] = useState(false);
    const [addCompanySuccess, setAddCompanySuccess] = useState();
    const [addCompanyError, setAddCompanyError] = useState();
    const [redirectAddCompany, setRedirectAddCompany] = useState(false);

    const onSubmit = async (values, resetForm) => {
        try {
            setAddCompanyLoading(true)
            const { data } = await fetchContext.authAxios.post(
                'addCompany',
                values
            );
            resetForm();
            setAddCompanySuccess(data.message);
            setAddCompanyError(null);
            setTimeout(() => {
                setRedirectAddCompany(true);
            },700);
        } catch (err) {
            const { data } = err.response;
            setAddCompanyLoading(false)
            setAddCompanySuccess(null);
            setAddCompanyError(data.message);
        }
    };
    return (
        <>
            {redirectAddCompany && <Redirect to="/companies" />}
            <PageTitle title="Create Company Profile" /> 
            <Formik
                initialValues={{
                    companyName: "",
                    contact: "",
                    email: "",
                    address: "",
                    town: ""
                }}
                onSubmit={(values, { resetForm })=> 
                    onSubmit(values, resetForm)
                }
                validationSchema={CompanyDetailSchima}
                validateOnBlur={false}
            >
                {() => (
                    <Form>
                        {addCompanySuccess && (
                            <FormSuccess text={addCompanySuccess} />
                        )}
                        {addCompanyError && (
                            <FormError text={addCompanyError} />
                        )}
                        <div className="flex flex-col md:flex-col mt-8">
                            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Company Name" />
                                </div>
                                <FormInput
                                    ariaLabel="Company Name"
                                    name="companyName"
                                    type="text"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Company Address" />
                                </div>
                                <FormInput
                                    ariaLabel="Company Address"
                                    name="address"
                                    type="text"
                                    placeholder="Company Address"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Company Contact" />
                                </div>
                                <FormInput
                                    ariaLabel="Company Contact"
                                    name="contact"
                                    type="text"
                                    placeholder="Company Contact"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Company Email" />
                                </div>
                                <FormInput
                                    ariaLabel="Company Email"
                                    name="email"
                                    type="text"
                                    placeholder="Company Email"
                                />
                            </div>
                            <div className="w-full md:w-1/3 mr-2 mt-5 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Town" />
                                </div>
                                <FormInput
                                    ariaLabel="Town"
                                    name="town"
                                    type="text"
                                    placeholder="Town"
                                />
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-full sm:w-1/4 mt-4">
                                <GradientButton 
                                    type="submit" 
                                    text="Submit" 
                                    loading={addCompanyLoading}
                                />
                            </div>
                            <div className="flex items-center">
                                <GradientLink 
                                    to='companies'
                                    text='Cancel'                    
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
        
    );
}

export default AddCompany;
