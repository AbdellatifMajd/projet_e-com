import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { MapPin, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import CommonForm from "@/common/CommonForm";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddress, updateAddress } from "@/store/AddressSlice";
import { toast } from "sonner";
import AddressCard from "./AddressCard";

function Address({setCurrentSelectedAddress}) {
  const initialState = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleManageAddress = async (event) => {
    event.preventDefault();

    if (currentId == null) {
      dispatch(addAddress({ formData: { ...formData, userId: user?.id } }))
        .unwrap()
        .then((result) => {
          if (result.success) {
            dispatch(fetchAddress({ userId: user?.id }));
            toast.success(result.message);
            setCurrentId(null);
            setFormData(initialState);
          } else {
            toast.error(result.message);
          }
        })
        .catch((error) => toast.error(error));
    } else {
      dispatch(
        updateAddress({
          userId: user?.id,
          addressId: currentId,
          formData: { ...formData },
        })
      )
        .unwrap()
        .then((result) => {
          if (result.success) {
            dispatch(fetchAddress({ userId: user?.id }));
            toast.success(result.message);
            setCurrentId(null);
            setFormData(initialState);
          } else {
            toast.error(result.message);
          }
        })
        .catch((error) => toast.error(error));
    }
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentId(getCurrentAddress?.id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      pincode: getCurrentAddress.pincode,
      phone: getCurrentAddress.phone,
      notes: getCurrentAddress.notes,
    });
    // scroll auto vers le formulaire pour que l'utilisateur voie qu'il est en mode edit
    document.getElementById("address-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => {
    setCurrentId(null);
    setFormData(initialState);
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value.trim() !== "");

  useEffect(() => {
    if (user?.id) dispatch(fetchAddress({ userId: user.id }));
  }, [dispatch, user?.id]);

return (
  <div className="w-full max-w-5xl space-y-6 px-4 sm:px-0">
    {/* Address cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {addressList?.length > 0 &&
        addressList.map((addressItem, index) => (
          <AddressCard
            key={addressItem.id}
            addressInfos={addressItem}
            isDefault={index === 0}
            handleEditAddress={handleEditAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        ))}
    </div>

    {/* Formulaire permanent en bas, pleine largeur */}
    <Card
      id="address-form"
      elevation={0}
      className="border border-gray-200 rounded-2xl w-full"
    >
      <CardHeader
        className="!pb-2 !items-start sm:!items-center"
        avatar={
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
        }
        title={
          <span className="!text-sm sm:!text-base font-semibold">
            {currentId !== null ? "Edit address" : "Add new address"}
          </span>
        }
        subheader={
          <span className="text-xs text-gray-400">
            Used for delivery and order updates
          </span>
        }
        action={
          currentId !== null && (
            <IconButton size="small" onClick={handleCancelEdit}>
              <X className="w-4 h-4" />
            </IconButton>
          )
        }
      />
      <CardContent className="!pt-4 !px-4 sm:!px-6">
        <CommonForm
          formData={formData}
          formControls={addressFormControls}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          buttonText={currentId !== null ? "Update" : "Save"}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  </div>
);
}

export default Address;
