import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";
import { FetchContext } from "../context/FetchContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Label from "../components/common/Label";
import FormInput from "../components/FormInput";
import GradientButton from "../components/common/GradientButton";
import GradientLink from "../components/common/GradientLink";
import PageTitle from "../components/common/PageTitle";
import FormError from "../components/FormError";
import FormSuccess from "../components/FormSuccess";
import { Redirect, useHistory } from "react-router-dom";

const SystemUserDetailSchima = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string(),
  phoneNumber: Yup.string(),
});

const EditCompanyHRUserProfile = () => {
  let initialFirstName = "";
  let initialLastName = "";
  let initialEmail = "";
  let initialPhoneNumber = "";

  const history = useHistory();
  const fetchContext = useContext(FetchContext);

  const [editCompanyHRUserLoading, setEditCompanyHRUserLoading] = useState(false);
  const [editCompanyHRUserSuccess, setEditCompanyHRUserSuccess] = useState();
  const [editCompanyHRUserError, setEditCompanyHRUserError] = useState();
  const [redirectEditCompanyHRUser, setRedirectEditCompanyHRUser] = useState(false);
  const [companyHRUserProfile, setCompanyHRProfile] = useState([]);

  const onSubmit = async (values, resetForm) => {
    console.log(values);
    if (
      values.firstName === "" &&
      values.lastName === "" &&
      values.email === "" &&
      values.phoneNumber === ""
    ) {
      history.push("/companiesHR");
    }

    try {
      let companyHRUserProfileUpdate = Object.assign({}, values);
      companyHRUserProfileUpdate.sysUserId = localStorage.getItem("HRUserId");
      console.log(companyHRUserProfileUpdate);

      setEditCompanyHRUserLoading(true);
      const { data } = await fetchContext.authAxios.post(
        "updateCompanyHRUserProfile",
        companyHRUserProfileUpdate
      );
      console.log("*****");
    //   if (res.status === 300) {
        setEditCompanyHRUserSuccess(data.message);
        setEditCompanyHRUserError(null);

        setTimeout(() => {
            setRedirectEditCompanyHRUser(true);
        }, 700);
        // }
    } catch (err) { 
      setEditCompanyHRUserLoading(false);
      const { data } = err.response;
      setEditCompanyHRUserError(data.message);
      setEditCompanyHRUserSuccess(null);
    }
  };

  useEffect(() => {
    const getCompanyHRUserDetails = async () => {
      try {
        const { data } = await fetchContext.authAxios.post(
          "getCompanyHRUserProfile",
          { HRUserId: localStorage.getItem("HRUserId") }
        );

        setCompanyHRProfile(data.companyHRUserProfileArray);
      } catch (err) {
        console.log(err);
      }
        };
        getCompanyHRUserDetails();
    }, [fetchContext.authAxios]);

    companyHRUserProfile.map((i) => {
        initialFirstName = i.firstName;
        initialLastName = i.lastName;
        initialEmail = i.email;
        initialPhoneNumber = i.phoneNumber;
    });
console.log(editCompanyHRUserSuccess)
    return (
        <>
      {redirectEditCompanyHRUser && <Redirect to="/companiesHR" />}
      <PageTitle title={`Edit ${localStorage.getItem('companyName')} HR User`} />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        }}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
        validationSchema={SystemUserDetailSchima}
        validateOnBlur={false}
      >
        {() => (
          <Form>
            {editCompanyHRUserSuccess && (
              <FormSuccess text={editCompanyHRUserSuccess} />
            )}
            {editCompanyHRUserError && <FormError text={editCompanyHRUserError} />}
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
            </div>
            <div className="flex mt-5">
              <div className="w-full sm:w-1/4 mt-4">
                <GradientButton
                  type="submit"
                  text="Submit"
                  loading={editCompanyHRUserLoading}
                />
              </div>
              <div className="flex items-center">
                <GradientLink to="companiesHR" text="Cancel" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
    );
}

export default EditCompanyHRUserProfile
