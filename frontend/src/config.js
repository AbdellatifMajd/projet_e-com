export const registerFormControls = [
    {
        name: "username",
        label: "User Name",
        componentType: "input", 
        type: "text"
    },
    {
        name: "email",
        label: "Email",
        componentType: "input", 
        type: "text"
    },
    {
        name: "password",
        label: "Password",
        componentType: "input", 
        type: "password"
    },
]

export const loginFormControls = [
    {
        name: "email",
        label: "Email", 
        componentType: "input",
        type: "text"
    },
    {
        name: "password",
        label: "Password", 
        componentType: "input", 
        type: "password"
    }
]


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

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};