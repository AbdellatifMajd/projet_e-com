import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import Address from "./Address";
import ShopOrders from "./ShopOrders";

function ShopAccount() {
  const [activeTab, setActiveTab] = useState("address");

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <div className="relative w-full h-[220px] overflow-hidden">
        <img
          src="/images/account_img_banner.webp"
          alt="Account banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute bottom-6 left-8 text-white">
          <p className="text-xl font-semibold">My Account</p>
          <p className="text-xs opacity-80">Manage your orders and addresses</p>
        </div>
      </div>

      {/* Tabs */}
      <Box className="w-full border-b border-gray-200">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className="max-w-2xl mx-auto"
          TabIndicatorProps={{ sx: { bgcolor: "black", height: 2 } }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: 14,
              color: "text.secondary",
              minWidth: 0,
              px: 0.5,
              mr: 3.5,
            },
            "& .Mui-selected": {
              color: "black !important",
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Orders" value="orders" />
          <Tab label="Address" value="address" />
        </Tabs>
      </Box>

      {/* Tab content */}
      <div className="w-full px-6 py-6">
        {activeTab === "orders" && <ShopOrders />}
        {activeTab === "address" && <Address />}
      </div>
    </div>
  );
}

export default ShopAccount;