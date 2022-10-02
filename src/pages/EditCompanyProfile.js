import React, { 
    useContext, 
    useState,
    useEffect 
} from "react";
import _ from 'lodash';
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
import { Redirect, useHistory } from "react-router-dom";

const CompanyDetailSchima = Yup.object().shape({
    companyName: Yup.string(),
    contact: Yup.string(),
    email: Yup.string(),
    address: Yup.string(),
    town: Yup.string()
});

const EditCompanyProfile = () => {
    let initialCompanyName = '';
    let initialContact = '';
    let initialAddress = '';
    let initialTown = '';
    let initialEmail = '';
    const history = useHistory()
    const fetchContext = useContext(FetchContext);
    const [editCompanyLoading, setEditCompanyLoading] = useState(false);
    const [editCompanySuccess, setEditCompanySuccess] = useState();
    const [editCompanyError, setEditCompanyError] = useState();
    const [redirectEditCompany, setRedirectEditCompany] = useState(false);
    const [companyProfile, setCompanyProfile] = useState([]);

    const onSubmit = async (values, resetForm) => {
        console.log(values)
       if (values.name === '' && values.contact === '' && values.address === '' && values.town === '' && values.email === '' ) {
            history.push('/companies');
       }
       
        try {
            let companyProfileUpdate = Object.assign({},values);
            companyProfileUpdate.companyId=localStorage.getItem('companyId')
            console.log(companyProfileUpdate)
    
            setEditCompanyLoading(true)
            const { data } = await fetchContext.authAxios.post(
                'updateCompanyProfile',
                companyProfileUpdate
            );
            
            resetForm();
            setEditCompanySuccess(data.message);
            setEditCompanyError(null);
            setTimeout(() => {
                setRedirectEditCompany(true);
            },700);
        } catch (err) {
            const { data } = err.response;
            setEditCompanyLoading(false)
            setEditCompanySuccess(null);
            setEditCompanyError(data.message);
        }
    };

    useEffect(() => {
        const getCompanyDetails = async () =>{
            try {
                const { data } = await fetchContext.authAxios.post(
                    'getCompanyProfile',
                    {companyId: localStorage.getItem('companyId')}
                );
                
                setCompanyProfile(data.companyProfileArray)
            } catch (err) {
                console.log(err)
            }
        }
        getCompanyDetails();
    }, [fetchContext.authAxios]);

    companyProfile.map((i) => {
        initialCompanyName = i.companyName;
        initialTown = i.town;
        initialContact = i.contact;
        initialEmail = i.email;
        initialAddress = i.address
    })
    return (
        <>
            {redirectEditCompany && <Redirect to="/companies" />}
            <PageTitle title="Update Company Profile" /> 
            <Formik
                initialValues={{
                    companyName: '',
                    contact: '',
                    email: '',
                    address: '',
                    town: ''
                }}
                onSubmit={(values, { resetForm })=> 
                    onSubmit(values, resetForm)
                }
                validationSchema={CompanyDetailSchima}
                validateOnBlur={false}
            >
                {() => (
                    <Form className="mt-8">
                        {editCompanySuccess && (
                            <FormSuccess text={editCompanySuccess} />
                        )}
                        {editCompanyError && (
                            <FormError text={editCompanyError} />
                        )}
                        <div className="flex flex-col md:flex-col mt-8">
                            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
                                <div className="mb-1">
                                    <Label text="Company Name" />
                                </div>
                                <FormInput
                                    ariaLabel="Company Name"
                                    name="name"
                                    type="text"
                                    placeholder={initialCompanyName}
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
                                    placeholder={initialAddress}
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
                                    placeholder={initialContact}
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
                                    placeholder={initialEmail}
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
                                    placeholder={initialTown}
                                />
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-full sm:w-1/4 mt-4">
                                <GradientButton 
                                    type="submit" 
                                    text="Update" 
                                    loading={editCompanyLoading}
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
    )
}

export default EditCompanyProfile
