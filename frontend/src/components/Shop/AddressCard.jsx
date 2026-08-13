import { deleteAddress, fetchAddress } from "@/store/AddressSlice";
import { Card, CardContent } from "@mui/material";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function AddressCard({
  addressInfos,
  isDefault,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleDeleteAddress = async () => {
    try {
      const result = await dispatch(
        deleteAddress({ userId: user?.id, addressId: addressInfos?.id }),
      ).unwrap();
      if (result.success) {
        toast.success(result.message);
        dispatch(fetchAddress({ userId: user?.id }));
      }
    } catch (e) {
      return toast.error(e);
    }
  };
  return (
    <Card
      onClick={() => setCurrentSelectedAddress?.(addressInfos)}
      elevation={0}
      className="border border-gray-200 rounded-2xl hover:border-gray-400 hover:shadow-sm transition-all group"
    >
      <CardContent className="!p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              onClick={() => {
                handleEditAddress(addressInfos);
              }}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500"
              onClick={handleDeleteAddress}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {isDefault && (
          <span className="inline-block text-[10px] font-medium uppercase tracking-wide bg-black text-white rounded-full px-2 py-0.5 mb-2">
            Default
          </span>
        )}

        <p className="text-sm font-medium text-gray-900">
          {addressInfos?.address}
        </p>
        <p className="text-sm text-gray-500">
          {addressInfos?.city} · {addressInfos?.pincode}
        </p>
        <p className="text-sm text-gray-500">{addressInfos?.phone}</p>
        {addressInfos?.notes && (
          <p className="text-xs text-gray-400 mt-1 italic">
            {addressInfos.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default AddressCard;
