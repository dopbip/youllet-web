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
import FormError from '../components/FormError';
import FormSuccess from '../components/FormSuccess';
import { Redirect, useHistory } from "react-router-dom";


const CompanyUserDetailSchima = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string(),
    phoneNumber: Yup.string(),
    Nrc: Yup.string()
});

const EditCompanyUserProfile = () => {
    let initialFirstName = '';
    let initialLastName = '';
    let initialEmail = '';
    let initialPhoneNumber = '';
    let initialNrc = '';

    const history = useHistory()
    const fetchContext = useContext(FetchContext);

    const [editCompanyUserLoading, setEditCompanyUserLoading] = useState(false);
    const [editCompanyUserSuccess, setEditCompanyUserSuccess] = useState();
    const [editCompanyUserError, setEditCompanyUserError] = useState();
    const [redirectEditCompanyUser, setRedirectEditCompanyUser] = useState(false);
    const [companyUserProfile, setCompanyUserProfile] = useState([]);

    const onSubmit = async (values, resetForm) => {
        console.log(values)
       if (values.firstName === '' && values.lastName === '' && values.email === '' && values.phoneNumber === '' && values.Nrc === '' ) {
            history.push('/companyUsers');
       }
       
        try {
            let companyUserProfileUpdate = Object.assign({},values);
            companyUserProfileUpdate.companyUserId=localStorage.getItem('companyUserId')
            console.log(companyUserProfileUpdate)
    
            setEditCompanyUserLoading(true)
            const res = await fetchContext.authAxios.post(
                'updateCompanyUserProfile',
                companyUserProfileUpdate
            );
            
            if (res.status === 300){
                setEditCompanyUserError(res.data.message);
                setRedirectEditCompanyUser(false);
            }
            //resetForm();
            setEditCompanyUserSuccess(res.data.message);
            setEditCompanyUserError(null);
            setTimeout(() => {
                setRedirectEditCompanyUser(true);
            },1400);
        } catch (err) {
            const { data } = err.response;
            setEditCompanyUserLoading(false)
            setEditCompanyUserSuccess(null);
            setEditCompanyUserError(data.message);
        }
    };

    useEffect(() => {
        const getCompanyUserDetails = async () =>{
            try {
                const { data } = await fetchContext.authAxios.post(
                    'getCompanyUserProfile',
                    {companyUserId: localStorage.getItem('companyUserId')}
                );
                
                setCompanyUserProfile(data.companyUserProfileArray)
            } catch (err) {
                console.log(err)
            }
        }
        getCompanyUserDetails();
    }, [fetchContext.authAxios]);

    companyUserProfile.map((i) => {
        initialFirstName = i.firstName;
        initialLastName = i.lastName;
        initialEmail = i.email;
        initialPhoneNumber = i.phoneNumber;
        initialNrc = i.Nrc
    })
    return (
        <>
        {redirectEditCompanyUser && <Redirect to="/companyUsers" />}
        <PageTitle title="Edit Profile" /> 
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
                    {editCompanyUserSuccess && (
                        <FormSuccess text={editCompanyUserSuccess} />
                    )}
                    {editCompanyUserError && (
                        <FormError text={editCompanyUserError} />
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
                                placeholder={initialFirstName}
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
                                placeholder={initialLastName}
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
                                placeholder={initialPhoneNumber}
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
                                placeholder={initialEmail}
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
                                placeholder={initialNrc}
                            />
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <div className="w-full sm:w-1/4 mt-4">
                            <GradientButton 
                                type="submit" 
                                text="Submit" 
                                loading={editCompanyUserLoading}
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
    )
}

export default EditCompanyUserProfile
