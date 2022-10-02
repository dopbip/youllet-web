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

const EditSystemUser = () => {
  let initialFirstName = "";
  let initialLastName = "";
  let initialEmail = "";
  let initialPhoneNumber = "";

  const history = useHistory();
  const fetchContext = useContext(FetchContext);

  const [editSystemUserLoading, setEditSystemUserLoading] = useState(false);
  const [editSystemUserSuccess, setEditSystemUserSuccess] = useState();
  const [editSystemUserError, setEditSystemUserError] = useState();
  const [redirectEditSystemUser, setRedirectEditSystemUser] = useState(false);
  const [systemUserProfile, setSystemUserProfile] = useState([]);

  const onSubmit = async (values, resetForm) => {
    console.log(values);
    if (
      values.firstName === "" &&
      values.lastName === "" &&
      values.email === "" &&
      values.phoneNumber === ""
    ) {
      history.push("/systemUsers");
    }

    try {
      let systemUserProfileUpdate = Object.assign({}, values);
      systemUserProfileUpdate.sysUserId = localStorage.getItem("systemUserId");
      console.log(systemUserProfileUpdate);

      setEditSystemUserLoading(true);
      const res = await fetchContext.authAxios.post(
        "updateSysUserProfile",
        systemUserProfileUpdate
      );
      console.log("*****");
      console.log(res);
      if (res.statusCode == 300) {
        setEditSystemUserError(res.data.message);
        setRedirectEditSystemUser(true);
      }
      //resetForm();
      setEditSystemUserSuccess(res.data.message);
      localStorage.removeItem('systemUserId');
      setEditSystemUserError(null);
      setTimeout(() => {
        setRedirectEditSystemUser(true);
      }, 1400);
    } catch (err) {
      const { data } = err.response;
      setEditSystemUserLoading(false);
      setEditSystemUserSuccess(null);
      setEditSystemUserError(data.message);
    }
  };

  useEffect(() => {
    const getSystemUserDetails = async () => {
      try {
        const { data } = await fetchContext.authAxios.post(
          "getSystemUserProfile",
          { sysUserId: localStorage.getItem("systemUserId") }
        );

        setSystemUserProfile(data.sysUserProfileArray);
        localStorage.removeItem('systemUserId')
      } catch (err) {
        console.log(err);
      }
    };
    getSystemUserDetails();
  }, [fetchContext.authAxios]);

  systemUserProfile.map((i) => {
    initialFirstName = i.firstName;
    initialLastName = i.lastName;
    initialEmail = i.email;
    initialPhoneNumber = i.phoneNumber;
  });
  return (
    <>
      {redirectEditSystemUser && <Redirect to="/systemUsers" />}
      <PageTitle title="Edit System User" />
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
            {editSystemUserSuccess && (
              <FormSuccess text={editSystemUserSuccess} />
            )}
            {editSystemUserError && <FormError text={editSystemUserError} />}
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
                  loading={editSystemUserLoading}
                />
              </div>
              <div className="flex items-center">
                <GradientLink to="systemUsers" text="Cancel" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditSystemUser;
