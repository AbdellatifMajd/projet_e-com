export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    componentType: "input",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "text",
    placeholder: "Enter discount (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
];

export const filterOptions = {
  category: [
    { id: "tajine", label: "Tajine" },
    { id: "tanjiya", label: "Tanjiya" },
    { id: "bol", label: "Bol" },
    { id: "tasse", label: "Tasse" },
    { id: "assiette", label: "Assiètte" },
    { id: "vase", label: "Vase" },
    { id: "pot", label: "Pot" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const orderDetailsOptions = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "inProcess", label: "In Process" },
      { id: "inShipping", label: "In Shipping" },
      { id: "delivered", label: "Delivered" },
      { id: "rejected", label: "Rejected" },
    ],
  },
];

export const PERIOD_OPTIONS = [
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 90, label: "Last 90 days" },
  { value: 365, label: "Last 12 months" },
];
